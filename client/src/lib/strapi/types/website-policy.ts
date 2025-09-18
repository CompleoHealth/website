// Strapi CMS Types for Website Policies

export type PageType = 'accessibility' | 'privacy-policy' | 'cookie-policy';

export interface StrapiWebsitePolicy {
  id: number;
  documentId: string;
  pageType: PageType;
  title: string;
  icon: string;
  lastUpdated: string;
  content: string; // Rich text content
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiWebsitePoliciesResponse {
  data: StrapiWebsitePolicy[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}