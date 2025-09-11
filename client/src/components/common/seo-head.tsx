import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { ORGANIZATION_SCHEMA, MEDICAL_ORGANIZATION_SCHEMA, generateStructuredData } from '@/lib/structured-data';
import { strapiApi } from '@/lib/strapi';
import type { StrapiPageSEO } from '@/lib/strapi/types';

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
  const [location] = useLocation();
  const [cmsSeoData, setCmsSeoData] = useState<StrapiPageSEO | null>(null);
  
  // Fetch CMS SEO data
  useEffect(() => {
    const fetchCMSSEO = async () => {
      try {
        const data = await strapiApi.pageSeoApi.getPageSEO();
        setCmsSeoData(data);
      } catch (error) {
        // Failed to fetch CMS SEO data - using fallback
      }
    };
    fetchCMSSEO();
  }, []);
  
  useEffect(() => {
    // Calculate route key based on location
    let routeKey: string;
    if (location === '/') {
      routeKey = 'home';
    } else {
      const path = location.slice(1);
      if (path.startsWith('work-with-us')) {
        routeKey = 'work-with-us';
      } else if (path.startsWith('news-and-views')) {
        routeKey = 'news-and-views';
      } else if (path.startsWith('our-team')) {
        routeKey = 'our-team';
      } else if (path.startsWith('case-studies')) {
        routeKey = 'case-studies';
      } else if (path.startsWith('equipment-details')) {
        routeKey = 'equipment-details';
      } else if (path.startsWith('net-zero-goals')) {
        routeKey = 'net-zero-goals';
      } else if (path.startsWith('privacy-policy')) {
        routeKey = 'privacy-policy';
      } else if (path.startsWith('cookie-policy')) {
        routeKey = 'cookie-policy';
      } else if (path.startsWith('services/managed-equipment')) {
        routeKey = 'managed-equipment';
      } else if (path.startsWith('services/equipment-rental')) {
        routeKey = 'equipment-rentals';
      } else if (path.startsWith('services/clinical-insourcing')) {
        routeKey = 'clinical-insourcing';
      } else if (path.startsWith('services/community-diagnostic-centres')) {
        routeKey = 'community-diagnostic-centres';
      } else if (path.startsWith('services/screening-programmes')) {
        routeKey = 'screening-programmes';
      } else {
        routeKey = path.split('/')[0];
      }
    }
    
    // Check for CMS data first, then use props as fallback
    let finalTitle = title;
    let finalDescription = description;
    let finalKeywords = keywords;
    
    if (cmsSeoData?.pages) {
      const cmsPage = cmsSeoData.pages.find(p => p.pageSlug === routeKey);
      if (cmsPage) {
        finalTitle = cmsPage.title;
        finalDescription = cmsPage.description;
        finalKeywords = cmsPage.keywords;
        // Using CMS SEO data
      } else {
        // No CMS data available, using fallback
      }
    }
    
    // Update document title
    document.title = finalTitle;
    
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
    updateMetaTag('description', finalDescription);
    if (finalKeywords) updateMetaTag('keywords', finalKeywords);
    
    // Open Graph tags
    updateMetaTag('og:title', finalTitle);
    updateMetaTag('og:description', finalDescription);
    updateMetaTag('og:type', pageType);
    updateMetaTag('og:image', imageUrl);
    updateMetaTag('og:site_name', 'Compleo Health');
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', finalTitle);
    updateMetaTag('twitter:description', finalDescription);
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
    
  }, [title, description, keywords, canonicalUrl, imageUrl, pageType, structuredData, location, cmsSeoData]);
  
  return null;
}

export default SEOHead;