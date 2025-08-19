import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import BackToTop from '@/components/common/back-to-top';
import ScrollProgress from '@/components/common/scroll-progress';
import TrustSignals from '@/components/common/trust-signals';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'wouter';
import { MessageSquare, Users } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useEffect, useState } from 'react';

// Import team data
import { TEAM_MEMBERS } from '@/../../shared/team-data';
import teamPageData from '@/../../shared/data/team-page.json';

export default function OurTeam() {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const { elementRef: heroRef, isVisible: heroInView } = useIntersectionObserver({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    const timer = setTimeout(() => setShouldAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const leadership = TEAM_MEMBERS;

  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollProgress />
      <Header />
      <main className="animate-fade-in-up">
        {/* Hero Section - Standard Centered */}
        <section ref={heroRef} className="relative bg-gradient-to-br from-compleo-deep-teal via-compleo-deep-teal to-slate-800 text-white py-20 lg:py-24">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center transition-all duration-700 ${heroInView ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'}`}>
              <h1 className="heading-1 mb-6">
                {teamPageData.hero.title}
              </h1>
              <p className="body-large text-gray-300 mb-12 max-w-3xl mx-auto">
                {teamPageData.hero.subtitle}
              </p>
              <div className="flex flex-row gap-3 sm:gap-6 justify-center">
                <Link href="/work-with-us">
                  <Button 
                    size="lg" 
                    className="group relative bg-gradient-to-br from-compleo-teal via-compleo-teal to-compleo-deep-teal hover:from-compleo-teal/90 hover:via-compleo-teal/90 hover:to-compleo-deep-teal/90 text-white px-4 sm:px-8 py-4 sm:py-3 rounded-xl shadow-xl hover:shadow-2xl border-2 border-white/40 hover:border-white/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 w-36 sm:w-48 h-auto"
                  >
                    <div className="flex flex-col items-center gap-1 sm:gap-1.5">
                      <div className="bg-white/20 rounded-full p-1">
                        <Users className="h-4 w-4 sm:h-5 sm:w-5 group-hover:pulse transition-transform duration-300" />
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-sm sm:text-base font-semibold tracking-wider">WORK</span>
                        <span className="text-xs font-medium opacity-90">with us</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button 
                    size="lg" 
                    className="group bg-compleo-yellow hover:bg-compleo-yellow/90 text-compleo-deep-teal px-4 sm:px-8 py-4 sm:py-3 rounded-xl shadow-xl hover:shadow-2xl border-2 border-compleo-deep-teal/30 hover:border-compleo-deep-teal/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 w-36 sm:w-48 h-auto"
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

        {/* Meet our Leadership Team */}
        <section className="section-padding bg-gray-100">
          <div className="max-w-7xl mx-auto container-padding">
            <div className="text-center mb-16">
              <h2 className="heading-2 text-compleo-deep-teal mb-6">
                {teamPageData.leadership.title}
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                {teamPageData.leadership.subtitle}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {leadership.map((leader, index) => (
                <Link key={index} href={`/team-member/${leader.id}`}>
                  <Card className="overflow-hidden group cursor-pointer transform transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <img 
                          src={leader.image}
                          alt={leader.name}
                          className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* Brand green fade-up overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-compleo-teal via-compleo-teal/60 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500"></div>
                        
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 z-10">
                          <h3 className="text-xl font-bold text-white group-hover:text-compleo-yellow transition-colors duration-300">{leader.name}</h3>
                          <p className="text-gray-200 group-hover:text-white transition-colors duration-300">{leader.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Culture & Values */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-compleo-deep-teal mb-6">
                  {teamPageData.culture.title}
                </h2>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  {teamPageData.culture.description}
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-compleo-teal/10 p-3 rounded-lg">
                      <svg className="h-6 w-6 text-compleo-teal" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-compleo-deep-teal mb-2">Patient-First Mindset</h3>
                      <p className="text-gray-600">Every decision we make is guided by improving patient outcomes and experiences</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-compleo-teal/10 p-3 rounded-lg">
                      <svg className="h-6 w-6 text-compleo-teal" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-compleo-deep-teal mb-2">Excellence & Innovation</h3>
                      <p className="text-gray-600">Continuous improvement and technological advancement drive our work</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-compleo-teal/10 p-3 rounded-lg">
                      <svg className="h-6 w-6 text-compleo-teal" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A3.01 3.01 0 0 0 17.1 7c-.5 0-.96.18-1.31.47l-5.11 4.24A1.004 1.004 0 0 0 11 12.5v8.5c0 .55.45 1 1 1s1-.45 1-1v-7h2.5l2.5 7.5h1.5c.83 0 1.5-.67 1.5-1.5z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-compleo-deep-teal mb-2">Collaborative Partnership</h3>
                      <p className="text-gray-600">Building lasting relationships with NHS Trusts and healthcare providers</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <img 
                  src={teamPageData.culture.image}
                  alt={teamPageData.culture.imageAlt}
                  className="w-full aspect-square object-cover rounded-xl shadow-lg"
                />
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