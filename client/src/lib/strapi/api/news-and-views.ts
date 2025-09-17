/**
 * News and Views API
 * 
 * API functions for fetching news and views page content from Strapi CMS
 */

import axios from 'axios';
import { API_URL, DEFAULT_TIMEOUT, DEBUG_MODE } from './config';
import { 
  createQueryString, 
  extractEntityData, 
  handleApiError, 
  debugLog,
  createPopulatePath
} from './utils';
import { NewsAndViewsPage } from '../types/news-and-views';

// No need for a separate populate query function
// Following the exact pattern from sustainability.ts

/**
 * News and Views page API functions
 * Following proven pattern from home and other working pages
 */
class NewsAndViewsAPI {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_URL;
    this.timeout = DEFAULT_TIMEOUT;
  }

  /**
   * Get News and Views page data with all components populated
   * Following exact proven pattern from sustainability and other working pages
   */
  async getNewsAndViewsPage(): Promise<NewsAndViewsPage | null> {
    try {
      // Use simple populate=* pattern like sustainability page for safety
      const queryString = 'populate=*';

      // Log the query string in debug mode
      debugLog('News and Views query string:', queryString);

      const response = await axios.get(`${this.baseURL}/news-and-views-page?${queryString}`, {
        timeout: this.timeout
      });

      // Log the raw response in debug mode
      debugLog('News and Views raw response:', response.data);

      // Extract data from the Strapi response following the established pattern
      const responseData = response.data.data;

      // Log the extracted data in debug mode
      debugLog('News and Views extracted data:', responseData);

      return responseData;
    } catch (error) {
      // Follow sustainability page error handling pattern - always return null on error
      debugLog('News and Views API error:', error);
      handleApiError(error, 'getNewsAndViewsPage');
      return null;
    }
  }
}

// Export singleton instance following proven pattern
export const newsAndViewsApi = new NewsAndViewsAPI();

// For backward compatibility with existing code
export async function fetchNewsAndViewsPageData(): Promise<NewsAndViewsPage | null> {
  return newsAndViewsApi.getNewsAndViewsPage();
}

export default newsAndViewsApi;
