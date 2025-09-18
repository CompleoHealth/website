/**
 * Team API
 *
 * API functions for fetching team members from Strapi CMS
 */

import axios from 'axios';
import { API_URL, DEFAULT_TIMEOUT, DEBUG_MODE } from './config';
import {
  handleApiError,
  debugLog
} from './utils';
import { CMSTeamResponse, CMSTeamMember } from '../types/team';

/**
 * Team API functions
 * Following proven pattern from news-and-views and other working pages
 */
class TeamAPI {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_URL;
    this.timeout = DEFAULT_TIMEOUT;
  }

  /**
   * Get all team members with images populated
   * Following exact proven pattern from other working APIs
   */
  async getTeamMembers(): Promise<CMSTeamMember[] | null> {
    try {
      // Use simple populate=* pattern for safety with sorting by display_order
      const queryString = 'populate=*&sort=display_order:asc';

      // Log the query string in debug mode
      debugLog('Team members query string:', queryString);

      const response = await axios.get(`${this.baseURL}/team-members?${queryString}`, {
        timeout: this.timeout
      });

      // Log the raw response in debug mode
      debugLog('Team members raw response:', response.data);

      // Extract data from the Strapi response following the established pattern
      const responseData: CMSTeamResponse = response.data;

      // Log the extracted data in debug mode
      debugLog('Team members extracted data:', responseData.data);

      return responseData.data;
    } catch (error) {
      // Follow proven error handling pattern - always return null on error
      debugLog('Team members API error:', error);
      handleApiError(error, 'getTeamMembers');
      return null;
    }
  }

  /**
   * Get single team member by id_slug
   */
  async getTeamMemberBySlug(slug: string): Promise<CMSTeamMember | null> {
    try {
      const queryString = `filters[id_slug][$eq]=${slug}&populate=*`;

      debugLog('Team member by slug query string:', queryString);

      const response = await axios.get(`${this.baseURL}/team-members?${queryString}`, {
        timeout: this.timeout
      });

      debugLog('Team member by slug raw response:', response.data);

      const responseData: CMSTeamResponse = response.data;

      // Return first match or null if not found
      return responseData.data.length > 0 ? responseData.data[0] : null;
    } catch (error) {
      debugLog('Team member by slug API error:', error);
      handleApiError(error, 'getTeamMemberBySlug');
      return null;
    }
  }
}

// Export singleton instance following proven pattern
export const teamApi = new TeamAPI();

// For backward compatibility with existing code
export async function fetchTeamMembers(): Promise<CMSTeamMember[] | null> {
  return teamApi.getTeamMembers();
}

export async function fetchTeamMemberBySlug(slug: string): Promise<CMSTeamMember | null> {
  return teamApi.getTeamMemberBySlug(slug);
}

export default teamApi;