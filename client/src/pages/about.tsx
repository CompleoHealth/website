import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import TrustSignals from '@/components/common/trust-signals';
import BackToTop from '@/components/common/back-to-top';
import ScrollProgress from '@/components/common/scroll-progress';
import { SEOHead } from '@/components/common/seo-head';
import { SEO_DATA } from '@/lib/seo-data';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link, useLocation } from 'wouter';
import { 
  Users, 
  Target, 
  Heart, 
  Handshake,
  MapPin,
  TrendingUp,
  Shield,
  Cpu,
  Handshake as HandshakeIcon
} from 'lucide-react';
import { MedicalIcon, TechIcon, BrandedIcon } from '@/components/ui/branded-icons';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { trackCTAClick } from '@/lib/analytics';
import { ImpactStatistics } from '@/components/common/impact-statistics';
import { useEffect, useState } from 'react';
import { fetchAboutPageData } from '@/lib/strapi/api/about';
import { globalSettingsApi } from '@/lib/strapi/api/global-settings';
import { AboutPage } from '@/lib/strapi/types/about';
import { StrapiGlobalSettings } from '@/lib/strapi/types';

// CMS-ready data structures
const heroContent = {
  title: "Leaders in",
  highlightWord: "Diagnostic Imaging", 
  subtitle: "Since 2021, we've been revolutionising healthcare through innovative imaging solutions, passionate service delivery, and unwavering commitment to patient care.",
  primaryButton: {
    text: "JOIN",
    subtext: "Our Team",
    href: "/work-with-us",
    icon: Users,
    trackingLabel: "JOIN Our Team - About Hero"
  },
  secondaryButton: {
    text: "CONTACT", 
    subtext: "Us",
    href: "/contact",
    icon: Handshake,
    trackingLabel: "CONTACT Us - About Hero"
  }
};

const companyOverview = {
  title: "About Compleo Health",
  paragraphs: [
    {
      text: "Compleo Health is a ",
      highlight: "CQC-registered diagnostic imaging services provider",
      text2: " with over 40 years of combined managed healthcare experience. We specialise in delivering innovative and comprehensive solutions to healthcare providers across the UK and Europe. Our services are continuously expanding to support both the NHS and the independent sector by offering a range of solutions tailored to meet the unique needs of our customers."
    },
    {
      text: "At Compleo Health, we provide ",
      highlight: "state-of-the-art imaging equipment",
      text2: ", including MRI and CT scanners, along with mobile and relocatable units that deliver flexible and reliable diagnostic imaging solutions. Our trailers and relocatable units enable healthcare providers to maintain high standards of care without significant capital investment, offering both interim and permanent diagnostic imaging solutions."
    },
    {
      text: "We are committed to providing ",
      highlight: "exceptional service and support",
      text2: ". Our bespoke solutions are designed for a range of healthcare providers, including hospitals, clinics, imaging centres, and mobile imaging providers. Whether you need short-term or long-term support, we have the expertise and resources to meet your imaging needs and exceed your expectations."
    }
  ],
  features: [
    {
      icon: Shield,
      iconType: 'medical' as const,
      title: "CQC Registered",
      description: "Fully regulated and compliant with healthcare standards"
    },
    {
      icon: MapPin,
      iconType: 'info' as const, 
      title: "UK & Europe",
      description: "Comprehensive coverage across multiple countries"
    },
    {
      icon: TrendingUp,
      iconType: 'success' as const,
      title: "100+ Years", 
      description: "Combined managed healthcare experience"
    }
  ]
};

const valuesSection = {
  title: "Our Values",
  description: "These core values guide every decision we make and every service we deliver."
};

const ctaContent = {
  title: "Ready to Partner With Us?",
  description: "Discover how Compleo Health can transform your diagnostic imaging capabilities and improve patient outcomes.",
  buttonText: "Partner With Us",
  buttonHref: "/contact"
};

