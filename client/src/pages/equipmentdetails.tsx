import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import EquipmentShowcase from '@/components/equipment/equipment-showcase';
import TrustSignals from '@/components/common/trust-signals';
import BackToTop from '@/components/common/back-to-top';
import Breadcrumb from '@/components/common/breadcrumb';
import ScrollProgress from '@/components/common/scroll-progress';
import PillCTA from '@/components/common/pill-cta';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'wouter';
import { MessageSquare, Truck, MapPin, Clock, Shield, Play, Pause } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useEffect, useState, useRef } from 'react';
import { SEOHead } from '@/components/common/seo-head';
import { SEO_DATA } from '@/lib/seo-data';

// CMS Integration imports - Following proven pattern
import { equipmentDetailsApi } from '@/lib/strapi/api/equipment-details';
import { globalSettingsApi } from '@/lib/strapi/api/global-settings';
import { EquipmentDetailsPage } from '@/lib/strapi/types/equipment-details';
import { StrapiGlobalSettings } from '@/lib/strapi/types/global-settings';

export default function EquipmentDetails() {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const { elementRef: heroRef, isVisible: heroInView } = useIntersectionObserver({ threshold: 0.2, triggerOnce: true });
  const [, setLocation] = useLocation();
  
  // CMS Integration state - Following proven pattern
  const [pageData, setPageData] = useState<EquipmentDetailsPage | null>(null);
  const [globalSettings, setGlobalSettings] = useState<StrapiGlobalSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Video controls state - WCAG 2.1 AA compliance
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideo2Playing, setIsVideo2Playing] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const video2Ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShouldAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Data fetching - Following proven pattern from other service pages
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Parallel fetch of page data and global settings
        const [pageResponse, globalResponse] = await Promise.all([
          equipmentDetailsApi.getEquipmentDetailsPage(),
          globalSettingsApi.getGlobalSettings()
        ]);

        setPageData(pageResponse);
        setGlobalSettings(globalResponse);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load page content';
        setError(errorMessage);
        console.error('Equipment Details data loading failed', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Handle hash scrolling on page load
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }
  }, []);

  // Video toggle functions - WCAG 2.1 AA compliance
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleVideo2 = () => {
    if (video2Ref.current) {
      if (isVideo2Playing) {
        video2Ref.current.pause();
      } else {
        video2Ref.current.play();
      }
      setIsVideo2Playing(!isVideo2Playing);
    }
  };

  // Keyboard support for video control
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' && event.target === document.body) {
        event.preventDefault();
        toggleVideo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVideoPlaying]);

  const breadcrumbItems = [
    { label: 'Services', href: '/services' },
    { label: 'Equipment Details' }
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



  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead {...SEO_DATA.equipmentDetails} />
      <ScrollProgress />
      <Header />
      <main id="main-content" className="animate-fade-in-up">
        {/* Hero Section - Mobile Imaging with Video Background */}
        <section ref={heroRef} className="section-padding bg-compleo-deep-teal text-white relative overflow-hidden">
          {/* Background Video */}
          <div className="absolute inset-0">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-40"
              role="presentation"
              aria-label="Mobile MRI scanner unit being transported on ferry and truck to remote NHS Orkney facility, carefully positioned and lowered into place, demonstrating healthcare delivery to remote locations"
            >
              <source src="/videos/OrkneyDelivery.mp4" type="video/mp4" />
              <track kind="captions" src="data:text/vtt," label="No audio - decorative background video" default />
              <p>Your browser does not support the video element. This video shows a mobile MRI scanner unit being transported on ferry and truck to remote NHS Orkney facility and carefully positioned for operational use, demonstrating our capability to deliver healthcare services to remote locations.</p>
              {/* Fallback for browsers that don't support video */}
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('/images/services/mobile-imaging-hero.jpg')"
                }}
              />
            </video>

            {/* Video Control Button - WCAG 2.1 AA Compliance */}
            <button
              onClick={toggleVideo}
              className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-offset-2"
              aria-label={isVideoPlaying ? "Pause background video" : "Play background video"}
              title={isVideoPlaying ? "Pause video" : "Play video"}
            >
              {isVideoPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </button>
          </div>
          <div className="max-w-7xl mx-auto container-padding text-center relative z-10">
            <div className={`transition-all duration-700 ${shouldAnimate ? 'animate-slide-in-left opacity-100' : 'opacity-0 translate-x-[-50px]'}`}>
              <h1 className="heading-1 mb-6">
                {pageData?.heroTitle || "Mobile and Reloc Equipment Portfolio"}
              </h1>
              <p className="body-large text-gray-200 max-w-3xl mx-auto mb-8">
                {pageData?.heroSubtitle || "Scalable solutions bringing state-of-the-art equipment and advanced imaging directly to your location."}
              </p>
              <div className="flex flex-row gap-3 sm:gap-6 justify-center">
                <Button 
                  size="lg" 
                  className="group relative bg-gradient-to-br from-compleo-teal via-compleo-teal to-compleo-deep-teal hover:from-compleo-teal/90 hover:via-compleo-teal/90 hover:to-compleo-deep-teal/90 text-white px-4 sm:px-8 py-4 sm:py-3 rounded-xl shadow-xl hover:shadow-2xl border-2 border-white/40 hover:border-white/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 w-36 sm:w-48 h-auto"
                  onClick={() => {
                    const element = document.getElementById('equipment-portfolio');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                    <div className="flex flex-col items-center gap-1 sm:gap-1.5">
                      <div className="bg-white/20 rounded-full p-1">
                        <Truck className="h-4 w-4 sm:h-5 sm:w-5 group-hover:pulse transition-transform duration-300" />
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-sm sm:text-base font-semibold tracking-wider">EQUIPMENT</span>
                        <span className="text-xs font-medium opacity-90">Portfolio</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Button>
                <Link href="/contact" tabIndex={-1}>
                  <Button
                    size="lg"
                    className="group bg-compleo-yellow hover:bg-compleo-yellow/90 text-compleo-deep-teal px-4 sm:px-8 py-4 sm:py-3 rounded-xl shadow-xl hover:shadow-2xl border-2 border-compleo-deep-teal/30 hover:border-compleo-deep-teal/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 w-36 sm:w-48 h-auto"
                    onClick={() => setLocation('/contact')}
                  >
                    <div className="flex flex-col items-center gap-1 sm:gap-1.5">
                      <div className="bg-compleo-deep-teal/20 rounded-full p-1">
                        <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 group-hover:pulse transition-transform duration-300" />
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-sm sm:text-base font-semibold tracking-wider">CONTACT</span>
                        <span className="text-xs font-medium opacity-90">Us</span>
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
                <h2 className="heading-2 text-compleo-deep-teal mb-6">
                  {pageData?.serviceDetailsTitle || "Advanced and Accessible Imaging Capacity"}
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                  {pageData?.serviceDetailsDescription || "Our mobile imaging units possess the highest level of diagnostic capabilities, providing flexible and convenient access to comprehensive solutions."}
                </p>
                <div className="space-y-6">
                  {pageData?.features && pageData.features.length > 0 ? (
                    pageData.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="bg-compleo-teal/10 p-3 rounded-lg">
                          {index === 0 && <MapPin className="h-6 w-6 text-compleo-teal" />}
                          {index === 1 && <Shield className="h-6 w-6 text-compleo-teal" />}
                          {index === 2 && <Clock className="h-6 w-6 text-compleo-teal" />}
                          {index === 3 && <Truck className="h-6 w-6 text-compleo-teal" />}
                          {index > 3 && <MapPin className="h-6 w-6 text-compleo-teal" />}
                        </div>
                        <div>
                          <h3 className="font-semibold text-compleo-deep-teal mb-2">{feature.title}</h3>
                          <p className="text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex items-start gap-4">
                        <div className="bg-compleo-teal/10 p-3 rounded-lg">
                          <MapPin className="h-6 w-6 text-compleo-teal" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-compleo-deep-teal mb-2">On-Site Services</h3>
                          <p className="text-gray-600">Bring advanced imaging directly to your facility</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-compleo-teal/10 p-3 rounded-lg">
                          <Shield className="h-6 w-6 text-compleo-teal" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-compleo-deep-teal mb-2">State-of-Art Equipment</h3>
                          <p className="text-gray-600">Latest MRI and CT technology in mobile units</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-compleo-teal/10 p-3 rounded-lg">
                          <Clock className="h-6 w-6 text-compleo-teal" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-compleo-deep-teal mb-2">Flexible Scheduling</h3>
                          <p className="text-gray-600">Arrange services around your operational needs</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-compleo-teal/10 p-3 rounded-lg">
                          <Truck className="h-6 w-6 text-compleo-teal" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-compleo-deep-teal mb-2">Rapid Deployment</h3>
                          <p className="text-gray-600">Quick setup and commissioning at your location</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div>
                <img 
                  src={pageData?.serviceImage || "/images/services/mobile-imaging-hero.jpg"}
                  alt={pageData?.serviceImageAlt || "Compleo relocatable MRI unit in situ"}
                  className="w-full h-96 object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CLEAR SEPARATION - Equipment Portfolio Hero Section */}
        <section id="equipment-portfolio" className="relative pt-20 pb-8 bg-compleo-deep-teal text-white overflow-hidden">
          {/* Background Video */}
          <div className="absolute inset-0 z-0">
            <video
              ref={video2Ref}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-30"
              role="presentation"
              aria-label="Background video showing medical equipment in clinical setting"
            >
              <source
                src="https://videos.compleohealth.com/videos/compleo-health-hero-video.mp4"
                type="video/mp4"
              />
              <track kind="captions" src="data:text/vtt," label="No audio - decorative background video" default />
            </video>

            {/* Video Control Button - WCAG 2.1 AA Compliance */}
            <button
              onClick={toggleVideo2}
              className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-offset-2"
              aria-label={isVideo2Playing ? "Pause background video" : "Play background video"}
              title={isVideo2Playing ? "Pause video" : "Play video"}
            >
              {isVideo2Playing ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </button>
          </div>
          
          {/* Hero Content */}
          <div className="relative max-w-7xl mx-auto container-padding z-10">
            <div className="text-center mb-16">
              <div className="w-24 h-1 bg-compleo-yellow mx-auto mb-6"></div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {pageData?.equipmentPortfolioTitle || "Advanced Equipment Portfolio"}
              </h2>
              <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
                {pageData?.equipmentPortfolioDescription || "State-of-the-art MRI and CT scanners featuring AI-capabilities, helium-free technology, and industry-leading image quality."}
              </p>
            </div>
          </div>
        </section>

        {/* Equipment Showcase Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto container-padding">
            <EquipmentShowcase />
          </div>
        </section>

        {/* CTA Section */}
        <PillCTA
          heading={pageData?.ctaSection?.title || "Ready to Transform Your Imaging Services?"}
          description={pageData?.ctaSection?.description || "Discover how our advanced equipment portfolio and mobile services can enhance your diagnostic capabilities."}
          primaryButton={{
            text: pageData?.ctaSection?.primaryButton_text || "GET Quote",
            href: pageData?.ctaSection?.primaryButton_Href || "/contact"
          }}
          secondaryButton={{
            text: pageData?.ctaSection?.secondaryButton_text || "CONTACT Us",
            href: "/contact"
          }}
        />

        <TrustSignals />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}