import axios from 'axios';
import { API_URL, DEFAULT_TIMEOUT } from './config';
import { createQueryString, extractEntityData, debugLog } from './utils';
import { EquipmentRentalPage } from '../types/equipment-rental';

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
 * API methods for equipment rental page content
 */
export const equipmentRentalApi = {
  /**
   * Get equipment rental page content from CMS
   */
  async getEquipmentRentalPage(): Promise<EquipmentRentalPage | null> {
    try {
      const populateObject = {
        primaryButton: '*',
        secondaryButton: '*',
        features: '*',
        mobileUnitsFeatures: '*',
        ctaSection: '*'
        // Note: Basic string/text fields (heroTitle, heroSubtitle, etc.) are automatically included
        // Only component fields need to be explicitly populated
      };
      const queryString = createQueryString(populateObject);
      const response = await axios.get(`${API_URL}/equipment-rental?${queryString}`, { timeout: DEFAULT_TIMEOUT });
      
      // Extract the data using proven pattern - flat structure without .attributes
      return extractEntityData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(`Axios error in getEquipmentRentalPage:`, error.response?.status, error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.error(`Error in getEquipmentRentalPage:`, error.message);
      } else {
        console.error(`Unknown error in getEquipmentRentalPage:`, error);
      }
      return null;
    }
  }
};