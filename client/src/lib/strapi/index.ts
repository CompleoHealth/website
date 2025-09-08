/**
 * Strapi Integration Main Entry Point
 * 
 * This file re-exports all types and API functions from the Strapi integration
 * for easier importing throughout the application.
 */

// Re-export all types
export * from './types';

// Re-export all API functions
export * from './api';

// Export a default object with all API functions
import { homeApi } from './api/home';
import { servicesApi } from './api/services';
import { globalSettingsApi } from './api/global-settings';
import { pageSeoApi } from './api/page-seo';

// Consolidated API object that contains all API functions
export const strapiApi = {
  ...homeApi,
  ...servicesApi,
  ...globalSettingsApi,
  pageSeoApi
};

export default strapiApi;
