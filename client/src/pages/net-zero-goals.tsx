import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import BackToTop from '@/components/common/back-to-top';
import ScrollProgress from '@/components/common/scroll-progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link, useLocation } from 'wouter';
import { 
  Target, 
  Leaf, 
  FileText, 
  TrendingUp, 
  Calendar, 
  CheckCircle,
  ArrowLeft,
  Building2,
  Users
} from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import netZeroData from '@/../../shared/data/net-zero-goals.json';

// CMS imports
import { netZeroGoalsApi } from '@/lib/strapi/api/net-zero-goals';
import { StrapiNetZeroGoalsPage } from '@/lib/strapi/types/net-zero-goals';

// Icon mapping for dynamic icons
const getIcon = (iconName: string) => {
  const icons: { [key: string]: any } = {
    FileText,
    Leaf,
    Target,
    ArrowLeft,
    Building2,
    Users,
    CheckCircle,
    TrendingUp,
    Calendar
  };
  return icons[iconName];
};

// Timeline item type for better type safety
interface TimelineItem {
  id?: string;
  item_id?: string;
  date: string;
  category: string;
  type: string;
  title: string;
  description: string;
  status: string;
}

export default function NetZeroGoals() {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const { elementRef: heroRef, isVisible: heroInView } = useIntersectionObserver({ threshold: 0.2, triggerOnce: true });
  const { elementRef: timelineRef, isVisible: timelineInView } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  const [, setLocation] = useLocation();

  // CMS State Management
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cmsData, setCmsData] = useState<StrapiNetZeroGoalsPage | null>(null);

  // Data to use (CMS first, then JSON fallback)
  const dataToUse = cmsData || netZeroData;
  console.log('CMS Data:', cmsData);
  console.log('JSON Data:', netZeroData);
  console.log('Data to Use:', dataToUse);

  useEffect(() => {
    const timer = setTimeout(() => setShouldAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Fetch CMS data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const pageData = await netZeroGoalsApi.getNetZeroGoalsPage();

        if (pageData) {
          setCmsData(pageData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCategoryColor = (category: string) => {
    return category === 'carbon' 
      ? 'bg-gradient-to-r from-green-600/30 to-emerald-500/30 text-green-200 border border-green-400/50' 
      : 'bg-gradient-to-r from-orange-600/30 to-amber-500/30 text-orange-200 border border-orange-400/50';
  };

  const getTypeColor = (type: string) => {
    return type === 'nhs' 
      ? 'border-l-4 border-blue-400 bg-gradient-to-br from-blue-900/20 to-blue-800/10 backdrop-blur-sm' 
      : 'border-l-4 border-compleo-teal bg-gradient-to-br from-compleo-deep-teal/20 to-compleo-teal/10 backdrop-blur-sm';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-emerald-400" />;
      case 'in-progress':
        return <TrendingUp className="h-6 w-6 text-compleo-yellow" />;
      case 'planned':
        return <Calendar className="h-6 w-6 text-gray-300" />;
      default:
        return <Calendar className="h-6 w-6 text-gray-300" />;
    }
  };

  return (
    <>
      <ScrollProgress />
      <Header />

      
      <main className="min-h-screen bg-gray-200">
        {/* Hero Section */}
        <section ref={heroRef} className="relative bg-gradient-to-br from-green-600 via-green-500 to-green-700 text-white py-8">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center transition-all duration-700 ${heroInView && shouldAnimate ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'}`}>
              <Link href={dataToUse.hero?.backButton?.url || dataToUse.hero?.backButton?.href || '#'} tabIndex={-1}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mb-6 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                  onClick={() => setLocation(dataToUse.hero?.backButton?.url || dataToUse.hero?.backButton?.href || '#')}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {dataToUse.hero?.backButton?.text || 'Back'}
                </Button>
              </Link>
              
              <h1 className="text-3xl lg:text-4xl font-black mb-4 tracking-tight">
                {dataToUse.hero?.title || 'Net Zero'} {dataToUse.hero?.titleHighlight && <span className="text-white">{dataToUse.hero.titleHighlight}</span>}
              </h1>

              <p className="text-lg lg:text-xl text-white/90 mb-6 max-w-3xl mx-auto leading-relaxed">
                {dataToUse.hero?.subtitle || 'Our commitment to net zero goals'}
              </p>

              <div className="flex justify-center">
                <a
                  href={dataToUse.hero?.nhsStrategyButton?.url || dataToUse.hero?.nhsStrategyButton?.href || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 text-base font-semibold shadow-lg hover:shadow-xl border-2 border-blue-500"
                >
                  {React.createElement(getIcon(dataToUse.hero?.nhsStrategyButton?.icon) || FileText, { className: "h-5 w-5 mr-2" })}
                  {dataToUse.hero?.nhsStrategyButton?.text || 'View NHS Strategy'}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section ref={timelineRef} className="py-12 bg-[rgb(15,46,46)] relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-compleo-deep-teal/20 via-transparent to-compleo-teal/10" />
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                {dataToUse.timeline?.title || 'Timeline'}
              </h2>
              <p className="text-base text-gray-200 max-w-2xl mx-auto">
                {dataToUse.timeline?.subtitle || 'Our sustainability journey'}
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-0.5 w-1 bg-gradient-to-b from-green-500 via-green-600 to-green-700 h-full shadow-lg"></div>

              <div className="space-y-8">
                {(dataToUse.timelineItems || []).map((item: TimelineItem, index: number) => (
                  <div
                    key={item.id || item.item_id}
                    className="relative"
                  >
                    {/* Timeline marker */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2">
                      <div className={`w-8 h-8 rounded-full border-4 border-[rgb(15,46,46)] shadow-2xl ${
                        item.type === 'nhs' ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-green-500 to-green-600'
                      }`}>
                        <div className="w-full h-full rounded-full bg-white/20 backdrop-blur-sm"></div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${
                      item.type === 'nhs' ? 'lg:text-right' : ''
                    }`}>
                      {/* NHS Content */}
                      {item.type === 'nhs' ? (
                        <>
                          <div className="lg:pr-12">
                            <div className={`p-8 rounded-2xl shadow-2xl ${getTypeColor(item.type)} hover:shadow-3xl hover:scale-105 transition-all duration-500 group border-4 border-blue-500`}>
                              <div className="flex items-center justify-between mb-6">
                                <Badge className={getCategoryColor(item.category)}>
                                  {item.category === 'carbon' ? <Leaf className="h-4 w-4 mr-2" /> : <Users className="h-4 w-4 mr-2" />}
                                  {item.category === 'carbon' ? 'Carbon Reduction' : 'Social Value'}
                                </Badge>
                                <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
                                  {getStatusIcon(item.status)}
                                </div>
                              </div>
                              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-100 transition-colors">{item.title}</h3>
                              <p className="text-gray-200 mb-6 leading-relaxed">{item.description}</p>
                              <div className="flex items-center text-sm text-blue-300 font-semibold">
                                <Building2 className="h-5 w-5 mr-2" />
                                NHS Requirement - {item.date}
                              </div>
                            </div>
                          </div>
                          <div className="lg:pl-12 lg:block hidden">
                            {/* Empty space for alignment on desktop */}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="lg:pr-12 lg:block hidden">
                            {/* Empty space for alignment on desktop */}
                          </div>
                          <div className="lg:pl-12">
                            <div className={`p-8 rounded-2xl shadow-2xl ${getTypeColor(item.type)} hover:shadow-3xl hover:scale-105 transition-all duration-500 group border-4 border-compleo-teal`}>
                              <div className="flex items-center justify-between mb-6">
                                <Badge className={getCategoryColor(item.category)}>
                                  {item.category === 'carbon' ? <Leaf className="h-4 w-4 mr-2" /> : <Users className="h-4 w-4 mr-2" />}
                                  {item.category === 'carbon' ? 'Carbon Reduction' : 'Social Value'}
                                </Badge>
                                <div className="text-compleo-teal group-hover:text-compleo-yellow transition-colors">
                                  {getStatusIcon(item.status)}
                                </div>
                              </div>
                              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-compleo-yellow transition-colors">{item.title}</h3>
                              <p className="text-gray-200 mb-6 leading-relaxed">{item.description}</p>
                              <div className="flex items-center text-sm text-compleo-teal font-semibold group-hover:text-compleo-yellow transition-colors">
                                <Target className="h-5 w-5 mr-2" />
                                Compleo Initiative - {item.date}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-compleo-beige">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-compleo-deep-teal mb-6">
              {dataToUse.cta?.title || 'Get in Touch'}
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              {dataToUse.cta?.subtitle || 'Contact us to learn more'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {console.log('CTA Data:', dataToUse.cta)}
              {console.log('CTA Buttons:', dataToUse.cta?.buttons)}
              {(dataToUse.cta?.buttons || []).map((button, index) => {
                console.log('Button:', button);
                const IconComponent = getIcon(button?.icon);
                const isPrimary = button?.variant === 'primary' || index === 0;
                return (
                  <Link key={index} href={button?.url || button?.href || '#'} tabIndex={-1}>
                    <Button
                      size="lg"
                      className={isPrimary
                        ? "bg-gradient-to-br from-compleo-teal via-compleo-teal to-compleo-deep-teal hover:from-compleo-teal/90 hover:via-compleo-teal/90 hover:to-compleo-deep-teal/90 text-white font-bold px-8 py-3 rounded-xl shadow-xl hover:shadow-2xl border-2 border-white/40 hover:border-white/60 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                        : "bg-compleo-yellow hover:bg-compleo-yellow/90 text-compleo-deep-teal font-bold px-8 py-3 rounded-xl shadow-xl hover:shadow-2xl border-2 border-compleo-yellow/40 hover:border-compleo-yellow/60 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                      }
                      onClick={() => setLocation(button?.url || button?.href || '#')}
                    >
                      {IconComponent && <IconComponent className="h-5 w-5 mr-2" />}
                      {button?.text || 'Learn More'}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}