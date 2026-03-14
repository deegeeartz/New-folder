const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.join(__dirname, '.env') });
}

// Compression middleware (gzip/brotli for all responses)
let compression;
try { compression = require('compression'); } catch { compression = null; }

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

function isValidEmail(email = '') {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
    const seoPath = `/services/${slug}/`;
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

// Handle service routes BEFORE static middleware to avoid directory redirect responses.
app.get(/^\/services\/([^/?#]+)\/?$/i, (req, res, next) => {
  const slug = req.params[0];
  const seo = serviceSeo[slug];

  if (!seo) {
    return next();
  }

  return sendIndexResponse(req, res);
});

// Serve static files from dist FIRST (before any other routes)
app.use(express.static(distPath, {
  maxAge: '1h',
  redirect: false,
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
  const runtimeApiKey = process.env.GEMINI_API_KEY || '';
  const runtimeKeyFingerprint = runtimeApiKey
    ? crypto.createHash('sha256').update(runtimeApiKey).digest('hex').slice(0, 12)
    : null;

  let envFileKeyFingerprint = null;
  try {
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const envKeyMatch = envContent.match(/^GEMINI_API_KEY=(.*)$/m);
      const envFileKey = envKeyMatch?.[1]?.trim() || '';
      envFileKeyFingerprint = envFileKey
        ? crypto.createHash('sha256').update(envFileKey).digest('hex').slice(0, 12)
        : null;
    }
  } catch {
    envFileKeyFingerprint = null;
  }

  res.json({
    status: 'ok',
    version: 'v3-cjs-key-diagnostics-contact',
    env: {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      isProduction,
      GEMINI_MODEL: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
      hasRuntimeGeminiKey: Boolean(runtimeApiKey),
      runtimeGeminiKeyFingerprint: runtimeKeyFingerprint,
      envFileGeminiKeyFingerprint: envFileKeyFingerprint,
      runtimeMatchesEnvFile: Boolean(runtimeKeyFingerprint && envFileKeyFingerprint && runtimeKeyFingerprint === envFileKeyFingerprint)
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

app.get('/debug-contact', (req, res) => {
  res.json({
    status: 'ok',
    route: '/api/contact',
    method: 'POST',
    contactRouteLoaded: true
  });
});

app.get('/debug-gemini', (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY || '';
  const keyFingerprint = apiKey
    ? crypto.createHash('sha256').update(apiKey).digest('hex').slice(0, 12)
    : null;

  res.json({
    status: 'ok',
    version: 'v3-cjs-gemini-debug',
    env: {
      NODE_ENV: process.env.NODE_ENV,
      isProduction,
      GEMINI_MODEL: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
      hasGeminiApiKey: Boolean(apiKey),
      geminiKeyFingerprint: keyFingerprint
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

app.post('/api/contact', async (req, res) => {
  const { name, email, company, service, message } = req.body || {};

  const errors = {};
  if (!name?.trim()) errors.name = 'Name is required.';
  if (!email?.trim()) {
    errors.email = 'Email is required.';
  } else if (!isValidEmail(email)) {
    errors.email = 'Invalid email address.';
  }
  if (!message?.trim()) errors.message = 'Project brief is required.';
  if (message && message.length > 5000) errors.message = 'Message too long.';

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({ error: 'Validation failed', fields: errors });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.error('[contact] RESEND_API_KEY not configured');
    return res.status(500).json({ error: 'Email service not configured.' });
  }

  const contactToEmail = (process.env.CONTACT_TO_EMAIL || 'info@quonote.com').trim();
  const contactFromEmail = (process.env.CONTACT_FROM_EMAIL || 'Quonote Contact Form <onboarding@resend.dev>').trim();

  const safeName = escapeHtml(name?.trim());
  const safeEmail = escapeHtml(email?.trim());
  const safeCompany = escapeHtml(company?.trim() || '—');
  const safeService = escapeHtml(service || 'General Enquiry');
  const safeMessage = escapeHtml(message?.trim());

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: contactFromEmail,
        to: [contactToEmail],
        reply_to: email.trim(),
        subject: `Quonote enquiry: ${service || 'General Enquiry'} — ${name.trim()}`,
        html: `
          <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;color:#1e293b;">
            <div style="background:#2563eb;padding:24px 32px;border-radius:12px 12px 0 0;">
              <h1 style="color:#ffffff;margin:0;font-size:20px;font-weight:700;">New enquiry from Quonote.com</h1>
            </div>
            <div style="background:#f8fafc;padding:32px;border:1px solid #e2e8f0;border-radius:0 0 12px 12px;">
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:8px 0;font-weight:600;width:130px;color:#64748b;">Name</td><td style="padding:8px 0;">${safeName}</td></tr>
                <tr><td style="padding:8px 0;font-weight:600;color:#64748b;">Email</td><td style="padding:8px 0;">${safeEmail}</td></tr>
                <tr><td style="padding:8px 0;font-weight:600;color:#64748b;">Company</td><td style="padding:8px 0;">${safeCompany}</td></tr>
                <tr><td style="padding:8px 0;font-weight:600;color:#64748b;">Service</td><td style="padding:8px 0;">${safeService}</td></tr>
              </table>
              <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />
              <p style="font-weight:600;color:#64748b;margin:0 0 8px;">Project Brief</p>
              <p style="margin:0;white-space:pre-wrap;line-height:1.7;">${safeMessage}</p>
            </div>
            <p style="text-align:center;color:#94a3b8;font-size:12px;margin-top:16px;">Sent via quonote.com contact form</p>
          </div>
        `,
        text: [
          'New enquiry from Quonote.com',
          '',
          `Name: ${name.trim()}`,
          `Email: ${email.trim()}`,
          `Company: ${company?.trim() || '—'}`,
          `Service: ${service || 'General Enquiry'}`,
          '',
          'Project Brief:',
          message.trim()
        ].join('\n')
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('[contact] Resend error:', JSON.stringify(errorData));
      return res.status(502).json({ error: 'Failed to send email. Please try again.' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('[contact] Unexpected error:', error.message);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// Gemini API proxy route
app.post('/api/gemini', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (prompt.length > 6000) {
      return res.status(400).json({ error: 'Prompt too long (max 6000 chars)' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('API key not configured');
      return res.status(500).json({ error: 'Service temporarily unavailable' });
    }

    const configuredModel = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
    const fallbackModels = [configuredModel, 'gemini-2.0-flash'];
    const models = [...new Set(fallbackModels.filter(Boolean))];

    let lastStatus = 503;
    let lastErrorData = {};

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
      console.error(`Gemini API Error [${response.status}] model=${model} prompt="${prompt.slice(0, 50)}":`, JSON.stringify(errorData, null, 2));
      lastStatus = response.status || 503;
      lastErrorData = errorData;
    }

    return res.status(lastStatus).json({
      error: 'AI service temporarily unavailable',
      details: lastErrorData
    });
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
  console.log(`AI Configuration: Model=${process.env.GEMINI_MODEL || 'gemini-2.5-flash'}`);
});
