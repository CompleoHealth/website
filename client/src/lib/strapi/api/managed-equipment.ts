/**
 * Managed Equipment API
 * 
 * API functions for fetching managed equipment page content from Strapi CMS
 */

import axios from 'axios';
import { API_URL, DEFAULT_TIMEOUT } from './config';
import { 
  createQueryString, 
  extractEntityData, 
  handleApiError, 
  debugLog
} from './utils';
import { ManagedEquipmentPage } from '../types/managed-equipment';

/**
 * Managed equipment page API functions
 */
export const managedEquipmentApi = {
  /**
   * Get complete managed equipment page data with all sections
   */
  async getManagedEquipmentPage(): Promise<ManagedEquipmentPage | null> {
    try {
      // Simplified populate query to diagnose 400 error
      const queryString = 'populate=*';
      const response = await axios.get(`${API_URL}/managed-equipment?${queryString}`, {
        timeout: DEFAULT_TIMEOUT
      });

      debugLog('Managed Equipment page raw response:', response.data);
      debugLog('Managed Equipment page extracted data:', response.data.data);
      
      return response.data.data;
    } catch (error) {
      handleApiError(error, 'getManagedEquipmentPage');
      return null;
    }
  }
};

export default managedEquipmentApi;
