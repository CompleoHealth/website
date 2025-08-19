import axios, { AxiosError } from 'axios';
import { StrapiService, StrapiServiceHero, StrapiServicesPage } from '../types/services';
import { createQueryString, debugLog, extractEntityData, handleApiError } from './utils';
import { API_URL, DEFAULT_TIMEOUT } from './config';


/**
 * Services API methods
 */
export const servicesApi = {
  /**
   * Get all services for the services listing page
   */
  getAllServices: async (): Promise<StrapiService[]> => {
    try {
      debugLog('Fetching all services');
      
      // Use simple populate=* for best compatibility
      const queryString = 'populate=*';
      
      debugLog('Requesting URL:', `${API_URL}/services?${queryString}`);
      
      const response = await axios.get(`${API_URL}/services?${queryString}`, {
        timeout: DEFAULT_TIMEOUT
      });
      
      const data = extractEntityData(response.data);
      debugLog('Extracted services data:', data);
      
      // Ensure we always return an array, even if data is null
      return Array.isArray(data) ? data : [];
    } catch (error) {
      // Ensure we always return an empty array, never null
      return [];
    }
  },
  
  /**
   * Get a specific service by its slug
   */
  getServiceBySlug: async (slug: string): Promise<StrapiService | null> => {
    try {
      debugLog(`Fetching service with slug: ${slug}`);
      
      // Use simple populate=* for best compatibility
      const queryString = 'populate=*';
      
      debugLog('Requesting URL:', `${API_URL}/services?filters[slug][$eq]=${slug}&${queryString}`);
      
      const response = await axios.get(`${API_URL}/services?filters[slug][$eq]=${slug}&${queryString}`, {
        timeout: DEFAULT_TIMEOUT
      });
      
      const data = extractEntityData(response.data);
      debugLog('Extracted service data:', data);
      
      // Return the first item since we're filtering by slug (should be unique)
      return data?.[0] || null;
    } catch (error) {
      return handleApiError(error, 'getServiceBySlug');
    }
  },

  /**
   * Create a populate object for the services page with all its sections
   */
  createServicesPagePopulateObject: () => {
    return {
      heroContent: {
        populate: {
          primaryButton: '*'
        }
      },
      services: {
        populate: {
          Features: '*'
        }
      },
      ApproachFeatures: '*',
      CurvedPill_CTA: '*'
    };
  },

  /**
   * Get services page content
   */
  getServicesPage: async (): Promise<StrapiServicesPage | null> => {
    try {
      debugLog('Fetching services page content');
      
      // Use the same pattern as the home page API
      const query = createQueryString(servicesApi.createServicesPagePopulateObject());
      
      // Use the services-page endpoint with the same query structure as home page
      debugLog('Requesting URL:', `${API_URL}/services-page?${query}`);
      
      const response = await axios.get(`${API_URL}/services-page?${query}`, {
        timeout: DEFAULT_TIMEOUT
      });
      
      debugLog('Raw Strapi response:', response.data);
      const data = extractEntityData(response.data);
      debugLog('Extracted services page data:', data);
      
      return data;
    } catch (error) {
      console.error('Error fetching services page:', error);
      return handleApiError(error, 'getServicesPage');
    }
  }
};
