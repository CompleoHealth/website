// Strapi CMS Types for Policy Documents

export interface StrapiMediaFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width?: number;
  height?: number;
}

export interface StrapiMedia {
  id: number;
  name: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: {
    large?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    thumbnail?: StrapiMediaFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: any;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiPolicyDocument {
  id: number;
  documentId: string;
  name: string;
  description: string;
  lastUpdated: string;
  document: StrapiMedia;
  size?: string;
  order?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiPolicyDocumentsResponse {
  data: StrapiPolicyDocument[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}