# Auto Insurance Landing Page

## Overview

This is a single-page CPA (Cost Per Action) bridge landing page designed to pre-sell Champion Auto Insurance offers. The application is built as a full-stack web application using React for the frontend and Express.js for the backend, with a focus on conversion optimization and user engagement.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for fast development and optimized builds
- **Analytics**: Real-time visitor tracking with session management

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Tables**: Users, visitors, click_events, leads for comprehensive analytics
- **Session Management**: Uses connect-pg-simple for PostgreSQL session storage
- **Development**: Hot reload with tsx and Vite integration
- **API Routes**: RESTful endpoints for tracking visitor analytics and conversions

## Key Components

### Landing Page Structure
The main landing page (`client/src/pages/home.tsx`) follows a conversion-optimized structure:
1. **Hero Section**: Primary headline, subheadline, and main CTA button
2. **Value Proposition**: Three key benefits with icons
3. **Visual Section**: Trust-building imagery
4. **Secondary CTA**: Reinforcement section with additional call-to-action
5. **Footer**: Disclaimer and legal text

### UI Component System
- **shadcn/ui**: Comprehensive component library with Radix UI primitives
- **Custom Components**: Specialized components like `LoadingBar` for engagement
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Animation**: CSS transitions and scroll-triggered animations

### Database Schema
- **Users Table**: Basic user management with username/password and timestamp fields
- **Visitors Table**: Session tracking with IP, user agent, referrer, and landing page data
- **Click Events Table**: CTA click tracking with types (hero_cta, secondary_cta, urgency_cta)
- **Leads Table**: Conversion tracking with email, zip code, and conversion values
- **Drizzle Configuration**: PostgreSQL dialect with automated schema migrations
- **Storage Interface**: DatabaseStorage class implementing comprehensive analytics methods

## Data Flow

### Client-Side Flow
1. User lands on homepage with immediate visual impact
2. Intersection Observer triggers animations as user scrolls
3. CTA buttons currently log interactions (placeholder for affiliate redirection)
4. React Query manages any future API state requirements

### Server-Side Flow
1. Express server handles static file serving and API routes
2. Vite middleware provides hot reload in development
3. Database operations abstracted through storage interface
4. Session management ready for user tracking if needed

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React, React DOM, React Query
- **UI Framework**: Radix UI primitives, Tailwind CSS, shadcn/ui
- **Database**: Drizzle ORM, @neondatabase/serverless, PostgreSQL
- **Development**: Vite, TypeScript, PostCSS

### Styling and Theming
- **Fonts**: Inter font family from Google Fonts
- **Color Scheme**: Blue primary (#007BFF), neutral grays, success green
- **CSS Variables**: Custom properties for consistent theming
- **Responsive**: Mobile-first design with tablet/desktop breakpoints

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: esbuild bundles server to `dist/index.js`
3. **Database Migration**: Drizzle kit handles schema migrations
4. **Environment Variables**: DATABASE_URL required for PostgreSQL connection

### Development Environment
- **Hot Reload**: Vite development server with Express integration
- **Type Safety**: Full TypeScript coverage across frontend and backend
- **Database**: Can use Neon PostgreSQL or local PostgreSQL instance
- **Replit Integration**: Configured with replit-specific plugins and banners

### Production Considerations
- **Static Serving**: Express serves built React application
- **Database**: Requires PostgreSQL database URL in production
- **Performance**: Optimized builds with code splitting and asset optimization
- **Scalability**: Stateless server design allows for horizontal scaling
- **Custom Domain**: Ready for deployment with professional domain for enhanced credibility
- **SSL/HTTPS**: Automatic SSL certificates for secure affiliate redirects

### Affiliate Integration & Analytics
The application now includes comprehensive tracking and is ready for affiliate integration:
1. **Real-time Analytics**: PostgreSQL database tracks visitors, clicks, and conversions
2. **CTA Tracking**: All button clicks are categorized and monitored (hero, secondary, urgency)
3. **Conversion Funnel**: Visitor → Click → Lead pipeline with conversion rate calculations
4. **Analytics Dashboard**: Live performance metrics accessible at /analytics route
5. **Session Management**: Unique session IDs for accurate user journey tracking
6. **Ready for Affiliate URLs**: Placeholder CTAs can be replaced with Champion Auto Insurance links

### TrackPro Analytics Engine
The application now features a professional tracking backend called "TrackPro Analytics Engine" - a comprehensive CPA tracking system with enterprise-level capabilities including:
- Secure password-protected dashboard access
- Real-time visitor monitoring and conversion tracking
- Campaign management with UTM parameter support
- Advanced analytics comparable to ClickMagick
- Complete visitor journey tracking from landing to conversion
- Mobile-optimized interface with professional branding

### Recent Changes (January 2025)
- ✓ Added PostgreSQL database with comprehensive analytics schema
- ✓ Implemented real-time visitor, click, and lead tracking
- ✓ Created analytics dashboard with conversion metrics
- ✓ Enhanced CPA landing page with urgency messaging and social proof
- ✓ Integrated database storage layer replacing in-memory storage
- ✓ Comprehensive mobile optimization with responsive design improvements
- ✓ Enhanced touch interactions and mobile-specific CSS optimizations
- ✓ Improved mobile analytics dashboard layout and readability
- ✓ Mobile layout fixes: reduced header padding, prevented horizontal scroll, optimized spacing
- ✓ Mobile-first hero section with proper image placement and text hierarchy
- ✓ Touch-friendly CTAs with full-width buttons and 44px minimum touch targets
- ✓ Integrated MaxBounty affiliate link for actual CTA conversions
- ✓ Added professional loading screen with progress animation before affiliate redirect
- ✓ Built comprehensive in-house tracking system comparable to ClickMagick
- ✓ Advanced analytics dashboard with campaign management, conversion funnels, geo/device tracking
- ✓ Real-time visitor monitoring and detailed user journey analytics
- ✓ Enhanced database schema with campaigns, page events, conversion funnels, and detailed visitor data
- ✓ Added secure password protection for analytics dashboard access
- ✓ Implemented session-based authentication with login/logout functionality
- ✓ Mobile-optimized login form with professional security features
- ✓ Successfully completed full CPA landing page with enterprise tracking system
- ✓ Secured analytics dashboard with hidden URL and password protection
- ✓ Fixed all routing issues for optimal user experience across devices
- ✓ Domain purchased: turboratenow.com - perfect for auto insurance CPA campaigns
- ✓ Successfully deployed app at cpa-bridge-booster-binghamderek.replit.app
- ✓ DNS records configured in Cloudflare (A record: 34.111.179.208, TXT verification)
- ✓ Domain verification in progress - turboratenow.com status: "Verifying"
- ✓ Fixed critical production server startup issue and route conflicts
- ✓ Resolved all deployment blockers: health checks, error handling, route configuration
- ✓ Final production build completed (34.0kb bundle) - ready for deployment
- → turboratenow.com domain activation imminent