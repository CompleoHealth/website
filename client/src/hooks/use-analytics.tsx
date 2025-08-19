// Analytics hook for automatic page view tracking
import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { trackPageView } from '../lib/analytics';

export const useAnalytics = (pageTitle?: string): void => {
  const [location] = useLocation();
  const prevLocationRef = useRef<string>(location);
  
  useEffect(() => {
    // Track initial page load and route changes
    if (location !== prevLocationRef.current) {
      trackPageView(location, pageTitle || document.title);
      prevLocationRef.current = location;
    }
  }, [location, pageTitle]);
};

// Page-specific analytics hooks
export const useServicePageAnalytics = (serviceName: string): void => {
  const [location] = useLocation();
  
  useEffect(() => {
    // Track service page views with enhanced data
    trackPageView(location, `${serviceName} | Compleo Health Services`);
  }, [location, serviceName]);
};

export const useEquipmentAnalytics = (equipmentName?: string): void => {
  const [location] = useLocation();
  
  useEffect(() => {
    const title = equipmentName 
      ? `${equipmentName} | Medical Equipment | Compleo Health`
      : 'Medical Equipment | Compleo Health';
    
    trackPageView(location, title);
  }, [location, equipmentName]);
};