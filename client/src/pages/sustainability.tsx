import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Leaf, Recycle, Heart, Users, TreePine, Award, MapPin, Target, HandHeart, UserCheck, Network, Zap, Play, Pause } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import BackToTop from '@/components/common/back-to-top';
import ScrollProgress from '@/components/common/scroll-progress';
import CurvedCtaPanel from '@/components/common/curved-cta-panel';
import { SustainabilityIcon, MedicalIcon, BrandedIcon } from '@/components/ui/branded-icons';
import { SEOHead } from '@/components/common/seo-head';
import { SEO_DATA } from '@/lib/seo-data';

import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useEffect, useState, useRef } from 'react';

// CMS Integration imports - Following proven pattern
import { sustainabilityApi } from '@/lib/strapi/api/sustainability';
import { globalSettingsApi } from '@/lib/strapi/api/global-settings';
import { SustainabilityPage } from '@/lib/strapi/types/sustainability';
import { StrapiGlobalSettings } from '@/lib/strapi/types/global-settings';
import EnhancedSkeleton from '@/components/common/enhanced-skeleton';



// CMS-Ready Data Structures
const heroContent = {
  title: "Sustainability",
  subtitle: "Investing in the next generation of technology and the next generation in communities",
  primaryButton: {
    text: "PARTNER",
    subtext: "with us",
    href: "/contact",
    icon: Award
  },
  secondaryButton: {
    text: "EXPLORE",
    subtext: "Our Goals",
    href: "/net-zero-goals",
    icon: Target
  }
};

const interestAreasCards = [
  {
    image: "/images/sustainability/carbon_footprint.jpg",
    title: "Carbon Footprint",
    text: "Our 'Reduce as We Grow' roadmap delivers what matters to people and planet, merging sustainable technology and mindful operations, powered by our greener Compleo team."
  },
  {
    image: "/images/sustainability/community-connection.jpg",
    title: "Connecting with the Community",
    text: "Delivering what matters to communities by investing in future generations through health education, grass roots sports and real-world career placement opportunities."
  },
  {
    image: "/images/sustainability/accessible-healthcare.jpg",
    title: "Accessible Healthcare",
    text: "Delivering diagnostic services that reach communities across Europe regardless of location or circumstances."
  }
];

const sustainabilityInitiatives = [
  {
    title: "Greener Technology\nHelium-Free MRI",
    icon: "/images/sustainability/greener-technology-helium-free.png",
    text: "We are committed to smarter Scanning, Greener Planet: BlueSeal slashes environmental impact by 90% with helium-free dry magnet innovation.",
    impact: "Zero helium emissions across our BlueSeal MRI fleet"
  },
  {
    title: "Greener Generators",
    icon: "/images/sustainability/greener-generators.png",
    text: "We are saying goodbye Generators and Hello Flybrid, Batteries, and a Fully Renewable Network.",
    impact: "Powering progress to Carbon neutral operations at all locations"
  },
  {
    title: "Greener Fleet Program",
    icon: "/images/sustainability/greener-fleet-program.png",
    text: "Committed to sustainable solutions, we've made the switch; 90% of our company vehicles are fully hybrid and electric to support a greener way to get around.",
    impact: "60% reduction in fleet emissions year-on-year"
  }
];

const socialImpactInitiatives = [
  {
    title: "Work Placements",
    icon: UserCheck,
    text: "By offering hands-on work placements we create lasting social value by inspiring the next generation of healthcare professionals and opening pathways to meaningful, rewarding careers.",
    impact: "Creating pathways for the next generation of healthcare professionals by improving social mobility"
  },
  {
    title: "Health Education",
    icon: HandHeart,
    text: "Our community health education and screening programmes empower people to take charge of their wellbeing, enabling early detection and prevention of illness for healthier, longer lives.",
    impact: "Helping communities take charge of their wellbeing"
  },
  {
    title: "NHS Trust partnerships",
    icon: Network,
    text: "Through collaborative partnerships with NHS Trusts, we are expanding access to timely diagnostics in underserved communities, helping to reduce health inequalities and improve patient outcomes.",
    impact: "Expanding access to diagnostics in underserved communities"
  }
];

