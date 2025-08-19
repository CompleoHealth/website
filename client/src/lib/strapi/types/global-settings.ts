/**
 * Global Settings Types
 * 
 * This file contains TypeScript interfaces for global settings content
 * from the Strapi CMS, including footer content.
 */

import { StrapiImpactStatisticGroup } from './common';

/**
 * Footer section data from Strapi
 */
export interface StrapiFooter {
  /**
   * Company description text
   */
  companyDescription: string;
  
  /**
   * Company number text
   */
  companyNumber: string;
}

/**
 * Trust Signals section data from Strapi
 */
export interface StrapiTrustSignals {
  /**
   * Trust signals title
   */
  title: string;
  
  /**
   * Trust signals subtitle/description
   */
  subtitle: string;
}

/**
 * Contact Panel section data from Strapi
 */
export interface StrapiContactPanel {
  /**
   * Contact panel header
   */
  header: string;
  
  /**
   * Contact panel description
   */
  description: string;
  
  /**
   * Office title (e.g., "Manchester Office")
   */
  officeTitle: string;
  
  /**
   * Address line 1
   */
  addressLine1: string;
  
  /**
   * Address line 2
   */
  addressLine2: string;
  
  /**
   * Address line 3
   */
  addressLine3: string;
  
  /**
   * Address line 4
   */
  addressLine4: string;
  
  /**
   * Phone number
   */
  phone: string;
  
  /**
   * Email address
   */
  email: string;
  
  /**
   * Business hours
   */
  businessHours: string;
  
  /**
   * LinkedIn text
   */
  linkedinText: string;
  
  /**
   * Contact form button text
   */
  contactFormButtonText: string;
}

/**
 * Global settings data from Strapi
 */
export interface StrapiGlobalSettings {
  /**
   * Footer section data
   */
  Footer?: StrapiFooter;
  
  /**
   * Trust signals section data
   */
  TrustSignals?: StrapiTrustSignals;
  
  /**
   * Contact panel section data
   */
  ContactPanel?: StrapiContactPanel;
  
  /**
   * Shared impact statistics across all pages
   */
  ImpactStatistics?: StrapiImpactStatisticGroup;
}
