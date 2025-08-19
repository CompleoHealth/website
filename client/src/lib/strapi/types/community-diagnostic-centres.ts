import { StrapiButton } from './common';

// Community Diagnostic Centres Page Types - Following proven pattern from clinical insourcing
export interface StrapiServiceFeature {
  title: string;
  description: string;
}

export interface StrapiCurvedPillCTA {
  title: string;
  description: string;
  primaryButton_text: string;
  primaryButton_Href: string;
  secondaryButton_text: string;
}

export interface CommunityDiagnosticPage {
  // Hero section
  heroTitle: string;
  heroSubtitle: string;
  primaryButton: StrapiButton;
  secondaryButton: StrapiButton;
  
  // Service details section
  serviceDetailsTitle: string;
  serviceDetailsDescription: string;
  serviceImage: string;
  serviceImageAlt: string;
  
  // Features section
  features: StrapiServiceFeature[];
  
  // CTA section
  ctaSection: StrapiCurvedPillCTA;
}
