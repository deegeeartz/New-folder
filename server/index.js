import express from 'express';
import fs from 'fs';
import { config } from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { onRequest } from 'firebase-functions/v2/https';
import geminiProxy from './gemini-proxy.js';
import contactRouter from './contact.js';

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

// Enable strict CORS but allow Vercel/Firebase/Localhost
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
  : [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://quonote.com',
      'https://www.quonote.com',
      'https://quonote-frontend.vercel.app'
    ];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin matches any allowed domain
    const isAllowed = allowedOrigins.some(allowed => 
      origin === allowed || 
      origin.endsWith('.vercel.app') ||
      origin.endsWith('.web.app') ||
      origin.endsWith('.firebaseapp.com')
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
app.use(contactRouter);

// Basic Health Check
app.get('/', (req, res) => {
  res.send('Quonote API is running.');
});

// Health check endpoint for Docker/monitoring
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Only listen if executed directly (not imported)
const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isDirectRun) {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
}

// Export the Firebase Cloud Function
export const api = onRequest({
  cors: true,
  maxInstances: 10 // Limit concurrency to avoid excessive cold starts/costs under free tier
}, app);

export default app;
