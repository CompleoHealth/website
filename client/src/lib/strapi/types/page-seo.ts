/**
 * Page SEO Strapi Types
 * 
 * Type definitions for page SEO data from Strapi CMS
 */

export interface StrapiPageSEOEntry {
  pageSlug: string;
  title: string;
  description: string;
  keywords?: string;
  ogImage?: {
    url: string;
    name: string;
    alternativeText?: string;
    formats?: {
      thumbnail?: {
        url: string;
      };
      small?: {
        url: string;
      };
      medium?: {
        url: string;
      };
      large?: {
        url: string;
      };
    };
  };
}

export interface StrapiPageSEO {
  id?: string;
  documentId?: string;
  pages: StrapiPageSEOEntry[];
}