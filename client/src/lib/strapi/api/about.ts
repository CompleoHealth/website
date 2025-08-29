/**
 * About API
 * 
 * API functions for fetching about page content from Strapi CMS
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
// Define minimal interface here to avoid circular dependencies
interface AboutPage {
  [key: string]: any;
}

/**
 * About page API functions
 * Following proven pattern from home and other working pages
 */
class AboutAPI {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_URL;
    this.timeout = DEFAULT_TIMEOUT;
  }

  /**
   * Create populate object for About page following established pattern
   */
  private createAboutPopulateObject() {
    return {
      companyParagraphs: '*',      // Component population
      companyFeatures: '*',        // Component population
      companyValues: '*',          // Component population
    };
  }

  /**
   * Get About page data with all components populated
   * Following exact proven pattern from sustainability and other working pages
   */
  async getAboutPage(): Promise<AboutPage | null> {
    try {
      // Create populate object based on schema
      const populateObject = this.createAboutPopulateObject();
      const queryString = createQueryString(populateObject);
      
      // Log the query string in debug mode
      
      const response = await axios.get(`${this.baseURL}/about-page?${queryString}`, {
        timeout: this.timeout
      });

      // Log the raw response in debug mode

      // Extract data from the Strapi response following the established pattern
      const responseData = response.data.data;
      
      // Log the extracted data in debug mode
      
      return responseData;
    } catch (error) {
      handleApiError(error, 'getAboutPage');
      return null;
    }
  }
}

// Export singleton instance following proven pattern
export const aboutApi = new AboutAPI();

// For backward compatibility with existing code
export async function fetchAboutPageData(): Promise<AboutPage | null> {
  return aboutApi.getAboutPage();
}

export default aboutApi;
