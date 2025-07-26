# PROJECT EXPORT CHECKLIST

## CRITICAL FILES TO INCLUDE

### Root Files
- ✅ `package.json` - Dependencies and scripts
- ✅ `package-lock.json` - Exact dependency versions
- ✅ `vite.config.ts` - Build configuration
- ✅ `tailwind.config.ts` - Styling configuration
- ✅ `tsconfig.json` - TypeScript configuration
- ✅ `components.json` - shadcn/ui configuration
- ✅ `postcss.config.js` - CSS processing

### Client Application
- ✅ `client/` folder - Complete React application
- ✅ `client/src/pages/home.tsx` - Main landing page
- ✅ `client/src/components/ui/` - All UI components
- ✅ `client/src/lib/` - Utility functions
- ✅ `client/index.html` - HTML template

### Public Assets
- ✅ `public/` folder - Static assets and fallback HTML

### Optional (Database Related - Not Needed for Basic Landing Page)
- `server/` folder - Express backend (not needed for static deployment)
- `shared/` folder - Database schema (not needed for static deployment)
- `drizzle.config.ts` - Database config (not needed)

## VERCEL DEPLOYMENT FOCUS

**For your CPA landing page, Vercel will:**
1. Build the React app automatically
2. Serve it as a static site
3. Handle the MaxBounty affiliate redirects
4. Provide global CDN and SSL

**Database functionality will be disabled, which is perfect because:**
- Tracking is already disabled to prevent billing
- Landing page works purely client-side
- MaxBounty integration requires no backend
- Faster loading without server dependencies

## SIMPLIFIED DEPLOYMENT

Since your landing page is primarily client-side:
1. Vercel builds the `client/` React app
2. Serves it as optimized static files
3. Handles custom domain automatically
4. No server configuration needed

Your CPA landing page will work perfectly as a static site on Vercel!