import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import TrustSignals from '@/components/common/trust-signals';
import BackToTop from '@/components/common/back-to-top';
import ScrollProgress from '@/components/common/scroll-progress';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { CASE_STUDIES } from '@/../../shared/case-studies-data';
import { 
  TrendingUp, 
  Clock, 
  Users, 
  Target,
  Award,
  Heart,
  ArrowRight,
  Building,
  MapPin,
  Calendar,
  MessageSquare
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { ImpactStatistics } from '@/components/common/impact-statistics';
import caseStudiesData from '@/../../shared/data/case-studies.json';

// CMS imports
import { caseStudiesApi } from '@/lib/strapi/api/case-studies';
import { globalSettingsApi } from '@/lib/strapi/api/global-settings';
import { StrapiCaseStudiesPage } from '@/lib/strapi/types/case-studies';
import { StrapiGlobalSettings } from '@/lib/strapi/types/global-settings';

// Icon mapping for dynamic icons
const getIcon = (iconName: string) => {
  const icons: { [key: string]: any } = {
    Award,
    Target,
    TrendingUp,
    Clock,
    Users,
    Heart,
    ArrowRight
  };
  return icons[iconName];
};

export default function CaseStudies() {
  // CMS State Management (following proven pattern)
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageData, setPageData] = useState<StrapiCaseStudiesPage | null>(null);
  const [globalSettings, setGlobalSettings] = useState<StrapiGlobalSettings | null>(null);

  const [shouldAnimate, setShouldAnimate] = useState(false);
  const { elementRef: heroRef, isVisible: heroInView } = useIntersectionObserver({ threshold: 0.2, triggerOnce: true });

  // Fetch CMS data (following proven pattern)  
  useEffect(() => {
    console.log('🚀 Case Studies useEffect triggered!');
    const fetchData = async () => {
      try {
        console.log('📖 Starting Case Studies page CMS data fetch...');
        setIsLoading(true);
        
        // Parallel API calls for page data and global settings
        const [caseStudiesPageData, globalSettingsData] = await Promise.all([
          caseStudiesApi.getCaseStudiesPage(),
          globalSettingsApi.getGlobalSettings()
        ]);
        
        console.log('✅ Case Studies CMS data fetched successfully');
        console.log('📄 Page Data:', caseStudiesPageData);
        console.log('🌐 Global Settings:', globalSettingsData);
        console.log('🔍 Impact Statistics:', globalSettingsData?.ImpactStatistics);
        
        setPageData(caseStudiesPageData as any); // Type assertion for flexibility
        setGlobalSettings(globalSettingsData);
        setIsLoading(false);
      } catch (err) {
        console.error('❌ Error fetching Case Studies CMS data:', err);
        setError('Failed to load page content');
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShouldAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Loading state (proven pattern)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
        {/* Large Compleo Logo Watermark */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img 
            src="/images/shared/logo-loading.png" 
            alt="Compleo Health Logo" 
            className="w-[768px] h-auto max-w-[70vw] max-h-[40vh] object-contain animate-logo-grow"
          />
        </div>
        {/* Loading Spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-compleo-teal relative z-10 mb-6"></div>
        <p className="text-compleo-gray text-lg font-medium relative z-10">Loading Case Studies...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Page</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-compleo-teal text-white rounded hover:bg-compleo-deep-teal"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollProgress />
      <Header />
      <main id="main-content" className="animate-fade-in-up">
        {/* Hero Section */}
        <section ref={heroRef} className="py-20 bg-compleo-deep-teal text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="opacity-100">
                <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                  {pageData?.Hero?.title || caseStudiesData.hero.title}
                </h1>
                <p className="text-xl lg:text-2xl text-gray-200 mb-8 leading-relaxed">
                  {pageData?.Hero?.subtitle || caseStudiesData.hero.subtitle}
                </p>
                <div className="flex flex-row gap-3 sm:gap-6">
                  <Link href={caseStudiesData.hero.primaryButton.href}>
                    <Button size="lg" className="group relative bg-gradient-to-br from-compleo-teal via-compleo-teal to-compleo-deep-teal hover:from-compleo-teal/90 hover:via-compleo-teal/90 hover:to-compleo-deep-teal/90 text-white px-4 sm:px-8 py-4 sm:py-3 rounded-xl shadow-xl hover:shadow-2xl border-2 border-white/40 hover:border-white/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 w-36 sm:w-48 h-auto">
                      <div className="flex flex-col items-center gap-1 sm:gap-1.5">
                        <div className="bg-white/20 rounded-full p-1">
                          {getIcon(caseStudiesData.hero.primaryButton.icon) && 
                            React.createElement(getIcon(caseStudiesData.hero.primaryButton.icon)!, { 
                              className: "h-4 w-4 sm:h-5 sm:w-5 group-hover:bounce transition-transform duration-300" 
                            })
                          }
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-sm sm:text-base font-semibold tracking-wider">{caseStudiesData.hero.primaryButton.text}</span>
                          <span className="text-xs font-medium opacity-90">{caseStudiesData.hero.primaryButton.subtext}</span>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </Button>
                  </Link>
                  <Link href={caseStudiesData.hero.secondaryButton.href}>
                    <Button size="lg" className="group bg-compleo-yellow hover:bg-compleo-yellow/90 text-compleo-deep-teal px-4 sm:px-8 py-4 sm:py-3 rounded-xl shadow-xl hover:shadow-2xl border-2 border-compleo-deep-teal/30 hover:border-compleo-deep-teal/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 w-36 sm:w-48 h-auto">
                      <div className="flex flex-col items-center gap-1 sm:gap-1.5">
                        <div className="bg-compleo-deep-teal/20 rounded-full p-1">
                          {getIcon(caseStudiesData.hero.secondaryButton.icon) && 
                            React.createElement(getIcon(caseStudiesData.hero.secondaryButton.icon)!, { 
                              className: "h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform duration-300" 
                            })
                          }
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-sm sm:text-base font-semibold tracking-wider">{caseStudiesData.hero.secondaryButton.text}</span>
                          <span className="text-xs font-medium opacity-90">{caseStudiesData.hero.secondaryButton.subtext}</span>
                        </div>
                      </div>
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-compleo-deep-teal to-compleo-teal rounded-2xl p-8 shadow-2xl border-2 border-compleo-yellow/30 ring-2 ring-compleo-yellow/20">
                <ImpactStatistics 
                  variant="hero"
                  textColor="yellow"
                  gridCols={3}
                  impactStats={globalSettings?.ImpactStatistics}
                  title={pageData?.impactStatsTitle}
                />
              </div>
            </div>
          </div>
        </section>

        

        {/* Case Studies Grid */}
        <section className="py-20 bg-[#ffffff]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-compleo-deep-teal mb-6">
                {pageData?.successStoriesTitle || caseStudiesData.successStories.title}
              </h2>
              <p className="text-xl text-compleo-gray max-w-3xl mx-auto">
                {pageData?.successStoriesSubtitle || caseStudiesData.successStories.subtitle}
              </p>
            </div>

            {/* Case Studies Grid */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {CASE_STUDIES.map((caseStudy, index) => (
                <div key={caseStudy.id} className="relative group">
                  {caseStudy.id === 'nhs-devon' ? (
                    <Card className="hover-lift hover-glow transition-all duration-300 bg-white relative overflow-hidden">
                      <div className="absolute inset-0 bg-compleo-deep-teal opacity-0 group-hover:opacity-25 transition-opacity duration-300 z-10 pointer-events-none"></div>
                      <div className="aspect-video bg-white rounded-t-lg overflow-hidden">
                        <img 
                          src={caseStudy.image} 
                          alt={caseStudy.title}
                          className="w-full h-full object-contain p-4"
                        />
                      </div>
                      <CardContent className="p-6 relative z-20">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary" className="bg-compleo-beige text-compleo-deep-teal">
                            {caseStudy.category}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-bold text-compleo-deep-teal mb-3">
                          {caseStudy.title}
                        </h3>
                        <div className="space-y-2 mb-4 text-sm text-compleo-gray">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            <span>{caseStudy.trustName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{caseStudy.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{caseStudy.projectDuration || new Date(caseStudy.date).toLocaleDateString('en-GB')}</span>
                          </div>
                        </div>
                        <p className="text-compleo-gray mb-4">
                          {caseStudy.summary}
                        </p>
                        <Button variant="outline" className="w-full" disabled>
                          Quote Only
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <Link href={`/case-study/${caseStudy.id}`} className="block">
                      <Card className="hover-lift hover-glow transition-all duration-300 bg-white cursor-pointer relative overflow-hidden">
                        <div className="absolute inset-0 bg-compleo-deep-teal opacity-0 group-hover:opacity-25 transition-opacity duration-300 z-10"></div>
                        <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                          <img 
                            src={caseStudy.image} 
                            alt={caseStudy.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="p-6 relative z-20">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="secondary" className="bg-compleo-beige text-compleo-deep-teal">
                              {caseStudy.category}
                            </Badge>
                          </div>
                          <h3 className="text-xl font-bold text-compleo-deep-teal mb-3">
                            {caseStudy.title}
                          </h3>
                          <div className="space-y-2 mb-4 text-sm text-compleo-gray">
                            <div className="flex items-center gap-2">
                              <Building className="h-4 w-4" />
                              <span>{caseStudy.trustName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{caseStudy.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{caseStudy.projectDuration || new Date(caseStudy.date).toLocaleDateString('en-GB')}</span>
                            </div>
                          </div>
                          <p className="text-compleo-gray mb-4">
                            {caseStudy.summary}
                          </p>
                          <Button variant="outline" className="w-full group">
                            Read Full Case Study
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  )}
                </div>
              ))}

            </div>
          </div>
        </section>

        <TrustSignals />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}