import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'wouter';
import ServiceCard from '@/components/services/service-card';
import { StrapiValueCard } from '@/lib/strapi/types/common';

interface Service {
  title: string;
  description: string;
  features: string[];
  imageUrl: string;
  imageAlt: string;
  href: string;
}

interface HealthcareSolutionsProps {
  title?: string;
  description?: string;
  // CMS data structure - solutions array from Strapi
  solutions?: StrapiValueCard[];
  // Legacy static data fallback
  services?: Service[];
  buttonText?: string;
  buttonHref?: string;
}

export default function HealthcareSolutions({
  title = "Healthcare Solutions",
  description = "Comprehensive imaging services designed for NHS Trusts and other healthcare providers. We collaborate with system partners to integrate seamlessly with existing services and care pathways, delivering over 6% cost savings compared to previous or alternative options.",
  solutions,
  services = [
    {
      title: 'Managed Equipment Services',
      description: 'Turnkey solutions with AI scanners, maintenance, and 24/7 support.',
      features: ['Complete equipment management', 'Preventive maintenance included', 'AI-powered diagnostics'],
      imageUrl: '/images/services/managed-equipment-card.jpg',
      imageAlt: 'CT scanner operation with technician monitoring from control room',
      href: '/services/managed-equipment',
    },
    {
      title: 'Clinical Insourcing',
      description: 'Flexible staffing solutions to boost efficiency and reduce wait times.',
      features: ['Qualified radiographers', 'Flexible scheduling', 'Seamless integration'],
      imageUrl: '/images/clinical-insourcing/radiographer-ct-room.jpg',
      imageAlt: 'Professional radiographer in CT scanning room',
      href: '/services/clinical-insourcing',
    },
    {
      title: 'Equipment Rentals',
      description: 'Short and long-term MRI/CT rentals with rapid deployment.',
      features: ['Quick installation', 'Flexible terms', 'Full support included'],
      imageUrl: '/images/services/siemens-mri-scanner-rental.jpg',
      imageAlt: 'Modern Siemens MRI scanner in clinical setting with ambient lighting',
      href: '/services/equipment-rental',
    },
  ],
  buttonText = "View All Services",
  buttonHref = "/services"
}: HealthcareSolutionsProps = {}) {
  const [, setLocation] = useLocation();

  // Use CMS data first, fallback to static data
  const solutionsList = solutions && solutions.length > 0 
    ? solutions.map(solution => ({
        title: solution.title,
        description: solution.description,
        features: solution.Features || [],
        imageUrl: solution.imageUrl || '/images/services/default.jpg',
        imageAlt: solution.title,
        href: solution.linkUrl || '#'
      }))
    : services.map(service => ({
        ...service,
        features: service.features.map((text, index) => ({ id: index + 1, text }))
      }));

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-12">
          <h2 className="heading-2 text-compleo-deep-teal mb-4">
            {title}
          </h2>
          <p className="body-base text-compleo-gray max-w-4xl mx-auto">
            {description}
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutionsList.map((service, index) => (
            <ServiceCard 
              key={index} 
              title={service.title}
              description={service.description}
              Features={service.features}
              imageUrl={service.imageUrl}
              imageAlt={service.imageAlt}
              href={service.href}
            />
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link href={buttonHref} tabIndex={-1}>
            <Button
              size="lg"
              className="bg-compleo-deep-teal hover:bg-compleo-teal text-white"
              onClick={() => setLocation(buttonHref)}
            >
              {buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}