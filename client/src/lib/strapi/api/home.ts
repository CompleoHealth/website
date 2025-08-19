/**
 * Home Page Strapi API
 * 
 * This file contains API functions for fetching home page content
 * from the Strapi CMS.
 */

import axios from 'axios'; // Will be properly typed once dependencies are fully installed
import { API_URL, DEFAULT_TIMEOUT } from './config';
import { 
  createQueryString, 
  extractEntityData, 
  handleApiError, 
  debugLog,
  createPopulatePath
} from './utils';
import { 
  StrapiHomePage, 
  StrapiHero, 
  StrapiValueProposition,
  StrapiApproachPanel,
  StrapiSolution,
  StrapiTestimonialsSection,
  StrapiLocationMapSection,
  StrapiCurvedCTASection
} from '../types/home';

/**
 * Create populate object using PROVEN services page pattern for nested components
 * Based on CMS schema analysis and working services page implementation
 */
const createHomePopulateObject = () => {
  return {
    Hero: {
      populate: {
        primaryButton: '*',
        secondaryButton: '*'
      }
    },
    ValueProposition: {
      populate: {
        ValuePropositionCards: {
          populate: {
            Features: '*'
          }
        }
      }
    },
    Approach: {
      populate: {
        ApproachPanel: {
          populate: {
            ApproachFeatures: '*'
          }
        }
      }
    },
    HealthcareSolutions: {
      populate: {
        solutions: {
          populate: {
            Features: '*'
          }
        }
      }
    },
    Testimonials: '*',
    LocationMap: '*',
    CurvedCTA: '*'
  };
};

/**
 * Home page API functions
 */
export const homeApi = {
  /**
   * Get complete home page data with all sections
   */
  getHomePage: async (): Promise<StrapiHomePage | null> => {
    try {
      debugLog('Fetching home page data');
      
      const query = createQueryString(createHomePopulateObject());
      const response = await axios.get(`${API_URL}/home?${query}`, {
        timeout: DEFAULT_TIMEOUT
      });
      
      debugLog('Raw Strapi response:', response.data);
      debugLog('Raw Strapi response:', response.data);
      debugLog(' HOME PAGE RAW DATA STRUCTURE:', JSON.stringify(response.data.data, null, 2));
      debugLog(' Available fields in Home Page:', Object.keys(response.data.data || {}));
      debugLog('Extracted home page data:', response.data.data);
      
      return response.data.data;
    } catch (error) {
      return handleApiError(error, 'getHomePage');
    }
  },

  /**
   * Get hero section data
   */
  getHeroSection: async (): Promise<StrapiHero | null> => {
    try {
      debugLog('Fetching hero section');
      
      const populateObject = createPopulatePath('Hero', 
        ['primaryButton', 'secondaryButton']
      );
      
      const query = createQueryString(populateObject);
      const response = await axios.get(`${API_URL}/home?${query}`, {
        timeout: DEFAULT_TIMEOUT
      });
      
      const data = extractEntityData(response.data);
      return data?.Hero?.[0] || null;
    } catch (error) {
      return handleApiError(error, 'getHeroSection');
    }
  },

  /**
   * Get value proposition section data
   */
  getValueProposition: async (): Promise<StrapiValueProposition | null> => {
    try {
      debugLog('Fetching value proposition');
      
      const populateObject = createPopulatePath('ValueProposition', [], {
        'ValuePropositionCards': ['Features']
      });
      
      const query = createQueryString(populateObject);
      const response = await axios.get(`${API_URL}/home?${query}`, {
        timeout: DEFAULT_TIMEOUT
      });
      
      const data = extractEntityData(response.data);
      return data?.ValueProposition || null;
    } catch (error) {
      return handleApiError(error, 'getValueProposition');
    }
  },

  /**
   * Get approach panels data
   */
  getApproachPanels: async (): Promise<StrapiApproachPanel[] | null> => {
    try {
      debugLog('Fetching approach panels');
      
      const populateObject = createPopulatePath('Approach', [], {
        'ApproachPanel': ['ApproachFeatures']
      });
      
      const query = createQueryString(populateObject);
      const response = await axios.get(`${API_URL}/home?${query}`, {
        timeout: DEFAULT_TIMEOUT
      });
      
      const data = extractEntityData(response.data);
      
      // Flatten all ApproachPanel arrays from each Approach item
      const allPanels = data?.Approach
        ? data.Approach.flatMap((a: any) => a.ApproachPanel || [])
        : [];
        
      return allPanels.length > 0 ? allPanels : null;
    } catch (error) {
      return handleApiError(error, 'getApproachPanels');
    }
  },

  /**
   * Get healthcare solutions data
   */
  getHealthcareSolutions: async (): Promise<StrapiSolution | null> => {
    try {
      debugLog('Fetching healthcare solutions');
      
      const populateObject = createPopulatePath('HealthcareSolutions', [], {
        'solutions': ['Features']
      });
      
      const query = createQueryString(populateObject);
      const response = await axios.get(`${API_URL}/home?${query}`, {
        timeout: DEFAULT_TIMEOUT
      });
      
      const data = extractEntityData(response.data);
      return data?.HealthcareSolutions || null;
    } catch (error) {
      return handleApiError(error, 'getHealthcareSolutions');
    }
  },

  /**
   * Get testimonials section data
   */
  getTestimonialsSection: async (): Promise<StrapiTestimonialsSection | null> => {
    try {
      debugLog('Fetching testimonials section');
      
      const query = createQueryString({ Testimonials: '*' });
      const response = await axios.get(`${API_URL}/home?${query}`, {
        timeout: DEFAULT_TIMEOUT
      });
      
      const data = extractEntityData(response.data);
      return data?.Testimonials || null;
    } catch (error) {
      return handleApiError(error, 'getTestimonialsSection');
    }
  },

  /**
   * Get location map section data
   */
  getLocationMapSection: async (): Promise<StrapiLocationMapSection | null> => {
    try {
      debugLog('Fetching location map section');
      
      const query = createQueryString({ LocationMap: '*' });
      const response = await axios.get(`${API_URL}/home?${query}`, {
        timeout: DEFAULT_TIMEOUT
      });
      
      const data = extractEntityData(response.data);
      return data?.LocationMap || null;
    } catch (error) {
      return handleApiError(error, 'getLocationMapSection');
    }
  },

  /**
   * Get curved CTA section data
   */
  getCurvedCTASection: async (): Promise<StrapiCurvedCTASection | null> => {
    try {
      debugLog('Fetching curved CTA section');
      
      const query = createQueryString({ CurvedCTA: '*' });
      const response = await axios.get(`${API_URL}/home?${query}`, {
        timeout: DEFAULT_TIMEOUT
      });
      
      const data = extractEntityData(response.data);
      return data?.CurvedCTA || null;
    } catch (error) {
      return handleApiError(error, 'getCurvedCTASection');
    }
  },

  /**
   * Get shared impact statistics section data
   */
  getSharedImpactStatistics: async (): Promise<{ title: string; stats: any } | null> => {
    try {
      debugLog('Fetching shared impact statistics');
      
      const query = createQueryString({ 
        'impactStatsTitle': '*',
        'sharedImpactStats': {
          'populate': {
            'statistics': '*'
          }
        }
      });
      const response = await axios.get(`${API_URL}/home?${query}`, {
        timeout: DEFAULT_TIMEOUT
      });
      
      const data = extractEntityData(response.data);
      return {
        title: data?.impactStatsTitle || null,
        stats: data?.sharedImpactStats || null
      };
    } catch (error) {
      return handleApiError(error, 'getSharedImpactStatistics');
    }
  }
};

export default homeApi;
