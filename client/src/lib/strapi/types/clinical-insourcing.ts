/**
 * Clinical Insourcing Page Types
 * 
 * TypeScript definitions for the clinical insourcing page content from Strapi CMS
 * Following proven managed equipment pattern
 */

import { StrapiButton } from './common';

/**
 * Service feature component for clinical insourcing page
 */
export interface StrapiServiceFeature {
  title: string;
  description: string;
}

/**
 * Curved Pill CTA section component
 */
export interface StrapiCurvedPillCTA {
  title: string;
  description: string;
  primaryButton_text: string;
  primaryButton_Href: string;
  secondaryButton_text: string;
  secondaryButton_Href: string;
}

/**
 * Complete clinical insourcing page data structure
 * Following exact pattern from managed equipment
 */
export interface ClinicalInsourcingPage {
  heroTitle: string;
  heroSubtitle: string;
  primaryButton: StrapiButton;
  secondaryButton: StrapiButton;
  serviceDetailsTitle: string;
  serviceDetailsDescription: string;
  serviceImage: string;
  serviceImageAlt: string;
  features: StrapiServiceFeature[];
  ctaSection: StrapiCurvedPillCTA;
}
