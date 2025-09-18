import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import TrustSignals from '@/components/common/trust-signals';
import BackToTop from '@/components/common/back-to-top';
import Breadcrumb from '@/components/common/breadcrumb';
import ScrollProgress from '@/components/common/scroll-progress';
import PillCTA from '@/components/common/pill-cta';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'wouter';
import { MessageSquare, Truck, Zap, Wrench, Calendar, PoundSterling, Clock, Settings, RotateCcw, Cpu, Users, RefreshCw } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useEffect, useState } from 'react';
import { SEOHead } from '@/components/common/seo-head';
import { trackCTAClick } from '@/lib/analytics';
import { SEO_DATA } from '@/lib/seo-data';
import { strapiApi } from '@/lib/strapi';
import { equipmentRentalApi } from '@/lib/strapi/api/equipment-rental';
import { globalSettingsApi } from '@/lib/strapi/api/global-settings';
import type { EquipmentRentalPage } from '@/lib/strapi/types/equipment-rental';
import type { StrapiGlobalSettings } from '@/lib/strapi/types/global-settings';

export default function EquipmentRentals() {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const { elementRef: heroRef, isVisible: heroInView } = useIntersectionObserver({ threshold: 0.2, triggerOnce: true });
  const [, setLocation] = useLocation();
  
  // CMS Data State - Following proven pattern from clinical insourcing page
  const [pageData, setPageData] = useState<EquipmentRentalPage | null>(null);
  const [globalSettings, setGlobalSettings] = useState<StrapiGlobalSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  // Extract service details with static fallbacks - Following proven pattern from clinical insourcing page  
  const serviceDetails = pageData ? {
    title: pageData.serviceDetailsTitle,
    description: pageData.serviceDetailsDescription,
    image: {
      src: pageData.serviceImage,
      alt: pageData.serviceImageAlt
    },
    features: pageData.features?.map((feature, index) => ({
      icon: [
        <Zap className="h-6 w-6 text-compleo-teal" />,
        <Calendar className="h-6 w-6 text-compleo-teal" />,
        <PoundSterling className="h-6 w-6 text-compleo-teal" />,
        <Clock className="h-6 w-6 text-compleo-teal" />
      ][index] || <Zap className="h-6 w-6 text-compleo-teal" />,
      title: feature.title,
      description: feature.description
    })) || []
  } : {
    // Static fallback content
    title: "Flexible Equipment Rental Solutions",
    description: "Access cutting-edge MRI and CT equipment when you need it most. Our rental solutions provide immediate access to the latest technology with comprehensive support.",
    image: {
      src: "/images/services/siemens-mri-scanner-rental.jpg",
      alt: "Siemens MRI scanner available for equipment rental solutions"
    },
    features: [
      {
        icon: <Zap className="h-6 w-6 text-compleo-teal" />,
        title: "Quick Installation", 
        description: "Rapid deployment to minimise downtime and delays"
      },
      {
        icon: <Calendar className="h-6 w-6 text-compleo-teal" />,
        title: "Flexible Terms",
        description: "Short-term or long-term rentals to suit your needs"
      },
      {
        icon: <Wrench className="h-6 w-6 text-compleo-teal" />,
        title: "Full Support Included",
        description: "Complete maintenance and technical support throughout rental period"
      },
      {
        icon: <RotateCcw className="h-6 w-6 text-compleo-teal" />,
        title: "Latest Technology",
        description: "Access to newest imaging technology without capital investment"
      }
    ]
  };

  // Data fetching - Following proven pattern from clinical insourcing page
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Parallel fetch of page data and global settings
        const [pageResponse, globalResponse] = await Promise.all([
          equipmentRentalApi.getEquipmentRentalPage(),
          globalSettingsApi.getGlobalSettings()
        ]);

        setPageData(pageResponse);
        setGlobalSettings(globalResponse);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load page content';
        setError(errorMessage);
        console.error('Equipment Rental data loading failed', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const breadcrumbItems = [
    { label: 'Services', href: '/services' },
    { label: 'Equipment Rental' }
  ];

  // Loading state - Following proven pattern from working pages
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

  // Extract CMS data with static fallbacks - Following proven pattern from clinical insourcing page
  const heroContent = pageData ? {
    title: pageData.heroTitle,
    subtitle: pageData.heroSubtitle,
    button1: {
      text: pageData.primaryButton?.text || "MOBILE & Reloc",
      subtext: pageData.primaryButton?.subtext || "Units",
      href: pageData.primaryButton?.url || "/equipment-details",
      icon: <Truck className="h-5 w-5 group-hover:pulse transition-transform duration-300" />,
      analytics: pageData.primaryButton?.analyticsId || "MOBILE & Reloc Units - Equipment Rental Hero"
    },
    button2: {
      text: pageData.secondaryButton?.text || "EQUIPMENT",
      subtext: pageData.secondaryButton?.subtext || "Portfolio",
      href: pageData.secondaryButton?.url || "/equipment-details",
      icon: <MessageSquare className="h-5 w-5 group-hover:pulse transition-transform duration-300" />,
      analytics: pageData.secondaryButton?.analyticsId || "EQUIPMENT Portfolio - Equipment Rental Hero"
    }
  } : {
    // Static fallback content
    title: "Equipment Rental",
    subtitle: "Short, medium and long-term MRI/CT rental with rapid deployment and full support included.",
    button1: {
      text: "MOBILE & Reloc",
      subtext: "Units",
      href: "/equipment-details",
      icon: <Truck className="h-5 w-5 group-hover:pulse transition-transform duration-300" />,
      analytics: "MOBILE & Reloc Units - Equipment Rental Hero"
    },
    button2: {
      text: "EQUIPMENT",
      subtext: "Portfolio", 
      href: "/equipment-details",
      icon: <MessageSquare className="h-5 w-5 group-hover:pulse transition-transform duration-300" />,
      analytics: "EQUIPMENT Portfolio - Equipment Rental Hero"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead {...SEO_DATA.equipmentRentals} />
      <ScrollProgress />
      <Header />
      <main className="animate-fade-in-up">
        {/* Hero Section */}
        <section className="section-padding bg-compleo-deep-teal text-white">
          <div className="max-w-7xl mx-auto container-padding text-center">
            <div className="animate-slide-in-left">
              <h1 className="heading-1 mb-6">{heroContent.title}</h1>
              <p className="body-large text-gray-200 max-w-3xl mx-auto mb-8">{heroContent.subtitle}</p>
              <div className="flex flex-row gap-3 sm:gap-6 justify-center">
                <Link href={heroContent.button1.href} tabIndex={-1}>
                  <Button
                    size="lg"
                    className="group relative bg-gradient-to-br from-compleo-teal via-compleo-teal to-compleo-deep-teal hover:from-compleo-teal/90 hover:via-compleo-teal/90 hover:to-compleo-deep-teal/90 text-white px-4 sm:px-8 py-4 sm:py-3 rounded-xl shadow-xl hover:shadow-2xl border-2 border-white/40 hover:border-white/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 w-36 sm:w-48 h-auto"
                    onClick={() => {
                      trackCTAClick(heroContent.button1.analytics, '/services/equipment-rental');
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
                      trackCTAClick(heroContent.button2.analytics, '/services/equipment-rental');
                      if (shouldAnimate) {
                        const element = document.getElementById('equipment-portfolio');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      } else {
                        setLocation(heroContent.button2.href);
                      }
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



        {/* Mobile & Reloc Units Video Hero */}
        <section className="relative py-24 bg-compleo-deep-teal text-white overflow-hidden">
          {/* Background Video */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-30"
              aria-label="Mobile MRI scanner being transported to NHS Orkney facility and positioned for operational use"
            >
              <source
                src={pageData?.videoHeroBackgroundVideo || "/videos/OrkneyDelivery.mp4"}
                type="video/mp4"
              />
              <p>Your browser does not support the video element. This video shows a mobile MRI scanner being transported to NHS Orkney and positioned for operational use.</p>
              {/* Fallback background image */}
              <div 
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('${pageData?.videoHeroFallbackImage || '/images/services/mobile-imaging-hero.jpg'}')`
                }}
                aria-label="Mobile MRI scanner being transported to NHS Orkney facility and positioned for operational use"
              />
            </video>
          </div>
          
          {/* Content */}
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
            <div className="w-24 h-1 bg-compleo-yellow mx-auto mb-6"></div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {pageData?.videoHeroTitle || "Bringing Imaging to Your Doorstep"}
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              {pageData?.videoHeroDescription || "Our mobile and relocatable units deliver advanced imaging services directly to your location, providing flexible solutions for temporary or permanent installations."}
            </p>
            <Link href="/equipment-details" tabIndex={-1}>
              <Button
                size="lg"
                className="group bg-gradient-to-br from-compleo-teal via-compleo-teal to-compleo-deep-teal hover:from-compleo-teal/90 hover:via-compleo-teal/90 hover:to-compleo-deep-teal/90 text-white font-bold px-8 py-3 rounded-xl shadow-xl hover:shadow-2xl border-2 border-white/40 hover:border-white/60 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                onClick={() => {
                  setLocation('/equipment-details');
                }}
              >
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Mobile & Reloc Units
                </div>
              </Button>
            </Link>
          </div>
        </section>

        {/* Mobile & Relocatable Units Introduction */}
        <section className="section-padding bg-gray-100">
          <div className="max-w-7xl mx-auto container-padding">
            <div className="text-center mb-12">
              <h2 className="heading-2 text-compleo-deep-teal mb-6">
                {pageData?.mobileUnitsTitle || "Mobile & Relocatable Units"}
              </h2>
              <p className="body-large text-gray-600 max-w-4xl mx-auto mb-8">
                {pageData?.mobileUnitsDescription || "Mobile units provide diagnostic imaging services to patients using specially designed vans equipped with advanced imaging equipment. Our radiology outsourcing mobile solutions are a convenient and cost-effective option for medical facilities, clinics, and hospitals."}
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-compleo-deep-teal mb-6">
                  {pageData?.MobileSolutionsText_Title || "Cost-Effective Mobile Solutions"}
                </h3>
                <p className="text-lg text-gray-700 mb-8">
                  {pageData?.MobileSolutionsText_Description || "Medical facilities that require additional imaging capacity but cannot afford to invest in expensive imaging equipment can access the latest imaging technologies and expertise without significant capital investments."}
                </p>
                <div className="space-y-6">
                  {/* CMS-driven features with static fallback */}
                  {(pageData?.mobileUnitsFeatures && pageData.mobileUnitsFeatures.length > 0 ? 
                    pageData.mobileUnitsFeatures : [
                      { title: "Specially Designed Units", description: "Advanced imaging equipment housed in purpose-built mobile units" },
                      { title: "Capital Investment Alternative", description: "Access latest technology without expensive equipment purchases" },
                      { title: "Expert Support", description: "Professional imaging expertise and technical support included" }
                    ]).map((feature, index) => {
                    // Static icon assignment based on index for consistent visuals
                    const icons = [Truck, PoundSterling, Users];
                    const IconComponent = icons[index % icons.length];
                    
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className="bg-compleo-teal/10 p-3 rounded-lg">
                          <IconComponent className="h-6 w-6 text-compleo-teal" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-compleo-deep-teal mb-2">{feature.title}</h4>
                          <p className="text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <img 
                  src="/images/services/mobile-imaging-hero.jpg"
                  alt="Compleo relocatable MRI unit with brand teal and white exterior"
                  className="w-full h-96 object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <PillCTA
          heading={pageData?.ctaSection?.title || "Need Equipment Rental Solutions?"}
          description={pageData?.ctaSection?.description || "Contact us to discuss your equipment rental requirements and get a tailored solution for your healthcare facility."}
          primaryButton={{ text: pageData?.ctaSection?.primaryButton_text || "Contact Us", href: pageData?.ctaSection?.primaryButton_Href || "/contact" }}
          secondaryButton={{ text: pageData?.ctaSection?.secondaryButton_text || "Call: +44 (0)161 884 1303", onClick: () => window.open('tel:+441618841303', '_self') }}
        />

        <TrustSignals />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}