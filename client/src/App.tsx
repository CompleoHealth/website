import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, lazy, Suspense, useState } from "react";
import ScrollProgress from "@/components/common/scroll-progress";
import ErrorBoundary from "@/components/common/error-boundary";

import { updatePageSEO, pageSEOData } from "@/lib/seo";
import { optimizeResourceLoading } from "@/lib/resource-hints";
import { injectCriticalCSS } from "@/lib/critical-css";
import CookieConsent from "@/components/common/cookie-consent";
import { initGA } from "@/lib/analytics";
import { useAnalytics } from "@/hooks/use-analytics";
import { strapiApi } from "@/lib/strapi";
import type { StrapiPageSEO } from "@/lib/strapi/types";

// Lazy load all page components for better performance
const NotFound = lazy(() => import("@/pages/not-found"));
const Home = lazy(() => import("@/pages/home"));
const Services = lazy(() => import("@/pages/services"));



const About = lazy(() => import("@/pages/about"));
const Contact = lazy(() => import("@/pages/contact"));
const SocialImpact = lazy(() => import("@/pages/social-impact"));
const CaseStudies = lazy(() => import("@/pages/case-studies"));
const CaseStudy = lazy(() => import("@/pages/case-study"));
const WorkWithUs = lazy(() => import("@/pages/work-with-us"));
const ManagedEquipment = lazy(() => import("@/pages/services/managed-equipment"));
const ClinicalInsourcing = lazy(() => import("@/pages/services/clinical-insourcing"));
const EquipmentRentals = lazy(() => import("@/pages/services/equipment-rental"));

const CommunityDiagnosticCentres = lazy(() => import("@/pages/services/community-diagnostic-centres"));
const ScreeningPrograms = lazy(() => import("@/pages/services/screening-programmes"));
const OurTeam = lazy(() => import("@/pages/our-team"));
const NewsAndViews = lazy(() => import("@/pages/news-and-views"));
const NetZeroGoals = lazy(() => import("@/pages/net-zero-goals"));
const PrivacyPolicy = lazy(() => import("@/pages/privacy-policy"));
const CookiePolicy = lazy(() => import("@/pages/cookie-policy"));

const Policies = lazy(() => import("@/pages/policies"));
const Accessibility = lazy(() => import("@/pages/accessibility"));
const TeamMember = lazy(() => import("@/pages/team-member"));
const EquipmentDetails = lazy(() => import("@/pages/equipmentdetails"));
const SitemapPage = lazy(() => import("@/pages/sitemap"));

const ManageCookies = lazy(() => import("@/pages/manage-cookies"));



// Authentication removed - no longer needed

