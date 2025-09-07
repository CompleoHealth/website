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
      // Use simple populate=* pattern (proven to work)
      const queryString = 'populate=*';
      const response = await axios.get(`${this.baseURL}/case-studies-page?${queryString}`, {
        timeout: DEFAULT_TIMEOUT
      });
      
      const extractedData = response.data?.data || {};
      
      return extractedData;
    } catch (error) {
      console.error('❌ Error fetching case studies page data:', error);
      throw error;
    }
  }
}

export const caseStudiesApi = new CaseStudiesApi();