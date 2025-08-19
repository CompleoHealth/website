import { useState } from 'react';
import { Link } from 'wouter';
import ScrollProgress from '@/components/common/scroll-progress';
import { useNavigationData } from '@/hooks/use-navigation-data';
import { useMobileHeaderPositioning } from '@/hooks/use-mobile-header-positioning';
import { DesktopNavigation } from '@/components/layout/desktop-navigation';
import { MobileNavigation } from '@/components/layout/mobile-navigation';


export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

  // Use extracted hooks and data
  const { location, navigation, aboutPages, servicePages, isActive } = useNavigationData();
  useMobileHeaderPositioning();

  return (
    <>
      <MobileNavigation
        navigation={navigation}
        servicePages={servicePages}
        aboutPages={aboutPages}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        servicesDropdownOpen={servicesDropdownOpen}
        setServicesDropdownOpen={setServicesDropdownOpen}
        aboutDropdownOpen={aboutDropdownOpen}
        setAboutDropdownOpen={setAboutDropdownOpen}
      />
      <ScrollProgress />
      <header className="bg-white shadow-sm fixed left-0 right-0 z-50 mobile-header-spacing" role="banner" style={{ position: 'fixed' as const, transform: 'none', top: '64px' }}>
        <style>{`
          @media (max-width: 1199px) {
            .mobile-header-spacing { top: 64px !important; }
          }
          @media (min-width: 1200px) {
            .mobile-header-spacing { top: 0px !important; }
          }
        `}</style>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Main navigation">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center py-2">
              <Link href="/" className="flex-shrink-0">
                <img 
                  src="/images/shared/logo-main.png" 
                  alt="Compleo Health" 
                  className="h-10 w-auto"
                  style={{ backgroundColor: 'transparent' }}
                />
              </Link>
            </div>

            {/* Mobile Menu Button - Now in header container */}
            <div className="mobile-nav-1200 flex items-center">
              <style>{`
                @media (min-width: 1200px) {
                  .mobile-nav-1200 { display: none !important; }
                }
              `}</style>
              
              <button 
                className="p-3 min-w-[60px] min-h-[60px] bg-transparent border-none outline-none focus:outline-none menutoggle"
                onClick={() => {
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
              >
                <div className={`icon-left ${isMobileMenuOpen ? 'open' : ''}`} />
                <div className={`icon-right ${isMobileMenuOpen ? 'open' : ''}`} />
                <span className="sr-only">
                  {isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                </span>
              </button>
            </div>

            <DesktopNavigation
              location={location}
              navigation={navigation}
              servicePages={servicePages}
              aboutPages={aboutPages}
              isActive={isActive}
              servicesDropdownOpen={servicesDropdownOpen}
              setServicesDropdownOpen={setServicesDropdownOpen}
              aboutDropdownOpen={aboutDropdownOpen}
              setAboutDropdownOpen={setAboutDropdownOpen}
            />
          </div>
        </nav>
      </header>
    </>
  );
}
