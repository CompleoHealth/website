/**
 * Page SEO Strapi API
 * 
 * This file contains API functions for fetching page SEO content
 * from the Strapi CMS.
 */

import axios from 'axios';
import { API_URL, DEFAULT_TIMEOUT } from './config';
import { 
  createQueryString, 
  extractEntityData, 
  handleApiError, 
  debugLog
} from './utils';
import type { StrapiPageSEO } from '../types';

/**
 * Page SEO API functions - following EXACT global-settings pattern
 */
export const pageSeoApi = {
  /**
   * Get complete page SEO data with all pages
   */
  async getPageSEO(): Promise<StrapiPageSEO | null> {
    try {
      debugLog('Fetching page SEO data from Strapi');
      
      // Use EXACT global-settings working pattern - simple populate
      const queryString = 'populate=*';
      
      debugLog('🔍 Page SEO Request URL:', `${API_URL}/page-seo?${queryString}`);
      debugLog('🔍 USING EXACT GLOBAL-SETTINGS PATTERN - direct createQueryString call');
      
      const response = await axios.get(`${API_URL}/page-seo?${queryString}`, {
        timeout: DEFAULT_TIMEOUT
      });
      
      debugLog('Page SEO Response:', response.data);
      
      return extractEntityData(response.data);
    } catch (error) {
      return handleApiError(error, 'Failed to fetch page SEO data');
    }
  }
};

export default pageSeoApi;