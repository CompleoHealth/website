// Analytics Configuration for CMS Integration
// Client will add their GA4 Measurement ID here or via CMS

export const analyticsConfig = {
  // GA4 Measurement ID - Client to provide
  // Format: G-XXXXXXXXXX
  googleAnalytics: {
    measurementId: '',  // Will be set by environment variable
    enabled: false      // Will be enabled when measurement ID is provided
  },
  
  // Event tracking configuration
  events: {
    // CTA Button Tracking
    contactFormSubmit: 'contact_form_submit',
    getQuoteClick: 'get_quote_click',
    phoneNumberClick: 'phone_number_click',
    emailClick: 'email_click',
    linkedinClick: 'linkedin_click',
    
    // Navigation Tracking  
    servicePageView: 'service_page_view',
    equipmentPageView: 'equipment_page_view',
    aboutPageView: 'about_page_view',
    
    // Content Engagement
    videoPlay: 'video_play',
    pdfDownload: 'pdf_download',
    mapInteraction: 'map_interaction',
    teamMemberView: 'team_member_view',
    
    // External Links
    externalLinkClick: 'external_link_click',
    socialMediaClick: 'social_media_click'
  },
  
  // Page categories for enhanced tracking
  pageCategories: {
    home: 'homepage',
    services: 'services',
    equipment: 'equipment',
    about: 'company',
    contact: 'contact',
    legal: 'legal',
    team: 'team'
  }
};

// Helper function to check if analytics is properly configured
export const isAnalyticsEnabled = (): boolean => {
  return analyticsConfig.googleAnalytics.enabled && 
         analyticsConfig.googleAnalytics.measurementId.startsWith('G-');
};