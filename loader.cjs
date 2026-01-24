const fs = require('fs');
const path = require('path');

// This file is a CommonJS entry point to bridge LiteSpeed/cPanel to our ESM app.
// The error you saw (ERR_REQUIRE_ESM) happens because the server tries to use "require()"
// on your server.js, but your project is strictly ES Module.

// This file allows "require()" to work, and then it dynamically imports your server.js.

(async () => {
    try {
        // Log startup to help debugging
        const logFile = path.join(__dirname, 'server_debug.log');
        const timestamp = new Date().toISOString();
        fs.appendFileSync(logFile, `[${timestamp}] loader.cjs: Starting ESM bridge...\n`);

        // Dynamically import the original ESM server file
        await import('./server.js');
        
    } catch (err) {
        // Log fatal errors to the file since console might be hidden
        const logFile = path.join(__dirname, 'server_debug.log');
        const errorMsg = `[${new Date().toISOString()}] loader.cjs CRITICAL ERROR: ${err.message}\n${err.stack}\n`;
        fs.appendFileSync(logFile, errorMsg);
        console.error(err);
        process.exit(1);
    }
})();
