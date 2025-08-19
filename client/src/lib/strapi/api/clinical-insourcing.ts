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
  if (axios.isAxiosError(error)) {
    console.error(`Axios error in ${methodName}:`, error.response?.data || error.message);
  } else if (error instanceof Error) {
    console.error(`Error in ${methodName}:`, error.message);
  } else {
    console.error(`Unknown error in ${methodName}:`, error);
  }
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
      if (axios.isAxiosError(error)) {
        console.error(`Axios error in getClinicalInsourcingPage:`, error.response?.status, error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.error(`Error in getClinicalInsourcingPage:`, error.message);
      } else {
        console.error(`Unknown error in getClinicalInsourcingPage:`, error);
      }
      return null;
    }
  }
};
