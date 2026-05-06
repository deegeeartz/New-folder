# Frontend Intern Setup & Git Workflow Guide

This guide explains how to:

1. Clone the project from GitHub
2. Run it locally
3. Push your frontend changes back to GitHub

## 1) Prerequisites

Install these first:

- **Node.js**: v18+ (recommended v20 LTS)
- **npm**: comes with Node.js
- **Git**
- **VS Code** (recommended)
- A GitHub account with access to this repository

## 2) Clone the Project from GitHub

Use your own folder path as needed.

```bash
git clone https://github.com/deegeeartz/New-folder.git
cd New-folder
```

## 3) Install Dependencies

```bash
npm install
```

## 4) Set Up Environment Variables

Create a local `.env` file from the example:

```bash
cp .env.example .env
```

If you are on **Windows PowerShell** and `cp` does not work:

```powershell
Copy-Item .env.example .env
```

For frontend-only work, these are usually enough to start:

- `VITE_API_BASE_URL` (leave empty for local dev unless instructed)

If you need chatbot/contact features locally, ask for values of:

- `GEMINI_API_KEY`
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

## 5) Run the App Locally

```bash
npm run dev
```

Open:

- `http://localhost:5173`

## 6) Create a Branch Before Editing

Never work directly on `main` for feature work.

```bash
git checkout -b feat/short-description
```

Example:

```bash
git checkout -b feat/audience-card-copy-update
```

## 7) Make Your Frontend Changes

Common folders you will use:

- `src/components/`
- `src/Pages/`
- `src/context/`
- `src/data/`
- `src/api/`
- `src/index.css` / `src/App.css`

## 8) Validate Before Commit

Run lint:

```bash
npm run lint
```

Run build to catch production issues:

```bash
npm run build
```

## 9) Commit Your Changes

Check what changed:

```bash
git status
git diff
```

Stage and commit:

```bash
git add .
git commit -m "feat: short clear description of your change"
```

Commit message style:

- `feat:` new feature
- `fix:` bug fix
- `refactor:` code cleanup without behavior change
- `docs:` documentation updates

## 10) Push to GitHub

First push for the branch:

```bash
git push -u origin feat/short-description
```

Later pushes on same branch:

```bash
git push
```

## 11) Open a Pull Request (PR)

On GitHub:

1. Open the repository
2. Click **Compare & pull request** for your branch
3. Set base branch to `main`
4. Add:
   - What changed
   - Why it changed
   - Screenshots (before/after) for UI work
   - How you tested (`npm run lint`, `npm run build`, local paths tested)

## 12) Keep Your Branch Updated

If `main` changed while you were working:

```bash
git checkout main
git pull
git checkout feat/short-description
git merge main
```

Resolve conflicts (if any), then:

```bash
git add .
git commit -m "chore: resolve merge conflicts"
git push
```

## 13) Troubleshooting

### Port already in use

Stop other dev servers, then run:

```bash
npm run dev
```

### `node_modules` issues / weird dependency errors

```bash
rm -rf node_modules package-lock.json
npm install
```

Windows PowerShell alternative:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

### Build works locally but breaks in deploy

Always run:

```bash
npm run build
```

before pushing and include the build result in your PR notes.

---

If you’re unsure about branch naming, commit messages, or whether to commit a file, ask before pushing.
