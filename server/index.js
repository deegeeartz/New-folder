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

// Debug route to check assets folder
app.get('/debug-assets', (req, res) => {
  const distPath = path.join(__dirname, '../dist');
  const assetsPath = path.join(distPath, 'assets');
  res.json({
    assetsPath,
    assetsExists: fs.existsSync(assetsPath),
    assetsContents: fs.existsSync(assetsPath) ? fs.readdirSync(assetsPath) : []
  });
});

// Enable strict CORS but allow Vercel/Localhost
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://quonote.com',
  'https://www.quonote.com',
  'https://quonote-frontend.vercel.app', // Generic Vercel stub (user will need to update this if different)
  process.env.VITE_VERCEL_URL // dynamic Vercel URL
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin matches any allowed domain
    const isAllowed = allowedOrigins.some(allowed => 
      origin === allowed || origin.endsWith('.vercel.app') // Allow all vercel preview deployments
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

// API routes
app.use(geminiProxy);

// Debug route to diagnose deployment issues
app.get('/debug-deployment', (req, res) => {
  res.json({
    status: 'ok',
    mode: 'API-ONLY',
    timestamp: new Date().toISOString(),
    env: {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
    },
    paths: {
      cwd: process.cwd(),
      __dirname
    }
  });
});

// Basic Health Check
app.get('/', (req, res) => {
  res.send('Quonote API is running.');
});

// Only listen if executed directly (not imported)
if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
}

export default app;
