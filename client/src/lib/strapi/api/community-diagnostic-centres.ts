import axios from 'axios';
import { API_URL, DEFAULT_TIMEOUT } from './config';
import { createQueryString, extractEntityData } from './utils';
import type { CommunityDiagnosticPage } from '../types/community-diagnostic-centres';

class CommunityDiagnosticCentresApi {
  /**
   * Fetches Community Diagnostic Centres page data from Strapi CMS
   * Following proven pattern from clinical insourcing and managed equipment
   */
  async getCommunityDiagnosticCentresPage(): Promise<CommunityDiagnosticPage | null> {
    try {
      console.log('🏥 Fetching Community Diagnostic Centres page data from CMS...');
      
      // Flat populate structure - following proven pattern to avoid 400 errors
      const populateObject = {
        primaryButton: '*',
        secondaryButton: '*',
        features: '*',
        ctaSection: '*'
      };

      const queryString = createQueryString(populateObject);
      console.log('🔗 Community Diagnostic Centres API URL:', `${API_URL}/community-diagnostic-centres?${queryString}`);

      const response = await axios.get(`${API_URL}/community-diagnostic-centres?${queryString}`, { 
        timeout: DEFAULT_TIMEOUT 
      });

      console.log('✅ Community Diagnostic Centres API Response received');
      console.log('📄 Raw Response Data:', response.data);

      // Extract data using proven extractEntityData method
      const extractedData = extractEntityData(response.data);
      console.log('🔄 Extracted Community Diagnostic Centres Data:', extractedData);

      return extractedData;
    } catch (error) {
      console.error('❌ Error fetching Community Diagnostic Centres page data:', error);
      
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

export const communityDiagnosticCentresApi = new CommunityDiagnosticCentresApi();
