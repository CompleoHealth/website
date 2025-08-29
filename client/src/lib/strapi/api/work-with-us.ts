/**
 * Work With Us API
 * 
 * API functions for fetching work with us page content from Strapi CMS
 * Following proven pattern from our-team and other working pages
 */

import axios from 'axios';
import { API_URL, DEFAULT_TIMEOUT } from './config';
import { createQueryString, extractEntityData, handleApiError } from './utils';

/**
 * Work With Us page API functions
 * Using PROVEN simple populate=* pattern for guaranteed success
 */
class WorkWithUsAPI {
  private baseURL: string;

  constructor() {
    this.baseURL = API_URL;
  }

  /**
   * Get Work With Us page data with all components populated
   * Following EXACT proven pattern from our-team page
   */
  async getWorkWithUsPage(): Promise<any | null> {
    try {
      console.log('💼 Starting Work With Us CMS data fetch...');
      
      // Use simplest working pattern - populate=* like our-team and managed-equipment
      const queryString = 'populate=*';
      
      console.log('🔗 Work With Us API URL:', `${this.baseURL}/work-with-us-page?${queryString}`);
      console.log('📋 Query String:', queryString);
      
      const response = await axios.get(`${this.baseURL}/work-with-us-page?${queryString}`, {
        timeout: DEFAULT_TIMEOUT
      });

      console.log('📊 Raw Work With Us API Response:', response.data);

      // Extract data from the Strapi response following the established pattern
      const responseData = response.data.data;
      
      console.log('✅ Processed Work With Us Data:', responseData);
      console.log('🎯 Hero Data:', responseData?.Hero);
      console.log('🎁 Benefits Items:', responseData?.benefitsItems);
      console.log('📢 Why Join Points:', responseData?.whyJoinPoints);
      
      return responseData;
    } catch (error) {
      console.error('❌ Work With Us API Error:', error);
      if (axios.isAxiosError(error)) {
        console.error('🔍 Error Response Data:', error.response?.data);
        console.error('🔍 Error Status:', error.response?.status);
      }
      return handleApiError(error, 'getWorkWithUsPage');
    }
  }
}

// Create and export instance
export const workWithUsApi = new WorkWithUsAPI();