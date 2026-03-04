# 🐳 Docker Deployment Guide for Spaceship Hosting

## Overview

This guide will help you deploy the Quonote Digital application using Docker on Spaceship hosting platform.

## Prerequisites

- Docker installed on your local machine (for testing)
- Spaceship hosting account with Docker support
- Your Gemini API key
- Domain configured with Spaceship

---

## Part 1: Local Testing (Optional but Recommended)

### 1. Install Docker

Download and install Docker Desktop:

- **Windows**: https://docs.docker.com/desktop/install/windows-install/
- **Mac**: https://docs.docker.com/desktop/install/mac-install/
- **Linux**: https://docs.docker.com/engine/install/

### 2. Create Environment File

Create a `.env` file in your project root:

```env
GEMINI_API_KEY=your_actual_api_key_here
PORT=3001
NODE_ENV=production
ALLOWED_ORIGINS=http://localhost:3001,https://yourdomain.com
```

### 3. Build and Run Locally

```powershell
# Build the Docker image
docker build -t quonote-digital .

# Run the container
docker run -p 3001:3001 --env-file .env quonote-digital

# Or use docker-compose (easier)
docker-compose up -d
```

### 4. Test Locally

Open your browser and visit:

- Frontend: http://localhost:3001
- Health Check: http://localhost:3001/health

### 5. Stop Container

```powershell
# If using docker run
docker ps
docker stop <container_id>

# If using docker-compose
docker-compose down
```

---

## Part 2: Deploying to Spaceship Hosting

### Option A: Docker Support Available

If Spaceship supports Docker directly:

#### 1. Check Docker Availability

Contact Spaceship support and ask:

- "Does my plan support Docker containers?"
- "What is the process to deploy Docker containers?"
- "Do you support docker-compose or Dockerfile deployments?"

#### 2. Upload Files

Upload these files to your Spaceship account:

- `Dockerfile`
- `docker-compose.yml`
- `.dockerignore`
- All source files (or push to Git repo)
- `.env` (with production values)

#### 3. Build on Server

SSH into your Spaceship server:

```bash
cd /path/to/your/app
docker-compose up -d --build
```

#### 4. Configure Reverse Proxy

Set up Nginx or Apache to proxy requests:

**Nginx Configuration:**

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

### Option B: No Docker Support (Alternative Solutions)

If Spaceship doesn't support Docker:

#### Solution 1: Use Docker Registry + Pull

1. Build image locally
2. Push to Docker Hub
3. Have Spaceship pull and run it

```powershell
# Build and tag image
docker build -t your-dockerhub-username/quonote-digital:latest .

# Login to Docker Hub
docker login

# Push to Docker Hub
docker push your-dockerhub-username/quonote-digital:latest
```

On Spaceship server:

```bash
docker pull your-dockerhub-username/quonote-digital:latest
docker run -d -p 3001:3001 --env-file .env your-dockerhub-username/quonote-digital:latest
```

#### Solution 2: Traditional Node.js Deployment

If Docker is not available at all, use the traditional method:

- Build locally: `npm run build`
- Upload `dist/`, `server/`, `package.json`, `.env`
- Install dependencies on server: `npm install --production`
- Start server: `npm start`

---

## Part 3: Environment Variables on Spaceship

### Set Environment Variables

Depending on Spaceship's control panel, you can set environment variables:

1. **Via cPanel/Control Panel:**
   - Look for "Environment Variables" section
   - Add: `GEMINI_API_KEY`, `NODE_ENV`, `ALLOWED_ORIGINS`

2. **Via SSH:**

   ```bash
   echo "GEMINI_API_KEY=your_key" >> .env
   echo "NODE_ENV=production" >> .env
   echo "ALLOWED_ORIGINS=https://yourdomain.com" >> .env
   ```

3. **Via docker-compose:**
   Already configured in `docker-compose.yml`

---

## Part 4: SSL/HTTPS Setup

### Enable HTTPS (Recommended)

1. **Using Spaceship's Control Panel:**
   - Enable AutoSSL or Let's Encrypt
   - Follow their SSL setup wizard

2. **Update CORS Origins:**

   ```env
   ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   ```

3. **Force HTTPS (Nginx):**

   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       return 301 https://$server_name$request_uri;
   }

   server {
       listen 443 ssl http2;
       server_name yourdomain.com;

       ssl_certificate /path/to/cert.pem;
       ssl_certificate_key /path/to/key.pem;

       location / {
           proxy_pass http://localhost:3001;
           # ... other proxy settings
       }
   }
   ```

---

## Part 5: Monitoring & Maintenance

### View Container Logs

```bash
# Using docker-compose
docker-compose logs -f

# Using docker
docker logs -f quonote-digital
```

### Restart Container

```bash
docker-compose restart

# Or
docker restart quonote-digital
```

### Update Application

```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose up -d --build
```

### Check Health

```bash
curl http://localhost:3001/health
```

Expected response:

```json
{ "status": "healthy", "timestamp": "2026-03-04T..." }
```

---

## Part 6: Troubleshooting

### Container Won't Start

```bash
# Check logs
docker-compose logs

# Check if port is in use
netstat -tulpn | grep 3001

# Check environment variables
docker-compose exec quonote-app printenv
```

### API Errors

- Verify `GEMINI_API_KEY` is set correctly
- Check API key has sufficient quota
- Review logs for specific error messages

### CORS Errors

- Ensure `ALLOWED_ORIGINS` includes your domain
- Check that domain matches exactly (with/without www)
- Verify frontend is making requests to correct URL

### 502 Bad Gateway

- Container may not be running
- Port mapping may be incorrect
- Check health endpoint: `http://localhost:3001/health`

---

## Part 7: Performance Optimization

### Enable Compression

Add to Nginx config:

```nginx
gzip on;
gzip_vary on;
gzip_proxied any;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
```

### Add Caching Headers

```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

---

## Quick Reference Commands

```powershell
# Build image
docker build -t quonote-digital .

# Run container
docker-compose up -d

# Stop container
docker-compose down

# View logs
docker-compose logs -f

# Restart
docker-compose restart

# Rebuild after changes
docker-compose up -d --build

# Access container shell
docker-compose exec quonote-app sh

# Check status
docker-compose ps
```

---

## Support

If you encounter issues:

1. Check container logs: `docker-compose logs`
2. Verify environment variables: `docker-compose exec quonote-app printenv`
3. Test health endpoint: `curl http://localhost:3001/health`
4. Contact Spaceship support for hosting-specific issues

---

## Security Checklist

- [ ] `.env` file is not committed to Git
- [ ] HTTPS is enabled
- [ ] `GEMINI_API_KEY` is kept secret
- [ ] `ALLOWED_ORIGINS` is properly configured
- [ ] Container runs as non-root user (already configured)
- [ ] Health checks are working
- [ ] Logs are monitored
- [ ] Rate limiting is active (10 requests/15 min)

---

## Next Steps

1. Test locally with Docker
2. Contact Spaceship about Docker support
3. Choose deployment method based on their capabilities
4. Deploy and test in production
5. Set up monitoring and backups
6. Configure SSL certificate

Good luck with your deployment! 🚀
