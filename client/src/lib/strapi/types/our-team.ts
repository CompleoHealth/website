import { StrapiMedia } from './common';

/**
 * Our Team Page Types
 * Following schema structure from our-team-page content type
 */

export interface StrapiCultureValue {
  title: string;
  description: string;
}

export interface StrapiOurTeamHero {
  title: string;
  subtitle?: string;
  backgroundImage?: StrapiMedia;
  primaryButton?: {
    text: string;
    subtext?: string;
    url: string;
    icon?: string;
    analyticsId?: string;
  };
  secondaryButton?: {
    text: string;
    subtext?: string;
    url: string;
    icon?: string;
    analyticsId?: string;
  };
}

export interface StrapiOurTeamPage {
  Hero?: StrapiOurTeamHero;
  leadershipTitle?: string;
  leadershipDescription?: string;
  cultureTitle?: string;
  cultureDescription?: string;
  cultureValues?: StrapiCultureValue[];
  cultureImage?: StrapiMedia;
  cultureImageAlt?: string;
}