import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { X, MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { LinkedInBadge } from '@/components/common/linkedin-badge';
import { Link } from 'wouter';
import { trackCTAClick, trackPhoneClick, trackEmailClick } from '@/lib/analytics';
import { strapiApi } from '@/lib/strapi';
import { StrapiContactPanel } from '@/lib/strapi/types/global-settings';

interface ContactSlideOutProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactSlideOut({ isOpen, onClose }: ContactSlideOutProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [contactPanelData, setContactPanelData] = useState<StrapiContactPanel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch contact panel data from CMS
  useEffect(() => {
    const fetchContactPanelData = async () => {
      try {
        const data = await strapiApi.getContactPanel();
        setContactPanelData(data);
      } catch (error) {
        console.error('Error fetching contact panel data:', error);
        // Will use fallback values below
      } finally {
        setLoading(false);
      }
    };

    fetchContactPanelData();
  }, []);

  // Close on escape key and implement focus trapping
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Focus trapping for modal accessibility
  useEffect(() => {
    if (isOpen && isAnimating) {
      const panel = document.querySelector('[data-contact-panel="true"]');
      if (panel) {
        const focusableElements = panel.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
        
        // Focus the first element
        firstElement?.focus();
        
        const handleTabKey = (e: KeyboardEvent) => {
          if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstElement) {
              e.preventDefault();
              lastElement?.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
              e.preventDefault();
              firstElement?.focus();
            }
          }
        };
        
        document.addEventListener('keydown', handleTabKey);
        return () => document.removeEventListener('keydown', handleTabKey);
      }
    }
  }, [isOpen, isAnimating]);

  // Handle animation state
  useEffect(() => {
    if (isOpen) {
      // Start animation after a brief delay
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  // Prevent body scroll when panel is open and apply staged blur effect
  useEffect(() => {
    const pageWrapper = document.getElementById('page-wrapper');
    const mobileBanner = document.querySelector('.mobile-enquire-banner') as HTMLElement;
    const header = document.querySelector('header') as HTMLElement;
    
    if (isOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      // Prevent scrolling but maintain scroll position without page shift
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.left = '0';
      // Apply blur class to page wrapper
      document.body.classList.add('contact-overlay-active');
      // Hide mobile banner and adjust header position when contact panel is open
      if (mobileBanner) {
        mobileBanner.style.display = 'none';
      }
      if (header) {
        header.style.top = '0px';
      }
      if (pageWrapper) {
        pageWrapper.classList.add('contact-overlay-active');
        // Stage the blur effect after a frame to paint
        const blurTimer = setTimeout(() => {
          pageWrapper.classList.add('active-blur');
        }, 50);
        
        // Clean up timeout on unmount
        return () => {
          clearTimeout(blurTimer);
        };
      }
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.left = '';
      // Remove blur class immediately
      document.body.classList.remove('contact-overlay-active');
      // Restore mobile banner display and header position
      if (mobileBanner) {
        mobileBanner.style.display = '';
      }
      if (header) {
        header.style.top = '';
      }
      if (pageWrapper) {
        pageWrapper.classList.remove('contact-overlay-active');
        pageWrapper.classList.remove('active-blur');
      }
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.left = '';
      document.body.classList.remove('contact-overlay-active');
      // Restore mobile banner and header position on cleanup
      if (mobileBanner) {
        mobileBanner.style.display = '';
      }
      if (header) {
        header.style.top = '';
      }
      if (pageWrapper) {
        pageWrapper.classList.remove('contact-overlay-active');
        pageWrapper.classList.remove('active-blur');
      }
    };
  }, [isOpen]);

  // Don't render anything if not open
  if (!isOpen) {
    return null;
  }

  // Get or create the contact panel container
  let contactContainer = document.getElementById('contact-panel-container');
  
  // Create container if it doesn't exist
  if (!contactContainer) {
    contactContainer = document.createElement('div');
    contactContainer.id = 'contact-panel-container';
    document.body.appendChild(contactContainer);
  }

  // Render overlay and panel using portal outside page wrapper
  return createPortal(
    <>
      {/* Overlay */}
      <div 
        className={`contact-overlay-blur fixed inset-0 z-40 ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />
      
      {/* Slide-out Panel */}
      <div 
        className={`contact-panel fixed top-0 right-0 h-screen w-96 text-white shadow-2xl overflow-y-auto z-50 ${isAnimating ? 'slide-in' : 'slide-out'}`}
        style={{ 
          backgroundColor: 'rgb(15, 46, 46)'
        }}
        data-contact-panel="true"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-panel-title"
      >
        {/* Decorative Arc Elements - positioned below header */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute right-0 w-48 h-48 rounded-bl-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', top: '73px' }}></div>
          <div className="absolute right-0 w-28 h-28 rounded-bl-full" style={{ backgroundColor: 'rgba(247, 249, 228, 0.15)', top: '73px' }}></div>
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Header - WHITE BACKGROUND */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
            <img 
              src="/images/shared/logo-main.png" 
              alt="Compleo Health" 
              className="h-8 w-auto"
            />
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label="Close contact panel"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>
          
          {/* Content */}
          <div className="flex-1 p-6 space-y-8">
            <div>
              <h2 id="contact-panel-title" className="text-2xl font-bold text-white mb-2">{contactPanelData?.header || "Contact Us"}</h2>
              <p className="text-white/90 text-lg mb-6">
                {contactPanelData?.description || "We'd love to hear from you. Connect with us using one of the methods below."}
              </p>
            </div>
            
            {/* Business Address */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-compleo-yellow" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">{contactPanelData?.officeTitle || "Manchester Office"}</h3>
                  <div className="text-white/90 mt-1">
                    <p>{contactPanelData?.addressLine1 || "Beehive Mill"}</p>
                    <p>{contactPanelData?.addressLine2 || "Jersey Street"}</p>
                    <p>{contactPanelData?.addressLine3 || "Manchester M4 6JG"}</p>
                    <p>{contactPanelData?.addressLine4 || "United Kingdom"}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Methods */}
            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 text-compleo-yellow" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Phone</h3>
                  <a 
                    href={`tel:${(contactPanelData?.phone || '+44 (0)161 884 1303').replace(/[^+\d]/g, '')}`} 
                    onClick={() => trackPhoneClick(contactPanelData?.phone || '+44 (0)161 884 1303')}
                    className="text-white/90 hover:text-compleo-yellow transition-colors"
                  >
                    {contactPanelData?.phone || '+44 (0)161 884 1303'}
                  </a>
                </div>
              </div>
              
              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Mail className="h-5 w-5 text-compleo-yellow" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Email</h3>
                  <a 
                    href={`mailto:${contactPanelData?.email || 'info@compleohealth.com'}`} 
                    onClick={() => trackEmailClick(contactPanelData?.email || 'info@compleohealth.com')}
                    className="text-white/90 hover:text-compleo-yellow transition-colors"
                  >
                    {contactPanelData?.email || 'info@compleohealth.com'}
                  </a>
                </div>
              </div>
              
              {/* Business Hours */}
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Clock className="h-5 w-5 text-compleo-yellow" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Business Hours</h3>
                  <p className="text-white/90">{contactPanelData?.businessHours || "Monday-Friday 8am-8pm"}</p>
                </div>
              </div>
              
              {/* LinkedIn */}
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <LinkedInBadge variant="contact" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">LinkedIn</h3>
                  <a 
                    href="https://www.linkedin.com/company/compleohealth/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/90 hover:text-compleo-yellow transition-colors flex items-center gap-1"
                  >
                    {contactPanelData?.linkedinText || "Connect with us on LinkedIn"}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer CTA */}
          <div className="p-6 border-t border-white/20">
            <Link href="/contact" onClick={() => {
              trackCTAClick('Complete Contact Form', 'contact-slideout');
              onClose();
            }}>
              <Button 
                className="w-full bg-compleo-yellow hover:bg-compleo-yellow/90 text-compleo-deep-teal font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {contactPanelData?.contactFormButtonText || "Complete a Contact Form"}
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>,
    contactContainer
  );
}

// Trigger button component
export function ContactSlideOutTrigger({ isMobile = false }: { isMobile?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          trackCTAClick('Contact Us Today - Slide Out', window.location.pathname);
          setIsOpen(true);
        }}
        className={isMobile 
          ? "bg-white hover:bg-gray-100 text-compleo-deep-teal font-normal text-sm px-6 py-2 transition-all duration-300"
          : "bg-compleo-deep-teal hover:bg-compleo-teal text-white font-normal text-base px-6 py-2.5 transition-all duration-300 hover:shadow-xl"
        }
        aria-label="Open contact information panel"
      >
        Contact Us Today
      </Button>
      
      <ContactSlideOut 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  );
}