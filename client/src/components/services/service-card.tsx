import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { StrapiFeatureBullet } from '@/lib/strapi/types/common';

interface ServiceCardProps {
  title: string;
  description: string;
  Features?: StrapiFeatureBullet[];  // ✅ CMS structure
  imageUrl: string;
  imageAlt: string;
  href: string;
}

export default function ServiceCard({
  title,
  description,
  Features,
  imageUrl,
  imageAlt,
  href,
}: ServiceCardProps) {
  return (
    <Link href={href} className="h-full" aria-label={`Learn more about ${title}`}>
      <Card className="group border-2 border-gray-100 shadow-xl hover:shadow-2xl hover:border-compleo-teal/20 transition-all duration-300 bg-gradient-to-br from-white to-gray-50/40 hover:from-white hover:to-compleo-teal/5 overflow-hidden relative cursor-pointer h-full flex flex-col">
        {/* Full card overlay */}
        <div className="absolute inset-0 bg-compleo-deep-teal opacity-0 group-hover:opacity-25 transition-opacity duration-300 z-30 pointer-events-none"></div>
        
        <CardContent className="p-0 relative flex flex-col h-full">
          {/* Image Section */}
          <div className="relative h-40 sm:h-48 overflow-hidden flex-shrink-0">
            <img 
              src={imageUrl} 
              alt={imageAlt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              style={{ aspectRatio: '16/9' }}
              width="400"
              height="225"
            />
          </div>
          
          {/* Content Section */}
          <div className="card-padding transition-all duration-300 flex-1 flex flex-col">
            <h3 className="heading-4 text-compleo-deep-teal mb-2 min-h-[3rem] flex items-start">
              {title}
            </h3>
            <p className="body-base text-compleo-gray mb-4 flex-grow">
              {description}
            </p>
            
            {/* Features List */}
            <ul className="body-base text-compleo-gray mb-4 space-y-1">
              {Features?.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="text-compleo-teal mr-2 h-3 w-3 flex-shrink-0" />
                  <span className="leading-tight">{feature.text}</span>
                </li>
              )) || []}
            </ul>
            
            {/* Link Section */}
            <strong className="inline-flex items-center text-compleo-teal font-semibold body-base mt-auto">
              Learn More
              <svg className="w-3 h-3 ml-1 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </strong>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
