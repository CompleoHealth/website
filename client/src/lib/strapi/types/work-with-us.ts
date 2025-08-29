import { StrapiMedia, StrapiButton } from './common';

/**
 * Work With Us Page Types
 * Following schema structure from work-with-us-page content type
 */

export interface StrapiBenefitItem {
  title: string;
  description: string;
}

export interface StrapiWhyJoinPoint {
  text: string;
}

export interface StrapiWorkWithUsHero {
  title: string;
  subtitle?: string;
  backgroundImage?: StrapiMedia;
  button1?: StrapiButton;
  button2?: StrapiButton;
}

export interface StrapiWorkWithUsPage {
  Hero?: StrapiWorkWithUsHero;
  whyJoinTitle?: string;
  whyJoinPoints?: StrapiWhyJoinPoint[];
  benefitsTitle?: string;
  benefitsSubtitle?: string;
  benefitsItems?: StrapiBenefitItem[];
  opportunitiesTitle?: string;
  opportunitiesSubtitle?: string;
  linkedinUrl?: string;
  linkedinButtonText?: string;
  ctaHeading?: string;
  ctaDescription?: string;
  ctaPrimaryButton?: StrapiButton;
  ctaSecondaryButton?: StrapiButton;
}