/**
 * Our Team API
 * 
 * API functions for fetching our team page content from Strapi CMS
 */

import axios from 'axios';
import { API_URL, DEFAULT_TIMEOUT } from './config';
import { createQueryString, extractEntityData, handleApiError } from './utils';

/**
 * Our Team page API functions
 * Following proven pattern from about and other working pages
 */
class OurTeamAPI {
  private baseURL: string;

  constructor() {
    this.baseURL = API_URL;
  }

  /**
   * Create populate object for Our Team page following established pattern
   * Based on proven FLAT pattern from working pages (about, equipment-rental, etc.)
   */
  private createOurTeamPopulateObject() {
    return {
      Hero: '*',                    // Hero component population (FLAT)
      cultureValues: '*',           // Repeatable culture values (FLAT)
      cultureImage: '*'             // Culture section image (FLAT)
    };
  }

  /**
   * Get Our Team page data with all components populated
   * Following exact proven pattern from about page
   */
  async getOurTeamPage(): Promise<any | null> {
    try {
      // Use simplest working pattern - populate=* like managed-equipment
      const queryString = 'populate=*';
      
      const response = await axios.get(`${this.baseURL}/our-team-page?${queryString}`, {
        timeout: DEFAULT_TIMEOUT
      });

      // Extract data from the Strapi response following the established pattern
      const responseData = response.data.data;
      
      return responseData;
    } catch (error) {
      console.error('❌ Our Team API Error:', error);
      if (axios.isAxiosError(error)) {
        console.error('🔍 Error Response Data:', error.response?.data);
        console.error('🔍 Error Status:', error.response?.status);
      }
      return handleApiError(error, 'getOurTeamPage');
    }
  }
}

// Create and export instance
export const ourTeamApi = new OurTeamAPI();