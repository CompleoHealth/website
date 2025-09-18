import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import TrustSignals from '@/components/common/trust-signals';
import BackToTop from '@/components/common/back-to-top';
import Breadcrumb from '@/components/common/breadcrumb';
import ScrollProgress from '@/components/common/scroll-progress';
import PillCTA from '@/components/common/pill-cta';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'wouter';
import { MessageSquare, Search, Heart, Clock, Target, TrendingUp, Shield, Users, Award, Zap, CheckCircle } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useEffect, useState } from 'react';
import { SEOHead } from '@/components/common/seo-head';
import { trackCTAClick } from '@/lib/analytics';
import { SEO_DATA } from '@/lib/seo-data';
import { strapiApi } from '@/lib/strapi';
import { screeningProgrammesApi } from '@/lib/strapi/api/screening-programmes';
import type { ScreeningProgrammesPage, StrapiServiceFeature } from '@/lib/strapi/types/screening-programmes';
import type { StrapiGlobalSettings } from '@/lib/strapi/types/global-settings';

export default function ScreeningPrograms() {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const { elementRef: heroRef, isVisible: heroInView } = useIntersectionObserver({ threshold: 0.2, triggerOnce: true });
  const [, setLocation] = useLocation();
  
  // CMS Data State - Following proven pattern from clinical insourcing page
  const [pageData, setPageData] = useState<ScreeningProgrammesPage | null>(null);
  const [globalSettings, setGlobalSettings] = useState<StrapiGlobalSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Parallel API fetching - Following proven pattern from clinical insourcing page
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Parallel API calls - proven pattern, using direct import for screeningProgrammesApi
        const [screeningProgrammesPageData, globalSettingsData] = await Promise.all([
          screeningProgrammesApi.getScreeningProgrammesPage(),
          strapiApi.getGlobalSettings()
        ]);
        
        setPageData(screeningProgrammesPageData);
        setGlobalSettings(globalSettingsData);
      } catch (error) {
        setError('Failed to load page content');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    if (heroInView) {
      setShouldAnimate(true);
    }
  }, [heroInView]);

  // Loading state - Following proven pattern from clinical insourcing page
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

  // Error state - Following proven pattern from clinical insourcing page
  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <SEOHead {...SEO_DATA.screeningPrograms} />
        <div className="text-center max-w-md mx-auto px-6">
          <div className="mb-6">
            <img 
              src="/images/shared/logo-loading.png" 
              alt="Compleo Health Logo" 
              className="w-32 h-auto mx-auto opacity-50"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Unable to Load Content</h1>
          <p className="text-gray-600 mb-6">
            We're having trouble loading the Screening Programmes page. Please try refreshing or contact us if the issue persists.
          </p>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-compleo-teal hover:bg-compleo-teal/90 text-white"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Hero content - CMS data prioritized, static fallback
  const heroContent = {
    title: pageData?.heroTitle || "Screening Programmes",
    subtitle: pageData?.heroSubtitle || "Optimised screening pathways, utilising advanced technology, expert reporting and effective integrations to achieve early detection.",
    button1: {
      text: pageData?.primaryButton?.text || "VIEW",
      subtext: pageData?.primaryButton?.subtext || "Equipment",
      href: pageData?.primaryButton?.url || "/equipment-details",
      icon: <Search className="h-5 w-5 group-hover:pulse transition-transform duration-300" />,
      analytics: "VIEW Equipment - Screening Programmes Hero"
    },
    button2: {
      text: pageData?.secondaryButton?.text || "CONTACT",
      subtext: pageData?.secondaryButton?.subtext || "Us", 
      href: pageData?.secondaryButton?.url || "/contact",
      icon: <MessageSquare className="h-5 w-5 group-hover:pulse transition-transform duration-300" />,
      analytics: "CONTACT Us - Screening Programmes Hero"
    }
  };

  // Service details - CMS data prioritized, static fallback
  const serviceDetails = {
    title: pageData?.serviceDetailsTitle || "Early Detection for Better Outcomes",
    description: pageData?.serviceDetailsDescription || "Our screening programmes focus on providing comprehensive imaging services that integrate seamlessly with clinically validated national screening programmes to support prevention and early detection.",
    image: {
      src: pageData?.serviceImage || "/images/services/screening-programs-hero.jpg",
      alt: pageData?.serviceImageAlt || "Advanced screening equipment in clinical setting for early disease detection"
    },
    features: pageData?.features && pageData.features.length > 0 ? pageData.features.map((feature: StrapiServiceFeature, index: number) => {
      const staticIcons = [
        <Target className="h-6 w-6 text-compleo-teal" />,
        <Clock className="h-6 w-6 text-compleo-teal" />,
        <Heart className="h-6 w-6 text-compleo-teal" />,
        <Search className="h-6 w-6 text-compleo-teal" />
      ];
      return {
        icon: staticIcons[index % staticIcons.length] || <Target className="h-6 w-6 text-compleo-teal" />,
        title: feature.title,
        description: feature.description
      };
    }) : [
      {
        icon: <Target className="h-6 w-6 text-compleo-teal" />,
        title: "Early Detection Focus", 
        description: "Specialised protocols for early-stage disease identification"
      },
      {
        icon: <Clock className="h-6 w-6 text-compleo-teal" />,
        title: "Quick Turnaround",
        description: "Rapid reporting to ensure timely follow-up care"
      },
      {
        icon: <Heart className="h-6 w-6 text-compleo-teal" />,
        title: "NHS Integration",
        description: "Seamless integration with national screening programmes"
      },
      {
        icon: <Search className="h-6 w-6 text-compleo-teal" />,
        title: "Expert Reporting",
        description: "Comprehensive analysis by qualified radiology professionals"
      }
    ]
  };

  const breadcrumbItems = [
    { label: 'Services', href: '/services' },
    { label: 'Screening Programmes' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead {...SEO_DATA.screeningPrograms} />
      <ScrollProgress />
      <Header />
      <main className="animate-fade-in-up">
        {/* Hero Section */}
        <section ref={heroRef} className="section-padding bg-compleo-deep-teal text-white">
          <div className="max-w-7xl mx-auto container-padding text-center">
            <div className="transition-all duration-700 animate-slide-in-left">
              <h1 className="heading-1 mb-6">{heroContent.title}</h1>
              <p className="body-large text-gray-200 max-w-3xl mx-auto mb-8">{heroContent.subtitle}</p>
            <div className="flex flex-row gap-3 sm:gap-6 justify-center">
              <Link href={heroContent.button1.href} tabIndex={-1}>
                <Button
                  size="lg"
                  className="group relative bg-gradient-to-br from-compleo-teal via-compleo-teal to-compleo-deep-teal hover:from-compleo-teal/90 hover:via-compleo-teal/90 hover:to-compleo-deep-teal/90 text-white px-4 sm:px-8 py-4 sm:py-3 rounded-xl shadow-xl hover:shadow-2xl border-2 border-white/40 hover:border-white/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 w-36 sm:w-48 h-auto"
                  onClick={() => {
                    trackCTAClick(heroContent.button1.analytics, '/services/screening-programmes');
                    setLocation(heroContent.button1.href);
                  }}
                >
                  <div className="flex flex-col items-center gap-1 sm:gap-1.5">
                    <div className="bg-white/20 rounded-full p-1">
                      {heroContent.button1.icon}
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-sm sm:text-base font-semibold tracking-wider">{heroContent.button1.text}</span>
                      <span className="text-xs font-medium opacity-90">{heroContent.button1.subtext}</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Button>
              </Link>
              <Link href={heroContent.button2.href} tabIndex={-1}>
                <Button
                  size="lg"
                  className="group bg-compleo-yellow hover:bg-compleo-yellow/90 text-compleo-deep-teal px-4 sm:px-8 py-4 sm:py-3 rounded-xl shadow-xl hover:shadow-2xl border-2 border-compleo-deep-teal/30 hover:border-compleo-deep-teal/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 w-36 sm:w-48 h-auto"
                  onClick={() => {
                    trackCTAClick(heroContent.button2.analytics, '/services/screening-programmes');
                    setLocation(heroContent.button2.href);
                  }}
                >
                  <div className="flex flex-col items-center gap-1 sm:gap-1.5">
                    <div className="bg-compleo-deep-teal/20 rounded-full p-1">
                      {heroContent.button2.icon}
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-sm sm:text-base font-semibold tracking-wider">{heroContent.button2.text}</span>
                      <span className="text-xs font-medium opacity-90">{heroContent.button2.subtext}</span>
                    </div>
                  </div>
                </Button>
              </Link>
            </div>
            </div>
          </div>
        </section>

        {/* Service Overview */}
        <section className="section-padding bg-gray-100">
          <div className="max-w-7xl mx-auto container-padding">
            <Breadcrumb items={breadcrumbItems} />
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="heading-2 text-compleo-deep-teal mb-6">{serviceDetails.title}</h2>
                <p className="text-lg text-gray-700 mb-8">{serviceDetails.description}</p>
                <div className="space-y-6">
                  {serviceDetails.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="bg-compleo-teal/10 p-3 rounded-lg">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-compleo-deep-teal mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <img 
                  src={serviceDetails.image.src}
                  alt={serviceDetails.image.alt}
                  className="w-full h-96 object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>



        <PillCTA
          heading={pageData?.ctaSection?.title || "Implement Effective Screening Programmes"}
          description={pageData?.ctaSection?.description || "Contact us to discuss how we can help you establish comprehensive screening programmes that improve population health outcomes."}
          primaryButton={{ 
            text: pageData?.ctaSection?.primaryButton_text || "Contact Us", 
            href: pageData?.ctaSection?.primaryButton_Href || "/contact" 
          }}
          secondaryButton={{ 
            text: pageData?.ctaSection?.secondaryButton_text || "Call: +44 (0)161 884 1303", 
            onClick: () => window.open('tel:+441618841303', '_self') 
          }}
        />

        <TrustSignals />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}