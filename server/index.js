import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import geminiProxy from './gemini-proxy.js';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:5173', 'http://localhost:5174'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// API routes (must come before static file serving)
app.use(geminiProxy);

// Serve static files in production
if (isProduction) {
  const distPath = path.join(__dirname, '../dist');
  
  app.use(express.static(distPath));
  
  // Handle client-side routing - serve index.html for all non-API routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`✅ Quonote server running on port ${PORT}`);
  console.log(`📦 Environment: ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}`);
  if (isProduction) {
    console.log(`🌐 Serving static files from dist/`);
  }
});

export default app;
