/**
 * Home Page Strapi Types
 * 
 * This file contains type definitions specific to the home page content
 * from the Strapi CMS.
 */

import {
  StrapiButton,
  StrapiImpactStatisticGroup,
  StrapiSharedImpactStatistics,
  StrapiValueCard,
  StrapiApproachFeature,
  StrapiSection,
  StrapiCTA
} from './common';

/**
 * Hero section type
 */
export interface StrapiHero {
  heading: string;
  highlighttext: string;
  subheading: string;
  backgroundVideoURL: string;
  fallbackImageURL: string;
  primaryButton?: StrapiButton;
  secondaryButton?: StrapiButton;
  ImpactStatistics?: StrapiImpactStatisticGroup;
  impactStatsTitle?: string;
}

/**
 * Value proposition section type
 */
export interface StrapiValueProposition {
  title: string;
  subtitle: string;
  ValuePropositionCards: StrapiValueCard[];
}

/**
 * Approach panel type
 */
export interface StrapiApproachPanel {
  title: string;
  description: string;
  ApproachFeatures: StrapiApproachFeature[];
}

/**
 * Healthcare solutions section type
 */
export interface StrapiSolution {
  title: string;
  description: string;
  solutions: StrapiValueCard[];
}

/**
 * Testimonial item type
 */
export interface StrapiTestimonial {
  id: number;
  quote: string;
  author: string;
  role?: string;
  company?: string;
  rating?: number;
}

/**
 * Testimonials section type
 */
export interface StrapiTestimonialsSection extends StrapiSection {
  testimonials?: StrapiTestimonial[];
}

/**
 * Location item type
 */
export interface StrapiLocation {
  id: number;
  name: string;
  address?: string;
  latitude: number;
  longitude: number;
}

/**
 * Location map section type
 */
export interface StrapiLocationMapSection extends StrapiSection {
  locations?: StrapiLocation[];
}

/**
 * Curved CTA section type
 */
export interface StrapiCurvedCTASection {
  title: string;
  description?: string;
  buttonText: string;
  buttonHref: string;
  imageSrc?: string;
  mobileImageSrc?: string;
}

/**
 * Complete home page type that includes all sections
 */
export interface StrapiHomePage {
  Hero?: StrapiHero[];
  ValueProposition?: StrapiValueProposition;
  Approach?: { ApproachPanel: StrapiApproachPanel[] }[];
  ApproachPanel?: StrapiApproachPanel[];
  HealthcareSolutions?: StrapiSolution;
  Testimonials?: StrapiTestimonialsSection;
  LocationMap?: StrapiLocationMapSection;
  CurvedCTA?: StrapiCurvedCTASection;
  impactStatsTitle?: string;
}
