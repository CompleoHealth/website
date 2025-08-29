/**
 * News and Views Page Types
 * TypeScript interfaces for CMS data structures
 */

export interface StrapiNewsItem {
  url: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  // Legacy JSON compatibility fields (optional)
  image?: string;
  domain?: string;
  id?: number;
}

export interface StrapiEvent {
  title: string;
  date: string;
  location: string;
  imageUrl: string;
  url: string;
  // Legacy JSON compatibility fields (optional)
  image?: string;
  id?: number;
}

export interface StrapiLinkedInPost {
  embedUrl: string;
}

export interface StrapiPillCTA {
  title: string;
  description: string;
  primaryButton_text: string;
  primaryButton_action: string;
}

/**
 * Complete News and Views Page Structure
 * Following exact proven pattern from other service pages
 * Note: Collections (news items, events, LinkedIn posts) are NOT managed by CMS
 */
export interface NewsAndViewsPage {
  // Hero section
  heroTitle: string;
  heroHighlightWord: string;
  heroSubtitle: string;
  heroDescription: string;
  beeCardTitle: string;
  beeCardDescription: string;
  
  // News section
  newsTitle: string;
  newsDescription: string;
  newsBadgeText: string;
  // Note: newsItems are NOT managed by CMS, they come from static JSON
  
  // Events section
  eventsTitle: string;
  eventsDescription: string;
  eventsBadgeText: string;
  // Note: events are NOT managed by CMS, they come from static JSON
  
  // Social section
  socialTitle: string;
  socialDescription: string;
  socialBadgeText: string;
  linkedinUrl: string;
  // Note: linkedinPosts are NOT managed by CMS, they come from static TS
  
  // CTA section
  ctaSection: StrapiPillCTA;
}
