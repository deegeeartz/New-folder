# 🚀 Deploying to Spaceship cPanel (Node.js)

Since your hosting has cPanel, you can use the **"Setup Node.js App"** feature (if available on your plan) to host the full application (Frontend + Backend).

## ✅ Phase 1: Prepare Your Files

1.  **Build the Frontend**:
    Run this command in your local terminal:
    ```bash
    npm run build
    ```
    *(This creates the `dist` folder with your website files)*

2.  **Zip Your Project**:
    Select these files/folders and zip them into `project.zip`:
    *   `dist/` (The folder)
    *   `server/` (The folder)
    *   `server.js` (The file)
    *   `package.json`
    *   `.env.production`

    > ❌ **Do NOT zip** `node_modules`!

## 🚀 Phase 2: Configure cPanel

1.  **Log in to cPanel** on Spaceship.
2.  Find **"Setup Node.js App"** (under Software section).
3.  Click **"Create Application"**.
4.  **Fill in the settings**:
    *   **Node.js Version**: Choose **18.x** or **20.x** (whatever is recommended/latest).
    *   **Application Mode**: `Production`.
    *   **Application Root**: `quonote_app` (Just a folder name for your files).
    *   **Application URL**: Select your domain (e.g., `quonote.com` or `dev.quonote.com`).
    *   **Application Startup File**: `server.js`
5.  Click **Create**.

## 📤 Phase 3: Upload Files

1.  In cPanel, open **File Manager**.
2.  Go to the folder you just created (e.g., `quonote_app`).
3.  **Upload** your `project.zip` file.
4.  **Extract** it inside this folder.
    *   *Note: If you see a warning about "backslashes as path separators", you can ignore it. This is normal when uploading from Windows to Linux.*
5.  **Important**: Rename `.env.production` to `.env`.
    *   *(If you can't see .env files, click "Settings" in top-right of File Manager and check "Show Hidden Files")*.

## 📦 Phase 4: Install Dependencies

1.  Go back to **"Setup Node.js App"** in cPanel.
2.  Click the **Pencil Icon** (Edit) on your app.
3.  Click the **"Run NPM Install"** button.
    *   *(This installs Express, React libraries, etc. on the server)*.

## 🔄 Phase 5: Start & Verify

1.  Click **"Restart"** button in the Node.js Setup page.
2.  Visit your website URL!

---

## ⚠️ Troubleshooting

**"I don't see Setup Node.js App"**
If your cPanel is missing this icon, your plan might be "Shared Hosting" without Node.js support.
*   **Solution**: Use **Option 2** from `DEPLOYMENT.md` (deploy `dist` folder to correct `public_html` folder manually, and host Backend on Render.com).

**"Images/CSS are missing (404 Errors)"**
*   Check your `server/index.js` file on the server. Ensure it points to the correct `dist` folder path.
*   In cPanel File Manager, ensure the `dist` folder is strictly inside your application root.

**"500 Internal Server Error"**
*   Check the **Node.js logs** in cPanel.
*   Ensure your `.env` file exists and has the correct `VITE_GEMINI_API_KEY`.