function Router() {
  const [location] = useLocation();
  const [cmsSeoData, setCmsSeoData] = useState<StrapiPageSEO | null>(null);
  
  // Track page views automatically
  useAnalytics();
  
  // Fetch CMS SEO data once on app load
  useEffect(() => {
    const fetchCMSSEO = async () => {
      try {
        const data = await strapiApi.pageSeoApi.getPageSEO();
        setCmsSeoData(data);
        console.log('CMS SEO data loaded:', data);
      } catch (error) {
        console.log('Failed to fetch CMS SEO data, using fallback');
      }
    };
    fetchCMSSEO();
  }, []);
  
  // Scroll to top when route changes and update SEO
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Update SEO based on current route
    let routeKey: string;
    if (location === '/') {
      routeKey = 'home';
    } else {
      // Handle special multi-part routes
      const path = location.slice(1); // Remove leading slash
      if (path.startsWith('work-with-us')) {
        routeKey = 'work-with-us';
      } else if (path.startsWith('news-and-views')) {
        routeKey = 'news-and-views';
      } else if (path.startsWith('our-team')) {
        routeKey = 'our-team';
      } else if (path.startsWith('case-studies')) {
        routeKey = 'case-studies';
      } else if (path.startsWith('equipment-details')) {
        routeKey = 'equipment-details';
      } else if (path.startsWith('net-zero-goals')) {
        routeKey = 'net-zero-goals';
      } else if (path.startsWith('privacy-policy')) {
        routeKey = 'privacy-policy';
      } else if (path.startsWith('cookie-policy')) {
        routeKey = 'cookie-policy';
      } else if (path.startsWith('modern-slavery-statement')) {
        routeKey = 'modern-slavery-statement';
      } else if (path.startsWith('services/managed-equipment')) {
        routeKey = 'managed-equipment';
      } else if (path.startsWith('services/equipment-rental')) {
        routeKey = 'equipment-rentals';
      } else if (path.startsWith('services/clinical-insourcing')) {
        routeKey = 'clinical-insourcing';
      } else if (path.startsWith('services/community-diagnostic-centres')) {
        routeKey = 'community-diagnostic-centres';
      } else if (path.startsWith('services/screening-programmes')) {
        routeKey = 'screening-programmes';
      } else {
        // Default to first path segment
        routeKey = path.split('/')[0];
      }
    }
    
    // Try CMS SEO data first, then fallback to hardcoded
    let seoData: any = null;
    if (cmsSeoData?.pages) {
      const cmsPage = cmsSeoData.pages.find(p => p.pageSlug === routeKey);
      if (cmsPage) {
        seoData = {
          title: cmsPage.title,
          description: cmsPage.description,
          keywords: cmsPage.keywords,
          ogImage: cmsPage.ogImage?.url
        };
        console.log(`Using CMS SEO for ${routeKey}:`, seoData);
      }
    }
    
    // Fallback to hardcoded data if no CMS data
    if (!seoData) {
      seoData = pageSEOData[routeKey as keyof typeof pageSEOData];
      if (seoData) {
        console.log(`Using fallback SEO for ${routeKey}`);
      }
    }
    
    if (seoData) {
      updatePageSEO(seoData);
    }
  }, [location, cmsSeoData]);

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
        {/* Large Compleo Logo Watermark with Subtle Growth Animation */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img 
            src="/images/shared/logo-loading.png" 
            alt="Compleo Health Logo" 
            className="w-[768px] h-auto max-w-[70vw] max-h-[40vh] object-contain animate-logo-grow"
          />
        </div>
        {/* Loading Spinner */}
        <div className="text-center text-compleo-deep-teal relative z-10 mt-32">
          <div className="w-12 h-12 border-4 border-compleo-teal/30 border-t-compleo-teal rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium">Loading...</p>
        </div>
      </div>
    }>
      <Switch>
        <Route path="/" component={Home} />

        <Route path="/services" component={Services} />
        <Route path="/services/managed-equipment" component={ManagedEquipment} />
        <Route path="/services/clinical-insourcing" component={ClinicalInsourcing} />
        <Route path="/services/equipment-rental" component={EquipmentRentals} />

        <Route path="/services/community-diagnostic-centres" component={CommunityDiagnosticCentres} />
        <Route path="/services/screening-programmes" component={ScreeningPrograms} />

        <Route path="/equipment-details" component={EquipmentDetails} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/sustainability" component={SocialImpact} />
        <Route path="/net-zero-goals" component={NetZeroGoals} />
        <Route path="/news-and-views" component={NewsAndViews} />
        <Route path="/case-studies" component={CaseStudies} />
        <Route path="/case-study/:id" component={CaseStudy} />
        <Route path="/work-with-us" component={WorkWithUs} />
        <Route path="/our-team" component={OurTeam} />
        <Route path="/team-member/:id" component={TeamMember} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/cookie-policy" component={CookiePolicy} />

        <Route path="/policies" component={Policies} />
        <Route path="/accessibility" component={Accessibility} />
        <Route path="/sitemap" component={SitemapPage} />
        <Route path="/manage-cookies" component={ManageCookies} />
        
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  // Initialize performance, accessibility, and analytics
  useEffect(() => {
    // Inject critical CSS for faster initial paint
    injectCriticalCSS();
    
    // Optimize resource loading
    optimizeResourceLoading();
    
    // Initialize Google Analytics (only if measurement ID is configured)
    initGA();
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div id="page-wrapper" className="min-h-screen bg-white">
            <ScrollProgress />
            <Router />
            <Toaster />
            <CookieConsent />
          </div>
        </TooltipProvider>
        {/* Contact slide-out rendered outside page wrapper to avoid blur */}
        <div id="contact-panel-container"></div>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;

