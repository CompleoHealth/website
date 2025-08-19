import { 
  StrapiButton, 
  StrapiApproachFeature,
  StrapiMedia 
} from './common';

// Equipment Rental Page Types - Following proven pattern + reusing established types

/**
 * Video Hero Section - NEW section type for Equipment Rental
 * Uses proven StrapiMedia type for video/image handling
 */
export interface StrapiVideoHeroSection {
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  videoUrl: string;
  fallbackImageUrl: string;
}

/**
 * Mobile Units Introduction Section - NEW section type for Equipment Rental
 * Reuses StrapiApproachFeature for features array (proven pattern from Home/Services)
 */
export interface StrapiMobileUnitsSection {
  sectionTitle: string;
  sectionDescription: string;
  contentTitle: string;
  contentDescription: string;
  features: StrapiApproachFeature[]; // REUSING proven pattern from common.ts
  image: string;
  imageAlt: string;
}

/**
 * Curved Pill CTA - Reusing established pattern
 */
export interface StrapiCurvedPillCTA {
  title: string;
  description: string;
  primaryButton_text: string;
  primaryButton_Href: string;
  secondaryButton_text: string;
}

/**
 * Complete Equipment Rental Page Structure
 * Following exact proven pattern from other 4 service pages + new sections
 */
export interface EquipmentRentalPage {
  // Standard sections (same as other 4 pages)
  heroTitle: string;
  heroSubtitle: string;
  primaryButton: StrapiButton;
  secondaryButton: StrapiButton;
  
  serviceDetailsTitle: string;
  serviceDetailsDescription: string;
  serviceImage: string;
  serviceImageAlt: string;
  
  features: StrapiApproachFeature[]; // REUSING proven pattern from common.ts
  
  // Video Hero Section fields (flat structure to match CMS schema)
  videoHeroTitle: string;
  videoHeroDescription: string;
  videoHeroBackgroundVideo: string;
  videoHeroFallbackImage: string;
  
  // Mobile Units Section fields (flat structure to match CMS schema)
  mobileUnitsTitle: string;
  mobileUnitsDescription: string;
  MobileSolutionsText_Title: string;
  MobileSolutionsText_Description: string;
  mobileUnitsFeatures: StrapiApproachFeature[];
  mobileUnitsImage: string;
  
  ctaSection: StrapiCurvedPillCTA;
}
