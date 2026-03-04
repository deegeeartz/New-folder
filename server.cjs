// CommonJS shim to load the ESM server entry point
// This allows Passenger/cPanel to load this .cjs file as the startup, 
// which then imports the actual ESM server logic
require('./server/index.js');
