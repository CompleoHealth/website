import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, lazy, Suspense } from "react";
import ScrollProgress from "@/components/common/scroll-progress";
import ErrorBoundary from "@/components/common/error-boundary";

import { optimizeResourceLoading } from "@/lib/resource-hints";
import { injectCriticalCSS } from "@/lib/critical-css";
import CookieConsent from "@/components/common/cookie-consent";
import { initGA } from "@/lib/analytics";
import { useAnalytics } from "@/hooks/use-analytics";

// Lazy load all page components for better performance
const NotFound = lazy(() => import("@/pages/not-found"));
const Home = lazy(() => import("@/pages/home"));
const Services = lazy(() => import("@/pages/services"));



const About = lazy(() => import("@/pages/about"));
const Contact = lazy(() => import("@/pages/contact"));
const Sustainability = lazy(() => import("@/pages/sustainability"));
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
  
  // Track page views automatically
  useAnalytics();
  
  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

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
        <Route path="/sustainability" component={Sustainability} />
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

