/**
 * Team Page Types
 * 
 * TypeScript definitions for the Team Page content type
 */

import { StrapiEntity, StrapiImage } from './common';

export interface TeamPageHero {
  title: string;
  subtitle: string;
  backgroundImage?: StrapiImage;
}

export interface TeamPageLeadership {
  title: string;
  subtitle: string;
}

export interface TeamPageCulture {
  title: string;
  description: string;
  image?: StrapiImage;
  imageAlt?: string;
}

export interface TeamPage extends StrapiEntity {
  Hero: TeamPageHero;
  Leadership: TeamPageLeadership;
  Culture: TeamPageCulture;
}
