/**
 * Policy Documents API
 *
 * API functions for fetching policy documents from Strapi CMS
 */

import axios from 'axios';
import { API_URL, DEFAULT_TIMEOUT, DEBUG_MODE } from './config';
import {
  handleApiError,
  debugLog
} from './utils';
import { StrapiPolicyDocument } from '../types/policy-document';

/**
 * Policy Documents API functions
 * Following proven pattern from team-members and other working APIs
 */
class PolicyDocumentsAPI {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_URL;
    this.timeout = DEFAULT_TIMEOUT;
  }

  /**
   * Get all policy documents with media populated
   * Using proven populate pattern that works with media fields
   */
  async getAllPolicyDocuments(): Promise<StrapiPolicyDocument[] | null> {
    try {
      // Use populate[document][populate]=* to get full media data including URL
      const queryString = 'populate[document][populate]=*&sort=order:asc&pagination[limit]=100';

      // Log the query string in debug mode
      debugLog('Policy Documents query string:', queryString);

      const response = await axios.get(`${this.baseURL}/policy-documents?${queryString}`, {
        timeout: this.timeout
      });

      // Log the raw response in debug mode
      debugLog('Policy Documents raw response:', response.data);

      // Extract data from the Strapi response
      const responseData = response.data.data;

      // Log the extracted data in debug mode
      debugLog('Policy Documents extracted data:', responseData);

      return responseData || [];
    } catch (error) {
      handleApiError(error, 'getAllPolicyDocuments');
      return null;
    }
  }

  /**
   * Get a single policy document by ID
   */
  async getPolicyDocumentById(id: string): Promise<StrapiPolicyDocument | null> {
    try {
      const queryString = 'populate[document][populate]=*';

      const response = await axios.get(`${this.baseURL}/policy-documents/${id}?${queryString}`, {
        timeout: this.timeout
      });

      return response.data.data;
    } catch (error) {
      handleApiError(error, 'getPolicyDocumentById');
      return null;
    }
  }
}

// Export singleton instance following proven pattern
export const policyDocumentsApi = new PolicyDocumentsAPI();

// For backward compatibility
export async function fetchPolicyDocuments(): Promise<StrapiPolicyDocument[] | null> {
  return policyDocumentsApi.getAllPolicyDocuments();
}

export default policyDocumentsApi;