const ourImpactCards = [
  {
    imageUrl: "/images/sustainability/SupportingFutureGenerations_image_optimized.jpg", // Optimized web version
    title: "Supporting Future Generations",
    text: "Preventive healthcare starts with movement. When young people are empowered to engage in active communities, we don't just improve health outcomes, we build a brighter, stronger future generation.",
    url: null
  },
  {
    imageUrl: "", // CMS-ready field - when populated, displays image; when empty, shows fallback text
    title: "Work Placements",
    text: "Our \"You can't be when you see\" programme leads partnerships with local colleges provides social mobility activities to inspire students and get them prepared for work.",
    url: null
  },
  {
    imageUrl: "", // CMS-ready field - when populated, displays image; when empty, shows fallback text
    title: "Health Education",
    text: "Educational webinars and community health programs designed to empower individuals with knowledge for better health outcomes.",
    url: null
  }
];

const ctaContent = {
  title: "Join Our Mission",
  description: "Partner with us to create sustainable healthcare solutions that benefit communities across the UK. Together, we can build a healthier, more sustainable future for all.",
  buttonText: "Partner With Us",
  buttonHref: "/contact"
};



export default function Sustainability() {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const { elementRef: heroRef, isVisible: heroInView } = useIntersectionObserver({ threshold: 0.2, triggerOnce: true });

  // CMS Integration state - Following proven pattern from equipment-details
  const [pageData, setPageData] = useState<SustainabilityPage | null>(null);
  const [globalSettings, setGlobalSettings] = useState<StrapiGlobalSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [, setLocation] = useLocation();

  // Video controls state - WCAG 2.1 AA compliance
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Video toggle function - WCAG 2.1 AA compliance
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

  useEffect(() => {
    const timer = setTimeout(() => setShouldAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Enhanced CMS data fetching with better error handling
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Parallel API fetching following proven pattern
        const [sustainabilityData, globalSettingsData] = await Promise.all([
          sustainabilityApi.getSustainabilityPage(),
          globalSettingsApi.getGlobalSettings()
        ]);
        
        
        setPageData(sustainabilityData);
        setGlobalSettings(globalSettingsData);
        setIsLoading(false);
      } catch (err: any) {
        console.error('❌ Social Impact CMS connection failed:', err);
        console.error('🔍 Error type:', err?.name || 'Unknown');
        console.error('🔍 Error message:', err?.message || 'No message');
        console.error('🔍 Error code:', err?.code || 'No code');
        
        // Check for Mixed Content or CORS issues
        if (err?.message?.includes('Mixed Content') || err?.message?.includes('CORS') || err?.code === 'ERR_FAILED') {
          console.error('🚨 HTTPS→HTTP Mixed Content Security Error detected!');
          console.error('💡 Solution: CMS needs HTTPS or frontend needs HTTP');
          setError('CMS connection blocked by browser security (HTTPS→HTTP)');
        } else if (err?.code === 'ECONNABORTED' || err?.message?.includes('timeout')) {
          console.error('⏱️ Connection timeout detected');
          setError('CMS connection timeout - using fallback content');
        } else {
          setError(`CMS connection failed: ${err?.message || 'Unknown error'}`);
        }
        
        setIsLoading(false);
        // Don't block the page - let it render with fallback content
      }
    };

    fetchData();
  }, []);

  // Loading state - Following proven pattern from home page
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

  // Render with fallback content if CMS fails
  if (error) {
    // Error details are logged in console.error above
  }



  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead {...SEO_DATA.sustainability} />
      <ScrollProgress />
      <Header />
      <main id="main-content" className="animate-fade-in-up">
        {/* Hero Section */}
        <section ref={heroRef} className="py-20 bg-compleo-deep-teal text-white relative overflow-hidden">
          {/* Background Video */}
          <div className="absolute inset-0">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-40"
              aria-label="Background video showing environmental sustainability and healthcare technology"
            >
              <source src="/videos/environment-hero.mp4" type="video/mp4" />
              {/* Fallback for browsers that don't support video */}
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1569163139394-de44cb5894c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
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
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className={`transition-all duration-700 ${shouldAnimate ? 'animate-slide-in-left opacity-100' : 'opacity-0 translate-x-[-50px]'}`}>
              <h1 className="heading-1 mb-4">{pageData?.heroTitle || heroContent.title}</h1>
              <p className="body-large text-gray-200 max-w-3xl mx-auto mb-6">{pageData?.heroSubtitle || heroContent.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href={pageData?.primaryButton?.url || heroContent.primaryButton.href} tabIndex={-1}>
                <Button
                  size="lg"
                  className="group relative bg-gradient-to-br from-compleo-teal via-compleo-teal to-compleo-deep-teal hover:from-compleo-teal/90 hover:via-compleo-teal/90 hover:to-compleo-deep-teal/90 text-white px-8 py-3 rounded-xl shadow-xl hover:shadow-2xl border-2 border-white/40 hover:border-white/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 w-48 h-auto"
                  onClick={() => setLocation(pageData?.primaryButton?.url || heroContent.primaryButton.href)}
                >
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="bg-white/20 rounded-full p-1">
                      <heroContent.primaryButton.icon className="h-5 w-5 group-hover:pulse transition-transform duration-300" />
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-base font-semibold tracking-wider">{pageData?.primaryButton?.text || heroContent.primaryButton.text}</span>
                      <span className="text-xs font-medium opacity-90">{pageData?.primaryButton?.subtext || heroContent.primaryButton.subtext}</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Button>
              </Link>
              <Link href={pageData?.secondaryButton?.url || heroContent.secondaryButton.href} tabIndex={-1}>
                <Button
                  size="lg"
                  className="group bg-compleo-yellow hover:bg-compleo-yellow/90 text-compleo-deep-teal px-8 py-3 rounded-xl shadow-xl hover:shadow-2xl border-2 border-compleo-deep-teal/30 hover:border-compleo-deep-teal/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 w-48 h-auto"
                  onClick={() => setLocation(pageData?.secondaryButton?.url || heroContent.secondaryButton.href)}
                >
                <div className="flex flex-col items-center gap-1.5">
                  <div className="bg-compleo-deep-teal/20 rounded-full p-1">
                    <heroContent.secondaryButton.icon className="h-5 w-5 group-hover:pulse transition-transform duration-300" />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-base font-semibold tracking-wider">{pageData?.secondaryButton?.text || heroContent.secondaryButton.text}</span>
                    <span className="text-xs font-medium opacity-90">{pageData?.secondaryButton?.subtext || heroContent.secondaryButton.subtext}</span>
                  </div>
                </div>
                </Button>
              </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Areas of Interest */}
        <section className="section-padding bg-[#ffffff]">
          <div className="max-w-7xl mx-auto container-padding">
            <div className="text-center mb-16">
              <h2 className="heading-2 text-compleo-deep-teal mb-4">{pageData?.interestAreasTitle || 'Our Areas of Interest'}</h2>
              <p className="body-large text-compleo-gray max-w-3xl mx-auto">
                {pageData?.interestAreasDescription || 'Core focus areas driving our commitment to sustainable healthcare and community impact'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {(pageData?.interestAreas && pageData.interestAreas.length > 0 
                ? pageData.interestAreas.map((card, index) => ({
                    title: card.title,
                    text: card.text,
                    image: card.image || interestAreasCards[index % interestAreasCards.length]?.image
                  }))
                : interestAreasCards
              ).map((card, index) => (
                <Card key={index} className="group relative bg-gradient-to-br from-white to-gray-50/30 border-2 border-gray-100 hover:border-compleo-teal/20 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full">
                  {/* Full card overlay */}
                  <div className="absolute inset-0 bg-compleo-deep-teal opacity-0 group-hover:opacity-25 transition-opacity duration-300 z-30 pointer-events-none"></div>
                  
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden bg-white">
                    <img
                      src={card.image}
                      alt={`${card.title} - ${card.text.substring(0, 100)}...`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Top Border Gradient */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-green-400"></div>
                  
                  <CardContent className="p-8 flex-grow flex flex-col">
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-compleo-deep-teal mb-4 group-hover:text-compleo-teal transition-colors">{card.title}</h3>
                    
                    {/* Description */}
                    <p className="body-base text-gray-700 leading-relaxed flex-grow">{card.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Sustainability Initiatives */}
        <section className="section-padding bg-[rgb(15,46,46)] relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-compleo-deep-teal/20 via-transparent to-emerald-600/10" />
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          
          <div className="max-w-7xl mx-auto container-padding relative z-10">
            <div className="text-center mb-16">
              <h2 className="heading-2 text-white mb-6">
                {pageData?.sustainabilityInitiativesTitle || 'Sustainability Initiatives'}
              </h2>
              <p className="body-large text-gray-200 max-w-3xl mx-auto">{pageData?.sustainabilityInitiativesDescription || 'Leading the healthcare industry with next generation solutions.'}</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {(pageData?.sustainabilityInitiatives && pageData.sustainabilityInitiatives.length > 0 
                ? pageData.sustainabilityInitiatives.map((initiative, index) => ({
                    title: initiative.title,
                    text: initiative.text,
                    icon: sustainabilityInitiatives[index % sustainabilityInitiatives.length]?.icon || "/images/sustainability/greener-technology-helium-free.png",
                    impact: initiative.impact
                  }))
                : sustainabilityInitiatives
              ).map((initiative, index) => (
                <div key={index} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-2 border-white/10 hover:border-compleo-teal/20 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group h-full flex flex-col relative overflow-hidden">
                  {/* Full card overlay */}
                  <div className="absolute inset-0 bg-compleo-deep-teal opacity-0 group-hover:opacity-25 transition-opacity duration-300 z-30 pointer-events-none"></div>
                  
                  {/* Header with Icon/Image */}
                  <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-6 flex items-center gap-4 rounded-t-2xl">
                    <div className="transform group-hover:scale-105 transition-transform duration-300">
                      <div className="w-16 h-16 flex items-center justify-center">
                        <img 
                          src={initiative.icon} 
                          alt={initiative.title}
                          className="w-14 h-14 object-contain brightness-0 invert"
                          style={{ filter: 'brightness(0) invert(1)' }}
                        />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white whitespace-pre-line">{initiative.title}</h3>
                  </div>
                  
                  <div className="premium-card-content flex-grow flex flex-col">
                    <p className="body-base text-gray-200 leading-relaxed flex-grow mb-6">{initiative.text}</p>
                    
                    {/* Environmental Impact Section */}
                    <div className="bg-emerald-500/20 p-4 rounded-lg border-l-4 border-emerald-400 mt-auto backdrop-blur-sm">
                      <div className="flex items-start gap-3">
                        <div className="w-3 h-3 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-emerald-200 mb-1 uppercase tracking-wide">Impact</p>
                          <p className="text-sm text-emerald-100 font-medium">{initiative.impact}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Impact Initiatives */}
        <section className="py-20 px-4 bg-[#ffffff] relative overflow-hidden">
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="heading-2 text-compleo-deep-teal mb-6">
                {pageData?.socialImpactInitiativesTitle || 'Social Impact Initiatives'}
              </h2>
              <p className="body-large text-compleo-gray max-w-3xl mx-auto">{pageData?.socialImpactInitiativesDescription || 'Investing in lasting social value through health education, community partnerships, and expanding healthcare access'}</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {(pageData?.socialImpactInitiatives && pageData.socialImpactInitiatives.length > 0 
                ? pageData.socialImpactInitiatives.map((initiative, index) => ({
                    title: initiative.title,
                    text: initiative.text,
                    icon: socialImpactInitiatives[index % socialImpactInitiatives.length]?.icon || Users, // Use static icons
                    impact: initiative.impact
                  }))
                : socialImpactInitiatives
              ).map((initiative, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-compleo-teal/20 group h-full flex flex-col relative overflow-hidden">
                  {/* Full card overlay */}
                  <div className="absolute inset-0 bg-compleo-deep-teal opacity-0 group-hover:opacity-25 transition-opacity duration-300 z-30 pointer-events-none"></div>
                  
                  {/* Header with Icon */}
                  <div className="bg-gradient-to-r from-compleo-teal to-compleo-deep-teal p-6 flex items-center gap-4 rounded-t-2xl">
                    <div className="transform group-hover:scale-105 transition-transform duration-300">
                      <div className="w-16 h-16 flex items-center justify-center">
                        {typeof initiative.icon === 'function' ? <initiative.icon className="w-12 h-12 text-white" /> : <Users className="w-12 h-12 text-white" />}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white">{initiative.title}</h3>
                  </div>
                  
                  <div className="p-8 flex-grow flex flex-col">
                    <p className="body-base text-gray-700 leading-relaxed flex-grow mb-6">{initiative.text}</p>
                    
                    {/* Impact Section */}
                    <div className="bg-compleo-teal/10 p-4 rounded-lg border-l-4 border-compleo-teal mt-auto">
                      <div className="flex items-start gap-3">
                        <div className="w-3 h-3 rounded-full bg-compleo-teal mt-2 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-compleo-deep-teal mb-1 uppercase tracking-wide">Impact</p>
                          <p className="text-sm text-compleo-deep-teal font-medium">{initiative.impact}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Impact Section - Outcomes Style */}
        <section className="py-20 px-4 bg-gradient-to-br from-compleo-deep-teal via-compleo-deep-teal to-slate-800 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full" />
            <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/20 rounded-full" />
            <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white/20 rounded-full" />
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="heading-2 text-white mb-6">
                {pageData?.impactCardsTitle || 'Our Impact'}
              </h2>
              <p className="body-large text-gray-300 max-w-3xl mx-auto">
                {pageData?.impactCardsDescription || 'Measurable results from our commitment to creating lasting positive change in communities'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {(pageData?.impactCards && pageData.impactCards.length > 0 
                ? pageData.impactCards.map((card, index) => ({
                    title: card.title,
                    text: card.text,
                    imageUrl: card.imageUrl || ourImpactCards[index % ourImpactCards.length]?.imageUrl,
                    url: card.url
                  }))
                : ourImpactCards
              ).map((card, index) => {
                const cardComponent = (
                  <div key={index} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden group hover:border-compleo-teal/50 transition-all duration-300 h-full flex flex-col">
                    {/* Image/Content - Top Half */}
                    <div className="h-64 relative overflow-hidden">
                      {card.imageUrl ? (
                        <picture>
                          <source
                            media="(max-width: 768px)"
                            srcSet={card.imageUrl.replace('_optimized.jpg', '-mobile.jpg').replace('.jpg', '-mobile.jpg')}
                          />
                          <img
                            src={card.imageUrl}
                            alt={`${card.title} - ${card.text.substring(0, 100)}...`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            width="800"
                            height="600"
                          />
                        </picture>
                      ) : (
                        <div className="h-64 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                          <p className="text-gray-400 font-medium text-sm">Photo - Coming Soon</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Content - Bottom Half */}
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="text-xl font-bold text-white mb-4">{card.title}</h3>
                      <p className="text-gray-300 leading-relaxed text-sm flex-grow">
                        {card.text}
                      </p>
                    </div>
                  </div>
                );

                return card.url ? (
                  <Link key={index} href={card.url}>
                    {cardComponent}
                  </Link>
                ) : cardComponent;
              })}
            </div>
          </div>
        </section>

        {/* Contact Section - Curved Design */}
        <CurvedCtaPanel 
          title={pageData?.ctaSection?.title || ctaContent.title}
          description={pageData?.ctaSection?.description || ctaContent.description}
          buttonText={pageData?.ctaSection?.primaryButton_text || ctaContent.buttonText}
          buttonHref={pageData?.ctaSection?.primaryButton_Href || ctaContent.buttonHref}
          imageSrc="/images/sustainability/sustainability-impact.jpg"
          mobileImageSrc="/images/sustainability/sustainability-impact-mobile.jpg"
        />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}