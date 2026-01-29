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

  // MANUAL asset serving - more reliable than express.static on cold starts
  app.get(/^\/assets\/.*$/, (req, res) => {
    const fullPath = path.join(distPath, req.path);
    const ext = path.extname(fullPath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    
    fs.readFile(fullPath, (err, data) => {
      if (err) {
        try { fs.appendFileSync(logFile, `[Asset Error] ${req.path}: ${err.message}\n`); } catch(e) {}
        return res.status(404).send('Asset not found');
      }
      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day
      res.send(data);
    });
  });

  // Serve other static files (images, manifest, etc.)
  app.use(express.static(distPath, {
    maxAge: '1d',
    etag: false
  }));

  // Use regex for catch-all to avoid Express 5/path-to-regexp issues with '*'
  app.get(/.*/, (req, res) => {
    // SECURITY: Do not serve index.html for missing assets
    if (req.url.startsWith('/assets/') || req.url.includes('.js') || req.url.includes('.css')) {
        return res.status(404).send('Not found');
    }

    // Log what is falling through to catch-all
    try {
        fs.appendFileSync(logFile, `[${new Date().toISOString()}] 404 Fallthrough: ${req.url}\n`);
    } catch (e) {}

    res.sendFile(path.join(distPath, 'index.html'), (err) => {
      if (err) {
        const msg = `[${new Date().toISOString()}] Error sending index.html for url ${req.url}: ${err.message}\n`;
        try { fs.appendFileSync(logFile, msg); } catch(e) {}
        console.error('Error sending index.html:', err);
        res.status(500).send('Server Error: Could not find client build files. See server_debug.log.');
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
