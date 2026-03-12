const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Compression middleware (gzip/brotli for all responses)
let compression;
try { compression = require('compression'); } catch (e) { compression = null; }

const app = express();
const PORT = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV !== 'development';
const distPath = path.join(__dirname, 'dist');
const siteUrl = 'https://quonote.com';

const serviceSeo = {
  'ai-consulting': {
    title: 'AI Consulting & Automation | Quonote',
    description:
      'Design practical AI systems and automation workflows that save time, improve response quality, and reduce manual bottlenecks.',
  },
  'software-development': {
    title: 'Custom Software Development | Quonote',
    description:
      'Build tailored internal tools, client platforms, and digital products aligned to your actual business workflows.',
  },
  automation: {
    title: 'Business Process Automation | Quonote',
    description:
      'Connect tools, streamline approvals, and reduce delays across the processes that keep your business moving.',
  },
  'hardware-procurement': {
    title: 'Hardware Procurement & Infrastructure | Quonote',
    description:
      'Source the right devices and supporting setup for teams that need reliable tools, clear guidance, and ongoing support.',
  },
};

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderIndexWithSeo(indexHtml, seo, pathname) {
  const title = escapeHtml(seo.title || 'Quonote | AI Consulting, Custom Software & Business Automation');
  const description = escapeHtml(
    seo.description ||
      'Quonote delivers AI consulting, custom software development, business automation, and infrastructure solutions for startups, SMEs, and scaling companies.'
  );
  const canonical = `${siteUrl}${pathname}`;

  let html = indexHtml;

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  html = html.replace(
    /<meta name="description"\s*content="[\s\S]*?"\s*\/>/i,
    `<meta name="description" content="${description}" />`
  );
  html = html.replace(
    /<link rel="canonical" href="[\s\S]*?"\s*\/>/i,
    `<link rel="canonical" href="${canonical}" />`
  );
  html = html.replace(
    /<meta property="og:url" content="[\s\S]*?"\s*\/>/i,
    `<meta property="og:url" content="${canonical}" />`
  );
  html = html.replace(
    /<meta property="og:title" content="[\s\S]*?"\s*\/>/i,
    `<meta property="og:title" content="${title}" />`
  );
  html = html.replace(
    /<meta property="og:description"\s*content="[\s\S]*?"\s*\/>/i,
    `<meta property="og:description" content="${description}" />`
  );
  html = html.replace(
    /<meta name="twitter:title" content="[\s\S]*?"\s*\/>/i,
    `<meta name="twitter:title" content="${title}" />`
  );
  html = html.replace(
    /<meta name="twitter:description"\s*content="[\s\S]*?"\s*\/>/i,
    `<meta name="twitter:description" content="${description}" />`
  );

  const faqScriptRegex = /<script type="application\/ld\+json">\s*\{[\s\S]*?"@type":\s*"FAQPage"[\s\S]*?<\/script>/i;
  html = html.replace(faqScriptRegex, '');

  const serviceSchema = `<script type="application/ld+json">${JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: seo.title?.replace(' | Quonote', '') || 'Quonote Service',
      description: seo.description,
      provider: {
        '@type': 'Organization',
        name: 'Quonote',
        url: siteUrl,
        email: 'info@quonote.com',
      },
      url: canonical,
      areaServed: 'Global',
    },
    null,
    2
  )}</script>`;

  html = html.replace('</head>', `${serviceSchema}\n  </head>`);

  return html;
}

function sendIndexResponse(req, res) {
  const indexPath = path.join(distPath, 'index.html');
  if (!fs.existsSync(indexPath)) {
    return res.status(404).json({ error: 'App not built. Run npm run build first.' });
  }

  const rawHtml = fs.readFileSync(indexPath, 'utf8');
  const requestPath = (req.originalUrl || req.url || req.path || '/').split('?')[0];
  const slugMatch = requestPath.match(/^\/services\/([^/?#]+)\/?$/i);
  const slug = slugMatch ? slugMatch[1] : null;
  const seo = slug ? serviceSeo[slug] : null;

  if (seo) {
    const seoPath = `/services/${slug}`;
    const seoHtml = renderIndexWithSeo(rawHtml, seo, seoPath);
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.setHeader('X-Quonote-SEO', `service:${slug}`);
    res.setHeader('X-Quonote-Path', requestPath);
    return res.status(200).send(seoHtml);
  }

  res.setHeader('X-Quonote-SEO', 'default');
  res.setHeader('X-Quonote-Path', requestPath);
  return res.sendFile(indexPath);
}

if (compression) app.use(compression());
app.use(express.json());

// Serve static files from dist FIRST (before any other routes)
app.use(express.static(distPath, {
  maxAge: '1h',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.set('Content-Type', 'application/javascript');
    } else if (filePath.endsWith('.css')) {
      res.set('Content-Type', 'text/css');
    }
    // Hashed assets (e.g. index-AbCdEf.js) — cache 1 year immutable
    if (/assets\/[^/]+-[A-Za-z0-9]{8}\.(js|css)$/.test(filePath)) {
      res.set('Cache-Control', 'public, max-age=31536000, immutable');
    }
    // Logo images — cache 7 days (not versioned by filename)
    if (filePath.endsWith('logo2.webp') || filePath.endsWith('logo2.png')) {
      res.set('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
    }
  }
}));

// Debug routes
app.get('/debug-deployment', (req, res) => {
  const distPath = path.join(__dirname, 'dist');
  res.json({
    status: 'ok',
    version: 'v3-cjs',
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
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://quonote.com',
  'https://www.quonote.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    const isAllowed = allowedOrigins.some(allowed => 
      origin === allowed || origin.endsWith('.vercel.app')
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

// Gemini API proxy route
app.post('/api/gemini', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (prompt.length > 1000) {
      return res.status(400).json({ error: 'Prompt too long' });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error('API key not configured');
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
      console.error(`Gemini API error: ${response.status}`);
      return res.status(503).json({ 
        error: 'AI service temporarily unavailable'
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(`Proxy error: ${error.message}`);
    res.status(500).json({ 
      error: 'Internal server error'
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/services/:slug', (req, res, next) => {
  const { slug } = req.params;
  const seo = serviceSeo[slug];

  if (!seo) {
    return next();
  }

  return sendIndexResponse(req, res);
});

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req, res) => {
  return sendIndexResponse(req, res);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`Serving static files from: ${distPath}`);
});
