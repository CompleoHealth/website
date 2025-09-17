/**
 * Net Zero Goals API
 *
 * API functions for fetching net-zero-goals page content from Strapi CMS
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
import { StrapiNetZeroGoalsPage } from '../types/net-zero-goals';

/**
 * Net Zero Goals page API functions
 * Following proven pattern from about and other working pages
 */
class NetZeroGoalsAPI {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_URL;
    this.timeout = DEFAULT_TIMEOUT;
  }

  /**
   * Create populate object for Net Zero Goals page following established pattern
   * Using simple populate=* for safety like team API
   */
  private createNetZeroGoalsPopulateObject() {
    // Use simple populate=* pattern for safety like working examples
    return '*';
  }

  /**
   * Get Net Zero Goals page data with all components populated
   * Following exact proven pattern from sustainability and other working pages
   */
  async getNetZeroGoalsPage(): Promise<StrapiNetZeroGoalsPage | null> {
    try {
      // Use simple populate=* pattern for safety like working examples
      const queryString = 'populate=*';

      // Log the query string in debug mode
      debugLog('Net Zero Goals query string:', queryString);

      const response = await axios.get(`${this.baseURL}/net-zero-goals-page?${queryString}`, {
        timeout: this.timeout
      });

      // Log the raw response in debug mode
      debugLog('Net Zero Goals raw response:', response.data);

      // Extract data from the Strapi response following the established pattern
      const responseData = response.data.data;

      // Log the extracted data in debug mode
      debugLog('Net Zero Goals extracted data:', responseData);

      return responseData;
    } catch (error) {
      handleApiError(error, 'getNetZeroGoalsPage');
      return null;
    }
  }
}

// Export singleton instance following proven pattern
export const netZeroGoalsApi = new NetZeroGoalsAPI();

// For backward compatibility with existing code
export async function fetchNetZeroGoalsPageData(): Promise<StrapiNetZeroGoalsPage | null> {
  return netZeroGoalsApi.getNetZeroGoalsPage();
}

export default netZeroGoalsApi;