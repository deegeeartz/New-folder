const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV !== 'development';
const distPath = path.join(__dirname, 'dist');

app.use(express.json());

// Serve static files from dist FIRST (before any other routes)
app.use(express.static(distPath, {
  maxAge: '1h',
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.set('Content-Type', 'application/javascript');
    } else if (path.endsWith('.css')) {
      res.set('Content-Type', 'text/css');
    }
  }
}));

// Debug routes
app.get('/debug-deployment', (req, res) => {
  const distPath = path.join(__dirname, 'dist');
  res.json({
    status: 'ok',
    version: 'v3-cjs',
    env: {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      isProduction
    },
    paths: {
      cwd: process.cwd(),
      __dirname,
      distPath
    },
    fileSystem: {
      distExists: fs.existsSync(distPath),
      indexHtmlExists: fs.existsSync(path.join(distPath, 'index.html')),
      distContents: fs.existsSync(distPath) ? fs.readdirSync(distPath).slice(0, 10) : []
    }
  });
});

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://quonote.com',
  'https://www.quonote.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    const isAllowed = allowedOrigins.some(allowed => 
      origin === allowed || origin.endsWith('.vercel.app')
    );
    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`Blocked CORS for origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Gemini API proxy route
app.post('/api/gemini', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (prompt.length > 1000) {
      return res.status(400).json({ error: 'Prompt too long' });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error('API key not configured');
      return res.status(500).json({ error: 'Service temporarily unavailable' });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Gemini API error: ${response.status}`);
      return res.status(503).json({ 
        error: 'AI service temporarily unavailable'
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(`Proxy error: ${error.message}`);
    res.status(500).json({ 
      error: 'Internal server error'
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({ error: 'App not built. Run npm run build first.' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`Serving static files from: ${distPath}`);
});
