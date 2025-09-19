import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'wouter';
import { Search, CalendarCheck, Play, Pause } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { ImpactStatistics } from '@/components/common/impact-statistics';
import { trackCTAClick } from '@/lib/analytics';
import { StrapiHero, StrapiButton, StrapiImpactStatistic, StrapiImpactStatisticGroup } from '@/lib/strapi';

interface HeroSectionProps {
  heroData?: StrapiHero | null;
  impactStats?: StrapiImpactStatisticGroup | null;
  impactStatsTitle?: string;
}

export default function HeroSection({ heroData, impactStats, impactStatsTitle }: HeroSectionProps) {
  const { elementRef, shouldAnimate } = useIntersectionObserver();
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
  
  return (
    <section ref={elementRef} className="relative bg-compleo-deep-teal text-white overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-90"
          width="1920"
          height="1080"
          style={{ aspectRatio: '16/9' }}
          role="presentation"
          aria-label="Mobile MRI scanner unit being transported on flatbed truck, carefully positioned and lowered into place at healthcare facility, demonstrating Compleo Health's relocatable diagnostic imaging services"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
          <track kind="captions" src="data:text/vtt," label="No audio - decorative background video" default />
          <p>Your browser does not support the video element. This video shows a mobile MRI scanner unit being transported on a flatbed truck and carefully positioned at a healthcare facility, demonstrating our relocatable diagnostic imaging delivery process.</p>
          {/* Fallback for browsers that don't support video */}
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
            }}
            aria-label="Generic Medical Equipment"
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
      <div className="relative max-w-7xl mx-auto container-padding section-padding-lg">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className={`transition-all duration-700 ${shouldAnimate ? 'animate-slide-in-left opacity-100' : 'opacity-0 translate-x-[-50px]'}`}>
            <h1 className="heading-1 mb-4">
              {heroData?.heading || 'We deliver what'} <span className="text-compleo-yellow">{heroData?.highlighttext || 'matters to you'}</span>
            </h1>
            <p className="body-large mb-6 text-[#ffffff]">
              {heroData?.subheading || 'Advancing diagnostics with next generation imaging technology. From AI-enhanced MRI and CT to comprehensive Community Diagnostic Centre solutions.'}
            </p>
            <div className="flex flex-row gap-3 sm:gap-6">
              {heroData?.primaryButton ? (
                <Link href={heroData.primaryButton?.url || "/services"} tabIndex={-1}>
                  <Button
                    size="lg"
                    className="group relative bg-gradient-to-br from-compleo-teal via-compleo-teal to-compleo-deep-teal hover:from-compleo-teal/90 hover:via-compleo-teal/90 hover:to-compleo-deep-teal/90 text-white btn-lg hover-scale border-2 border-white/40 hover:border-white/60 backdrop-blur-sm w-36 sm:w-56 h-auto py-4 sm:py-6 px-4 sm:px-8 shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-xl"
                    onClick={() => {
                      trackCTAClick(`${heroData.primaryButton?.text || 'EXPLORE'} - Home Hero`, '/');
                      setLocation(heroData.primaryButton?.url || "/services");
                    }}
                  >
                    <div className="flex flex-col items-center gap-1 sm:gap-2">
                      <div className="bg-white/20 rounded-full p-1 sm:p-2 transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
                        <Search className="h-4 w-4 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-sm sm:text-lg font-bold tracking-wider">{heroData.primaryButton.text?.split(' ')[0] || "EXPLORE"}</span>
                        <span className="text-xs sm:text-sm font-medium opacity-90 tracking-wide">{heroData.primaryButton.subtext || "Our Solutions"}</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Button>
                </Link>
              ) : (
                <Link href="/services" tabIndex={-1}>
                  <Button
                    size="lg"
                    className="group relative bg-gradient-to-br from-compleo-teal via-compleo-teal to-compleo-deep-teal hover:from-compleo-teal/90 hover:via-compleo-teal/90 hover:to-compleo-deep-teal/90 text-white btn-lg hover-scale border-2 border-white/40 hover:border-white/60 backdrop-blur-sm w-36 sm:w-56 h-auto py-4 sm:py-6 px-4 sm:px-8 shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-xl"
                    onClick={() => {
                      trackCTAClick('EXPLORE Our Solutions - Home Hero', '/');
                      setLocation("/services");
                    }}
                  >
                    <div className="flex flex-col items-center gap-1 sm:gap-2">
                      <div className="bg-white/20 rounded-full p-1 sm:p-2 transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
                        <Search className="h-4 w-4 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-sm sm:text-lg font-bold tracking-wider">EXPLORE</span>
                        <span className="text-xs sm:text-sm font-medium opacity-90 tracking-wide">Our Solutions</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Button>
                </Link>
              )}
              
              {heroData?.secondaryButton ? (
                <Link href={heroData.secondaryButton?.url || "/case-studies"} tabIndex={-1}>
                  <Button
                    size="lg"
                    className="group relative bg-compleo-yellow hover:bg-compleo-yellow/90 text-compleo-deep-teal btn-lg hover-scale border-2 border-compleo-deep-teal/30 hover:border-compleo-deep-teal/50 backdrop-blur-sm w-36 sm:w-56 h-auto py-4 sm:py-6 px-4 sm:px-8 shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-xl"
                    onClick={() => {
                      trackCTAClick(`${heroData.secondaryButton?.text || 'READ'} - Home Hero`, '/');
                      setLocation(heroData.secondaryButton?.url || "/case-studies");
                    }}
                  >
                    <div className="flex flex-col items-center gap-1 sm:gap-2">
                      <div className="bg-compleo-deep-teal/20 rounded-full p-1 sm:p-2 transition-all duration-300 group-hover:bg-compleo-deep-teal/30 group-hover:scale-110">
                        <CalendarCheck className="h-4 w-4 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-sm sm:text-lg font-bold tracking-wider">{heroData.secondaryButton.text?.split(' ')[0] || "READ"}</span>
                        <span className="text-xs sm:text-sm font-medium opacity-90 tracking-wide">{heroData.secondaryButton.subtext || "Our Case Studies"}</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-compleo-deep-teal/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </Link>
              ) : (
                <Link href="/case-studies" tabIndex={-1}>
                  <Button
                    size="lg"
                    className="group relative bg-compleo-yellow hover:bg-compleo-yellow/90 text-compleo-deep-teal btn-lg hover-scale border-2 border-compleo-deep-teal/30 hover:border-compleo-deep-teal/50 backdrop-blur-sm w-36 sm:w-56 h-auto py-4 sm:py-6 px-4 sm:px-8 shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-xl"
                    onClick={() => {
                      trackCTAClick('READ Our Case Studies - Home Hero', '/');
                      setLocation("/case-studies");
                    }}
                  >
                    <div className="flex flex-col items-center gap-1 sm:gap-2">
                      <div className="bg-compleo-deep-teal/20 rounded-full p-1 sm:p-2 transition-all duration-300 group-hover:bg-compleo-deep-teal/30 group-hover:scale-110">
                        <CalendarCheck className="h-4 w-4 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-sm sm:text-lg font-bold tracking-wider">READ</span>
                        <span className="text-xs sm:text-sm font-medium opacity-90 tracking-wide">Our Case Studies</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-compleo-deep-teal/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Trust Signals */}
          <div className="card-standard bg-white/15 backdrop-blur-sm rounded-2xl card-padding border-2 border-white/30 shadow-xl relative z-10 opacity-100 visible" style={{ display: 'block', visibility: 'visible' }}>
            <ImpactStatistics
              variant="hero"
              textColor="yellow"
              gridCols={3}
              title={impactStatsTitle || "Trusted by Healthcare Leaders and Patients"}
              headingLevel="h2"
              className="text-center"
              statistics={impactStats?.statistics}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
