/// <reference types="vite/client" />

// JSON module declarations for CMS data files
declare module "*.json" {
  const value: any;
  export default value;
}

// Extend ImportMeta interface for Vite environment variables
interface ImportMeta {
  readonly env: {
    readonly VITE_STRAPI_URL?: string;
    readonly DEV?: boolean;
    readonly PROD?: boolean;
    readonly MODE?: string;
    readonly BASE_URL?: string;
    [key: string]: string | boolean | undefined;
  };
}