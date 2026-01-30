const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Create Express App
const app = express();
const PORT = process.env.PORT || 3001;

// ---------------------------------------------------------
// APP LOGIC (Router)
// Start a router so we can mount it at multiple paths
// ---------------------------------------------------------
const apiRouter = express.Router();

// MIDDLEWARE ON ROUTER
apiRouter.use(express.json());

// STRICT CORS CONFIGURATION
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://quonote.com',
  'https://www.quonote.com',
  'https://api.quonote.com',
  // Allow Vercel deployments
  '.vercel.app' 
];

apiRouter.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    // Check if origin matches any allowed domain
    const isAllowed = allowedOrigins.some(allowed => {
        if (allowed.startsWith('.')) {
            return origin.endsWith(allowed);
        }
        return origin === allowed;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      console.log(`[CORS BLOCKED] Origin: ${origin}`);
      callback(new Error(`Not allowed by CORS`));
    }
  },
  credentials: true
}));

// API ROUTES
apiRouter.post('/api/gemini', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Error: VITE_GEMINI_API_KEY is missing/empty.");
      return res.status(500).json({ error: 'API key not configured on server' });
    }

    if (typeof fetch === 'undefined') {
        console.error("CRITICAL: Global 'fetch' is undefined. Node version: " + process.version);
        return res.status(500).json({ error: 'Server configuration error: Node version too low' });
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
      console.error(`Gemini API Error: ${response.status} - ${errorText}`);
      return res.status(response.status).json({ 
        error: 'AI Service Error',
        details: errorText 
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Proxy Route Error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

apiRouter.get('/', (req, res) => {
  res.send('Quonote API is running (CJS).');
});

// ---------------------------------------------------------
// MOUNTING
// ---------------------------------------------------------

// Mount the app logic at root
app.use('/', apiRouter);

// ALSO mount the app logic at the cPanel directory path
// This ensures that /repositories/New-folder/api/gemini works exactly like /api/gemini
app.use('/repositories/New-folder', apiRouter);

// 404 Handler for debugging (Global)
app.use((req, res) => {
    console.log(`[404] ${req.method} ${req.url}`);
    res.status(404).json({
        error: 'Not Found',
        path: req.url,
        method: req.method,
        timestamp: new Date().toISOString()
    });
});

// ---------------------------------------------------------
// STARTUP
// ---------------------------------------------------------
app.listen(PORT, () => {
    console.log(`✅ Server started on port ${PORT}`);
});
