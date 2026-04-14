# Quonote Deployment Runbook (cPanel + Passenger)

This runbook explains how to deploy, verify, and troubleshoot `quonote.com`.

## Stack and entrypoints

- Hosting: cPanel Node.js App Manager (Passenger behind LiteSpeed)
- App root: `repositories/quonote-app`
- Startup file: `server.cjs`
- Health endpoint: `/health`

## Required cPanel settings

In **Node.js App Manager**:

- Application root: `repositories/quonote-app`
- Application startup file: `server.cjs`
- Node version: `20.x`
- App mode: `production`

Environment variables:

- `GEMINI_API_KEY`
- `ALLOWED_ORIGINS` (example: `https://quonote.com,https://www.quonote.com`)
- `PORT` (set to `3001`)

## Passenger config file

The file `/.htaccess` in app root should be:

```apache
# DO NOT REMOVE. CLOUDLINUX PASSENGER CONFIGURATION BEGIN
PassengerAppRoot "/home/olgmxestep/repositories/quonote-app"
PassengerBaseURI "/"
PassengerAppType node
PassengerStartupFile server.cjs
# DO NOT REMOVE. CLOUDLINUX PASSENGER CONFIGURATION END
```

## SSH access

```bash
ssh olgmxestep@66.29.148.146 -p 21098
```

> **Note:** Port 21098 is the correct cPanel SSH port. If it times out, your current network is blocking it — switch to a mobile hotspot or use cPanel's browser Terminal (cPanel → Terminal).

## Standard deployment flow

1. Push changes to GitHub from local machine.
2. SSH to server:

```bash
cd /home/olgmxestep/repositories/quonote-app
git pull
```

3. Activate Node virtual environment (required for `node`/`npm` commands):

```bash
source /home/olgmxestep/nodevenv/repositories/quonote-app/20/bin/activate
which node
which npm
```

4. Install dependencies:

```bash
npm install
```

5. Restart app:

```bash
touch /home/olgmxestep/repositories/quonote-app/tmp/restart.txt
sleep 6
```

6. Validate:

```bash
curl -i https://quonote.com/health
curl -i https://www.quonote.com/health
```

Expect `HTTP/2 200` and JSON body with `{"status":"healthy"...}`.

## Fast troubleshooting guide

### 1) `npm: command not found`

Cause: shell is not inside the cPanel nodevenv.

Fix:

```bash
source /home/olgmxestep/nodevenv/repositories/quonote-app/20/bin/activate
which npm
```

### 2) `Cannot find package 'express-rate-limit'`

Cause: dependencies not installed in app environment.

Fix:

```bash
source /home/olgmxestep/nodevenv/repositories/quonote-app/20/bin/activate
cd /home/olgmxestep/repositories/quonote-app
npm install
touch tmp/restart.txt
```

### 3) `git pull` blocked by local changes

Cause: modified server files on host.

Fix:

```bash
cd /home/olgmxestep/repositories/quonote-app
git checkout -- .htaccess server.cjs
git pull
```

### 4) Site returns 200 but localhost:3001 refuses

Context: Passenger/LiteSpeed may proxy via internal socket/port mapping.

Use domain health checks as source of truth:

```bash
curl -i https://quonote.com/health
curl -i https://www.quonote.com/health
```

### 5) App does not start from cPanel, but code runs manually

Manual verification:

```bash
source /home/olgmxestep/nodevenv/repositories/quonote-app/20/bin/activate
cd /home/olgmxestep/repositories/quonote-app
node server.cjs
```

If manual run works but cPanel does not:

- Recheck startup file is exactly `server.cjs`
- Recheck app root is exactly `repositories/quonote-app`
- Click in cPanel: `Stop app` → `Run NPM Install` → `Save` → `Restart`

## Temporary recovery command (emergency only)

If cPanel app control is failing but urgent restore is needed:

```bash
nohup /home/olgmxestep/nodevenv/repositories/quonote-app/20/bin/node /home/olgmxestep/repositories/quonote-app/server.cjs > /home/olgmxestep/repositories/quonote-app/app.log 2>&1 &
```

Verify:

```bash
curl -i https://quonote.com/health
```

Stop emergency process later:

```bash
pkill -f "/home/olgmxestep/repositories/quonote-app/server.cjs"
```

## Deploy checklist (short)

```bash
cd /home/olgmxestep/repositories/quonote-app
git pull
source /home/olgmxestep/nodevenv/repositories/quonote-app/20/bin/activate
npm install
touch tmp/restart.txt
sleep 6
curl -i https://quonote.com/health
```
