import { useEffect } from 'react';
import { ORGANIZATION_SCHEMA, MEDICAL_ORGANIZATION_SCHEMA, generateStructuredData } from '@/lib/structured-data';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  imageUrl?: string;
  pageType?: 'website' | 'article' | 'service' | 'organization';
  structuredData?: any;
}

export function SEOHead({
  title,
  description,
  keywords,
  canonicalUrl,
  imageUrl = '/images/shared/logo-seo.jpg',
  pageType = 'website',
  structuredData
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta tags
    const updateMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) || 
                 document.querySelector(`meta[name="${property}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property.startsWith('og:') || property.startsWith('twitter:')) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', property);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };
    
    // Basic meta tags
    updateMetaTag('description', description);
    if (keywords) updateMetaTag('keywords', keywords);
    
    // Open Graph tags
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:type', pageType);
    updateMetaTag('og:image', imageUrl);
    updateMetaTag('og:site_name', 'Compleo Health');
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', imageUrl);
    
    // Canonical URL
    if (canonicalUrl) {
      updateMetaTag('og:url', canonicalUrl);
      
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', canonicalUrl);
    }
    
    // Add structured data
    const addStructuredData = (schema: any, id: string) => {
      let script = document.getElementById(id);
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = generateStructuredData(schema);
    };
    
    // Always add organization schema
    addStructuredData(ORGANIZATION_SCHEMA, 'organization-schema');
    addStructuredData(MEDICAL_ORGANIZATION_SCHEMA, 'medical-organization-schema');
    
    // Add page-specific structured data
    if (structuredData) {
      addStructuredData(structuredData, 'page-schema');
    }
    
  }, [title, description, keywords, canonicalUrl, imageUrl, pageType, structuredData]);
  
  return null;
}

export default SEOHead;