export default function About() {
  const { elementRef: heroRef, isVisible: heroInView } = useIntersectionObserver({ threshold: 0.2, triggerOnce: true });
  const [, setLocation] = useLocation();
  const { elementRef: storyRef, isVisible: storyInView } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  
  // State for CMS data
  const [pageData, setPageData] = useState<AboutPage | null>(null);
  const [globalSettings, setGlobalSettings] = useState<StrapiGlobalSettings | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  
  // Fetch CMS data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Parallel API calls for page data and global settings
        const [aboutPageData, globalSettingsData] = await Promise.all([
          fetchAboutPageData(),
          globalSettingsApi.getGlobalSettings()
        ]);
        
        setPageData(aboutPageData as any); // Type assertion to fix TypeScript issue
        setGlobalSettings(globalSettingsData);
        setLoading(false);
      } catch (err) {
        // Error handling without console logs
        setError(true);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const values = [
    {
      icon: Heart,
      title: 'Patient-Centered Care',
      description: 'Every decision we make prioritises patient outcomes and experience',
      iconType: 'medical' as const
    },
    {
      icon: Cpu,
      title: 'Innovation',
      description: 'Continuously advancing technology to improve diagnostic capabilities',
      iconType: 'tech' as const
    },
    {
      icon: HandshakeIcon,
      title: 'Partnership',
      description: 'Building lasting relationships based on trust and mutual success',
      iconType: 'primary' as const
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'Maintaining the highest standards of quality, safety, and compliance',
      iconType: 'primary' as const
    },
    {
      icon: TrendingUp,
      title: 'Excellence',
      description: 'Striving for exceptional service delivery in everything we do',
      iconType: 'primary' as const
    },
    {
      icon: Target,
      title: 'Responsiveness',
      description: 'Quick, reliable solutions that meet urgent healthcare needs',
      iconType: 'primary' as const
    }
  ];



  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead {...SEO_DATA.about} />
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
        {/* Hero Section */}
        <section ref={heroRef} className="section-padding-lg bg-compleo-deep-teal text-white relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/about/about-hero-team.jpg" 
              alt="Compleo Health team learning session with professionals discussing healthcare solutions and diagnostic imaging innovations"
              className="w-full h-full object-cover opacity-40"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-compleo-deep-teal/60"></div>
          </div>
          <div className="max-w-7xl mx-auto container-padding relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={`transition-all duration-700 ${heroInView ? 'animate-slide-in-left opacity-100' : 'opacity-0 translate-x-[-50px]'}`}>
                <h1 className="heading-1 mb-4">
                  {pageData?.heroTitle || heroContent.title} <span className="text-compleo-yellow">{pageData?.heroHighlightWord || heroContent.highlightWord}</span>
                </h1>
                <p className="body-large text-gray-200 mb-6 leading-relaxed relative">
                  <span className="relative z-10">{pageData?.heroSubtitle || heroContent.subtitle}</span>
                  <span className="absolute inset-0 bg-black/30 rounded-lg -z-10 px-3 py-1"></span>
                </p>
                <div className="flex flex-row gap-3 sm:gap-6">
                  <Link href={pageData?.heroPrimaryButton_href || heroContent.primaryButton.href} tabIndex={-1}>
                    <Button
                      size="lg"
                      className="group relative bg-gradient-to-br from-compleo-teal via-compleo-teal to-compleo-deep-teal hover:from-compleo-teal/90 hover:via-compleo-teal/90 hover:to-compleo-deep-teal/90 text-white px-4 sm:px-8 py-4 sm:py-3 rounded-xl shadow-xl hover:shadow-2xl border-2 border-white/40 hover:border-white/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 w-36 sm:w-48 h-auto"
                      onClick={() => {
                        trackCTAClick(pageData?.heroPrimaryButton_trackingLabel || heroContent.primaryButton.trackingLabel, '/about');
                        setLocation(pageData?.heroPrimaryButton_href || heroContent.primaryButton.href);
                      }}
                    >
                      <div className="flex flex-col items-center gap-1 sm:gap-1.5">
                        <div className="bg-white/20 rounded-full p-1">
                          <Users className="h-4 w-4 sm:h-5 sm:w-5 group-hover:pulse transition-transform duration-300" />
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-sm sm:text-base font-semibold tracking-wider">{pageData?.heroPrimaryButton_text || heroContent.primaryButton.text}</span>
                          <span className="text-xs font-medium opacity-90">{pageData?.heroPrimaryButton_subtext || heroContent.primaryButton.subtext}</span>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </Button>
                  </Link>
                  <Link href={pageData?.heroSecondaryButton_href || heroContent.secondaryButton.href} tabIndex={-1}>
                    <Button
                      size="lg"
                      className="group bg-compleo-yellow hover:bg-compleo-yellow/90 text-compleo-deep-teal px-4 sm:px-8 py-4 sm:py-3 rounded-xl shadow-xl hover:shadow-2xl border-2 border-compleo-deep-teal/30 hover:border-compleo-deep-teal/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 w-36 sm:w-48 h-auto"
                      onClick={() => {
                        trackCTAClick(pageData?.heroSecondaryButton_trackingLabel || heroContent.secondaryButton.trackingLabel, '/about');
                        setLocation(pageData?.heroSecondaryButton_href || heroContent.secondaryButton.href);
                      }}
                    >
                      <div className="flex flex-col items-center gap-1 sm:gap-1.5">
                        <div className="bg-compleo-deep-teal/20 rounded-full p-1">
                          <Handshake className="h-4 w-4 sm:h-5 sm:w-5 group-hover:pulse transition-transform duration-300" />
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-sm sm:text-base font-semibold tracking-wider">{pageData?.heroSecondaryButton_text || heroContent.secondaryButton.text}</span>
                          <span className="text-xs font-medium opacity-90">{pageData?.heroSecondaryButton_subtext || heroContent.secondaryButton.subtext}</span>
                        </div>
                      </div>
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-white/30 relative z-10">
                <ImpactStatistics
                  variant="hero"
                  textColor="yellow"
                  gridCols={3}
                  title={"Trusted by Healthcare Leaders and Patients"}
                  headingLevel="h2"
                  statistics={globalSettings?.ImpactStatistics?.statistics}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Company Overview Section */}
        <section ref={storyRef} className="py-20 bg-[#ffffff]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`max-w-4xl mx-auto transition-all duration-700 ${storyInView ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'}`}>
              <div className="text-center mb-16">
                <h2 className="heading-2 text-compleo-deep-teal mb-6">{pageData?.companyTitle || companyOverview.title}</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-compleo-teal to-compleo-yellow mx-auto mb-8"></div>
              </div>
              
              <div className="bg-gradient-to-br from-white to-gray-50/30 rounded-2xl shadow-2xl p-8 lg:p-12 border-2 border-gray-100 hover:shadow-3xl transition-shadow duration-300">
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                  {(pageData?.companyParagraphs && pageData.companyParagraphs.length > 0 ? pageData.companyParagraphs : companyOverview.paragraphs).map((paragraph, index) => {
                    // Handle both old and new schema formats
                    const parts = paragraph.text.split('[highlight]');
                    if (parts.length > 1) {
                      // New format with [highlight] placeholder
                      return (
                        <p key={index} className="text-lg leading-relaxed">
                          {parts[0]}
                          <strong className="text-compleo-deep-teal">{paragraph.highlight}</strong>
                          {parts[1]}
                        </p>
                      );
                    } else if ('text2' in paragraph) {
                      // Old format with separate text2 field
                      return (
                        <p key={index} className="text-lg leading-relaxed">
                          {paragraph.text}
                          <strong className="text-compleo-deep-teal">{paragraph.highlight}</strong>
                          {paragraph.text2}
                        </p>
                      );
                    } else {
                      // Fallback for incomplete data
                      return (
                        <p key={index} className="text-lg leading-relaxed">
                          {paragraph.text} <strong className="text-compleo-deep-teal">{paragraph.highlight}</strong>
                        </p>
                      );
                    }
                  })}
                </div>
                
                <div className="mt-10 pt-8 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {(pageData?.companyFeatures && pageData.companyFeatures.length > 0 ? pageData.companyFeatures : companyOverview.features).map((feature, index) => {
                      // Map feature index to default icons for simplified schema
                      const getDefaultIcon = (idx: number) => {
                        const icons = [Shield, MapPin, TrendingUp];
                        return icons[idx % icons.length];
                      };
                      
                      // Handle both CMS data and static data formats
                      let IconComponent;
                      let iconType = 'primary';
                      
                      if ('icon' in feature && feature.icon) {
                        // Static data with icon property
                        IconComponent = feature.icon;
                        iconType = feature.iconType || 'primary';
                      } else if ('iconName' in feature && feature.iconName) {
                        // CMS data with iconName
                        switch(feature.iconName) {
                          case 'Shield': IconComponent = Shield; break;
                          case 'MapPin': IconComponent = MapPin; break;
                          case 'TrendingUp': IconComponent = TrendingUp; break;
                          default: IconComponent = Shield;
                        }
                        iconType = feature.iconType || 'primary';
                      } else {
                        // Simplified schema without icon information
                        IconComponent = getDefaultIcon(index);
                      }
                      
                      return (
                        <div key={index} className="space-y-4">
                          <div className="flex justify-center mb-4">
                            {iconType === 'medical' ? (
                              <MedicalIcon icon={IconComponent} />
                            ) : (
                              <BrandedIcon icon={IconComponent} variant={iconType as any} />
                            )}
                          </div>
                          <h3 className="text-lg font-bold text-compleo-deep-teal">{feature.title}</h3>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section - Professional Geometric Design */}
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto container-padding">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="heading-2 text-compleo-deep-teal mb-6">{pageData?.valuesTitle || valuesSection.title}</h2>
              <p className="body-large text-compleo-gray max-w-3xl mx-auto">
                {pageData?.valuesDescription || valuesSection.description}
              </p>
            </div>

            {/* Values Layout - Hexagonal Grid */}
            <div className="relative">
              {/* Top Row - 2 cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
                {(pageData?.companyValues && pageData.companyValues.length > 0 ? pageData.companyValues.slice(0, 2) : values.slice(0, 2)).map((value, index) => (
                  <div key={index} className="group relative">
                    <div className="bg-gradient-to-br from-compleo-deep-teal to-compleo-teal text-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 overflow-hidden">
                      {/* Geometric Pattern Background */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-compleo-yellow rounded-full -mr-16 -mt-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full -ml-12 -mb-12"></div>
                      </div>
                      
                      <div className="relative z-10 text-center">
                        <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                        <div className="w-16 h-1 bg-compleo-yellow mx-auto mb-6 rounded-full"></div>
                        <p className="text-white/90 leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Middle Row - 2 cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
                {(pageData?.companyValues && pageData.companyValues.length > 0 ? pageData.companyValues.slice(2, 4) : values.slice(2, 4)).map((value, index) => (
                  <div key={index + 2} className="group relative">
                    <div className="bg-white border-2 border-compleo-teal/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:border-compleo-teal/40 overflow-hidden">
                      {/* Geometric Pattern Background */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-0 left-0 w-28 h-28 bg-compleo-teal rounded-full -ml-14 -mt-14"></div>
                        <div className="absolute bottom-0 right-0 w-20 h-20 bg-compleo-yellow rounded-full -mr-10 -mb-10"></div>
                      </div>
                      
                      <div className="relative z-10 text-center">
                        <h3 className="text-2xl font-bold text-compleo-deep-teal mb-4">{value.title}</h3>
                        <div className="w-16 h-1 bg-gradient-to-r from-compleo-teal to-compleo-yellow mx-auto mb-6 rounded-full"></div>
                        <p className="text-gray-700 leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Row - 2 cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {(pageData?.companyValues && pageData.companyValues.length > 0 ? pageData.companyValues.slice(4, 6) : values.slice(4, 6)).map((value, index) => (
                  <div key={index + 4} className="group relative">
                    <div className="bg-gradient-to-br from-compleo-yellow to-compleo-yellow/80 text-compleo-deep-teal rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 overflow-hidden">
                      {/* Geometric Pattern Background */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-36 h-36 bg-compleo-deep-teal rounded-full -mr-18 -mt-18"></div>
                        <div className="absolute bottom-0 left-0 w-28 h-28 bg-white/30 rounded-full -ml-14 -mb-14"></div>
                      </div>
                      
                      <div className="relative z-10 text-center">
                        <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                        <div className="w-16 h-1 bg-compleo-deep-teal mx-auto mb-6 rounded-full"></div>
                        <p className="text-compleo-deep-teal/90 leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Connecting Lines - Subtle */}
              <div className="absolute inset-0 pointer-events-none hidden lg:block">
                <svg className="w-full h-full opacity-10" viewBox="0 0 800 600" aria-hidden="true">
                  <defs>
                    <linearGradient id="valueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00A990" />
                      <stop offset="100%" stopColor="#F7C948" />
                    </linearGradient>
                  </defs>
                  {/* Subtle connecting lines */}
                  <line x1="200" y1="120" x2="600" y2="120" stroke="url(#valueGradient)" strokeWidth="2" strokeDasharray="3,3" />
                  <line x1="200" y1="300" x2="600" y2="300" stroke="url(#valueGradient)" strokeWidth="2" strokeDasharray="3,3" />
                  <line x1="200" y1="480" x2="600" y2="480" stroke="url(#valueGradient)" strokeWidth="2" strokeDasharray="3,3" />
                  <line x1="400" y1="120" x2="400" y2="480" stroke="url(#valueGradient)" strokeWidth="2" strokeDasharray="3,3" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        

        

        {/* CTA Section with Curved Pill Design */}
        <section className="bg-white">
          <div className="services-cta-pill-wrapper">
            <div className="services-cta-layer1"></div>
            <div className="services-cta-layer2"></div>
            <div className="services-cta-layer3"></div>
            <div className="services-cta-content-overlay">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex items-center justify-start h-full">
                  <div className="max-w-2xl text-white text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{pageData?.ctaTitle || ctaContent.title}</h2>
                    <p className="text-xl text-gray-300 mb-8">{pageData?.ctaDescription || ctaContent.description}</p>
                    <div className="flex justify-start">
                      <Link href={pageData?.ctaButtonHref || ctaContent.buttonHref} tabIndex={-1}>
                        <Button
                          className="bg-gradient-to-br from-compleo-teal via-compleo-teal to-compleo-deep-teal hover:from-compleo-teal/90 hover:via-compleo-teal/90 hover:to-compleo-deep-teal/90 text-white font-bold px-8 py-3 rounded-xl shadow-xl hover:shadow-2xl border-2 border-white/40 hover:border-white/60 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                          onClick={() => setLocation(pageData?.ctaButtonHref || ctaContent.buttonHref)}
                        >
                          {pageData?.ctaButtonText || ctaContent.buttonText}
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
