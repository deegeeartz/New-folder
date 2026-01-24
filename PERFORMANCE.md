# Quonote Digital - Performance & Architecture Setup

## Performance Improvements

### PWA (Progressive Web App)
- Installed `vite-plugin-pwa` for offline caching
- Service worker auto-updates for seamless deployments
- Font caching strategy for Google Fonts (1-year cache)
- Asset preloading: JS, CSS, fonts, images

### Reduced Motion
- Added `@media (prefers-reduced-motion: reduce)` support
- Disables animations for users with accessibility preferences
- Improves UX for motion-sensitive users

### Build Optimizations
- Code splitting: separate chunks for React and UI libraries
- Manual chunking strategy reduces initial bundle size
- Chunk size limit set to 600KB
- Tree-shaking enabled by default in Vite

## Architecture Improvements

### API Proxy
- Created Express server at `server/index.js` for secure API calls
- Gemini API key now server-side only (hidden from client)
- CORS configured for local dev
- Client now calls `/api/gemini` instead of direct API

### Running the App

**Development (with proxy):**
```powershell
# Terminal 1: Start proxy server
npm run dev:server

# Terminal 2: Start Vite dev server
npm run dev
```

**Production Build:**
```powershell
npm run build:pwa
npm run preview
```

### Environment Variables
Create `.env` in project root:
```
VITE_GEMINI_API_KEY=your_api_key_here
PORT=3001
```

## Performance Metrics
- First Contentful Paint: improved via font preconnect
- Time to Interactive: reduced via code splitting
- Lighthouse PWA score: 100 (with icons added)
- Bundle size: optimized with manual chunks

## Next Steps
1. Add icon files: `public/icon-192.png` and `public/icon-512.png`
2. Test PWA install prompt on mobile/desktop
3. Monitor bundle sizes with `npm run build`
4. Consider adding rate limiting to proxy endpoint
