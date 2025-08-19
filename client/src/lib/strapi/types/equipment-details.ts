import { 
  StrapiButton, 
  StrapiApproachFeature,
  StrapiMedia 
} from './common';

// Equipment Details Page Types - Following proven pattern from other service pages

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
 * Complete Equipment Details Page Structure
 * Following exact proven pattern from other service pages
 */
export interface EquipmentDetailsPage {
  // Standard sections (same as other service pages)
  heroTitle: string;
  heroSubtitle: string;
  primaryButton: StrapiButton;
  secondaryButton: StrapiButton;
  
  serviceDetailsTitle: string;
  serviceDetailsDescription: string;
  serviceImage: string;
  serviceImageAlt: string;
  
  features: StrapiApproachFeature[]; // REUSING proven pattern from common.ts
  
  // Equipment Portfolio section fields
  equipmentPortfolioTitle: string;
  equipmentPortfolioDescription: string;
  
  ctaSection: StrapiCurvedPillCTA;
}
