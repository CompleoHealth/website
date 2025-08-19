export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export const ORGANIZATION_SCHEMA: StructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Compleo Health',
  alternateName: 'Compleo Health Limited',
  url: 'https://www.compleohealth.com',
  logo: 'https://www.compleohealth.com/images/shared/logo-seo.jpg',
  description: 'Leading provider of diagnostic imaging services, MRI and CT scanner rentals, and clinical insourcing solutions to NHS Trusts and private healthcare facilities across the UK and Europe.',
  foundingDate: '2020',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Beehive Mill, Jersey Street',
    addressLocality: 'Manchester',
    addressRegion: 'Greater Manchester',
    postalCode: 'M4 6JG',
    addressCountry: 'GB'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+44-161-884-1303',
    contactType: 'customer service',
    areaServed: ['GB', 'IE', 'IT', 'CH', 'DK'],
    availableLanguage: ['en', 'da']
  },
  sameAs: [
    'https://www.linkedin.com/company/compleo-health'
  ],
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 53.4808,
      longitude: -2.2426
    },
    geoRadius: '2000000'
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Diagnostic Imaging Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'MRI Scanner Rental',
          description: 'High-field MRI scanner rental services for healthcare facilities'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'CT Scanner Rental',
          description: 'Advanced CT scanner rental and managed services'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Clinical Insourcing',
          description: 'Expert radiographer and clinical staff provision'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Mobile Imaging Units',
          description: 'Relocatable MRI and CT units for temporary installations'
        }
      }
    ]
  }
};

export const MEDICAL_ORGANIZATION_SCHEMA: StructuredData = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  name: 'Compleo Health',
  medicalSpecialty: 'Diagnostic Imaging',
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'ISO 9001:2015',
      recognizedBy: {
        '@type': 'Organization',
        name: 'DNV'
      }
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Care Quality Commission Registration',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Care Quality Commission'
      }
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Cyber Essentials Plus',
      recognizedBy: {
        '@type': 'Organization',
        name: 'NCSC'
      }
    }
  ]
};

export const BREADCRUMB_SCHEMA = (items: Array<{name: string, url: string}>): StructuredData => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `https://compleo-health.replit.app${item.url}`
  }))
});

export const SERVICE_SCHEMA = (service: {
  name: string;
  description: string;
  provider: string;
  areaServed: string[];
  serviceType: string;
}): StructuredData => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.name,
  description: service.description,
  provider: {
    '@type': 'Organization',
    name: service.provider
  },
  areaServed: service.areaServed.map(area => ({
    '@type': 'Country',
    name: area
  })),
  serviceType: service.serviceType,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: service.name,
    itemListElement: [{
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      businessFunction: 'https://schema.org/LeaseOut'
    }]
  }
});

export function generateStructuredData(schema: StructuredData): string {
  return JSON.stringify(schema, null, 2);
}