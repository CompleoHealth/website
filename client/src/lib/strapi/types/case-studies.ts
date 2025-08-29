import { StrapiMedia, StrapiButton } from './common';

/**
 * Case Studies Page Types
 * Following schema structure from case-studies-page content type
 */

export interface StrapiCaseStudiesHero {
  title: string;
  subtitle?: string;
  backgroundImage?: StrapiMedia;
  button1?: StrapiButton;
  button2?: StrapiButton;
}

export interface StrapiCaseStudiesPage {
  Hero?: StrapiCaseStudiesHero;
  impactStatsTitle?: string;
  successStoriesTitle?: string;
  successStoriesSubtitle?: string;
}