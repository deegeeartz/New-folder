import express from 'express';
import fs from 'fs';
import { config } from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import geminiProxy from './gemini-proxy.js';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// cPanel often sets PORT to a named pipe like /tmp/passenger.blah, so we must rely on process.env.PORT
const PORT = process.env.PORT || 3001; 
const isProduction = process.env.NODE_ENV !== 'development';

app.use(express.json());

// Debug route to diagnose deployment issues
app.get('/debug-deployment', (req, res) => {
  const distPath = path.join(__dirname, '../dist');
  res.json({
    status: 'ok',
    version: 'v2-static-fix',
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
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:5173', 'http://localhost:5174'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// API routes
app.use(geminiProxy);

// Serve static files in production
if (isProduction) {
  const distPath = path.join(__dirname, '../dist');
  const logFile = path.join(__dirname, '../server_debug.log');
  
  // MIME type map
  const mimeTypes = {
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.html': 'text/html',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.webmanifest': 'application/manifest+json'
  };

  // Serve static assets with explicit caching policy
  app.use('/assets', express.static(path.join(distPath, 'assets'), {
    maxAge: '1d',
    fallthrough: false // processing stops here if file not found in assets, preventing 404 falling to index.html
  }));

  // Serve other root files (favicon, manifest, etc.)
  app.use(express.static(distPath, {
    maxAge: '1d'
  }));

  // Debug route to view server logs
  app.get('/debug-logs', (req, res) => {
    const logPath = path.join(__dirname, '../server_debug.log');
    if (fs.existsSync(logPath)) {
      res.sendFile(logPath);
    } else {
      res.send('No log file found.');
    }
  });

  // SPA Catch-all (Express 5 syntax)
  app.get('/{*splat}', (req, res) => {
    // SECURITY: Do not serve index.html for known missing asset patterns
    if (req.url.startsWith('/assets/') || req.url.includes('.js') || req.url.includes('.css')) {
        return res.status(404).send('Not found');
    }

    res.sendFile(path.join(distPath, 'index.html'), (err) => {
      if (err) {
        console.error('Error sending index.html:', err);
        res.status(500).send('Server Error: Could not load application.');
      }
    });
  });
}

// Only listen if executed directly (not imported)
if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
}

export default app;
