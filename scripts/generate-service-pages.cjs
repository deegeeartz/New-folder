const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const rootIndexPath = path.join(distDir, 'index.html');

const services = {
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

function renderServiceHtml(indexHtml, slug, seo) {
  const title = escapeHtml(seo.title);
  const description = escapeHtml(seo.description);
  const canonical = `https://quonote.com/services/${slug}`;

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
      name: seo.title.replace(' | Quonote', ''),
      description: seo.description,
      provider: {
        '@type': 'Organization',
        name: 'Quonote',
        url: 'https://quonote.com/',
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

function run() {
  if (!fs.existsSync(rootIndexPath)) {
    console.error('dist/index.html not found. Run the Vite build first.');
    process.exit(1);
  }

  const rootHtml = fs.readFileSync(rootIndexPath, 'utf8');

  for (const [slug, seo] of Object.entries(services)) {
    const serviceDir = path.join(distDir, 'services', slug);
    fs.mkdirSync(serviceDir, { recursive: true });
    const outputPath = path.join(serviceDir, 'index.html');
    const html = renderServiceHtml(rootHtml, slug, seo);
    fs.writeFileSync(outputPath, html, 'utf8');
  }

  console.log(`Generated ${Object.keys(services).length} static service pages in dist/services/*`);
}

run();