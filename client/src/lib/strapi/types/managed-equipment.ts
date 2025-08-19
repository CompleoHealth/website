/**
 * Managed Equipment Page Types
 * 
 * TypeScript definitions for the managed equipment page content from Strapi CMS
 */

import { StrapiButton } from './common';

/**
 * Service feature component for managed equipment page
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
 * Complete managed equipment page data structure
 */
export interface ManagedEquipmentPage {
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
