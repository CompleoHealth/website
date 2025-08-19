import { Card, CardContent } from '@/components/ui/card';
import { Brain, Truck, Leaf, Zap } from 'lucide-react';
import { Link } from 'wouter';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { StrapiValueCard } from '@/lib/strapi/types/common';

interface ValuePropositionProps {
  title?: string;
  subtitle?: string;
  valuePropositionCards?: StrapiValueCard[];
  // Legacy fallback for existing static cards
  cards?: Array<{
    title: string;
    description: string;
    linkText: string;
    link: string;
    image: string;
    category: string;
    icon: any;
  }>;
}

export default function ValueProposition({
  title = "Why Choose Compleo Health?",
  subtitle = "Our state-of-the-art scanners, sustainable technology, and expert team improve patient outcomes through responsiveness and innovation.",
  valuePropositionCards,
  cards = [
    {
      icon: Brain,
      title: "Cutting Edge Technology",
      description: "Latest MRI and CT scanner equipment",
      link: '/equipment-details',
      linkText: "Explore Our Scanners →",
      image: '/images/value-proposition/advanced-technology.jpg',
      category: 'Technology'
    },
    {
      icon: Truck,
      title: "Rapid Delivery",
      description: "Fast setup to meet tight budgets and deadlines.",
      link: '/services',
      linkText: "View Services →",
      image: '/images/value-proposition/flexible-service.jpg',
      category: 'Service'
    },
    {
      icon: Leaf,
      title: "Sustainable Impact",
      description: "Greener generators and social value initiatives for a healthier future.",
      link: '/sustainability',
      linkText: "Learn More →",
      image: '/images/value-proposition/sustainability-impact.jpg',
      category: 'Environment'
    },
  ]
}: ValuePropositionProps = {}) {
  const { elementRef, shouldAnimate } = useIntersectionObserver();
  
  // Use CMS data first, fallback to static data
  const values = valuePropositionCards && valuePropositionCards.length > 0 
    ? valuePropositionCards.map(card => ({
        icon: Zap, // Default icon for CMS cards
        title: card.title,
        description: card.description,
        link: card.linkUrl || '#',
        linkText: card.linkText || 'Learn More →',
        image: card.imageUrl || '/images/value-proposition/default.jpg',
        category: 'CMS'
      }))
    : cards;

  return (
    <section ref={elementRef} className="bg-[#ffffff]">
      {/* Three-Layer Curved Header - Title Only */}
      <div className="pill-stack-wrapper">
        <div className="layer1"></div>
        <div className="layer2"></div>
        <div className="layer3"></div>
        <div className="pill-text-overlay">
          <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-white transition-all duration-700 ${shouldAnimate ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'}`}>
            {title}
          </h2>
        </div>
      </div>
      <div className="max-w-7xl mx-auto container-padding pt-6 pb-16">
        {/* Subtitle above cards */}
        <div className={`text-center mb-8 transition-all duration-700 ${shouldAnimate ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '200ms' }}>
          <p className="text-lg md:text-xl text-compleo-gray max-w-4xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <Link href={value.link} key={index} className="h-full" aria-label={`Learn more about ${value.title}`}>
              <Card 
                className={`group border-2 border-gray-100 shadow-xl hover:shadow-2xl hover:border-compleo-teal/20 transition-all duration-300 bg-gradient-to-br from-white to-gray-50/30 hover:from-white hover:to-compleo-teal/5 overflow-hidden relative cursor-pointer h-full flex flex-col ${shouldAnimate ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'}`} 
                style={{ 
                  animationDelay: `${index * 150}ms`
                }}
              >
                {/* Full card overlay */}
                <div className="absolute inset-0 bg-compleo-deep-teal opacity-0 group-hover:opacity-25 transition-opacity duration-300 z-30 pointer-events-none"></div>
                
                <CardContent className="p-0 relative flex flex-col h-full">
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <img 
                      src={value.image} 
                      alt={`${value.title} - ${value.description}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      width="400"
                      height="192"
                    />

                  </div>
                  
                  {/* Content Section */}
                  <div className="card-padding transition-all duration-300 flex-1 flex flex-col">
                    <h3 className="heading-4 text-compleo-deep-teal mb-2">
                      {value.title}
                    </h3>
                    <p className="body-base text-gray-600 mb-3 flex-1">
                      {value.description}
                    </p>
                    
                    {/* Link Section */}
                    <span className="inline-flex items-center text-compleo-teal font-semibold body-base mt-auto">
                      {value.linkText}
                      <svg className="w-3 h-3 ml-1 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
