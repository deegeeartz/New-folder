// Entry point for cPanel/Node.js hosting
import app from './server/index.js';

// The port is usually provided by the hosting environment via process.env.PORT
// In cPanel/Phusion Passenger, this is handled automatically if we don't hardcode a listen
// But since server/index.js already listens, we just import it to execute the code.
// Note: server/index.js essentially does: app.listen(...)

// If your cPanel requires exporting the app instead of listening directly:
// export default app;
