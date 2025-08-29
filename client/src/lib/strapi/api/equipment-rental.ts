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
  // Silent error handling - errors are tracked in state but not logged to console
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
      // Silent error handling - errors are tracked in state but not logged to console
      return null;
    }
  }
};