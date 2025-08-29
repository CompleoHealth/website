import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import TrustSignals from '@/components/common/trust-signals';
import BackToTop from '@/components/common/back-to-top';
import Breadcrumb from '@/components/common/breadcrumb';
import ScrollProgress from '@/components/common/scroll-progress';
import PillCTA from '@/components/common/pill-cta';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { MessageSquare, Settings, Shield, Clock, HeartHandshake, PoundSterling, Cpu, Users, TrendingUp } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useEffect, useState } from 'react';
import { SEOHead } from '@/components/common/seo-head';
import { trackCTAClick } from '@/lib/analytics';
import { SEO_DATA } from '@/lib/seo-data';
import { strapiApi } from '@/lib/strapi';
import { managedEquipmentApi } from '@/lib/strapi/api/managed-equipment';
import type { ManagedEquipmentPage } from '@/lib/strapi/types/managed-equipment';
import type { StrapiGlobalSettings } from '@/lib/strapi/types/global-settings';

export default function ManagedEquipment() {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const { elementRef: heroRef, isVisible: heroInView } = useIntersectionObserver({ threshold: 0.2, triggerOnce: true });
  
  // CMS Data State - Following proven pattern from home/services pages
  const [pageData, setPageData] = useState<ManagedEquipmentPage | null>(null);
  const [globalSettings, setGlobalSettings] = useState<StrapiGlobalSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Parallel API fetching - Following proven pattern from home/services pages
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Parallel API calls - proven pattern, using direct import for managedEquipmentApi
        const [managedEquipmentPageData, globalSettingsData] = await Promise.all([
          managedEquipmentApi.getManagedEquipmentPage(),
          strapiApi.getGlobalSettings()
        ]);
        
        setPageData(managedEquipmentPageData);
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
    const timer = setTimeout(() => setShouldAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Hero content - CMS data prioritization with static fallback (proven pattern)
  const heroContent = {
    title: pageData?.heroTitle || "Managed Equipment Services",
    subtitle: pageData?.heroSubtitle || "Turnkey solutions with state-of-the-art scanners, maintenance, and 24/7 support for seamless service delivery.",
    button1: {
      text: pageData?.primaryButton?.text || "VIEW",
      subtext: pageData?.primaryButton?.subtext || "Equipment",
      href: pageData?.primaryButton?.url || "/equipment-details",
      icon: <Settings className="h-5 w-5 group-hover:pulse transition-transform duration-300" />,
      analytics: pageData?.primaryButton?.analyticsId || "VIEW Equipment - Managed Equipment Hero"
    },
    button2: {
      text: pageData?.secondaryButton?.text || "CONTACT",
      subtext: pageData?.secondaryButton?.subtext || "Us", 
      href: pageData?.secondaryButton?.url || "/contact",
      icon: <MessageSquare className="h-5 w-5 group-hover:pulse transition-transform duration-300" />,
      analytics: pageData?.secondaryButton?.analyticsId || "CONTACT Us - Managed Equipment Hero"
    }
  };

  // Service details - CMS data prioritization with static fallback (proven pattern)
  const serviceDetails = {
    title: pageData?.serviceDetailsTitle || "Complete Managed Equipment Solutions",
    description: pageData?.serviceDetailsDescription || "Our managed equipment services provide comprehensive turnkey solutions that eliminate the complexity of equipment ownership while delivering cutting-edge AI-enhanced diagnostic capabilities.",
    image: {
      src: pageData?.serviceImage || "/images/services/managed-equipment-hero.jpg",
      alt: pageData?.serviceImageAlt || "CT scanner operation with technician monitoring from control room"
    },
    features: pageData?.features && pageData.features.length > 0 ? pageData.features.map((feature: { title: string; description: string }, index: number) => {
      const icons = [
        <Settings className="h-6 w-6 text-compleo-teal" />,
        <Shield className="h-6 w-6 text-compleo-teal" />,
        <Clock className="h-6 w-6 text-compleo-teal" />,
        <HeartHandshake className="h-6 w-6 text-compleo-teal" />
      ];
      return {
        icon: icons[index % icons.length],
        title: feature.title,
        description: feature.description
      };
    }) : [
      {
        icon: <Settings className="h-6 w-6 text-compleo-teal" />,
        title: "Complete Equipment Management", 
        description: "Full lifecycle management from installation to decommissioning"
      },
      {
        icon: <Shield className="h-6 w-6 text-compleo-teal" />,
        title: "Preventive Maintenance Included",
        description: "Proactive maintenance programs to minimise downtime"
      },
      {
        icon: <Clock className="h-6 w-6 text-compleo-teal" />,
        title: "24/7 Technical Support",
        description: "Round-the-clock support from certified technicians"
      },
      {
        icon: <HeartHandshake className="h-6 w-6 text-compleo-teal" />,
        title: "AI-Powered Diagnostics",
        description: "Latest AI technology for enhanced diagnostic accuracy"
      }
    ]
  };

  const breadcrumbItems = [
    { label: 'Services', href: '/services' },
    { label: 'Managed Equipment Services' }
  ];

  // Loading state
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

  // Error state
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

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead {...SEO_DATA.managedEquipment} />
      <ScrollProgress />
      <Header />
      <main className="animate-fade-in-up">
        {/* Hero Section */}
        <section ref={heroRef} className="section-padding bg-compleo-deep-teal text-white">
          <div className="max-w-7xl mx-auto container-padding text-center">
            <div className="transition-all duration-700 animate-slide-in-left">
              <h1 className="heading-1 mb-6">
                {heroContent.title}
              </h1>
              <p className="body-large text-gray-200 max-w-3xl mx-auto mb-8">{heroContent.subtitle}</p>
              <div className="flex flex-row gap-3 sm:gap-6 justify-center">
                <Link href={heroContent.button1.href} onClick={() => trackCTAClick(heroContent.button1.analytics, '/services/managed-equipment')}>
                  <Button 
                    size="lg" 
                    className="group relative bg-gradient-to-br from-compleo-teal via-compleo-teal to-compleo-deep-teal hover:from-compleo-teal/90 hover:via-compleo-teal/90 hover:to-compleo-deep-teal/90 text-white px-4 sm:px-8 py-4 sm:py-3 rounded-xl shadow-xl hover:shadow-2xl border-2 border-white/40 hover:border-white/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 w-36 sm:w-48 h-auto"
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
                <Link href={heroContent.button2.href} onClick={() => trackCTAClick(heroContent.button2.analytics, '/services/managed-equipment')}>
                  <Button 
                    size="lg" 
                    className="group bg-compleo-yellow hover:bg-compleo-yellow/90 text-compleo-deep-teal px-4 sm:px-8 py-4 sm:py-3 rounded-xl shadow-xl hover:shadow-2xl border-2 border-compleo-deep-teal/30 hover:border-compleo-deep-teal/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 w-36 sm:w-48 h-auto"
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
                  {serviceDetails.features.map((feature: { icon: React.ReactNode; title: string; description: string }, index: number) => (
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
          heading={pageData?.ctaSection?.title || "Ready to Transform Your Imaging Services?"}
          description={pageData?.ctaSection?.description || "Let's discuss how our managed equipment services can enhance your healthcare operations and deliver measurable results."}
          primaryButton={{ 
            text: pageData?.ctaSection?.primaryButton_text || "Contact Us", 
            href: pageData?.ctaSection?.primaryButton_Href || "/contact" 
          }}
          secondaryButton={{ 
            text: pageData?.ctaSection?.secondaryButton_text || "Call: +44 (0)161 884 1303", 
            onClick: () => window.open(pageData?.ctaSection?.secondaryButton_Href || 'tel:+441618841303', '_self') 
          }}
        />

        <TrustSignals />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}