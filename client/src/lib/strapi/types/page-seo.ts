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
}

export interface StrapiPageSEO {
  id?: string;
  documentId?: string;
  pages: StrapiPageSEOEntry[];
}