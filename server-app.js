import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Debug logging setup
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logFile = path.join(__dirname, 'server_debug.log');

function log(message) {
    const timestamp = new Date().toISOString();
    const logLine = `[${timestamp}] ${message}\n`;
    try {
        fs.appendFileSync(logFile, logLine);
    } catch (e) {
        console.error("Failed to write to log file:", e);
    }
    console.log(message);
}

log('Initializing server-app.js (ESM backend)...');

(async () => {
    try {
        log('Importing application from ./server/index.js...');
        // Dynamic import to catch load errors (like missing dependencies)
        const appModule = await import('./server/index.js');
        const app = appModule.default;
        
        // Ensure the app listens on the port cPanel assigns
        const PORT = process.env.PORT || 3001;
        log(`Attempting to listen on port ${PORT}`);

        app.listen(PORT, () => {
            log(`Server started successfully on port ${PORT}`);
        });
    } catch (error) {
        log(`CRITICAL ERROR during startup: ${error.message}\n${error.stack}`);
        process.exit(1);
    }
})();
