# GitHub Auto-Deploy Setup for Spaceship Hosting

This guide shows you how to automatically deploy your app to Spaceship whenever you push to GitHub.

## Method 1: GitHub Actions + SSH (Recommended)

### Step 1: Set Up SSH Access to Spaceship

1. **Generate SSH key on your local machine:**

```bash
ssh-keygen -t ed25519 -C "your_email@example.com" -f ~/.ssh/spaceship_deploy
```

2. **Copy the public key:**

```bash
cat ~/.ssh/spaceship_deploy.pub
```

3. **Add to Spaceship:**
   - Login to Spaceship cPanel
   - Go to **SSH Access** → **Manage SSH Keys**
   - Click **Import Key** → Paste your public key
   - Authorize the key

4. **Test SSH connection:**

```bash
ssh -i ~/.ssh/spaceship_deploy username@your-spaceship-server.com
```

### Step 2: Add SSH Key to GitHub Secrets

1. **Copy your private key:**

```bash
cat ~/.ssh/spaceship_deploy
```

2. **In GitHub repository:**
   - Go to **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Add these secrets:
     - `SSH_PRIVATE_KEY`: Your private key content
     - `SSH_HOST`: Your Spaceship server hostname (e.g., `server123.spaceship.com`)
     - `SSH_USERNAME`: Your cPanel username
     - `SSH_PORT`: Usually `22` (check with Spaceship support)
     - `DEPLOY_PATH`: Path to your app (e.g., `/home/username/quonote-app`)
     - `GEMINI_API_KEY`: Your Gemini API key

### Step 3: Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml` in your repository:

```yaml
name: Deploy to Spaceship

on:
  push:
    branches:
      - main # Deploy when pushing to main branch

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build frontend
        run: npm run build

      - name: Configure SSH
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.SSH_PRIVATE_KEY }}" > ~/.ssh/deploy_key
          chmod 600 ~/.ssh/deploy_key
          ssh-keyscan -H ${{ secrets.SSH_HOST }} >> ~/.ssh/known_hosts

      - name: Deploy to Spaceship
        env:
          SSH_HOST: ${{ secrets.SSH_HOST }}
          SSH_USERNAME: ${{ secrets.SSH_USERNAME }}
          SSH_PORT: ${{ secrets.SSH_PORT }}
          DEPLOY_PATH: ${{ secrets.DEPLOY_PATH }}
        run: |
          # Create deployment package
          tar -czf deploy.tar.gz dist/ server/ package.json Dockerfile docker-compose.yml .dockerignore

          # Upload to server
          scp -i ~/.ssh/deploy_key -P $SSH_PORT deploy.tar.gz $SSH_USERNAME@$SSH_HOST:$DEPLOY_PATH/

          # Extract and restart on server
          ssh -i ~/.ssh/deploy_key -p $SSH_PORT $SSH_USERNAME@$SSH_HOST << 'EOF'
            cd ${{ secrets.DEPLOY_PATH }}
            tar -xzf deploy.tar.gz
            rm deploy.tar.gz
            
            # Update .env file
            echo "GEMINI_API_KEY=${{ secrets.GEMINI_API_KEY }}" > .env
            echo "PORT=3001" >> .env
            echo "NODE_ENV=production" >> .env
            echo "ALLOWED_ORIGINS=https://yourdomain.com" >> .env
            
            # Check if Docker is available
            if command -v docker &> /dev/null; then
              echo "Deploying with Docker..."
              docker-compose down
              docker-compose up -d --build
            else
              echo "Deploying with PM2..."
              npm install --production
              pm2 restart quonote || pm2 start server/index.js --name quonote
              pm2 save
            fi
          EOF

      - name: Verify deployment
        run: |
          echo "✅ Deployment completed!"
          echo "🌐 Check your app at: https://yourdomain.com"
```

### Step 4: Push and Test

```bash
git add .
git commit -m "Add auto-deploy workflow"
git push origin main
```

Go to **Actions** tab in your GitHub repo to watch the deployment!

---

## Method 2: Git Webhook + Spaceship Script (Simpler)

### Step 1: Create Deploy Script on Spaceship

SSH into your Spaceship server and create `~/quonote-app/deploy.sh`:

