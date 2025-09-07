/**
 * Strapi API Configuration
 * 
 * This file contains configuration settings for the Strapi API integration.
 * It defines URLs, headers, and other configuration parameters.
 */

// API configuration
export const STRAPI_URL = (import.meta.env?.VITE_STRAPI_URL as string) || 'http://localhost:1337';
export const API_URL = `${STRAPI_URL}/api`;

// Configuration loaded - no debug logging in production

// Common headers or request config
export const defaultHeaders = {
  'Content-Type': 'application/json',
};

// Default timeout for API requests (in milliseconds)
export const DEFAULT_TIMEOUT = 10000;

// Debug mode - set to true during development to enable additional logging
export const DEBUG_MODE = (import.meta.env?.DEV as boolean) || false;
