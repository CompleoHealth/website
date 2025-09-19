import { useEffect, useRef, useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { SiLinkedin } from 'react-icons/si';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import BackToTop from '@/components/common/back-to-top';
import PillCTA from '@/components/common/pill-cta';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SEOHead } from '@/components/common/seo-head';
import { SEO_DATA } from '@/lib/seo-data';
import newsItems from '@shared/data/news-items.json';
import events from '@shared/data/events.json';
import { linkedinPosts } from '@shared/data/linkedin-posts';
import { fetchNewsAndViewsPageData } from '@/lib/strapi/api/news-and-views';
import { NewsAndViewsPage } from '@/lib/strapi/types/news-and-views';

// CMS-ready data structures
const heroContent = {
  title: "News and",
  highlightWord: "Views",
  subtitle: "Buzzing ideas straight from the hive. Your monthly dose of healthcare hype + Compleo vibes.",
  description: "The pulse, the buzz, and what's next in care — all in one scroll.",
  beeCard: {
    title: "The Compleo Buzz",
    description: "Straight from the hive: insights, updates and Compleo energy.",
    image: "/images/news-and-views/compleo-bee.png?v=3"
  }
};

const newsSection = {
  badgeText: "Latest Updates",
  title: "What's Happening",
  description: "Where innovation meets inspiration — Compleo's take on what's shaping tomorrow's care, minus the jargon."
};

const eventsSection = {
  badgeText: "Live Events", 
  title: "Events",
  description: "Join us at industry events and conferences where we're showcasing the future of diagnostic imaging."
};

const socialSection = {
  badgeText: "Social Updates",
  title: "Follow Us on",
  description: "Stay connected with our latest updates, insights, and company news directly from our LinkedIn feed.",
  linkedinUrl: "https://www.linkedin.com/company/compleohealth"
};

const ctaContent = {
  title: "Stay Connected",
  description: "Follow Compleo Health on LinkedIn for the latest updates, industry insights, and company news.",
  buttonText: "Follow Us on LinkedIn",
  buttonAction: "https://www.linkedin.com/company/compleohealth"
};

