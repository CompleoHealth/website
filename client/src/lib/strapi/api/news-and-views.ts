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
      // Simplified populate query to match working pages pattern
      const queryString = 'populate=*';
      
      // Log the query string in debug mode
      
      const response = await axios.get(`${this.baseURL}/news-and-views-page?${queryString}`, {
        timeout: this.timeout
      });

      // Log the raw response in debug mode

      // Extract data from the Strapi response following the established pattern
      // Looking at the console logs, we can see the data structure is correct
      // but we need to return just the data object without the meta information
      const responseData = response.data.data;
      
      // Log the extracted data in debug mode
      
      return responseData;
    } catch (error) {
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
