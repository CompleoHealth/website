/**
 * Website Policies API
 *
 * API functions for fetching website policy content from Strapi CMS
 */

import axios from 'axios';
import { API_URL, DEFAULT_TIMEOUT, DEBUG_MODE } from './config';
import {
  handleApiError,
  debugLog
} from './utils';
import { StrapiWebsitePolicy, PageType } from '../types/website-policy';

/**
 * Website Policies API functions
 * Following proven pattern from policy-documents and other working APIs
 */
class WebsitePoliciesAPI {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_URL;
    this.timeout = DEFAULT_TIMEOUT;
  }

  /**
   * Get all website policies
   */
  async getAllWebsitePolicies(): Promise<StrapiWebsitePolicy[] | null> {
    try {
      const queryString = 'sort=pageType:asc&pagination[limit]=100';

      debugLog('Website Policies query string:', queryString);

      const response = await axios.get(`${this.baseURL}/website-policies?${queryString}`, {
        timeout: this.timeout
      });

      debugLog('Website Policies raw response:', response.data);

      const responseData = response.data.data;

      debugLog('Website Policies extracted data:', responseData);

      return responseData || [];
    } catch (error) {
      handleApiError(error, 'getAllWebsitePolicies');
      return null;
    }
  }

  /**
   * Get a single website policy by page type
   */
  async getWebsitePolicyByPageType(pageType: PageType): Promise<StrapiWebsitePolicy | null> {
    try {
      const queryString = `filters[pageType][$eq]=${pageType}`;

      debugLog('Website Policy by pageType query string:', queryString);

      const response = await axios.get(`${this.baseURL}/website-policies?${queryString}`, {
        timeout: this.timeout
      });

      debugLog('Website Policy by pageType raw response:', response.data);

      const responseData = response.data.data;

      // Return first match since pageType is unique
      return responseData && responseData.length > 0 ? responseData[0] : null;
    } catch (error) {
      handleApiError(error, 'getWebsitePolicyByPageType');
      return null;
    }
  }

  /**
   * Get a single website policy by ID
   */
  async getWebsitePolicyById(id: string): Promise<StrapiWebsitePolicy | null> {
    try {
      const response = await axios.get(`${this.baseURL}/website-policies/${id}`, {
        timeout: this.timeout
      });

      return response.data.data;
    } catch (error) {
      handleApiError(error, 'getWebsitePolicyById');
      return null;
    }
  }
}

// Export singleton instance following proven pattern
export const websitePoliciesApi = new WebsitePoliciesAPI();

// For backward compatibility
export async function fetchWebsitePolicies(): Promise<StrapiWebsitePolicy[] | null> {
  return websitePoliciesApi.getAllWebsitePolicies();
}

export async function fetchWebsitePolicyByPageType(pageType: PageType): Promise<StrapiWebsitePolicy | null> {
  return websitePoliciesApi.getWebsitePolicyByPageType(pageType);
}

export default websitePoliciesApi;