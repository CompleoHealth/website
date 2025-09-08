interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

export function updatePageSEO(seoData: SEOData) {
  console.log('🔥 updatePageSEO called with:', seoData);
  // Update document title
  document.title = seoData.title;
  console.log('🔥 document.title set to:', document.title);
  
  // Debug: Monitor title changes after we set it
  setTimeout(() => {
    if (document.title !== seoData.title) {
      console.error('🚨 TITLE WAS OVERRIDDEN! Expected:', seoData.title, 'Actual:', document.title);
    } else {
      console.log('✅ Title still correct after 1s:', document.title);
    }
  }, 1000);

  // Update meta description
  updateMetaTag('name', 'description', seoData.description);

  // Update keywords if provided
  if (seoData.keywords) {
    updateMetaTag('name', 'keywords', seoData.keywords);
  }

  // Update Open Graph tags
  updateMetaTag('property', 'og:title', seoData.ogTitle || seoData.title);
  updateMetaTag('property', 'og:description', seoData.ogDescription || seoData.description);
  updateMetaTag('property', 'og:type', 'website');
  
  if (seoData.ogImage) {
    updateMetaTag('property', 'og:image', seoData.ogImage);
  } else {
    // Default to Compleo logo if no specific image provided
    updateMetaTag('property', 'og:image', '/images/shared/logo-main.jpg');
  }

  // Update Twitter Card tags
  updateMetaTag('name', 'twitter:card', 'summary_large_image');
  updateMetaTag('name', 'twitter:title', seoData.ogTitle || seoData.title);
  updateMetaTag('name', 'twitter:description', seoData.ogDescription || seoData.description);
  
  // Set Twitter image (use provided image or default to Compleo logo)
  const twitterImage = seoData.ogImage || '/images/shared/logo-main.jpg';
  updateMetaTag('name', 'twitter:image', twitterImage);

  // Update canonical URL
  if (seoData.canonicalUrl) {
    updateLinkTag('canonical', seoData.canonicalUrl);
  }

  // Add structured data
  if (seoData.structuredData) {
    updateStructuredData(seoData.structuredData);
  }
}

function updateMetaTag(attribute: string, value: string, content: string) {
  let tag = document.querySelector(`meta[${attribute}="${value}"]`) as HTMLMetaElement;
  
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, value);
    document.head.appendChild(tag);
  }
  
  tag.content = content;
}

function updateLinkTag(rel: string, href: string) {
  let tag = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  
  if (!tag) {
    tag = document.createElement('link');
    tag.rel = rel;
    document.head.appendChild(tag);
  }
  
  tag.href = href;
}

function updateStructuredData(data: object) {
  // Remove existing structured data
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }

  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