```bash
#!/bin/bash
cd ~/quonote-app

echo "🔄 Pulling latest changes from GitHub..."
git pull origin main

echo "📦 Installing dependencies..."
npm install --production

echo "🏗️  Building frontend..."
npm run build

echo "🔄 Restarting application..."
if command -v docker &> /dev/null; then
  docker-compose down
  docker-compose up -d --build
else
  pm2 restart quonote || pm2 start server/index.js --name quonote
  pm2 save
fi

echo "✅ Deployment complete!"
```

Make it executable:

```bash
chmod +x ~/quonote-app/deploy.sh
```

### Step 2: Clone Your Repo on Spaceship

```bash
cd ~
git clone https://github.com/yourusername/yourrepo.git quonote-app
cd quonote-app
```

### Step 3: Set Up GitHub Personal Access Token

1. **GitHub** → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Generate new token with `repo` scope
3. **On Spaceship server**, configure Git to use token:

```bash
git config --global credential.helper store
echo "https://YOUR_GITHUB_USERNAME:YOUR_TOKEN@github.com" > ~/.git-credentials
```

### Step 4: Create Webhook Endpoint (Optional)

Create `~/quonote-app/webhook.js`:

```javascript
const express = require("express");
const { exec } = require("child_process");
const crypto = require("crypto");

const app = express();
app.use(express.json());

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "your-secret-here";

app.post("/webhook/deploy", (req, res) => {
  // Verify GitHub signature
  const signature = req.headers["x-hub-signature-256"];
  const hash = `sha256=${crypto.createHmac("sha256", WEBHOOK_SECRET).update(JSON.stringify(req.body)).digest("hex")}`;

  if (signature !== hash) {
    return res.status(401).send("Invalid signature");
  }

  console.log("📥 Webhook received, starting deployment...");

  exec("bash ~/quonote-app/deploy.sh", (error, stdout, stderr) => {
    if (error) {
      console.error("❌ Deployment failed:", error);
      return res.status(500).send("Deployment failed");
    }
    console.log(stdout);
    res.send("✅ Deployment started");
  });
});

app.listen(3002, () => {
  console.log("🎣 Webhook listener running on port 3002");
});
```

Run it with PM2:

```bash
pm2 start webhook.js --name webhook
pm2 save
```

### Step 5: Configure GitHub Webhook

1. **GitHub repo** → **Settings** → **Webhooks** → **Add webhook**
2. **Payload URL**: `https://yourdomain.com:3002/webhook/deploy`
3. **Content type**: `application/json`
4. **Secret**: Same as `WEBHOOK_SECRET` above
5. **Events**: Just the `push` event
6. Click **Add webhook**

---

## Method 3: Manual Pull (Simplest)

Just SSH in and pull whenever you want:

```bash
ssh username@spaceship-server.com
cd ~/quonote-app
git pull origin main
npm install --production
npm run build
pm2 restart quonote  # or docker-compose restart
```

You can create a bash alias to make it one command:

```bash
echo "alias deploy='cd ~/quonote-app && git pull && npm install --production && npm run build && pm2 restart quonote'" >> ~/.bashrc
source ~/.bashrc
```

Then just run: `deploy`

---

## Recommended Setup

**For beginners**: Use Method 1 (GitHub Actions) - most reliable and doesn't require webhook setup on shared hosting.

**For advanced users**: Use Method 2 if you want instant deployments on every push.

**For occasional updates**: Use Method 3 - simplest, just pull manually.

## Important Notes

⚠️ **Never commit your `.env` file to GitHub!** Add it to `.gitignore`:

```
.env
.env.local
.env.production
```

✅ **Update your `.env` manually on the server** or use GitHub Secrets (Method 1).

✅ **Test SSH access** before setting up automation.

✅ **Keep your GitHub token/SSH keys secure** - never share them or commit them.

## Troubleshooting

**SSH connection refused**: Check port (usually 22), verify key is authorized in cPanel.

**Permission denied**: Ensure `deploy.sh` is executable (`chmod +x`).

**Git pull fails**: Make sure you've configured credentials or SSH key for Git.

**PM2 not found**: Install globally: `npm install -g pm2`

**Docker not available**: Spaceship shared hosting may not have Docker - use PM2 method.

## Next Steps

1. Choose your deployment method
2. Set up GitHub repository secrets/keys
3. Push to GitHub and watch it deploy automatically!
4. Check logs: `pm2 logs quonote` or `docker-compose logs -f`
