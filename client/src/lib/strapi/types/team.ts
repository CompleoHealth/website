export interface CMSTeamMember {
  id: number;
  documentId: string;
  id_slug: string;
  name: string;
  role: string;
  image?: {
    url: string;
    alternativeText?: string;
  };
  bio?: string;
  linkedin?: string;
  display_order?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface CMSTeamResponse {
  data: CMSTeamMember[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}