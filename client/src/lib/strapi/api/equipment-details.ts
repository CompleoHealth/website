import axios from 'axios';
import { API_URL, DEFAULT_TIMEOUT } from './config';
import { 
  createQueryString, 
  extractEntityData, 
  handleApiError, 
  debugLog
} from './utils';
import { EquipmentDetailsPage } from '../types/equipment-details';

/**
 * Equipment Details API Module
 * Following proven pattern from other service pages
 */
class EquipmentDetailsAPI {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_URL;
    this.timeout = DEFAULT_TIMEOUT;
  }

  /**
   * Get Equipment Details page data with all components populated
   * Following exact proven pattern from other service pages
   */
  async getEquipmentDetailsPage(): Promise<EquipmentDetailsPage> {
    try {
      // Simplified populate query to match working pages pattern
      const queryString = 'populate=*';
      const response = await axios.get(`${API_URL}/equipment-details?${queryString}`, {
        timeout: DEFAULT_TIMEOUT
      });

      debugLog('Equipment Details page raw response:', response.data);
      debugLog('Equipment Details page extracted data:', response.data.data);
      
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          throw new Error('Request timeout - please check your connection');
        } else if (error.response?.status === 404) {
          throw new Error('Equipment details page not found');
        } else if (error.response?.status && error.response.status >= 500) {
          throw new Error('Server error - please try again later');
        } else {
          throw new Error(`Failed to fetch equipment details page: ${error.message}`);
        }
      }
      throw new Error('An unexpected error occurred while fetching equipment details page data');
    }
  }
}

export const equipmentDetailsApi = new EquipmentDetailsAPI();
