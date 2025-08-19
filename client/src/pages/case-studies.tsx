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
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const { elementRef: heroRef, isVisible: heroInView } = useIntersectionObserver({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    const timer = setTimeout(() => setShouldAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollProgress />
      <Header />
      <main id="main-content" className="animate-fade-in-up">
        {/* Hero Section */}
        <section ref={heroRef} className="py-20 bg-compleo-deep-teal text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={`transition-all duration-700 ${heroInView ? 'animate-slide-in-left opacity-100' : 'opacity-0 translate-x-[-50px]'}`}>
                <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                  {caseStudiesData.hero.title}
                </h1>
                <p className="text-xl lg:text-2xl text-gray-200 mb-8 leading-relaxed">
                  {caseStudiesData.hero.subtitle}
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
                {caseStudiesData.successStories.title}
              </h2>
              <p className="text-xl text-compleo-gray max-w-3xl mx-auto">
                {caseStudiesData.successStories.subtitle}
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