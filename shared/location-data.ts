// TypeScript utilities for location data - loads from JSON for CMS compatibility
// Data is now stored in shared/data/locations.json for easy CMS management

export interface LocationData {
  id: string;
  name: string;
  type: 'facility' | 'office';
  address: string;
  city: string;
  postcode: string;
  country: string;
  countryCode: string;
  phone?: string;
  coordinates?: { lat: number; lng: number };
  services: string[];
  status: 'active' | 'inactive';
}

// Dynamic import of JSON data for CMS compatibility
import locationsJson from './data/locations.json';
export const COMPLEO_LOCATIONS: LocationData[] = locationsJson.locations;

// Country code mapping for flags and GeoJSON matching
export const COUNTRY_CODES: Record<string, string> = {
  'United Kingdom': 'GB',
  'Ireland': 'IE', 
  'Italy': 'IT',
  'Switzerland': 'CH',
  'Denmark': 'DK'
};

// Helper functions for working with location data
export const getLocationsByCountry = (country: string) => {
  return COMPLEO_LOCATIONS.filter(location => 
    location.country === country
  );
};

export const getOperatingCountries = () => {
  const countryMap: Record<string, boolean> = {};
  COMPLEO_LOCATIONS.forEach(loc => {
    countryMap[loc.country] = true;
  });
  
  const countries = Object.keys(countryMap);
  return countries.map(country => ({
    name: country,
    code: COUNTRY_CODES[country],
    locationCount: COMPLEO_LOCATIONS.filter(loc => loc.country === country).length
  }));
};

export const getCountryCode = (countryName: string): string => {
  return COUNTRY_CODES[countryName] || 'UN';
};

export const getLocationCoordinates = (city: string) => {
  const location = COMPLEO_LOCATIONS.find(loc => 
    loc.city.toLowerCase() === city.toLowerCase()
  );
  
  if (location?.coordinates) {
    return location.coordinates;
  }
  
  // Fallback coordinates for major cities
  const cityCoordinates: Record<string, { lat: number; lng: number }> = {
    'London': { lat: 51.5074, lng: -0.1278 },
    'Manchester': { lat: 53.4808, lng: -2.2426 },
    'Birmingham': { lat: 52.4862, lng: -1.8904 },
    'Leeds': { lat: 53.8008, lng: -1.5491 },
    'Liverpool': { lat: 53.4084, lng: -2.9916 },
    'Edinburgh': { lat: 55.9533, lng: -3.1883 },
    'Glasgow': { lat: 55.8642, lng: -4.2518 },
    'Cardiff': { lat: 51.4816, lng: -3.1791 },
    'Bristol': { lat: 51.4545, lng: -2.5879 },
    'Newcastle': { lat: 54.9783, lng: -1.6178 }
  };
  
  return cityCoordinates[city] || { lat: 54.5, lng: -2.0 }; // Default to UK center
};