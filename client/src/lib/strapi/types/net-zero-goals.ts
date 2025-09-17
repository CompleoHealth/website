// Strapi CMS Types for Net Zero Goals Page

export interface StrapiButton {
  text: string;
  subtext?: string;
  url: string;
  icon?: string;
  analyticsId?: string;
}

export interface StrapiHeroWithBackButton {
  backButton: StrapiButton;
  title: string;
  titleHighlight?: string;
  subtitle: string;
  nhsStrategyButton: StrapiButton;
}

export interface StrapiTimelineSection {
  title: string;
  subtitle: string;
}

export interface StrapiTimelineItem {
  item_id: string;
  date: string;
  category: 'carbon' | 'social';
  type: 'nhs' | 'compleo';
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
}

export interface StrapiDualButtonCTA {
  title: string;
  subtitle: string;
  buttons: StrapiButton[];
}

export interface StrapiNetZeroGoalsPage {
  id: number;
  documentId: string;
  hero: StrapiHeroWithBackButton;
  timeline: StrapiTimelineSection;
  timelineItems: StrapiTimelineItem[];
  cta: StrapiDualButtonCTA;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}