import express from 'express';

const router = express.Router();

// Logger utility
const logger = {
  error: (msg) => process.env.NODE_ENV !== 'production' && console.error(msg),
  warn: (msg) => process.env.NODE_ENV !== 'production' && console.warn(msg),
  info: (msg) => process.env.NODE_ENV !== 'production' && console.log(msg)
};

// TODO: Add rate limiter back once npm install works on server
// import rateLimit from 'express-rate-limit';
// const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });

router.post('/api/gemini', async (req, res) => {
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

    const model = 'gemini-2.5-flash';
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      logger.error(`Gemini API Error [${response.status}]: ${JSON.stringify(errorData)}`);
      return res.status(response.status || 503).json({ 
        error: 'AI service temporarily unavailable',
        details: process.env.NODE_ENV === 'production' ? undefined : errorData
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
