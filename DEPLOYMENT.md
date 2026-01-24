# 🚀 Quonote Website - Production Deployment Guide

## Prerequisites
- Node.js 18+ installed on your server
- Your Gemini API key
- Domain name configured

---

## Deployment Options

### Option 1: Full Node.js Hosting (Recommended)

**Best for:** Spaceship Web Hosting with Node.js support or VPS

#### Step 1: Prepare Environment Variables
1. Copy `.env.production` to `.env` on your server
2. Update with your production values:
   ```bash
   VITE_GEMINI_API_KEY=your_actual_api_key
   ALLOWED_ORIGINS=https://yourdomain.com
   PORT=3001
   ```

#### Step 2: Build the Frontend
```bash
npm run build
```
This creates an optimized `dist/` folder with your static files.

#### Step 3: Deploy to Server
Upload these files to your server:
- `dist/` folder (built frontend)
- `server/` folder (backend)
- `package.json`
- `package-lock.json`
- `.env` (with production values)

#### Step 4: Install Dependencies on Server
```bash
npm install --production
```

#### Step 5: Start the Production Server
```bash
# Option A: Direct start
npm run dev:server

# Option B: Using PM2 (recommended for auto-restart)
npm install -g pm2
pm2 start server/index.js --name quonote-backend
pm2 save
pm2 startup
```

#### Step 6: Configure Web Server (Nginx/Apache)
You'll need to:
1. Serve `dist/` folder as static files
2. Proxy `/api/*` requests to `http://localhost:3001`

**Nginx Example:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    # Serve static frontend files
    root /path/to/dist;
    index index.html;
    
    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Proxy API requests to Node.js backend
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

### Option 2: Static Hosting + Separate Backend

**Best for:** Basic static hosting only

#### Frontend Deployment (Static Files)
1. Build the project:
   ```bash
   npm run build
   ```

2. Upload the entire `dist/` folder to your web hosting

3. Configure your hosting to:
   - Serve `index.html` for all routes (SPA support)
   - Enable HTTPS

#### Backend Deployment (Separate Service)
Deploy the backend to a Node.js hosting service:
- **Render.com** (Free tier available)
- **Railway.app** (Free tier available)
- **Vercel** (Serverless functions)
- **Heroku** (Paid)

**Then update your frontend to point to the backend URL.**

---

### Option 3: Serverless Deployment (No separate backend)

Deploy both frontend and backend as serverless functions:

**Recommended Platforms:**
- **Vercel** (easiest for Vite + API routes)
- **Netlify** (with Netlify Functions)

---

## Important Configuration Updates

### Update Backend for Production

Edit `server/index.js` to serve static files if using Option 1:

```javascript
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

app.use(express.json());

// CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:5173'];

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

// API routes
app.use(geminiProxy);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(\`✅ Server running on port \${PORT}\`);
});
```

---

## Security Checklist

- [ ] `.env` file is NOT committed to git (already done ✓)
- [ ] API keys are stored securely
- [ ] CORS is configured with your actual domain
- [ ] HTTPS is enabled on your domain
- [ ] Rate limiting is considered for API routes

---

## Testing Production Build Locally

Before deploying, test locally:

```bash
# Build the frontend
npm run build

# Preview the production build
npm run preview

# In another terminal, start the backend
npm run dev:server
```

---

## Troubleshooting

### API Calls Failing
- Check `ALLOWED_ORIGINS` includes your production domain
- Verify Gemini API key is valid
- Check browser console for CORS errors

### Routes Not Working (404)
- Ensure your hosting supports SPA routing
- Add redirect rules or configure fallback to `index.html`

### Environment Variables Not Loading
- Verify `.env` file is in the correct location
- Restart your Node.js server after changes

---

## Quick Deploy Commands

```bash
# 1. Build for production
npm run build

# 2. Test production build locally
npm run preview

# 3. Deploy backend to server
# (Upload files via FTP/SSH and run)
npm install --production
npm run dev:server
```

---

## Need Help?
Contact your hosting provider to confirm:
1. Do they support Node.js applications?
2. What version of Node.js is available?
3. Can you run background processes (for the Express server)?
4. Do they provide SSL certificates?
