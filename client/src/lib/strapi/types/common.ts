/**
 * Common Strapi Component Types
 * 
 * This file contains type definitions for shared/reusable Strapi components
 * that are used across multiple sections of the website.
 */

/**
 * Base Strapi entity with common fields
 */
export interface StrapiEntity {
  id: number;
  attributes?: any;
  [key: string]: any;
}

/**
 * Image type for Strapi media
 */
export interface StrapiImage {
  data?: {
    id: number;
    attributes: {
      url: string;
      width: number;
      height: number;
      alternativeText?: string;
      formats?: {
        thumbnail?: { url: string; width: number; height: number };
        small?: { url: string; width: number; height: number };
        medium?: { url: string; width: number; height: number };
        large?: { url: string; width: number; height: number };
      };
    };
  };
}

/**
 * Button component used across multiple sections
 */
export interface StrapiButton {
  text: string;         // Primary button text
  subtext?: string;     // Secondary/smaller text
  url: string;          // Link destination
  icon?: string;        // Icon identifier
  analyticsId?: string; // For tracking
}

/**
 * Media component for images, videos, etc.
 */
export interface StrapiMedia {
  url: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
}

/**
 * Impact statistic used in hero and other sections
 */
export interface StrapiImpactStatistic {
  statId: string;       // Unique identifier
  value: string;        // The displayed value (e.g., "30+")
  label: string;        // Description label
  description?: string; // Additional context
}

/**
 * Group of impact statistics with a title
 */
export interface StrapiImpactStatisticGroup {
  title: string;
  statistics: StrapiImpactStatistic[];
}

/**
 * Shared global impact statistics component
 */
export interface StrapiSharedImpactStatistics {
  statistics: StrapiImpactStatistic[];
}

/**
 * Feature bullet used in value cards and other sections
 */
export interface StrapiFeatureBullet {
  text: string;         // Feature text
}

/**
 * Value card used in multiple sections
 */
export interface StrapiValueCard {
  title: string;
  description: string;
  linkText?: string;
  linkUrl?: string;
  imageUrl?: string;
  Features?: StrapiFeatureBullet[];
}

/**
 * Approach feature used in approach panels
 */
export interface StrapiApproachFeature {
  title: string;
  description: string;
}

/**
 * Generic section with title and subtitle
 * Used for various content sections
 */
export interface StrapiSection {
  title: string;
  subtitle?: string;
}

/**
 * CTA (Call to Action) component
 * Used in various sections
 */
export interface StrapiCTA {
  title: string;
  description?: string;
  buttonText: string;
  buttonHref: string;
  imageSrc?: string;
}
