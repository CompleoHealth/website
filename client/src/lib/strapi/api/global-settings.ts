/**
 * Global Settings Strapi API
 * 
 * This file contains API functions for fetching global settings content
 * from the Strapi CMS, including footer content.
 */

import axios from 'axios';
import { API_URL, DEFAULT_TIMEOUT } from './config';
import { 
  createQueryString, 
  extractEntityData, 
  handleApiError, 
  debugLog,
  createPopulatePath
} from './utils';
// Import from the types index file
import type { StrapiGlobalSettings, StrapiFooter, StrapiTrustSignals, StrapiContactPanel } from '../types';

/**
 * Create a populate object for the global settings with all its sections
 */
const createGlobalSettingsPopulateObject = () => {
  return {
    Footer: {
      populate: '*'
    },
    TrustSignals: {
      populate: '*'
    },
    ContactPanel: {
      populate: '*'
    },
    ImpactStatistics: {
      populate: '*'
    }
  };
};

/**
 * Global settings API functions
 */
export const globalSettingsApi = {
  /**
   * Get complete global settings data with all sections
   */
  async getGlobalSettings(): Promise<StrapiGlobalSettings | null> {
    try {
      debugLog('Fetching global settings data from Strapi');
      
      // Use EXACT services page working pattern - direct createQueryString call
      const populateObject = {
        Footer: '*',
        TrustSignals: '*', 
        ContactPanel: '*',
        ImpactStatistics: {
          populate: {
            statistics: '*'
          }
        }
      };
      const queryString = createQueryString(populateObject);
      
      debugLog('🔍 Global Settings Request URL:', `${API_URL}/global-settings?${queryString}`);
      debugLog('🔍 USING EXACT SERVICES PAGE PATTERN - direct createQueryString call');
      
      const response = await axios.get(`${API_URL}/global-settings?${queryString}`, {
        timeout: DEFAULT_TIMEOUT
      });
      
      
      return extractEntityData(response.data);
    } catch (error) {
      return handleApiError(error, 'Failed to fetch global settings data');
    }
  },

  /**
   * Get footer section data
   */
  async getFooter(): Promise<StrapiFooter | null> {
    try {
      debugLog('Fetching footer data from Strapi');
      
      // Use a simple populate structure that works with Strapi
      const queryString = 'populate=*';
      
      // Log the full URL being requested
      const fullUrl = `${API_URL}/global-settings?${queryString}`;
      debugLog('Requesting URL:', fullUrl);
      
      const response = await axios.get(`${API_URL}/global-settings?${queryString}`, {
        timeout: DEFAULT_TIMEOUT
      });
      
      debugLog('Raw Strapi response:', response.data);
      debugLog(' GLOBAL SETTINGS RAW DATA STRUCTURE:', JSON.stringify(response.data.data, null, 2));
      debugLog(' Available fields in Global Settings:', Object.keys(response.data.data || {}));
      
      // Extract data using the standard pattern
      const data = response.data.data;
      debugLog('Extracted global settings data:', data);
      
      // Log the Footer data if found
      if (data?.Footer) {
        debugLog('Footer data:', data.Footer);
        return data.Footer;
      }
      
      // Return null if Footer not found
      debugLog('Footer not found in response');
      return null;
    } catch (error) {
      return handleApiError(error, 'Failed to fetch footer data');
    }
  },

  /**
   * Get trust signals section data
   */
  async getTrustSignals(): Promise<StrapiTrustSignals | null> {
    try {
      debugLog('Fetching trust signals data from Strapi');
      
      // Use a simple populate structure that works with Strapi
      const queryString = 'populate=*';
      
      const response = await axios.get(`${API_URL}/global-settings?${queryString}`, {
        timeout: DEFAULT_TIMEOUT
      });
      
      // Extract data using the standard pattern
      const data = extractEntityData(response.data);
      debugLog('Extracted global settings data for trust signals:', data);
      
      // Return TrustSignals data if found
      if (data?.TrustSignals) {
        debugLog('Trust signals data:', data.TrustSignals);
        return data.TrustSignals;
      }
      
      // Return null if TrustSignals not found
      debugLog('Trust signals not found in response');
      return null;
    } catch (error) {
      return handleApiError(error, 'Failed to fetch trust signals data');
    }
  },

  /**
   * Get contact panel section data
   */
  async getContactPanel(): Promise<StrapiContactPanel | null> {
    try {
      debugLog('Fetching contact panel data from Strapi');
      
      // Use a simple populate structure that works with Strapi
      const queryString = 'populate=*';
      
      const response = await axios.get(`${API_URL}/global-settings?${queryString}`, {
        timeout: DEFAULT_TIMEOUT
      });
      
      // Extract data using the standard pattern
      const data = extractEntityData(response.data);
      debugLog('Extracted global settings data for contact panel:', data);
      
      // Return ContactPanel data if found
      if (data?.ContactPanel) {
        debugLog('Contact panel data:', data.ContactPanel);
        return data.ContactPanel;
      }
      
      // Return null if ContactPanel not found
      debugLog('Contact panel not found in response');
      return null;
    } catch (error) {
      return handleApiError(error, 'Failed to fetch contact panel data');
    }
  }
};

export default globalSettingsApi;
