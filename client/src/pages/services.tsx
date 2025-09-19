import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ServiceCard from '@/components/services/service-card';
import TrustSignals from '@/components/common/trust-signals';
import BackToTop from '@/components/common/back-to-top';
import ScrollProgress from '@/components/common/scroll-progress';
import { SEOHead } from '@/components/common/seo-head';
import { SEO_DATA } from '@/lib/seo-data';

import CurvedSectionHeader from '@/components/common/curved-section-header';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'wouter';
import { MessageSquare, Stethoscope } from 'lucide-react';

import { ImpactStatistics } from '@/components/common/impact-statistics';
import { trackCTAClick } from '@/lib/analytics';

import { useEffect, useState } from 'react';
import { strapiApi } from '@/lib/strapi';
import { StrapiServicesPage } from '@/lib/strapi/types/services';
import { StrapiGlobalSettings } from '@/lib/strapi/types/global-settings';

export default function ServicesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageData, setPageData] = useState<StrapiServicesPage | null>(null);
  const [globalSettings, setGlobalSettings] = useState<StrapiGlobalSettings | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        // Fetch both services page data and global settings (like home page)
        const [servicesPageData, globalSettingsData] = await Promise.all([
          strapiApi.getServicesPage(),
          strapiApi.getGlobalSettings()
        ]);
        

        
        // Update page data state
        setPageData(servicesPageData);
        setGlobalSettings(globalSettingsData);
      } catch (err) {
        console.error('Error fetching page data:', err);
        setError('Failed to load page content');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPageData();
  }, []);

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

  // Hero section content (CMS-driven)
  const heroContent = pageData?.heroContent ? {
    title1: pageData.heroContent.heading,
    title2: pageData.heroContent.highlighttext,
    subtitle: pageData.heroContent.subheading,
    button1: {
      text: pageData.heroContent.primaryButton?.text || "CONTACT Us",
      href: pageData.heroContent.primaryButton?.url || "/contact",
      icon: <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 group-hover:pulse transition-transform duration-300" />
    },
    button2: undefined,
    backgroundImage: pageData.heroContent.fallbackImageURL,
    backgroundColor: pageData.heroContent.backgroundColor || "compleo-deep-teal",
    textColor: pageData.heroContent.textColor || "white"
  } : {
    title1: "Healthcare Solutions",
    title2: undefined,
    subtitle: "Comprehensive imaging services designed for NHS Trusts, hospitals, and healthcare providers across the UK.",
    button1: {
      text: "CONTACT Us",
      href: "/contact",
      icon: <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 group-hover:pulse transition-transform duration-300" />
    },
    button2: undefined,
    backgroundImage: undefined,
    backgroundColor: "compleo-deep-teal",
    textColor: "white"
  };

  // Services data (CMS-driven with fallback)
  // Apply HOME PAGE SUCCESS PATTERN: Use CMS data first, fallback to static data
  const services = pageData?.services && pageData.services.length > 0 
    ? pageData.services.map(service => ({
        title: service.title,
        description: service.description,
        Features: service.Features || [],
        imageUrl: service.imageUrl || '/images/services/default.jpg',
        imageAlt: service.title,
        href: service.linkUrl || '#'
      }))
    : [
        {
          title: 'Managed Equipment Services',
          description: 'Turnkey solutions, maintenance, and 24/7 support.',
          Features: [
            { id: 1, text: 'Complete equipment management' },
            { id: 2, text: 'Preventive maintenance included' },
            { id: 3, text: 'AI-enhanced diagnostics' },
            { id: 4, text: '24/7 technical support' }
          ],
          imageUrl: '/images/services/managed-equipment-card.jpg',
          imageAlt: 'CT scanner operation with technician monitoring from control room',
          href: '/services/managed-equipment',
        },
        {
          title: 'Equipment Rental',
          description: 'Short, medium and long-term MRI/CT rental with rapid deployment.',
          Features: [
            { id: 1, text: 'Quick installation' },
            { id: 2, text: 'Flexible terms' },
            { id: 3, text: 'Full support included' },
            { id: 4, text: 'Latest technology' }
          ],
          imageUrl: '/images/services/siemens-mri-scanner-rental.jpg',
          imageAlt: 'Modern Siemens MRI scanner in clinical setting with ambient lighting',
          href: '/services/equipment-rental',
        },
        {
          title: 'Community Diagnostic Centres',
          description: 'Comprehensive and efficient diagnostic facilities for improved patient access.',
          Features: [
            { id: 1, text: 'Community accessibility' },
            { id: 2, text: 'Streamlined pathways' },
            { id: 3, text: 'Reduced wait times' },
            { id: 4, text: 'NHS integration' }
          ],
          imageUrl: '/images/services/community-diagnostic-centre-card.jpg',
          imageAlt: 'Compleo Community Diagnostic Centre in partnership with NHS Dartford and Gravesham',
          href: '/services/community-diagnostic-centres',
        },
        {
          title: 'Screening Programmes',
          description: 'Streamlined screening integration for early detection programs.',
          Features: [
            { id: 1, text: 'Early detection focus' },
            { id: 2, text: 'Quick turnaround' },
            { id: 3, text: 'NHS integration' },
            { id: 4, text: 'Expert reporting' }
          ],
          imageUrl: '/images/services/screening-programs-card.jpg',
          imageAlt: 'Compleo mobile CT unit for screening programs deployment',
          href: '/services/screening-programmes',
        },
        {
          title: 'Clinical Insourcing',
          description: 'Flexible staffing solutions to boost efficiency and reduce wait times.',
          Features: [
            { id: 1, text: 'Qualified radiographers' },
            { id: 2, text: 'Flexible scheduling' },
            { id: 3, text: 'Seamless integration' },
            { id: 4, text: 'Competitive rates' }
          ],
          imageUrl: '/images/clinical-insourcing/radiographer-ct-room.jpg',
          imageAlt: 'Professional radiographer in CT scanning room',
          href: '/services/clinical-insourcing',
        },
        {
          title: 'Mobile and Relocatable Imaging Units',
          description: 'Scalable solutions bringing advanced imaging directly to your location.',
          Features: [
            { id: 1, text: 'On-site services' },
            { id: 2, text: 'State-of-art equipment' },
            { id: 3, text: 'Flexible scheduling' },
            { id: 4, text: 'Rapid deployment' }
          ],
          imageUrl: '/images/services/mobile-imaging-card.jpg',
          imageAlt: 'Compleo relocatable MRI unit with brand teal and white exterior',
          href: '/equipment-details',
        },
      ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead {...SEO_DATA.services} />
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
        {/* Hero Section - CMS Configurable */}
        <section 
          className={`section-padding-lg bg-${heroContent.backgroundColor} text-${heroContent.textColor} relative overflow-hidden`}
          style={heroContent.backgroundImage ? { 
            backgroundImage: `url(${heroContent.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          } : undefined}
        >
          {/* Background overlay if image is used */}
          {heroContent.backgroundImage && (
            <div className="absolute inset-0 bg-compleo-deep-teal/60 z-10"></div>
          )}
          
          <div className="max-w-7xl mx-auto container-padding text-center relative z-20">
            <div className="animate-slide-in-left">
              <h1 className="heading-1 mb-4">
                {heroContent.title1}
                {heroContent.title2 && <span className="block">{heroContent.title2}</span>}
              </h1>
              <p className="body-large text-gray-200 max-w-3xl mx-auto mb-6">
                {heroContent.subtitle}
              </p>
            </div>
            <div className="flex justify-center items-center">
              <Link href={heroContent.button1.href} tabIndex={-1}>
                <Button
                  size="lg"
                  className="group relative bg-gradient-to-br from-compleo-teal via-compleo-teal to-compleo-deep-teal hover:from-compleo-teal/90 hover:via-compleo-teal/90 hover:to-compleo-deep-teal/90 text-white px-6 sm:px-8 py-3 rounded-xl shadow-xl hover:shadow-2xl border-2 border-white/40 hover:border-white/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 w-44 sm:w-48 h-auto"
                  onClick={() => {
                    trackCTAClick('CONTACT Us - Services Hero', '/services');
                    setLocation(heroContent.button1.href);
                  }}
                >
                  <div className="flex flex-col items-center gap-1 sm:gap-1.5">
                    <div className="bg-white/20 rounded-full p-1">
                      {heroContent.button1.icon}
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-sm sm:text-base font-semibold tracking-wider">{heroContent.button1.text.split(' ')[0]}</span>
                      <span className="text-xs font-medium opacity-90">{heroContent.button1.text.split(' ').slice(1).join(' ')}</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-slide-in-up">
              <h2 className="heading-2 text-compleo-deep-teal mb-6">
                {pageData?.sectionTitle || "Our Services"}
              </h2>
              <p className="body-large text-compleo-gray max-w-3xl mx-auto">
                {pageData?.sectionDescription || "From managed equipment services to mobile imaging units, we provide comprehensive solutions tailored to your specific needs."}
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {services.map((service: any, index: number) => (
                <div 
                  key={index}
                  className="animate-slide-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <ServiceCard 
                    title={service.title}
                    description={service.description}
                    Features={service.Features}
                    imageUrl={service.imageUrl}
                    imageAlt={service.imageAlt}
                    href={service.href}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="bg-gray-100">
          <CurvedSectionHeader title={pageData?.PillText || "Why our customers choose Compleo Health"} />
          <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[30px] pb-[30px]">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-in-left">
                <div className="space-y-6">
                  {/* CMS-driven approach features */}
                  {pageData?.ApproachFeatures?.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-8 h-8 bg-compleo-teal rounded-full flex items-center justify-center mr-4 mt-1">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-compleo-deep-teal mb-2">{feature.title}</h3>
                        <p className="body-base text-compleo-gray">{feature.description}</p>
                      </div>
                    </div>
                  )) || (
                    // Fallback content
                    <>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-compleo-teal rounded-full flex items-center justify-center mr-4 mt-1">
                          <span className="text-white font-bold text-sm">1</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-compleo-deep-teal mb-2">Rapid Deployment</h3>
                          <p className="body-base text-compleo-gray">Fast setup to meet tight budgets and urgent deadlines with our experienced deployment team.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-compleo-teal rounded-full flex items-center justify-center mr-4 mt-1">
                          <span className="text-white font-bold text-sm">2</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-compleo-deep-teal mb-2">Cost Savings</h3>
                          <p className="body-base text-compleo-gray">Achieve 6%+ cost savings through our efficient service delivery and competitive pricing models.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-compleo-teal rounded-full flex items-center justify-center mr-4 mt-1">
                          <span className="text-white font-bold text-sm">3</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-compleo-deep-teal mb-2">Advanced Technology</h3>
                          <p className="body-base text-compleo-gray">AI-powered scanners and helium-free technology for superior diagnostics and sustainability.</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="bg-gradient-to-br from-compleo-deep-teal to-compleo-teal rounded-2xl p-8 shadow-2xl border-2 border-compleo-teal/30 animate-slide-in-right">
                <ImpactStatistics
                  variant="hero"
                  textColor="yellow"
                  gridCols={3}
                  title={pageData?.impactStatsTitle || "Trusted by Healthcare Leaders and Patients"}
                  headingLevel="h3"
                  statistics={globalSettings?.ImpactStatistics?.statistics}
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section with Curved Pill Design */}
        <section className="bg-white">
          {/* Recreate exact pill design structure with custom height */}
          <div className="services-cta-pill-wrapper">
            <div className="services-cta-layer1"></div>
            <div className="services-cta-layer2"></div>
            <div className="services-cta-layer3"></div>
            <div className="services-cta-content-overlay">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex items-center justify-start h-full">
                  <div className="max-w-2xl text-white text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      {pageData?.CurvedPill_CTA?.title || "Ready to Explore Our Services?"}
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                      {pageData?.CurvedPill_CTA?.description || "Join the 30+ NHS Trusts who trust Compleo Health."}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-start">
                      <Link href={pageData?.CurvedPill_CTA?.primaryButton_Href || "/contact"} tabIndex={-1}>
                        <Button
                          size="lg"
                          className="bg-gradient-to-br from-compleo-teal via-compleo-teal to-compleo-deep-teal hover:from-compleo-teal/90 hover:via-compleo-teal/90 hover:to-compleo-deep-teal/90 text-white font-bold px-6 py-2 sm:px-8 sm:py-3 rounded-xl shadow-xl hover:shadow-2xl border-2 border-white/40 hover:border-white/60 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                          onClick={() => setLocation(pageData?.CurvedPill_CTA?.primaryButton_Href || "/contact")}
                        >
                          {pageData?.CurvedPill_CTA?.primaryButton_text || "Contact Us"}
                        </Button>
                      </Link>
                      <Link href={pageData?.CurvedPill_CTA?.secondaryButton_Href || "tel:+441618841303"} tabIndex={-1}>
                        <Button
                          size="lg"
                          className="bg-compleo-yellow hover:bg-compleo-yellow/90 text-compleo-deep-teal font-bold px-6 py-2 sm:px-8 sm:py-3 rounded-xl shadow-xl hover:shadow-2xl border-2 border-compleo-yellow/40 hover:border-compleo-yellow/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                          onClick={() => setLocation(pageData?.CurvedPill_CTA?.secondaryButton_Href || "tel:+441618841303")}
                        >
                          {pageData?.CurvedPill_CTA?.secondaryButton_text || "Call: +44 (0)161 884 1303"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
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
