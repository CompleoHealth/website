import axios from 'axios';
import { API_URL, DEFAULT_TIMEOUT } from './config';
import { StrapiCaseStudiesPage } from '../types/case-studies';

class CaseStudiesApi {
  private baseURL: string;

  constructor() {
    this.baseURL = API_URL;
  }

  async getCaseStudiesPage(): Promise<StrapiCaseStudiesPage> {
    try {
      console.log('📖 Fetching case studies page data...');
      
      // Use simple populate=* pattern (proven to work)
      const queryString = 'populate=*';
      const response = await axios.get(`${this.baseURL}/case-studies-page?${queryString}`, {
        timeout: DEFAULT_TIMEOUT
      });
      
      console.log('✅ Case studies page data fetched successfully:', response.data);
      console.log('🔍 Raw response structure:', JSON.stringify(response.data, null, 2));
      console.log('🔍 response.data?.data:', response.data?.data);
      console.log('🔍 response.data?.data?.attributes:', response.data?.data?.attributes);
      
      const extractedData = response.data?.data || {};
      console.log('🔍 Final extracted data:', extractedData);
      
      return extractedData;
    } catch (error) {
      console.error('❌ Error fetching case studies page data:', error);
      throw error;
    }
  }
}

export const caseStudiesApi = new CaseStudiesApi();