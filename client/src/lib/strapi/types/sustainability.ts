import { 
  StrapiButton, 
  StrapiMedia 
} from './common';

// Sustainability Page Types - Following proven pattern from equipment-details and other service pages

/**
 * Interest Area Card Component
 */
export interface StrapiInterestAreaCard {
  title: string;
  text: string;
  image: string;
}

/**
 * Sustainability Initiative Component
 */
export interface StrapiSustainabilityInitiative {
  title: string;
  text: string;
  impact: string;
}

/**
 * Social Impact Initiative Component
 */
export interface StrapiSocialImpactInitiative {
  title: string;
  text: string;
  impact: string;
}

/**
 * Impact Card Component
 */
export interface StrapiImpactCard {
  title: string;
  text: string;
  imageUrl?: string;
  url?: string;
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
 * Complete Sustainability Page Structure
 * Following exact proven pattern from equipment-details and other service pages
 */
export interface SustainabilityPage {
  // Hero section
  heroTitle: string;
  heroSubtitle: string;
  primaryButton: StrapiButton;
  secondaryButton: StrapiButton;
  
  // Interest Areas section
  interestAreasTitle: string;
  interestAreasDescription: string;
  interestAreas: StrapiInterestAreaCard[];
  
  // Sustainability Initiatives section
  sustainabilityInitiativesTitle: string;
  sustainabilityInitiativesDescription: string;
  sustainabilityInitiatives: StrapiSustainabilityInitiative[];
  
  // Social Impact Initiatives section
  socialImpactInitiativesTitle: string;
  socialImpactInitiativesDescription: string;
  socialImpactInitiatives: StrapiSocialImpactInitiative[];
  
  // Impact Cards section
  impactCardsTitle: string;
  impactCardsDescription: string;
  impactCards: StrapiImpactCard[];
  
  // CTA section - using existing component
  ctaSection: StrapiCurvedPillCTA;
}
