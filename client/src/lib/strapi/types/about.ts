/**
 * TypeScript interfaces for About page CMS data
 */

/**
 * Interface for hero button in About page
 */
export interface AboutHeroButton {
  text: string;
  subtext: string;
  href: string;
  trackingLabel?: string;
}

/**
 * Interface for company overview feature
 */
export interface CompanyFeature {
  title: string;
  description: string;
  iconType?: 'medical' | 'info' | 'success' | 'primary' | 'tech';
  iconName?: string;
  icon?: any; // For backward compatibility with static data
}

/**
 * Interface for company overview paragraph
 */
export interface CompanyParagraph {
  text: string;
  highlight: string;
  text2?: string;
}

/**
 * Interface for company value
 */
export interface CompanyValue {
  title: string;
  description: string;
  iconType?: 'medical' | 'info' | 'success' | 'primary' | 'tech';
  iconName?: string;
}

/**
 * Interface for CTA section
 */
export interface CtaSection {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

/**
 * Interface for About page data from CMS
 */
export interface AboutPage {
  // Hero section
  heroTitle: string;
  heroHighlightWord: string;
  heroSubtitle: string;
  heroPrimaryButton_text: string;
  heroPrimaryButton_subtext: string;
  heroPrimaryButton_href: string;
  heroPrimaryButton_trackingLabel?: string;
  heroSecondaryButton_text: string;
  heroSecondaryButton_subtext: string;
  heroSecondaryButton_href: string;
  heroSecondaryButton_trackingLabel?: string;
  
  // Company overview section
  companyTitle: string;
  companyParagraphs: CompanyParagraph[];
  companyFeatures: CompanyFeature[];
  
  // Values section
  valuesTitle: string;
  valuesDescription: string;
  companyValues: CompanyValue[];
  
  // CTA section
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaButtonHref: string;
}
