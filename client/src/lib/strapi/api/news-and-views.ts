import axios from 'axios';
import { NewsAndViewsPage } from '../types/news-and-views';

const API_URL = process.env.REACT_APP_STRAPI_API_URL || 'http://localhost:1337';
const DEFAULT_TIMEOUT = parseInt(process.env.REACT_APP_API_TIMEOUT || '10000');

/**
 * Fetch News and Views page data from Strapi CMS
 * Includes all dynamic content sections with proper population
 */
export async function fetchNewsAndViewsPageData(): Promise<NewsAndViewsPage | null> {
  try {
    const response = await axios.get(
      `${API_URL}/api/news-and-views-page?populate=*`,
      { 
        timeout: DEFAULT_TIMEOUT,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data && response.data.data && response.data.data.attributes) {
      return response.data.data.attributes as NewsAndViewsPage;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching news and views page data:', error);
    return null;
  }
}
