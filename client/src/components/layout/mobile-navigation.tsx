import { Link } from 'wouter';
import { ChevronDown } from 'lucide-react';
import { ContactSlideOutTrigger } from '@/components/common/contact-slide-out';

interface MobileNavigationProps {
  navigation: Array<{ name: string; href: string }>;
  servicePages: Array<{ name: string; href: string }>;
  aboutPages: Array<{ name: string; href: string }>;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  servicesDropdownOpen: boolean;
  setServicesDropdownOpen: (open: boolean) => void;
  aboutDropdownOpen: boolean;
  setAboutDropdownOpen: (open: boolean) => void;
}

export const MobileNavigation = ({
  navigation,
  servicePages,
  aboutPages,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  servicesDropdownOpen,
  setServicesDropdownOpen,
  aboutDropdownOpen,
  setAboutDropdownOpen,
}: MobileNavigationProps) => {
  return (
    <>
      {/* Content Overlay when mobile menu is open */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-all duration-300"
          style={{ top: '128px' }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Mobile Only "Enquire Now" Button - Above Header */}
      <div className="mobile-enquire-banner bg-compleo-deep-teal text-white py-3" style={{ display: 'none' }}>
        <style>{`
          @media (max-width: 1199px) {
            .mobile-enquire-banner { 
              display: flex !important; 
              position: fixed !important;
              top: 0 !important;
              left: 0 !important;
              right: 0 !important;
              z-index: 61 !important;
              height: 64px !important;
            }
          }
          @media (min-width: 1200px) {
            .mobile-enquire-banner { display: none !important; }
          }
        `}</style>
        <div className="w-full h-full flex items-center justify-center">
          <ContactSlideOutTrigger isMobile={true} />
        </div>
      </div>

      {/* Custom Mobile Menu - Fade In/Out */}
      <div 
        className={`fixed w-full shadow-xl transform transition-all duration-300 ease-in-out overflow-y-auto ${
          isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible pointer-events-none -translate-y-4'
        }`}
        style={{
          top: '128px',
          left: '0',
          right: '0',
          bottom: '0',
          zIndex: 50,
          backgroundColor: 'white',
          background: 'white'
        }}
        role="menu"
        aria-label="Mobile navigation menu"
      >
        <div className="pt-2 px-6 pb-6 min-h-full">
          <nav className="flex flex-col space-y-4" role="navigation" aria-label="Main navigation">
            {/* Home */}
            <div>
              <Link href="/">
                <span
                  className="block px-4 py-3 text-base font-medium transition-colors text-compleo-deep-teal hover:text-compleo-teal"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </span>
              </Link>
            </div>

            {/* Services Section - Collapsible */}
            <div>
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-compleo-deep-teal hover:text-compleo-teal transition-colors"
                aria-expanded={servicesDropdownOpen}
                aria-controls="services-dropdown"
                aria-label="Services menu"
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                  servicesDropdownOpen ? 'rotate-180' : ''
                }`} />
              </button>
              <div 
                id="services-dropdown"
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  servicesDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
                role="menu"
                aria-labelledby="services-dropdown-button"
              >
                <div className="ml-4 space-y-2 py-2">
                  {servicePages.map((service, index) => (
                    <Link key={service.href} href={service.href}>
                      <span
                        className={`block px-4 py-2 text-sm font-medium transition-all duration-200 transform text-compleo-deep-teal hover:text-compleo-teal ${
                          servicesDropdownOpen 
                            ? 'translate-x-0 opacity-100' 
                            : 'translate-x-4 opacity-0'
                        } ${index === 0 ? 'font-semibold border-b border-gray-200 mb-2 pb-3' : 'ml-4 relative'}`}
                        style={{
                          transitionDelay: servicesDropdownOpen ? `${index * 50}ms` : '0ms'
                        }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {index > 0 && <span className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">•</span>}
                        {service.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Navigation Items */}
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <span
                  className="block px-4 py-3 text-base font-medium transition-colors text-compleo-deep-teal hover:text-compleo-teal"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </span>
              </Link>
            ))}

            {/* About Us Section - Collapsible */}
            <div>
              <button
                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-compleo-deep-teal hover:text-compleo-teal transition-colors"
                aria-expanded={aboutDropdownOpen}
                aria-controls="about-dropdown"
                aria-label="About Us menu"
              >
                About Us
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                  aboutDropdownOpen ? 'rotate-180' : ''
                }`} />
              </button>
              <div 
                id="about-dropdown"
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  aboutDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
                role="menu"
                aria-labelledby="about-dropdown-button"
              >
                <div className="ml-4 space-y-2 py-2">
                  {aboutPages.map((page, index) => (
                    <Link key={page.href} href={page.href}>
                      <span
                        className={`block px-4 py-2 text-sm font-medium transition-all duration-200 transform text-compleo-deep-teal hover:text-compleo-teal flex items-center gap-2 ${
                          aboutDropdownOpen 
                            ? 'translate-x-0 opacity-100' 
                            : 'translate-x-4 opacity-0'
                        }`}
                        style={{
                          transitionDelay: aboutDropdownOpen ? `${index * 50}ms` : '0ms'
                        }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        • {page.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <Link href="/contact">
                <span
                  className="block px-4 py-3 text-base font-medium transition-colors text-compleo-deep-teal hover:text-compleo-teal"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};