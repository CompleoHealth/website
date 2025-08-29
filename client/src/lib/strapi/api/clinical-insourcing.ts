import axios from 'axios';
import { API_URL, DEFAULT_TIMEOUT } from './config';
import { createQueryString, extractEntityData, debugLog } from './utils';
import { ClinicalInsourcingPage } from '../types/clinical-insourcing';

/**
 * Handle API errors
 * @param error - The error object
 * @param methodName - The name of the API method
 */
function handleApiError(error: unknown, methodName: string): void {
  // Silent error handling - errors are tracked in state but not logged to console
}

/**
 * API methods for clinical insourcing page content
 */
export const clinicalInsourcingApi = {
  /**
   * Get clinical insourcing page content from CMS
   */
  async getClinicalInsourcingPage(): Promise<ClinicalInsourcingPage | null> {
    try {
      const populateObject = {
        primaryButton: '*',
        secondaryButton: '*',
        features: '*',
        ctaSection: '*'
      };
      const queryString = createQueryString(populateObject);
      const response = await axios.get(`${API_URL}/clinical-insourcing?${queryString}`, { timeout: DEFAULT_TIMEOUT });
      
      // Extract the data using proven pattern - flat structure without .attributes
      return extractEntityData(response.data);
    } catch (error) {
      // Silent error handling - errors are tracked in state but not logged to console
      return null;
    }
  }
};
