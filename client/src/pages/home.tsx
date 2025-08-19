import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/home/hero-section';
import ValueProposition from '@/components/home/value-proposition';
import ApproachPanels from '@/components/home/approach-panels';
import HealthcareSolutions from '@/components/home/healthcare-solutions';
import Testimonials from '@/components/home/testimonials';
import TrustSignals from '@/components/common/trust-signals';
import BackToTop from '@/components/common/back-to-top';
import ScrollProgress from '@/components/common/scroll-progress';
import { SEOHead } from '@/components/common/seo-head';
import { SEO_DATA } from '@/lib/seo-data';

import LocationMap from '@/components/common/location-map';
import CurvedCtaPanel from '@/components/common/curved-cta-panel';

// Import Strapi API
import * as strapiApi from '@/lib/strapi/api';
import type { StrapiHomePage, StrapiGlobalSettings } from '@/lib/strapi/types';



export default function Home() {
  // CMS State Management (exact pattern from services page)
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageData, setPageData] = useState<StrapiHomePage | null>(null);
  const [globalSettings, setGlobalSettings] = useState<StrapiGlobalSettings | null>(null);

  // Fetch CMS data (exact pattern from services page)
  useEffect(() => {
    const fetchPageData = async () => {
      try {

        
        // Parallel API calls like services page
        const [homePageData, globalSettingsData] = await Promise.all([
          strapiApi.homeApi.getHomePage(),
          strapiApi.globalSettingsApi.getGlobalSettings()
        ]);
        

        setPageData(homePageData);
        setGlobalSettings(globalSettingsData);
      } catch (err) {
        console.error('❌ Home Page: Error fetching CMS data:', err);
        setError('Failed to load page content');
      } finally {
        console.log('🏁 Home Page: Loading complete');
        setIsLoading(false);
      }
    };

    fetchPageData();
  }, []);

  // Loading state (using proper logo + spinner design)
  if (isLoading) {

    return (
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
    );
  }

  // Error state (exact pattern from services page)
  if (error) {

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center p-8 max-w-md mx-auto bg-white rounded-lg shadow-lg">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Something went wrong</h2>
          <p className="text-gray-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-compleo-teal text-white rounded hover:bg-compleo-deep-teal transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // SUCCESS: CMS data loaded, render page


  return (
    <div className="min-h-screen bg-gray-100">
      <SEOHead {...SEO_DATA.home} />
      {/* Skip Links for Accessibility */}
      <div className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-0 focus-within:left-0 focus-within:z-50 focus-within:bg-compleo-deep-teal focus-within:text-white focus-within:px-4 focus-within:py-2 focus-within:rounded-br-md">
        <a 
          href="#main-content"
          className="inline-block bg-compleo-deep-teal text-white hover:bg-compleo-teal focus:ring-2 focus:ring-compleo-yellow focus:ring-offset-2 px-4 py-2 rounded text-sm font-medium focus:outline-none"
        >
          Skip to main content
        </a>
      </div>
      <ScrollProgress />
      <Header />
      <main id="main-content" className="animate-fade-in-up">
        <HeroSection 
          heroData={pageData?.Hero?.[0]} 
          impactStats={globalSettings?.ImpactStatistics}
          impactStatsTitle={pageData?.Hero?.[0]?.impactStatsTitle}
        />
        <ValueProposition 
          title={pageData?.ValueProposition?.title}
          subtitle={pageData?.ValueProposition?.subtitle}
          valuePropositionCards={pageData?.ValueProposition?.ValuePropositionCards}
        />
        
        <ApproachPanels 
          approachPanels={pageData?.Approach}
        />
        
        <HealthcareSolutions 
          title={pageData?.HealthcareSolutions?.title}
          description={pageData?.HealthcareSolutions?.description}
          solutions={pageData?.HealthcareSolutions?.solutions}
        />

        <Testimonials 
          title={pageData?.Testimonials?.title}
          subtitle={pageData?.Testimonials?.subtitle}
        />
        <LocationMap 
          title={pageData?.LocationMap?.title}
          subtitle={pageData?.LocationMap?.subtitle}
        />
        
        <CurvedCtaPanel 
          title={pageData?.CurvedCTA?.title}
          description={pageData?.CurvedCTA?.description}
          buttonText={pageData?.CurvedCTA?.buttonText}
          buttonHref={pageData?.CurvedCTA?.buttonHref}
          imageSrc={pageData?.CurvedCTA?.imageSrc}
        />
        
        <TrustSignals />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
