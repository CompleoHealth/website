import { useEffect } from 'react';

export const useMobileHeaderPositioning = () => {
  useEffect(() => {
    const isMobile = window.innerWidth < 1200;
    if (isMobile) {
      const header = document.querySelector('header[role="banner"]') as HTMLElement;
      const enquireButton = document.querySelector('.mobile-nav-1200') as HTMLElement;
      const scrollProgress = document.querySelector('.fixed.top-0.left-0.w-full.h-1') as HTMLElement;
      
      if (header) {
        // Force header positioning on mobile - keep at 64px below enquire button
        header.style.position = 'fixed !important';
        header.style.top = '64px !important';
        header.style.left = '0';
        header.style.right = '0';
        header.style.zIndex = '50';
        header.style.transform = 'none !important';
        header.style.webkitTransform = 'none !important';
      }
      
      if (enquireButton) {
        // Force enquire button at very top
        enquireButton.style.position = 'fixed !important';
        enquireButton.style.top = '0px !important';
        enquireButton.style.left = '0';
        enquireButton.style.right = '0';
        enquireButton.style.zIndex = '60';
      }
      
      if (scrollProgress) {
        // Force scroll progress above everything
        scrollProgress.style.position = 'fixed !important';
        scrollProgress.style.top = '0px !important';
        scrollProgress.style.zIndex = '9999';
      }
      
      // Prevent any scroll-based hiding
      const preventHiding = () => {
        if (header) {
          header.style.transform = 'none !important';
          header.style.webkitTransform = 'none !important';
          header.style.position = 'fixed !important';
          header.style.top = '64px !important';
        }
        if (enquireButton) {
          enquireButton.style.position = 'fixed !important';
          enquireButton.style.top = '0px !important';
        }
        if (scrollProgress) {
          scrollProgress.style.position = 'fixed !important';
          scrollProgress.style.top = '0px !important';
        }
      };
      
      window.addEventListener('scroll', preventHiding, { passive: true });
      window.addEventListener('resize', preventHiding, { passive: true });
      
      // Initial call to set positions
      preventHiding();
      
      return () => {
        window.removeEventListener('scroll', preventHiding);
        window.removeEventListener('resize', preventHiding);
      };
    }
  }, []);
};