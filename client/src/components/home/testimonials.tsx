import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Star, Heart, MapPin, Hospital, User, Handshake, Building } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { getPublishedTestimonials, type Testimonial } from '@/../../shared/testimonials-data';
import { useEffect, useMemo } from 'react';
import Autoplay from 'embla-carousel-autoplay';

// Define a unified testimonial type that works with both CMS and local data
type UnifiedTestimonial = {
  id: string;
  name: string;
  role: string;
  organization: string;
  content: string; // Used for display in the component
  quote?: string; // Original quote from CMS
  rating: number;
  icon: React.ComponentType<any>; // Icon component
  type?: 'patient' | 'customer' | 'cms';
  satisfaction?: string;
  date?: string;
  service?: string;
};

interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  testimonials?: Array<{
    id: string;
    quote: string;
    author: string;
    role?: string;
    company?: string;
    rating?: number;
  }>;
}

export default function Testimonials({
  title = "Trusted by Healthcare Leaders and Patients",
  subtitle = "See how Compleo Health is transforming diagnostic imaging across the NHS and private sector.",
  testimonials: cmsTestimonials
}: TestimonialsProps = {}) {
  const { elementRef, shouldAnimate } = useIntersectionObserver();
  
  // Use CMS testimonials if provided, otherwise use local data
  const testimonials: UnifiedTestimonial[] = useMemo(() => {
    if (cmsTestimonials && cmsTestimonials.length > 0) {
      return cmsTestimonials.map(item => ({
        id: item.id.toString(),
        name: item.author,
        role: item.role || '',
        organization: item.company || '',
        content: item.quote, // Map quote to content for rendering
        quote: item.quote,
        rating: item.rating || 5,
        icon: User, // Default icon for CMS testimonials
        type: 'cms'
      }));
    }
    // Fallback to local data if no CMS testimonials
    const publishedTestimonials = getPublishedTestimonials();
    const shuffled = [...publishedTestimonials].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 8).map(testimonial => {
      if (testimonial.type === 'patient') {
        const patientTestimonial: UnifiedTestimonial = {
          id: testimonial.id,
          name: 'Anonymous Patient',
          role: `${testimonial.service} Patient`,
          organization: testimonial.location,
          content: testimonial.content,
          rating: testimonial.rating,
          icon: testimonial.service === 'MRI' ? Heart : MapPin,
          satisfaction: testimonial.satisfaction,
          date: testimonial.date,
          type: 'patient'
        };
        return patientTestimonial;
      } else {
        const customerTestimonial: UnifiedTestimonial = {
          id: testimonial.id,
          name: testimonial.customerName,
          role: testimonial.role,
          organization: testimonial.organisation,
          content: testimonial.content,
          rating: testimonial.rating,
          icon: Building,
          service: testimonial.service,
          date: testimonial.date,
          type: 'customer'
        };
        return customerTestimonial;
      }
    });
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-compleo-yellow fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section ref={elementRef} className="section-padding bg-compleo-deep-teal text-white">
      <div className="max-w-7xl mx-auto container-padding">
        <div className={`text-center mb-12 transition-all duration-700 ${shouldAnimate ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'}`}>
          <h2 className="heading-2 mb-4">{title}</h2>
          <p className="body-base text-gray-300 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <Carousel
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: true,
            }),
          ]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className={`bg-white/10 backdrop-blur-sm border-0 hover-lift transition-all duration-700 h-full ${shouldAnimate ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: `${index * 200}ms` }}>
                  <CardContent className="card-padding h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-compleo-yellow rounded-full flex items-center justify-center mr-3">
                        {testimonial.icon && <testimonial.icon className="text-compleo-deep-teal" size={20} />}
                      </div>
                      <div>
                        <div className="heading-4 text-compleo-yellow">{testimonial.name}</div>
                        <div className="body-small text-gray-300">
                          {testimonial.role}
                          {testimonial.organization && `, ${testimonial.organization}`}
                        </div>
                      </div>
                    </div>
                    <p className="body-small text-gray-200 mb-3 flex-grow">
                      {/* Use content if available, otherwise fall back to quote */}
                      {testimonial.content || testimonial.quote || ''}
                    </p>
                    <div className="flex">{renderStars(testimonial.rating)}</div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-white border-white/30 hover:bg-white/10" />
          <CarouselNext className="text-white border-white/30 hover:bg-white/10" />
        </Carousel>
      </div>
    </section>
  );
}
