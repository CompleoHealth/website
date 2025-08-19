# Compleo Health - Diagnostic Imaging Platform

## Overview
This is a full-stack web application for Compleo Health, a medical diagnostic imaging company providing MRI/CT scanner services to NHS Trusts and private patients. The platform serves both B2B healthcare providers and B2C patients with equipment rental, clinical services, and diagnostic booking capabilities. It aims to be an enterprise-grade solution with a focus on user experience, performance, accessibility, and SEO. The project vision includes comprehensive information about services, equipment, company values, sustainability efforts, and a centralized system for case studies and team profiles.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with custom brand colors (deep teal, teal, cream, white, beige)
- **State Management**: TanStack Query
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite
- **Design Principles**: Consistent design system across all pages with standardized typography (DM Sans), spacing, enhanced navigation (smooth dropdowns, back-to-top buttons, breadcrumbs), page transitions, advanced visual polish (scroll progress bars, staggered animations, hover effects, lazy loading), and off-white backgrounds for improved visual hierarchy.
- **Key Features**:
    - Interactive mapping with country shading and flag badges.
    - Comprehensive website copy and content management structure for CMS readiness (JSON data files for locations, testimonials, news, events, team, careers, case studies, policies).
    - Professional legal pages (Privacy Policy, Cookie Policy, Modern Slavery Statement, Corporate Social Responsibility) with consistent styling.
    - Responsive navigation system with custom breakpoints and enhanced mobile UX (burger-to-X animation, "Enquire Now" banner, slide-out contact panel).
    - Branded icon system with custom variants (Medical, Sustainability, Tech).
    - Dynamic content sections like value proposition cards, service feature cards, and impact statistics.
    - Case study and team member profile systems with detailed pages.
    - Comprehensive accessibility features (skip links, ARIA attributes, semantic HTML, keyboard navigation, screen reader support).
    - Image and video optimization for performance.
    - Integrated PDF viewer for policy documents.

### Backend
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: None (static JSON data for locations and other content)
- **API Design**: RESTful API endpoints with static data.
- **Core Functionality**:
    - `POST /api/contact` - Send contact inquiries via SendGrid.
    - `GET /api/locations` - Serve static service locations.
    - `GET /sitemap.xml` and `GET /robots.txt` - Generated files for SEO.
    - `GET /api/structured-data/*` - SEO structured data schemas.
    - Rate limiting for API endpoints (general and contact form specific).
    - Comprehensive Content Security Policy (CSP) and security headers.
    - Server-side input sanitization (DOMPurify).

## External Dependencies
- **Email Service**: SendGrid (for contact form notifications)
- **UI Library**: Radix UI primitives (for accessible components)
- **Icons**: Lucide React
- **Mapping**: Leaflet with OpenStreetMap and FlagCDN (for flag badges)
- **Carousel**: Embla Carousel Autoplay (for testimonials)
- **Fonts**: Google Fonts (DM Sans)
- **Deployment Platform**: Replit (with autoscale deployment)