// Google Analytics 4 Implementation
// Ready for client GA4 Measurement ID integration

import { analyticsConfig, isAnalyticsEnabled } from '@shared/config/analytics';

// Declare gtag function globally
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Initialize Google Analytics
export const initGA = (): void => {
  // Check for environment variable
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  
  if (!measurementId || !measurementId.startsWith('G-')) {
    // Silently skip if no measurement ID - no console warnings in production
    return;
  }
  
  // Update config with environment variable
  analyticsConfig.googleAnalytics.measurementId = measurementId;
  analyticsConfig.googleAnalytics.enabled = true;

  // Add Google Analytics script to head
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  // Initialize gtag
  const script2 = document.createElement('script');
  script2.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}', {
      cookie_flags: 'SameSite=None;Secure',
      anonymize_ip: true,
      allow_google_signals: false
    });
  `;
  document.head.appendChild(script2);
};

// Track page views - useful for single-page applications
export const trackPageView = (url: string, title?: string): void => {
  if (!isAnalyticsEnabled() || typeof window === 'undefined' || !window.gtag) {
    return;
  }
  
  window.gtag('config', analyticsConfig.googleAnalytics.measurementId, {
    page_path: url,
    page_title: title
  });
};

// Track custom events
export const trackEvent = (
  eventName: string,
  parameters: {
    event_category?: string;
    event_label?: string;
    value?: number;
    page_category?: string;
    [key: string]: any;
  } = {}
): void => {
  if (!isAnalyticsEnabled() || typeof window === 'undefined' || !window.gtag) {
    return;
  }
  
  window.gtag('event', eventName, parameters);
};

// Specific tracking functions for common actions
export const trackCTAClick = (buttonName: string, location: string): void => {
  trackEvent(analyticsConfig.events.getQuoteClick, {
    event_category: 'CTA',
    event_label: buttonName,
    page_location: location
  });
};

export const trackContactFormSubmit = (formType: string): void => {
  trackEvent(analyticsConfig.events.contactFormSubmit, {
    event_category: 'Lead Generation',
    event_label: formType,
    value: 1
  });
};

export const trackPhoneClick = (phoneNumber: string): void => {
  trackEvent(analyticsConfig.events.phoneNumberClick, {
    event_category: 'Contact',
    event_label: phoneNumber
  });
};

export const trackEmailClick = (emailAddress: string): void => {
  trackEvent(analyticsConfig.events.emailClick, {
    event_category: 'Contact',
    event_label: emailAddress
  });
};

export const trackLinkedInClick = (source: string): void => {
  trackEvent(analyticsConfig.events.linkedinClick, {
    event_category: 'Social Media',
    event_label: 'LinkedIn',
    page_location: source
  });
};

export const trackServicePageView = (serviceName: string): void => {
  trackEvent(analyticsConfig.events.servicePageView, {
    event_category: 'Services',
    event_label: serviceName,
    page_category: analyticsConfig.pageCategories.services
  });
};

export const trackEquipmentView = (equipmentName: string): void => {
  trackEvent(analyticsConfig.events.equipmentPageView, {
    event_category: 'Equipment',
    event_label: equipmentName,
    page_category: analyticsConfig.pageCategories.equipment
  });
};

export const trackExternalLink = (url: string, linkText: string): void => {
  trackEvent(analyticsConfig.events.externalLinkClick, {
    event_category: 'External Links',
    event_label: linkText,
    destination_url: url
  });
};

export const trackVideoPlay = (videoName: string): void => {
  trackEvent(analyticsConfig.events.videoPlay, {
    event_category: 'Media',
    event_label: videoName
  });
};