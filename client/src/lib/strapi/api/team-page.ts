/**
 * Team Page API
 * 
 * API functions for fetching team page content from Strapi CMS
 */

import axios from 'axios';
import { API_URL, DEFAULT_TIMEOUT } from './config';
import { 
  createQueryString, 
  extractEntityData, 
  handleApiError
} from './utils';

// Define minimal interface here to avoid circular dependencies
interface TeamPage {
  [key: string]: any;
}

/**
 * Team page API functions
 * Following proven pattern from other pages
 */
class TeamPageAPI {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_URL;
    this.timeout = DEFAULT_TIMEOUT;
  }

  /**
   * Create populate object for Team page following established pattern
   */
  private createTeamPagePopulateObject() {
    return {
      // Populate any component fields here if needed
      // For now, the team page has simple fields without components
    };
  }

  /**
   * Get Team page data
   * Following exact proven pattern from other working pages
   */
  async getTeamPage(): Promise<TeamPage | null> {
    try {
      // Create populate object based on schema
      const populateObject = this.createTeamPagePopulateObject();
      const queryString = createQueryString(populateObject);
      
      const response = await axios.get(`${this.baseURL}/team-page?${queryString}`, {
        timeout: this.timeout
      });

      // Extract data from the Strapi response following the established pattern
      const responseData = response.data.data;
      
      return responseData;
    } catch (error) {
      handleApiError(error, 'getTeamPage');
      return null;
    }
  }
}

// Export singleton instance following proven pattern
export const teamPageApi = new TeamPageAPI();

// For backward compatibility with existing code
export async function fetchTeamPageData(): Promise<TeamPage | null> {
  return teamPageApi.getTeamPage();
}

export default teamPageApi;
