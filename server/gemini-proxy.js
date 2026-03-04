import express from 'express';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Logger utility
const logger = {
  error: (msg) => process.env.NODE_ENV !== 'production' && console.error(msg),
  warn: (msg) => process.env.NODE_ENV !== 'production' && console.warn(msg),
  info: (msg) => process.env.NODE_ENV !== 'production' && console.log(msg)
};

// Rate limiter: 10 requests per 15 minutes per IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many requests, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/api/gemini', apiLimiter, async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Server-side validation
    if (prompt.length > 1000) {
      return res.status(400).json({ error: 'Prompt too long' });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      logger.error('API key not configured');
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
      logger.error(`Gemini API error: ${response.status}`);
      // Don't expose API error details to client
      return res.status(503).json({ 
        error: 'AI service temporarily unavailable'
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    logger.error(`Proxy error: ${error.message}`);
    // Don't expose internal error details
    res.status(500).json({ 
      error: 'Internal server error'
    });
  }
});

export default router;
