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
  imageUrl?: string;
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
 * Now with CMS-managed collections for news, events, and LinkedIn posts
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
  newsArticles?: StrapiNewsItem[];  // CMS-managed news items (optional for backward compatibility)

  // Events section
  eventsTitle: string;
  eventsDescription: string;
  eventsBadgeText: string;
  events?: StrapiEvent[];  // CMS-managed events (optional for backward compatibility)

  // Social section
  socialTitle: string;
  socialDescription: string;
  socialBadgeText: string;
  linkedinUrl: string;
  linkedinPosts?: StrapiLinkedInPost[];  // CMS-managed LinkedIn posts (optional for backward compatibility)

  // CTA section
  ctaSection: StrapiPillCTA;
}
