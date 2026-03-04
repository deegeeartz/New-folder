# ⚡ Quick Deploy to Spaceship (5 Minutes)

## 🎯 Fastest Method: cPanel File Manager

### Step 1: Prepare Files (Already Done ✅)

Your `npm run build` created the `dist/` folder - you're ready!

### Step 2: Login to Spaceship cPanel

Go to your cPanel URL (check your Spaceship welcome email)

### Step 3: Upload Files

1. **File Manager** → Click on `public_html` folder
2. Click **"Upload"** button
3. **Drag and drop these folders/files:**
   - `dist/` folder
   - `server/` folder
   - `package.json`

4. **Create `.env` file:**
   - Click **"+ File"** button
   - Name: `.env`
   - Right-click → **Edit**
   - Paste this:

```
GEMINI_API_KEY=AIzaSyDeJO7RHplJn8VVe78_jWPdqab2Z7_u5Oo
PORT=3001
ALLOWED_ORIGINS=https://quonote.com,https://www.quonote.com
```

- Save

### Step 4: Start Your App

1. **Search "Terminal"** in cPanel → Open Terminal
2. **Run these 4 commands:**

```bash
cd ~/public_html
npm install --production
npm install -g pm2
pm2 start server/index.js --name quonote && pm2 save
```

### Step 5: Point Your Domain

1. **cPanel** → Search "Node.js" or "Setup Node.js App"
2. **Create Application:**
   - Node version: 20.x
   - App root: `public_html`
   - App URL: `quonote.com`
   - Startup: `server/index.js`
3. Click **"Create"** then **"Start"**

## ✅ Done! Visit https://quonote.com

---

## 🔄 To Update Later

**Option A: Manual (2 minutes)**

1. Build: `npm run build`
2. Upload new `dist/` folder to cPanel (replace old)
3. Terminal: `pm2 restart quonote`

**Option B: Auto-Deploy from GitHub (Setup once, then automatic)**

1. **cPanel** → **Git Version Control** → **Create**
2. Paste repo: `https://github.com/deegeeartz/New-folder`
3. Path: `public_html`
4. Click **"Pull or Deploy"** to update anytime

---

## 🆘 Troubleshooting

**App not running?**

```bash
pm2 logs quonote
pm2 restart quonote
```

**Port already used?**
Change `PORT=3001` to `PORT=3002` in `.env`, then restart

**Domain not working?**

- Enable SSL: cPanel → SSL/TLS Status → Run AutoSSL
- Check domain points to your app in "Setup Node.js App"

---

That's it! 🚀
