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
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

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
  // Debug logging for dist path
  const logFile = path.join(__dirname, '../../server_debug.log');
  try {
      fs.appendFileSync(logFile, `[${new Date().toISOString()}] Dist Path Resolved to: ${distPath}\n`);
      if (fs.existsSync(distPath)) {
           fs.appendFileSync(logFile, `[${new Date().toISOString()}] Dist folder exists.\n`);
           // List children to verify
           const files = fs.readdirSync(distPath);
           fs.appendFileSync(logFile, `[${new Date().toISOString()}] Dist contents: ${files.join(', ')}\n`);
      } else {
           fs.appendFileSync(logFile, `[${new Date().toISOString()}] CRITICAL: Dist folder NOT found at ${distPath}\n`);
      }
  } catch (e) {
      console.error(e);
  }

  // Serve static files with caching
  app.use(express.static(distPath, {
    maxAge: '1d', // Cache static assets for 1 day
    etag: false
  }));

  // Use regex for catch-all to avoid Express 5/path-to-regexp issues with '*'
  app.get(/.*/, (req, res) => {
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
