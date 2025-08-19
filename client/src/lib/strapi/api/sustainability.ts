import axios from 'axios';
import { API_URL, DEFAULT_TIMEOUT } from './config';
import { 
  createQueryString, 
  extractEntityData, 
  handleApiError, 
  debugLog
} from './utils';
import { SustainabilityPage } from '../types/sustainability';

/**
 * Sustainability API Module
 * Following proven pattern from equipment-details and other service pages
 */
class SustainabilityAPI {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_URL;
    this.timeout = DEFAULT_TIMEOUT;
  }

  /**
   * Get Sustainability page data with all components populated
   * Following exact proven pattern from equipment-details and other service pages
   */
  async getSustainabilityPage(): Promise<SustainabilityPage> {
    try {
      // Simplified populate query to match working pages pattern
      const queryString = 'populate=*';
      const response = await axios.get(`${API_URL}/sustainability-page?${queryString}`, {
        timeout: DEFAULT_TIMEOUT
      });

      debugLog('Sustainability page raw response:', response.data);
      debugLog('Sustainability page extracted data:', response.data.data);
      
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          throw new Error('Request timeout - please check your connection');
        } else if (error.response?.status === 404) {
          throw new Error('Sustainability page not found');
        } else if (error.response?.status && error.response.status >= 500) {
          throw new Error('Server error - please try again later');
        } else {
          throw new Error(`Failed to fetch sustainability page: ${error.message}`);
        }
      }
      throw new Error('An unexpected error occurred while fetching sustainability page data');
    }
  }
}

// Export singleton instance following proven pattern
export const sustainabilityApi = new SustainabilityAPI();
