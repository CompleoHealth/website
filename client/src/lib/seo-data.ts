// Comprehensive SEO data for all pages
export interface SEOPageData {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  structuredData: any;
  ogImage?: string;
}

export const SEO_DATA: Record<string, SEOPageData> = {
  home: {
    title: "Compleo Health | Medical Imaging Equipment Rental UK | MRI & CT Scanners",
    description: "Leading UK provider of MRI and CT scanner equipment rental, clinical services, and mobile imaging solutions for NHS Trusts and private healthcare providers.",
    keywords: "medical imaging equipment rental uk, mri scanner rental, ct scanner hire, healthcare diagnostic services, mobile mri services, clinical insourcing",
    canonicalUrl: "https://compleohealth.com/",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "Compleo Health",
      "description": "Medical imaging equipment rental and clinical services for healthcare providers",
      "url": "https://compleohealth.com",
      "logo": "https://compleohealth.com/images/shared/logo-main.jpg",
      "image": "https://compleohealth.com/images/shared/logo-main.jpg",
      "telephone": "+44-161-884-1303",
      "email": "info@compleohealth.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Beehive Mill, Jersey Street",
        "addressLocality": "Manchester",
        "postalCode": "M4 6JG",
        "addressCountry": "GB"
      },
      "areaServed": {
        "@type": "Country",
        "name": "United Kingdom"
      },
      "medicalSpecialty": ["Diagnostic Imaging", "Radiology", "MRI Scanning", "CT Scanning"],
      "serviceType": ["Equipment Rental", "Clinical Services", "Mobile Imaging"],
      "openingHours": "Mo-Fr 08:00-20:00",
      "sameAs": ["https://www.linkedin.com/company/compleohealth/"]
    }
  },
  
  services: {
    title: "Medical Imaging Services | MRI & CT Equipment Solutions | Compleo Health",
    description: "Comprehensive medical imaging services including equipment rental, clinical insourcing, mobile imaging units, and managed equipment services for healthcare providers.",
    keywords: "medical imaging services, equipment rental, clinical insourcing, mobile imaging, managed equipment services, healthcare solutions",
    canonicalUrl: "https://compleohealth.com/services",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Medical Imaging Services",
      "description": "Comprehensive medical imaging equipment and clinical services",
      "provider": {
        "@type": "MedicalBusiness",
        "name": "Compleo Health"
      },
      "serviceType": [
        "Managed Equipment Services",
        "Equipment Rental",
        "Clinical Insourcing",
        "Mobile Imaging",
        "Community Diagnostic Centres",
        "Screening Programs"
      ],
      "areaServed": {
        "@type": "Country",
        "name": "United Kingdom"
      }
    }
  },

  managedEquipment: {
    title: "Managed Equipment Services | Medical Device Management | Compleo Health",
    description: "Professional managed equipment services for MRI and CT scanners. Complete lifecycle management including maintenance, upgrades, and technical support for NHS Trusts and healthcare providers.",
    keywords: "managed equipment services, medical device management, mri maintenance, ct scanner support, healthcare equipment lifecycle, nhs equipment management",
    canonicalUrl: "https://compleohealth.com/services/managed-equipment",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Managed Equipment Services",
      "description": "Complete lifecycle management for medical imaging equipment",
      "provider": {
        "@type": "MedicalBusiness",
        "name": "Compleo Health"
      },
      "serviceOutput": "Optimized equipment performance and reduced operational costs",
      "areaServed": {
        "@type": "Country",
        "name": "United Kingdom"
      }
    }
  },

  equipmentRentals: {
    title: "Equipment Rental | MRI & CT Scanner Hire UK | Compleo Health",
    description: "Flexible MRI and CT scanner rental solutions for NHS trusts and private healthcare providers. Short-term and long-term equipment hire with comprehensive support.",
    keywords: "equipment rental, mri scanner rental uk, ct scanner hire, medical equipment rental, healthcare equipment lease, diagnostic imaging rental",
    canonicalUrl: "https://compleohealth.com/services/equipment-rental",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Equipment Rental",
      "description": "MRI and CT scanner rental solutions for healthcare providers",
      "provider": {
        "@type": "MedicalBusiness",
        "name": "Compleo Health"
      },
      "offers": {
        "@type": "Offer",
        "description": "Flexible rental terms available"
      },
      "areaServed": {
        "@type": "Country",
        "name": "United Kingdom"
      }
    }
  },

  clinicalInsourcing: {
    title: "Clinical Insourcing | Healthcare Staffing Solutions UK | Compleo Health",
    description: "Professional clinical insourcing services providing qualified radiographers and technical staff for medical imaging departments across NHS Trusts and private healthcare providers.",
    keywords: "clinical insourcing, healthcare staffing uk, radiographer services, medical imaging staff, clinical personnel, healthcare workforce solutions",
    canonicalUrl: "https://compleohealth.com/services/clinical-insourcing",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Clinical Insourcing",
      "description": "Professional clinical staffing for medical imaging departments",
      "provider": {
        "@type": "MedicalBusiness",
        "name": "Compleo Health"
      },
      "areaServed": {
        "@type": "Country",
        "name": "United Kingdom"
      },
      "serviceOutput": "Qualified healthcare professionals and reduced staffing pressures"
    }
  },

  mobileImaging: {
    title: "Mobile & Relocatable Imaging Units | Mobile MRI Services UK | Compleo Health",  
    description: "Mobile MRI and CT imaging services with relocatable units. Bringing diagnostic imaging directly to your healthcare facility with flexible deployment options.",
    keywords: "mobile relocatable imaging units, mobile mri services uk, relocatable imaging, mobile ct scanner, portable medical imaging, mobile diagnostic services",
    canonicalUrl: "https://compleohealth.com/equipmentdetails",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service", 
      "name": "Mobile & Relocatable Imaging Units",
      "description": "Mobile MRI and CT imaging solutions with relocatable units",
      "provider": {
        "@type": "MedicalBusiness",
        "name": "Compleo Health"
      },
      "areaServed": {
        "@type": "Country",
        "name": "United Kingdom"
      },
      "serviceOutput": "Flexible diagnostic imaging deployment"
    }
  },

  equipmentDetails: {
    title: "Mobile & Relocatable Imaging Units | Equipment Portfolio | Compleo Health",
    description: "Comprehensive mobile and relocatable imaging solutions with advanced equipment portfolio. Mobile MRI units and CT scanners for flexible healthcare deployment.",
    keywords: "mobile relocatable imaging units, equipment portfolio, mobile mri units, relocatable ct scanners, portable imaging equipment, mobile diagnostic technology",
    canonicalUrl: "https://compleohealth.com/equipmentdetails",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Mobile & Relocatable Imaging Equipment",
      "description": "Mobile and relocatable imaging solutions with comprehensive equipment portfolio",
      "provider": {
        "@type": "MedicalBusiness", 
        "name": "Compleo Health"
      },
      "areaServed": {
        "@type": "Country",
        "name": "United Kingdom"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Mobile Imaging Equipment Portfolio",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Mobile MRI Units",
              "category": "Medical Imaging Equipment"
            }
          },
          {
            "@type": "Offer", 
            "itemOffered": {
              "@type": "Service",
              "name": "Relocatable CT Scanners",
              "category": "Medical Imaging Equipment"
            }
          }
        ]
      }
    }
  },

  communityDiagnostic: {
    title: "Community Diagnostic Centres | NHS Diagnostic Services | Compleo Health",
    description: "Supporting NHS community diagnostic centres with advanced imaging equipment and clinical expertise to reduce waiting times and improve patient access to diagnostics.",
    keywords: "community diagnostic centres, nhs diagnostic services, diagnostic imaging nhs, community healthcare, diagnostic centres uk, nhs waiting times",
    canonicalUrl: "https://compleohealth.com/services/community-diagnostic-centres",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Community Diagnostic Centres",
      "description": "Supporting NHS diagnostic services and community healthcare",
      "provider": {
        "@type": "MedicalBusiness",
        "name": "Compleo Health"
      },
      "areaServed": {
        "@type": "Country",
        "name": "United Kingdom"
      },
      "audience": {
        "@type": "Audience",
        "name": "NHS Trusts and Community Healthcare Providers"
      }
    }
  },

  screeningPrograms: {
    title: "Screening Programmes | Health Screening Services UK | Compleo Health",
    description: "Comprehensive health screening programmes using advanced imaging technology. Early detection and preventive healthcare services for NHS and private healthcare providers.",
    keywords: "screening programmes, health screening services uk, medical screening programmes, preventive healthcare, early detection, health screening uk",
    canonicalUrl: "https://compleohealth.com/services/screening-programmes",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Screening Programmes",
      "description": "Comprehensive health screening and early detection services",
      "provider": {
        "@type": "MedicalBusiness",
        "name": "Compleo Health"
      },
      "areaServed": {
        "@type": "Country",
        "name": "United Kingdom"
      },
      "serviceOutput": "Early detection and preventive healthcare"
    }
  },

  equipment: {
    title: "Medical Imaging Equipment | MRI & CT Scanners | Siemens, Philips, Canon",
    description: "Advanced MRI and CT scanners from leading manufacturers. Siemens, Philips, and Canon diagnostic imaging equipment for healthcare providers.",
    keywords: "medical imaging equipment, mri scanners, ct scanners, siemens mri, philips ct, canon medical equipment, diagnostic imaging technology",
    canonicalUrl: "https://compleohealth.com/equipment",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Medical Imaging Equipment",
      "description": "Advanced MRI and CT scanners from leading manufacturers",
      "brand": ["Siemens", "Philips", "Canon"],
      "category": "Medical Equipment"
    }
  },

  about: {
    title: "About Compleo Health | Medical Imaging Experts | Healthcare Technology Leaders",
    description: "Learn about Compleo Health's mission to deliver advanced medical imaging solutions. Meet our expert team and discover our commitment to healthcare excellence.",
    keywords: "about compleo health, medical imaging experts, healthcare technology leaders, diagnostic imaging company, medical equipment specialists",
    canonicalUrl: "https://compleohealth.com/about",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Compleo Health",
      "description": "Learn about our mission and expertise in medical imaging",
      "mainEntity": {
        "@type": "MedicalBusiness",
        "name": "Compleo Health"
      }
    }
  },

  "work-with-us": {
    title: "Work With Us | Join Our Healthcare Technology Team | Compleo Health",
    description: "Explore career opportunities at Compleo Health. Join our team of healthcare technology experts and make a difference in medical imaging.",
    keywords: "work with compleo health, healthcare jobs, medical imaging careers, healthcare technology jobs, medical equipment careers",
    canonicalUrl: "https://compleohealth.com/work-with-us",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Work With Us at Compleo Health",
      "description": "Career opportunities in healthcare technology"
    }
  },

  contact: {
    title: "Contact Compleo Health | Get Medical Imaging Solutions Quote",
    description: "Contact Compleo Health for medical imaging equipment rental, clinical services, or mobile imaging solutions. Get your quote today.",
    keywords: "contact compleo health, medical imaging quote, healthcare equipment rental contact, diagnostic services enquiry",
    canonicalUrl: "https://compleohealth.com/contact",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Compleo Health",
      "description": "Get in touch for medical imaging solutions"
    }
  },

  sustainability: {
    title: "Healthcare Sustainability | Environmental Leadership | Compleo Health",
    description: "Discover Compleo Health's commitment to sustainable healthcare practices, environmental responsibility, and social impact initiatives.",
    keywords: "healthcare sustainability, environmental healthcare, sustainable medical equipment, green healthcare practices, carbon neutral healthcare",
    canonicalUrl: "https://compleohealth.com/sustainability",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Healthcare Sustainability",
      "description": "Our commitment to environmental responsibility and sustainable practices"
    }
  },

  newsAndViews: {
    title: "Healthcare News & Industry Insights | Compleo Health Blog",
    description: "Stay updated with the latest healthcare industry news, medical imaging innovations, and expert insights from Compleo Health.",
    keywords: "healthcare news, medical imaging news, healthcare technology insights, industry updates, healthcare innovation",
    canonicalUrl: "https://compleohealth.com/news-and-views",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Healthcare News & Insights",
      "description": "Latest news and insights from the healthcare industry"
    }
  },

  patientPortal: {
    title: "Patient Portal | Private Medical Imaging Services | Compleo Health",
    description: "Access private medical imaging services with fast appointments, expert radiologists, and comprehensive diagnostic solutions.",
    keywords: "private medical imaging, patient portal, private mri scan, private ct scan, medical imaging appointments",
    canonicalUrl: "https://compleohealth.com/patient-portal",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "Patient Portal - Private Medical Imaging",
      "description": "Private medical imaging services for patients"
    }
  },

  caseStudies: {
    title: "Healthcare Case Studies | Success Stories | Compleo Health",
    description: "Explore our healthcare case studies and success stories from NHS trusts and private healthcare providers across the UK.",
    keywords: "healthcare case studies, nhs success stories, medical imaging case studies, healthcare provider testimonials",
    canonicalUrl: "https://compleohealth.com/case-studies",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Healthcare Case Studies",
      "description": "Success stories from our healthcare partners"
    }
  },

  ourTeam: {
    title: "Our Leadership Team | Healthcare Experts | Compleo Health",
    description: "Meet the expert leadership team behind Compleo Health's medical imaging solutions and healthcare technology innovations.",
    keywords: "compleo health team, healthcare leadership, medical imaging experts, healthcare technology leaders",
    canonicalUrl: "https://compleohealth.com/our-team",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "Our Leadership Team",
      "description": "Meet our expert healthcare leadership team"
    }
  }
};

// Generate FAQ schema for service pages
export const FAQ_SCHEMAS = {
  equipmentRentals: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What types of medical imaging equipment do you rent?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We rent MRI scanners, CT scanners, and mobile imaging units from leading manufacturers including Siemens, Philips, and Canon."
        }
      },
      {
        "@type": "Question",
        "name": "What are the rental terms for MRI and CT scanners?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer flexible rental terms from short-term projects to long-term contracts, with options for daily, weekly, monthly, and annual rentals."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide technical support with equipment rental?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all our equipment rentals include comprehensive technical support, maintenance, and training for your staff."
        }
      }
    ]
  },
  
  clinicalInsourcing: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What clinical staff do you provide?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide qualified radiographers, medical imaging technologists, and clinical support staff for MRI and CT departments."
        }
      },
      {
        "@type": "Question",
        "name": "Are your clinical staff fully qualified?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all our clinical staff are fully qualified, registered professionals with extensive experience in medical imaging."
        }
      }
    ]
  }
};