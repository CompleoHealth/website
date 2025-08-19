import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import TrustSignals from '@/components/common/trust-signals';
import BackToTop from '@/components/common/back-to-top';
import ScrollProgress from '@/components/common/scroll-progress';
import PillCTA from '@/components/common/pill-cta';
import { SEOHead } from '@/components/common/seo-head';
import { SEO_DATA } from '@/lib/seo-data';
import { Button } from '@/components/ui/button';

import { Link } from 'wouter';
import { 
  Users, 
  Heart, 
  GraduationCap, 
  Coffee,
  Award,
  Clock,
  TrendingUp,
  Bike,
  ExternalLink,
  Briefcase,
  Mail
} from 'lucide-react';
import { SiLinkedin } from 'react-icons/si';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { BrandedIcon } from '@/components/ui/branded-icons';
import { trackCTAClick } from '@/lib/analytics';
import workWithUsData from '@/../../shared/data/work-with-us.json';
import React from 'react';

// Icon mapping for dynamic icon loading
const iconMap = {
  Clock,
  Heart,
  GraduationCap,
  Coffee,
  Bike,
  Users,
  TrendingUp,
  Award,
  Briefcase,
  Mail
};

export default function WorkWithUs() {
  const { elementRef: heroRef, isVisible: heroInView } = useIntersectionObserver({ threshold: 0.2, triggerOnce: true });

  // Helper function to get icon component from string
  const getIcon = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap];
  };



  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead {...SEO_DATA['work-with-us']} />
      <ScrollProgress />
      <Header />
      <main id="main-content" className="animate-fade-in-up">
        {/* Hero Section */}
        <section ref={heroRef} className="section-padding-lg bg-compleo-deep-teal text-white relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/work-with-us/careers-hero.jpg" 
              alt="Compleo Health team meeting with professionals in modern office discussing healthcare solutions around laptop" 
              className="w-full h-full object-cover opacity-40"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-compleo-deep-teal/60"></div>
          </div>
          <div className="max-w-7xl mx-auto container-padding relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={`transition-all duration-700 ${heroInView ? 'animate-slide-in-left opacity-100' : 'opacity-0 translate-x-[-50px]'}`}>
                <h1 className="heading-1 mb-4">
                  {workWithUsData.hero.title}
                </h1>
                <p className="body-large text-gray-200 mb-6 leading-relaxed">{workWithUsData.hero.subtitle}</p>
                <div className="flex flex-row gap-3 sm:gap-6">
                  <Button 
                    size="lg" 
                    className="group relative bg-gradient-to-br from-compleo-teal via-compleo-teal to-compleo-deep-teal hover:from-compleo-teal/90 hover:via-compleo-teal/90 hover:to-compleo-deep-teal/90 text-white font-bold text-sm sm:text-lg px-4 sm:px-8 py-4 sm:py-4 rounded-xl shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] border-4 border-white/80 hover:border-white backdrop-blur-md bg-white/20 transition-all duration-300 hover:scale-105 w-36 sm:w-48 h-auto"
                    onClick={() => {
                      trackCTAClick(`${workWithUsData.hero.primaryButton.text} ${workWithUsData.hero.primaryButton.subtext} - Work With Us Hero`, '/work-with-us');
                      const element = document.getElementById('openings');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <div className="flex flex-col items-center gap-1 sm:gap-1.5">
                      <div className="bg-white/20 rounded-full p-1">
                        {getIcon(workWithUsData.hero.primaryButton.icon) && 
                          React.createElement(getIcon(workWithUsData.hero.primaryButton.icon)!, { 
                            className: "h-4 w-4 sm:h-5 sm:w-5 group-hover:bounce transition-transform duration-300" 
                          })
                        }
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-sm sm:text-base font-semibold tracking-wider">{workWithUsData.hero.primaryButton.text}</span>
                        <span className="text-xs font-medium opacity-90">{workWithUsData.hero.primaryButton.subtext}</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Button>
                  <Link href={workWithUsData.hero.secondaryButton.href} onClick={() => trackCTAClick(`${workWithUsData.hero.secondaryButton.text} ${workWithUsData.hero.secondaryButton.subtext} - Work With Us Hero`, '/work-with-us')}>
                    <Button size="lg" className="group bg-compleo-yellow hover:bg-compleo-yellow/90 text-compleo-deep-teal font-bold text-sm sm:text-lg px-4 sm:px-8 py-4 sm:py-4 rounded-xl shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 border-compleo-deep-teal/50 hover:border-compleo-deep-teal/80 transition-all duration-300 hover:scale-105 w-36 sm:w-48 h-auto">
                      <div className="flex flex-col items-center gap-1 sm:gap-1.5">
                        <div className="bg-compleo-deep-teal/20 rounded-full p-1">
                          {getIcon(workWithUsData.hero.secondaryButton.icon) && 
                            React.createElement(getIcon(workWithUsData.hero.secondaryButton.icon)!, { 
                              className: "h-4 w-4 sm:h-5 sm:w-5 group-hover:pulse transition-transform duration-300" 
                            })
                          }
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-sm sm:text-base font-semibold tracking-wider">{workWithUsData.hero.secondaryButton.text}</span>
                          <span className="text-xs font-medium opacity-90">{workWithUsData.hero.secondaryButton.subtext}</span>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-[0_25px_60px_rgba(0,0,0,0.4)] border-4 border-white/50 hover:border-white/70 transition-all duration-300 hover:shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
                <h3 className="text-2xl font-bold text-compleo-deep-teal mb-6">{workWithUsData.hero.whyJoinUs.title}</h3>
                <div className="space-y-4">
                  {workWithUsData.hero.whyJoinUs.points.map((point, index) => {
                    const IconComponent = getIcon(point.icon);
                    return (
                      <div key={index} className="flex items-center">
                        <div className="bg-compleo-teal rounded-full p-2 mr-4">
                          {IconComponent && <IconComponent className="h-5 w-5 text-white" />}
                        </div>
                        <span className="text-compleo-deep-teal font-semibold text-lg">{point.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="heading-2 text-compleo-deep-teal mb-6">
                {workWithUsData.benefits.title}
              </h2>
              <p className="body-large text-compleo-gray max-w-3xl mx-auto">
                {workWithUsData.benefits.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {workWithUsData.benefits.items.map((benefit, index) => (
                <div key={index} className="group relative bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-compleo-teal/20 overflow-hidden">
                  {/* Full card overlay */}
                  <div className="absolute inset-0 bg-compleo-deep-teal opacity-0 group-hover:opacity-25 transition-opacity duration-300 z-30 pointer-events-none"></div>
                  
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-compleo-teal to-compleo-yellow rounded-t-2xl"></div>
                  <div className="relative z-10">
                    <div className="mb-6 flex justify-center">
                      <div className="transition-transform duration-300 group-hover:scale-105">
                        <BrandedIcon icon={getIcon(benefit.icon)} variant="primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-compleo-deep-teal mb-4 group-hover:text-compleo-teal transition-colors text-center">{benefit.title}</h3>
                    <p className="body-base text-gray-700 leading-relaxed text-center">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        

        {/* Job Openings Section */}
        <section id="openings" className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="heading-2 text-compleo-deep-teal mb-6">
                <a 
                  href={workWithUsData.openings.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-compleo-teal transition-colors duration-300"
                >
                  {workWithUsData.openings.title}
                </a>
              </h2>
              <p className="body-large text-compleo-gray max-w-3xl mx-auto mb-6">
                {workWithUsData.openings.subtitle}
              </p>
              <Button 
                size="lg" 
                className="bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white shadow-lg transition-all duration-300 hover:scale-105"
                onClick={() => window.open(workWithUsData.openings.linkedinUrl, '_blank')}
              >
                <SiLinkedin className="mr-2 h-5 w-5" />
                {workWithUsData.openings.buttonText}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>




          </div>
        </section>

        <PillCTA
          heading={workWithUsData.cta.heading}
          description={workWithUsData.cta.description}
          primaryButton={{ text: workWithUsData.cta.primaryButton.text, href: workWithUsData.cta.primaryButton.href }}
          secondaryButton={{ 
            text: workWithUsData.cta.secondaryButton.text, 
            onClick: () => window.open(workWithUsData.cta.secondaryButton.url, '_blank') 
          }}
        />

        <TrustSignals />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}