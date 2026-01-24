// server.js - CommonJS Entry Point for cPanel
// This file replaces the ESM server.js to satisfy cPanel/LiteSpeed's "require()" behavior.

const fs = require('fs');
const path = require('path');

// Basic logging to ensure we know this file loaded
const logFile = path.join(__dirname, 'server_debug.log');

function log(msg) {
    const time = new Date().toISOString();
    try {
        fs.appendFileSync(logFile, `[${time}] [server.js CJS] ${msg}\n`);
    } catch (e) {
        // ignore log error
    }
}

log("Starting CJS Bridge...");

(async () => {
    try {
        log("Importing ESM server-app.js...");
        // Dynamically import the REAL application
        await import('./server-app.js');
    } catch (err) {
        log(`CRITICAL ERROR in CJS Bridge: ${err.message}\n${err.stack}`);
        console.error(err);
        process.exit(1);
    }
})();
