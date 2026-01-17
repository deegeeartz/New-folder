import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import geminiProxy from './gemini-proxy.js';

config();

const app = express();
const PORT = process.env.PORT || 3001;

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

app.use(geminiProxy);

app.listen(PORT, () => {
  console.log(`✅ Proxy server running on http://localhost:${PORT}`);
});

