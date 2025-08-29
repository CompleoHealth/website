import axios from 'axios';
import { API_URL, DEFAULT_TIMEOUT } from './config';
import { createQueryString, extractEntityData } from './utils';
import type { ScreeningProgrammesPage } from '../types/screening-programmes';

class ScreeningProgrammesApi {
  /**
   * Fetches Screening Programmes page data from Strapi CMS
   * Following proven pattern from clinical insourcing and managed equipment
   */
  async getScreeningProgrammesPage(): Promise<ScreeningProgrammesPage | null> {
    try {
      
      // Flat populate structure - following proven pattern to avoid 400 errors
      const populateObject = {
        primaryButton: '*',
        secondaryButton: '*',
        features: '*',
        ctaSection: '*'
      };

      const queryString = createQueryString(populateObject);

      const response = await axios.get(`${API_URL}/screening-programmes?${queryString}`, { 
        timeout: DEFAULT_TIMEOUT 
      });


      // Extract data using proven extractEntityData method
      const extractedData = extractEntityData(response.data);

      return extractedData;
    } catch (error) {
      // Error handled by handleApiError
      
      // Return null to trigger static fallback content
      return null;
    }
  }
}

export const screeningProgrammesApi = new ScreeningProgrammesApi();