export default function NewsAndViews() {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [pageData, setPageData] = useState<NewsAndViewsPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const heroRef = useRef<HTMLElement>(null);
  const newsRef = useRef<HTMLElement>(null);
  const eventsRef = useRef<HTMLElement>(null);
  const heroInView = useIntersectionObserver({ threshold: 0.1 });
  const newsInView = useIntersectionObserver({ threshold: 0.1 });
  const eventsInView = useIntersectionObserver({ threshold: 0.1 });

  
  // Hero section content - using CMS data with fallbacks
  // The console logs show the data is directly in the pageData object, not in attributes
  const heroTitle = pageData?.heroTitle || 'News and Views';
  const heroHighlightWord = pageData?.heroHighlightWord || 'Latest';
  const heroSubtitle = pageData?.heroSubtitle || 'Stay up to date with our latest news, events and social media posts.';

  // Section titles - using CMS data with fallbacks
  const beeCardTitle = pageData?.beeCardTitle || 'Bee in the know';
  const newsTitle = pageData?.newsTitle || 'News';
  const eventsTitle = pageData?.eventsTitle || 'Events';
  const socialTitle = pageData?.socialTitle || 'Social';
  

  useEffect(() => {
    const timer = setTimeout(() => setShouldAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const pageResult = await fetchNewsAndViewsPageData();

        setPageData(pageResult); // pageResult can be null, that's fine - we have fallbacks
        setError(null);
        setLoading(false);
      } catch (err) {
        // Error handling without console logs - follow about page pattern
        setError('Failed to load page data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-compleo-teal mx-auto mb-4"></div>
          <p className="text-compleo-gray">Loading page...</p>
        </div>
      </div>
    );
  }

  // Note: Following about page pattern - don't block page render on API errors
  // If there's an error, pageData will be null and we'll use fallback data



  

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead {...SEO_DATA.newsAndViews} />
      <Header />
      <main id="main-content" className="animate-fade-in-up">
        {/* Tabloid Hero Section */}
        <section ref={heroRef} className="relative section-padding-lg bg-[rgb(15,46,46)]">
          <div className="max-w-7xl mx-auto container-padding">
            {/* Tabloid Grid Layout */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Tabloid News Title */}
              <div className="animate-slide-in-left">
                <div className="text-left">
                  {/* Tabloid-style News and Views Header */}
                  <div className="mb-6">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 tracking-tight leading-none">
                      {pageData?.heroTitle || heroContent.title}{' '}
                      <span className="bg-compleo-teal text-white px-4 py-2 rounded-lg inline-block">
                        {pageData?.heroHighlightWord || heroContent.highlightWord}
                      </span>
                    </h1>
                  </div>
                  
                  <p className="text-lg text-gray-200 mb-4 leading-relaxed">
                    {pageData?.heroSubtitle || heroContent.subtitle}
                  </p>
                  
                  <p className="text-base text-gray-300">
                    {pageData?.heroDescription || heroContent.description}
                  </p>
                </div>
              </div>
              
              {/* Right Column - Compleo Buzz Card (EXACTLY AS IS) */}
              <div className="animate-slide-in-right">
                <div className="bg-gradient-to-br from-white via-white to-gray-50 backdrop-blur-sm rounded-2xl p-8 text-center shadow-2xl border-2 border-compleo-teal/30 hover:border-compleo-teal/50 hover:shadow-3xl transition-all duration-300 hover:scale-105 relative overflow-hidden">
                  {/* Subtle background pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-compleo-teal/5 to-transparent opacity-50"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-compleo-teal/10 rounded-full blur-xl"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-compleo-yellow/10 rounded-full blur-xl"></div>
                  
                  <div className="relative z-10">
                    <img 
                      src={heroContent.beeCard.image} 
                      alt={`Compleo Bee - ${heroContent.beeCard.title}`} 
                      className="w-32 h-32 mx-auto mb-6 drop-shadow-2xl hover:scale-110 transition-transform duration-300"
                    />
                    <h2 className="text-3xl font-bold text-compleo-deep-teal mb-4">{pageData?.beeCardTitle || heroContent.beeCard.title}</h2>
                    <p className="text-lg text-compleo-gray font-medium">
                      {pageData?.beeCardDescription || heroContent.beeCard.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest News */}
        <section ref={newsRef} className="section-padding bg-[#ffffff]">
          <div className="max-w-7xl mx-auto container-padding">
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-block bg-compleo-teal rounded-full px-6 py-2 mb-4">
                <span className="text-white font-bold text-sm uppercase tracking-wide">{newsSection.badgeText}</span>
              </div>
              <h2 className="heading-2 text-compleo-deep-teal mb-3">{pageData?.newsTitle || newsSection.title}</h2>
              <p className="text-xl text-compleo-gray max-w-3xl mx-auto mb-8">
                {pageData?.newsDescription || newsSection.description}
              </p>
      
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                {/* Use CMS data if available, fallback to static JSON */}
                {(pageData?.newsArticles && pageData.newsArticles.length > 0 ? pageData.newsArticles : newsItems).map((item, index) => {
                  
                  return (
                    <article key={index}>
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                        <Card className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-white border border-gray-200 rounded-lg h-full animate-slide-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                        {/* Open Graph style layout */}
                        <div className="flex h-40">
                          {/* Left side - Image */}
                          <div className="w-24 h-40 flex-shrink-0 bg-gray-100 rounded-l-lg flex items-center justify-center overflow-hidden">
                            <img
                              src={item.image || '/images/news/default-news.jpg'}
                              alt={`Featured image for article: ${item.title} - ${item.category} news from ${item.domain || 'healthcare industry'}`}
                              className="w-full h-full object-contain p-2"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                if (e.currentTarget.parentElement) {
                                  e.currentTarget.parentElement.innerHTML = `<div class="w-full h-full bg-compleo-teal text-white flex items-center justify-center text-xs font-bold">${item.domain || 'NEWS'}</div>`;
                                }
                              }}
                            />
                          </div>
                          
                          {/* Right side - Content */}
                          <div className="flex-1 p-4 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-gray-500 font-medium">{(item.domain || 'NEWS').toUpperCase()}</span>
                                <Badge className="bg-compleo-teal text-white text-xs">
                                  {item.category}
                                </Badge>
                              </div>
                              
                              <h3 className="text-sm font-semibold text-compleo-deep-teal mb-2 line-clamp-2 leading-tight">
                                {item.title}
                              </h3>
                              
                              <p className="text-xs text-gray-600 mb-3 line-clamp-3 leading-relaxed">
                                {item.excerpt}
                              </p>
                            </div>
                            
                            <div className="flex items-center justify-between mt-auto">
                              <span className="text-xs text-gray-500">{item.readTime}</span>
                              <div className="flex items-center text-xs text-compleo-teal">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(item.date).toLocaleDateString('en-GB')}
                              </div>
                            </div>
                          </div>
                        </div>
                        </Card>
                      </a>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section ref={eventsRef} className="py-20 relative overflow-hidden bg-[#ffffff]">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-compleo-teal/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gray-400/20 rounded-full blur-2xl"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in">
              <div className="inline-block bg-compleo-teal rounded-full px-6 py-2 mb-4">
                <span className="text-white font-bold text-sm uppercase tracking-wide">{eventsSection.badgeText}</span>
              </div>
              <h2 className="heading-2 text-compleo-deep-teal mb-3">{pageData?.eventsTitle || eventsSection.title}</h2>
              <p className="text-xl text-compleo-gray max-w-3xl mx-auto mb-8">
                {pageData?.eventsDescription || eventsSection.description}
              </p>
              <div className="grid grid-cols-2 gap-6 mt-12">
                {/* Use CMS data if available, fallback to static JSON */}
                {(pageData?.events && pageData.events.length > 0 ? pageData.events : events).map((event, index) => (
                  <a key={index} href={event.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                    <Card className="relative bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group cursor-pointer h-full animate-slide-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                      <div className="absolute inset-0 bg-compleo-deep-teal opacity-0 group-hover:opacity-25 transition-opacity duration-300 z-10"></div>
                      <div className="relative h-full">
                        <div className="overflow-hidden">
                          <img
                            src={event.imageUrl || event.image} 
                            alt={event.title}
                            className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="p-4 relative z-20">
                          <h3 className="font-bold text-gray-800 mb-2 text-lg leading-tight">{event.title}</h3>
                          <div className="space-y-1 text-sm text-compleo-gray">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2 text-compleo-teal" />
                              <span className="font-medium">{event.date}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="mr-2">📍</span>
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Social Updates */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-block bg-compleo-deep-teal rounded-full px-6 py-2 mb-4">
                <span className="text-white font-bold text-sm uppercase tracking-wide">{pageData?.socialBadgeText || socialSection.badgeText}</span>
              </div>
              <div className="flex items-center justify-center gap-3 mb-4">
                <a 
                  href={pageData?.linkedinUrl || socialSection.linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:scale-105 transition-transform duration-300"
                >
                  <h2 className="heading-2 text-compleo-deep-teal">{pageData?.socialTitle || socialSection.title}</h2>
                  <SiLinkedin className="w-12 h-12 text-[#0077B5] hover:text-[#005885] transition-colors duration-300" />
                </a>
              </div>
              <p className="text-xl text-compleo-gray max-w-3xl mx-auto mb-8">
                {pageData?.socialDescription || socialSection.description}
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-12 mt-12">
              {/* Use CMS data if available, fallback to static data */}
              {(pageData?.linkedinPosts && pageData.linkedinPosts.length > 0
                ? pageData.linkedinPosts.map(post => post.embedUrl)
                : linkedinPosts
              ).map((postUrl, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300 relative group"
                  role="link"
                  tabIndex={0}
                  aria-label={`View LinkedIn post ${index + 1} on LinkedIn`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      // Extract the post URL and open in new tab
                      const match = postUrl.match(/\/embed\/([^?]+)/);
                      if (match) {
                        window.open(`https://www.linkedin.com/posts/${match[1]}`, '_blank');
                      }
                    }
                  }}
                  onClick={() => {
                    // Extract the post URL and open in new tab
                    const match = postUrl.match(/\/embed\/([^?]+)/);
                    if (match) {
                      window.open(`https://www.linkedin.com/posts/${match[1]}`, '_blank');
                    }
                  }}
                >
                  {/* Overlay to prevent iframe interaction */}
                  <div className="absolute inset-0 z-10 bg-transparent group-hover:bg-black/5 transition-colors duration-300"></div>

                  {/* View on LinkedIn indicator */}
                  <div className="absolute top-2 right-2 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs font-medium text-compleo-deep-teal">View on LinkedIn →</span>
                  </div>

                  <iframe
                    src={`${postUrl}${postUrl.includes('?') ? '&' : '?'}hideGDPRConsent=true&hideLinkedInConsentBanner=true&consent=false`}
                    height="500"
                    width="100%"
                    frameBorder="0"
                    allowFullScreen
                    title={`Compleo Health LinkedIn Post ${index + 1}`}
                    className="w-full pointer-events-none"
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <PillCTA
          heading={pageData?.ctaSection?.title || ctaContent.title}
          description={pageData?.ctaSection?.description || ctaContent.description}
          primaryButton={{ 
            text: pageData?.ctaSection?.primaryButton_text || ctaContent.buttonText, 
            onClick: () => window.open(pageData?.ctaSection?.primaryButton_action || ctaContent.buttonAction, '_blank') 
          }}
        />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}