// Predefined SEO data for different pages
export const pageSEOData = {
  home: {
    title: 'Compleo Health - Medical Imaging Equipment & Services | MRI & CT Scanners',
    description: 'Leading provider of MRI and CT scanner equipment rental, clinical services, and mobile imaging solutions for NHS Trusts and private healthcare providers across the UK.',
    keywords: 'MRI scanner rental, CT scanner equipment, medical imaging services, NHS healthcare solutions, mobile MRI units, clinical insourcing',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "Compleo Health",
      "description": "Medical imaging equipment and services provider",
      "url": "https://compleohealth.com",
      "telephone": "+44-161-884-1303",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Healthcare Drive",
        "addressLocality": "Manchester",
        "postalCode": "M1 1AA",
        "addressCountry": "GB"
      },
      "serviceArea": {
        "@type": "Country",
        "name": "United Kingdom"
      },
      "medicalSpecialty": ["Radiology", "Diagnostic Imaging"]
    }
  },
  services: {
    title: 'Medical Imaging Services - MRI & CT Equipment Solutions | Compleo Health',
    description: 'Comprehensive medical imaging services including equipment rental, clinical insourcing, mobile imaging units, and managed equipment services for healthcare providers.',
    keywords: 'medical imaging services, equipment rental, clinical insourcing, mobile MRI, managed equipment, NHS solutions'
  },
  equipment: {
    title: 'MRI & CT Scanner Equipment - Advanced Medical Imaging Technology | Compleo Health',
    description: 'State-of-the-art MRI and CT scanner equipment featuring the latest technology from leading manufacturers. Rental and purchase options available.',
    keywords: 'MRI scanner, CT scanner, medical equipment, MAGNETOM, Ingenia, Aquilion, medical technology'
  },
  contact: {
    title: 'Contact Compleo Health - Medical Imaging Equipment Specialists',
    description: 'Get in touch with our medical imaging experts. Contact Compleo Health for MRI and CT scanner equipment, services, and support across the UK.',
    keywords: 'contact Compleo Health, medical imaging support, equipment inquiry, healthcare services contact'
  },
  about: {
    title: 'About Compleo Health - Leading Medical Imaging Solutions Provider',
    description: 'Learn about Compleo Health, the UK\'s trusted provider of medical imaging equipment and services. Our mission, values, and commitment to healthcare excellence.',
    keywords: 'about Compleo Health, medical imaging company, healthcare solutions, NHS partner, medical equipment provider'
  },
  'news-and-views': {
    title: 'News and Views - Healthcare Innovation Updates | Compleo Health',
    description: 'Stay updated with the latest healthcare innovation trends, NHS updates, customer success stories, and upcoming events from Compleo Health\'s diagnostic imaging experts.',
    keywords: 'healthcare news, medical imaging innovation, NHS updates, diagnostic technology trends, healthcare conferences, Compleo Health updates'
  },
  'privacy-policy': {
    title: 'Privacy Policy - Data Protection & Privacy Rights | Compleo Health',
    description: 'Learn how Compleo Health protects your personal data and privacy. Our comprehensive privacy policy explains data collection, usage, and your rights under GDPR.',
    keywords: 'privacy policy, data protection, GDPR compliance, personal data, privacy rights, healthcare data security'
  },
  'cookie-policy': {
    title: 'Cookie Policy - Website Cookies & Tracking Information | Compleo Health',
    description: 'Understand how Compleo Health uses cookies to improve your website experience. Learn about cookie types, management options, and your privacy choices.',
    keywords: 'cookie policy, website cookies, tracking, analytics, user experience, privacy settings, browser cookies'
  },
  'csr': {
    title: 'Corporate Social Responsibility - Healthcare Community Impact | Compleo Health',
    description: 'Learn about Compleo Health\'s commitment to social responsibility through quality healthcare, ethical conduct, sustainability, and community engagement across the UK.',
    keywords: 'corporate social responsibility, healthcare CSR, community engagement, sustainability, ethical healthcare, quality care, environmental responsibility'
  },
  'modern-slavery-statement': {
    title: 'Modern Slavery Statement - Ethical Supply Chain Commitment | Compleo Health',
    description: 'Read Compleo Health\'s Modern Slavery Statement detailing our commitment to preventing modern slavery and human trafficking in our operations and supply chains.',
    keywords: 'modern slavery statement, human trafficking prevention, ethical supply chain, Modern Slavery Act 2015, business ethics, healthcare compliance'
  },
  'accessibility': {
    title: 'Accessibility Statement - Digital Inclusion & Web Accessibility | Compleo Health',
    description: 'Learn about Compleo Health\'s commitment to digital accessibility and web inclusion. Our accessibility statement details WCAG 2.1 compliance and support for assistive technologies.',
    keywords: 'accessibility statement, web accessibility, WCAG compliance, digital inclusion, assistive technology, screen reader support, keyboard navigation, healthcare accessibility'
  },
  'work-with-us': {
    title: 'Work With Us | Join Our Healthcare Technology Team | Compleo Health',
    description: 'Explore career opportunities at Compleo Health. Join our team of healthcare technology experts and make a difference in medical imaging.',
    keywords: 'work with compleo health, healthcare jobs, medical imaging careers, healthcare technology jobs, medical equipment careers',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Work With Us at Compleo Health",
      "description": "Career opportunities in healthcare technology"
    }
  },
  'our-team': {
    title: 'Our Leadership Team | Healthcare Experts | Compleo Health',
    description: 'Meet the expert leadership team behind Compleo Health\'s medical imaging solutions and healthcare technology innovations.',
    keywords: 'compleo health team, healthcare leadership, medical imaging experts, healthcare technology leaders',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "Our Leadership Team",
      "description": "Meet our expert healthcare leadership team"
    }
  },
  'case-studies': {
    title: 'Healthcare Case Studies | Success Stories | Compleo Health',
    description: 'Explore our healthcare case studies and success stories from NHS trusts and private healthcare providers across the UK.',
    keywords: 'healthcare case studies, nhs success stories, medical imaging case studies, healthcare provider testimonials',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Healthcare Case Studies",
      "description": "Success stories from our healthcare partners"
    }
  },
  'equipment-details': {
    title: 'Medical Equipment Portfolio | MRI & CT Scanner Specifications | Compleo Health',
    description: 'Explore our comprehensive medical equipment portfolio featuring advanced MRI scanners, CT systems, and mobile imaging units from leading manufacturers.',
    keywords: 'medical equipment portfolio, mri scanner specifications, ct scanner details, mobile imaging units, medical device catalog',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Medical Equipment Portfolio",
      "description": "Comprehensive medical imaging equipment catalog"
    }
  },
  'net-zero-goals': {
    title: 'Net Zero Carbon Goals | Environmental Sustainability | Compleo Health',
    description: 'Learn about Compleo Health\'s commitment to achieving net zero carbon emissions and our environmental sustainability initiatives.',
    keywords: 'net zero carbon goals, environmental sustainability, healthcare carbon reduction, green healthcare initiatives',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Net Zero Carbon Goals",
      "description": "Environmental sustainability and carbon reduction initiatives"
    }
  },
  'sustainability': {
    title: 'Sustainability & Environmental Leadership | Compleo Health',
    description: 'Discover Compleo Health\'s commitment to environmental sustainability, community impact, and responsible healthcare practices across the UK.',
    keywords: 'healthcare sustainability, environmental responsibility, green healthcare, community impact, sustainable medical imaging',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Sustainability Initiatives",
      "description": "Environmental and social responsibility in healthcare"
    }
  }
};