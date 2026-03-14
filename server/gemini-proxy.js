import express from 'express';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Logger utility
const logger = {
  error: (msg) => process.env.NODE_ENV !== 'production' && console.error(msg),
  warn: (msg) => process.env.NODE_ENV !== 'production' && console.warn(msg),
  info: (msg) => process.env.NODE_ENV !== 'production' && console.log(msg)
};

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again shortly.' }
});

router.post('/api/gemini', apiLimiter, async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Server-side validation
    if (prompt.length > 2000) {
      return res.status(400).json({ error: 'Prompt too long (max 2000 chars)' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      logger.error('API key not configured');
      return res.status(500).json({ error: 'Service temporarily unavailable' });
    }

    const configuredModel = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
    const fallbackModels = [configuredModel, 'gemini-2.0-flash'];
    const models = [...new Set(fallbackModels.filter(Boolean))];

    let lastStatus = 503;

    for (const model of models) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            safetySettings: [
              { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
              { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
              { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
              { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
            ]
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        return res.json(data);
      }

      const errorData = await response.json().catch(() => ({}));
      logger.error(`Gemini API Error [${response.status}] model=${model} prompt="${prompt.slice(0, 50)}": ${JSON.stringify(errorData)}`);
      lastStatus = response.status || 503;
    }

    return res.status(lastStatus).json({ 
      error: 'AI service temporarily unavailable'
    });
  } catch (error) {
    logger.error(`Proxy error: ${error.message}`);
    // Don't expose internal error details
    res.status(500).json({ 
      error: 'Internal server error'
    });
  }
});

export default router;
