import { Link } from 'wouter';
import { ChevronDown } from 'lucide-react';
import { ContactSlideOutTrigger } from '@/components/common/contact-slide-out';
import { LinkedInBadge } from '@/components/common/linkedin-badge';

interface DesktopNavigationProps {
  location: string;
  navigation: Array<{ name: string; href: string }>;
  servicePages: Array<{ name: string; href: string }>;
  aboutPages: Array<{ name: string; href: string }>;
  isActive: (href: string) => boolean;
  servicesDropdownOpen: boolean;
  setServicesDropdownOpen: (open: boolean) => void;
  aboutDropdownOpen: boolean;
  setAboutDropdownOpen: (open: boolean) => void;
}

export const DesktopNavigation = ({
  location,
  navigation,
  servicePages,
  aboutPages,
  isActive,
  servicesDropdownOpen,
  setServicesDropdownOpen,
  aboutDropdownOpen,
  setAboutDropdownOpen,
}: DesktopNavigationProps) => {
  return (
    <>
      <div className="hidden" style={{ display: 'none' }}>
        <style>{`
          @media (min-width: 1200px) {
            .desktop-nav-1200 { display: block !important; }
          }
        `}</style>
      </div>
      <div className="desktop-nav-1200" style={{ display: 'none' }}>
        <div className="ml-6 flex items-center space-x-4">
          {/* Home */}
          <Link href="/">
            <span className={`px-3 py-2 text-base font-medium transition-all duration-300 whitespace-nowrap relative group block ${
              isActive('/')
                ? 'text-compleo-teal'
                : 'text-compleo-deep-teal hover:text-compleo-teal'
            }`}>
              Home
              <span className={`absolute bottom-0 left-0 h-0.5 bg-compleo-teal transition-all duration-300 ${
                isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </span>
          </Link>

          {/* Services Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <button
              className={`px-3 py-2 text-base font-medium transition-all duration-300 whitespace-nowrap flex items-center gap-1 relative group ${
                location.startsWith('/services')
                  ? 'text-compleo-teal'
                  : 'text-compleo-deep-teal hover:text-compleo-teal'
              }`}
              aria-expanded={servicesDropdownOpen}
              aria-haspopup="true"
              aria-label="Services menu"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setServicesDropdownOpen(!servicesDropdownOpen);
                }
                if (e.key === 'Escape') {
                  setServicesDropdownOpen(false);
                }
              }}
            >
              Services
              <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${
                servicesDropdownOpen ? 'rotate-180' : ''
              }`} />
              <span className={`absolute bottom-0 left-0 h-0.5 bg-compleo-teal transition-all duration-300 ${
                location.startsWith('/services') ? 'w-full' : servicesDropdownOpen ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </button>
            
            {servicesDropdownOpen && (
              <div className="absolute top-full left-0 w-72 bg-white shadow-xl rounded-lg border border-gray-200 z-50 py-2 animate-in slide-in-from-top-2 duration-200">
                {servicePages.map((service, index) => (
                  <Link key={service.href} href={service.href}>
                    <div className={`px-4 py-3 hover:bg-compleo-teal/10 cursor-pointer transition-all duration-200 mx-2 rounded-lg border-l-4 border-transparent hover:border-compleo-teal hover:shadow-sm ${
                      index === 0 ? 'border-b border-gray-200 mb-2 pb-3' : ''
                    }`}>
                      <span className={`font-medium text-compleo-deep-teal hover:text-compleo-teal transition-colors duration-200 ${
                        index === 0 ? 'text-base font-semibold' : 'text-sm pl-2 relative'
                      }`}>
                        {index > 0 && <span className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">•</span>}
                        {service.name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Main Navigation Items */}
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <span
                className={`px-3 py-2 text-base font-medium transition-all duration-300 whitespace-nowrap relative group ${
                  isActive(item.href)
                    ? 'text-compleo-teal'
                    : 'text-compleo-deep-teal hover:text-compleo-teal'
                }`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-compleo-teal transition-all duration-300 ${
                  isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </span>
            </Link>
          ))}

          {/* About Us Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setAboutDropdownOpen(true)}
            onMouseLeave={() => setAboutDropdownOpen(false)}
          >
            <button
              className={`px-3 py-2 text-base font-medium transition-all duration-300 whitespace-nowrap flex items-center gap-1 relative group ${
                aboutPages.some(page => location === page.href)
                  ? 'text-compleo-teal'
                  : 'text-compleo-deep-teal hover:text-compleo-teal'
              }`}
              aria-expanded={aboutDropdownOpen}
              aria-haspopup="true"
              aria-label="About Us menu"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setAboutDropdownOpen(!aboutDropdownOpen);
                }
                if (e.key === 'Escape') {
                  setAboutDropdownOpen(false);
                }
              }}
            >
              About Us
              <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${
                aboutDropdownOpen ? 'rotate-180' : ''
              }`} />
              <span className={`absolute bottom-0 left-0 h-0.5 bg-compleo-teal transition-all duration-300 ${
                aboutPages.some(page => location === page.href) ? 'w-full' : aboutDropdownOpen ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </button>
            
            {aboutDropdownOpen && (
              <div className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-lg border border-gray-200 z-50 py-2 animate-in slide-in-from-top-2 duration-200">
                {aboutPages.map((page) => (
                  <Link key={page.href} href={page.href}>
                    <div className="px-4 py-3 hover:bg-compleo-teal/10 cursor-pointer transition-all duration-200 mx-2 rounded-lg border-l-4 border-transparent hover:border-compleo-teal hover:shadow-sm">
                      <span className="font-medium text-compleo-deep-teal hover:text-compleo-teal transition-colors duration-200 text-sm flex items-center gap-2">
                        {page.icon && <page.icon className="h-3 w-3" />}
                        {page.name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* LinkedIn Icon */}
          <div className="ml-4 flex items-center">
            <LinkedInBadge variant="header" />
          </div>



          {/* Contact Slide-out Trigger */}
          <div className="ml-6 flex items-center">
            <ContactSlideOutTrigger />
          </div>
        </div>
      </div>
    </>
  );
};