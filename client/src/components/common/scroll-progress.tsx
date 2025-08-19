import { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    // Initial call
    updateScrollProgress();

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-[9999] shadow-sm" style={{ position: 'fixed !important', top: '0px !important', zIndex: '9999 !important' }}>
      <div 
        className="h-full transition-all duration-200 ease-out shadow-sm"
        style={{ 
          width: `${scrollProgress}%`,
          background: 'linear-gradient(to right, rgb(0, 169, 144), rgb(247, 249, 228), rgb(15, 46, 46))'
        }}
      />
    </div>
  );
}