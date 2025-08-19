/**
 * Strapi API Utilities
 * 
 * This file contains utility functions for working with the Strapi API.
 * It includes helpers for data extraction, error handling, and query construction.
 */

import axios from 'axios';
type AxiosError = any; // Temporary type until we fix all dependencies
import qs from 'qs';
import { DEBUG_MODE } from './config';

/**
 * Helper to extract entity data from Strapi's response structure
 * Handles both single entities and collections
 */
export const extractEntityData = (response: any) => {
  if (!response.data) return null;
  
  // Handle single entity
  if (response.data.attributes) {
    const { id, documentId } = response.data;
    const attributes = response.data.attributes;
    return { id, documentId, ...attributes };
  }
  
  // Handle collection
  if (Array.isArray(response.data)) {
    return response.data.map((item: any) => {
      const { id, documentId } = item;
      const attributes = item.attributes;
      return { id, documentId, ...attributes };
    });
  }
  
  return response.data;
};

/**
 * Create a query string with proper population for Strapi
 * Uses qs library to properly stringify nested objects
 */
export const createQueryString = (populateObject: any) => {
  return qs.stringify(
    { populate: populateObject },
    { encodeValuesOnly: true }
  );
};

/**
 * Handle API errors with consistent logging and formatting
 */
export const handleApiError = (error: any, context: string) => {
  console.error(`Error in ${context}:`, error);
  
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    console.error('API error details:', axiosError.response?.data);
    
    if (DEBUG_MODE) {
      console.error('API error status:', axiosError.response?.status);
      console.error('API error headers:', axiosError.response?.headers);
      console.error('API error config:', axiosError.config);
    }
  }
  
  return null;
};

/**
 * Debug logger that only logs in debug mode
 */
export const debugLog = (message: string, data?: any) => {
  if (DEBUG_MODE) {

  }
};

/**
 * Helper to create a populate object with bracket notation for deep population
 * Example: createPopulatePath('Hero', ['primaryButton', 'secondaryButton'])
 * Result: { Hero: { populate: { primaryButton: '*', secondaryButton: '*' } } }
 */
export const createPopulatePath = (
  parentPath: string, 
  childPaths: string[] = [], 
  deepPopulate: Record<string, string[]> = {}
) => {
  const result: any = {
    [parentPath]: {
      populate: {}
    }
  };
  
  // Add simple child paths with wildcard
  childPaths.forEach(path => {
    result[parentPath].populate[path] = '*';
  });
  
  // Add deep population paths
  Object.entries(deepPopulate).forEach(([childPath, grandchildPaths]) => {
    result[parentPath].populate[childPath] = {
      populate: {}
    };
    
    grandchildPaths.forEach(grandchildPath => {
      result[parentPath].populate[childPath].populate[grandchildPath] = '*';
    });
  });
  
  return result;
};
