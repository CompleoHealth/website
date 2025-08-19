import {
  StrapiButton,
  StrapiMedia,
  StrapiValueCard,
  StrapiFeatureBullet,
  StrapiImpactStatisticGroup,
  StrapiSharedImpactStatistics
} from './common';

/**
 * Feature item with just text
 */
export interface StrapiFeatureItem {
  id: number;
  text: string;
}

/**
 * Feature with icon, title and description
 */
export interface StrapiFeatureWithIcon {
  id: number;
  title: string;
  description: string;
  icon: string;
}

/**
 * Content block for service detail pages
 */
export interface StrapiContentBlock {
  id: number;
  heading: string;
  content: string;
  image?: StrapiMedia;
  layout: 'text-left' | 'text-right' | 'full-width';
}

/**
 * Button structure in Strapi
 */
export interface StrapiHeroButton {
  text: string;
  subtext?: string;
  url: string;
  analyticsId?: string;
}

/**
 * Hero section for service detail pages
 */
export interface StrapiServiceHero {
  id: number;
  heading: string;
  subheading: string;
  highlighttext?: string;
  backgroundVideoURL?: string;
  fallbackImageURL?: string;
  backgroundColor?: string;
  textColor?: string;
  primaryButton?: StrapiHeroButton;
}

/**
 * Service detail content
 */
export interface StrapiServiceDetail {
  id: number;
  heroContent: StrapiServiceHero;
  detailTitle: string;
  detailDescription: string;
  detailImage: StrapiMedia;
  detailFeatures: StrapiFeatureWithIcon[];
  contentBlocks?: StrapiContentBlock[];
}

/**
 * Service card for services listing
 */
export interface StrapiService {
  id: number;
  title: string;
  description: string;
  features: StrapiFeatureItem[];
  imageUrl: StrapiMedia;
  imageAlt: string;
  slug: string;
  detailContent?: StrapiServiceDetail;
}

/**
 * Approach Bullets component (for numbered benefits)
 */
export interface StrapiApproachBullet {
  title: string;
  description: string;
}

/**
 * Curved Pill CTA component
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
 * Services Page content type
 */
export interface StrapiServicesPage {
  id: number;
  heroContent: StrapiServiceHero;
  sectionTitle: string;
  sectionDescription: string;
  services: StrapiValueCard[];
  PillText?: string;
  ApproachFeatures?: StrapiApproachBullet[];
  impactStatsTitle?: string;
  sharedImpactStats?: StrapiSharedImpactStatistics;
  CurvedPill_CTA?: StrapiCurvedPillCTA;
}
