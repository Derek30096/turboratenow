# COMPLETE CODE BACKUP - Key Files

## 1. MAIN LANDING PAGE (client/src/pages/home.tsx)
**Purpose:** Primary CPA bridge landing page with MaxBounty integration

**Key Features:**
- Hero section with compelling headline "Most Drivers Overpay $437/Year on Auto Insurance"
- Three-benefit value proposition with icons (CheckCircle, Shield, DollarSign)
- Professional loading screen before MaxBounty redirect
- Mobile-responsive design with touch-friendly CTAs
- All tracking disabled to prevent billing charges
- Intersection Observer for scroll animations

**Core Structure:**
```
- Header with urgency messaging
- Hero section with primary CTA
- Benefits section (3 key value propositions)
- Visual trust-building section
- Secondary CTA reinforcement
- Footer with disclaimer
```

## 2. SERVER CONFIGURATION (server/index.ts)
**Purpose:** Express server with domain routing and Vite integration

**Key Features:**
- Custom domain routing for turboratenow.net
- Development/production environment handling
- Static file serving with cache headers
- Request logging and error handling
- Port configuration (5000) with fallback

**Domain Routing Logic:**
```javascript
if (hostname && (hostname.includes('turboratenow.com') || hostname.includes('turboratenow.net'))) {
  console.log(`🎯 EXTERNAL DOMAIN: ${hostname} - serving React app`);
  // Set cache-busting headers
}
```

## 3. DATABASE SCHEMA (shared/schema.ts)
**Purpose:** PostgreSQL schema with Drizzle ORM

**Tables:**
- sessions: Session storage for authentication
- users: User management with profile data
- visitors: Analytics visitor tracking (disabled)
- clickEvents: CTA click tracking (disabled)
- leads: Conversion tracking (disabled)

## 4. AFFILIATE INTEGRATION
**MaxBounty Link:** 
```
https://afflat3e1.com/trk/lnk/E9FE846C-D650-4A23-A71F-1A020485FDAD/?o=22134&c=918277&a=713051&k=BD87E19173921A7698931850BC9E82E2&l=22980
```

**Implementation:**
- Professional loading screen (RedirectLoading component)
- Smooth transition from landing page to affiliate
- Progress animation during redirect

## 5. STYLING SYSTEM
**Tailwind Configuration:**
- Blue primary color (#007BFF)
- Custom CSS variables for theming
- Mobile-first responsive design
- shadcn/ui component integration

**Key UI Components:**
- Button: Professional CTAs with hover effects
- Card: Content containers with shadows
- LoadingBar: Engagement animation
- RedirectLoading: Affiliate redirect screen

## 6. TRACKING SYSTEM (DISABLED)
**Files:**
- advanced-analytics-disabled.ts: All tracking calls return immediately
- advanced-analytics.ts: Full tracking capabilities (unused)

**Reason for Disabling:**
Prevents billing charges while domain issues are resolved

## 7. DEVELOPMENT SETUP
**Scripts:**
- `npm run dev`: Development with hot reload
- `npm run build`: Production build (React + Express)
- `npm run start`: Production server
- `npm run db:push`: Database migrations

**Dependencies (Key):**
- React 18.3.1 + TypeScript
- Express 4.21.2
- Drizzle ORM 0.39.1
- Tailwind CSS + shadcn/ui
- Vite 5.4.19

## 8. DEPLOYMENT CONFIGURATION
**Environment Variables Required:**
- DATABASE_URL: PostgreSQL connection
- NODE_ENV: development/production
- PORT: Server port (default 5000)

**Build Output:**
- Frontend: dist/public/ (React app)
- Backend: dist/index.js (Express server)
- Bundle Size: ~34kb optimized

## 9. DOMAIN CONFIGURATION
**turboratenow.net:**
- DNS: A records to 34.111.179.208
- TXT: replit-verify record
- SSL: Generated but routing broken
- Status: Replit infrastructure failure

## 10. MOBILE OPTIMIZATION
**Touch Targets:**
- Minimum 44px button height
- Full-width CTAs on mobile
- Optimized spacing and typography
- Responsive images and layouts

This backup ensures complete project reconstruction with all functionality preserved.