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
      console.log('🔍 Fetching Screening Programmes page data from CMS...');
      
      // Flat populate structure - following proven pattern to avoid 400 errors
      const populateObject = {
        primaryButton: '*',
        secondaryButton: '*',
        features: '*',
        ctaSection: '*'
      };

      const queryString = createQueryString(populateObject);
      console.log('🔗 Screening Programmes API URL:', `${API_URL}/screening-programmes?${queryString}`);

      const response = await axios.get(`${API_URL}/screening-programmes?${queryString}`, { 
        timeout: DEFAULT_TIMEOUT 
      });

      console.log('✅ Screening Programmes API Response received');
      console.log('📄 Raw Response Data:', response.data);

      // Extract data using proven extractEntityData method
      const extractedData = extractEntityData(response.data);
      console.log('🔄 Extracted Screening Programmes Data:', extractedData);

      return extractedData;
    } catch (error) {
      console.error('❌ Error fetching Screening Programmes page data:', error);
      
      if (axios.isAxiosError(error)) {
        console.error('🔥 Axios Error Details:', {
          message: error.message,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        });
      }
      
      // Return null to trigger static fallback content
      return null;
    }
  }
}

export const screeningProgrammesApi = new ScreeningProgrammesApi();
