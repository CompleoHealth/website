// Performance monitoring and optimization utilities

import { PerformanceMetrics } from '@/types/components';

// Web Vitals monitoring
export function initPerformanceMonitoring(): void {
  // Only run in production
  if (import.meta.env.DEV) {
    // Development monitoring with console logs
    monitorWebVitals();
  }
}

function monitorWebVitals(): void {
  // First Contentful Paint (FCP)
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        if (import.meta.env.DEV) {

        }
      }
    }
  });

  observer.observe({ entryTypes: ['paint'] });

  // Largest Contentful Paint (LCP)
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    
    if (import.meta.env.DEV) {

    }
  });

  lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

  // Monitor page visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navEntry && import.meta.env.DEV) {

      }
    }
  });
}

// Critical resource preloading
export function preloadCriticalResources(): void {
  const criticalResources = [
    // Core fonts
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    // Core images that should load fast
    '/images/shared/logo-full.svg',
    '/images/shared/logo-white.svg'
  ];

  criticalResources.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = url.includes('.css') ? 'style' : 'image';
    document.head.appendChild(link);
  });
}

// Image lazy loading with intersection observer
export function createImageObserver(): IntersectionObserver {
  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          img.classList.add('loaded');
        }
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });
}

// Resource hint management
export function addResourceHints(): void {
  const hints = [
    { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }
  ];

  hints.forEach(hint => {
    const link = document.createElement('link');
    link.rel = hint.rel;
    link.href = hint.href;
    if (hint.crossOrigin) {
      link.crossOrigin = hint.crossOrigin;
    }
    document.head.appendChild(link);
  });
}

// Detect slow resources
export function detectSlowResources(): void {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach(entry => {
      if (entry.duration > 2000 && import.meta.env.DEV) {

      }
    });
  });

  observer.observe({ entryTypes: ['resource'] });
}

// Bundle size analyzer for development
export function analyzeBundleSize(): void {
  if (import.meta.env.DEV) {
    const entries = performance.getEntriesByType('navigation');
    const navEntry = entries[0] as PerformanceNavigationTiming;
    
    if (navEntry) {
      const metrics = {
        domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
        loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
        totalTime: navEntry.loadEventEnd - navEntry.navigationStart
      };
      

    }
  }
}

// Initialize all performance optimizations
export function initializePerformanceOptimizations(): void {
  // Run immediately
  preloadCriticalResources();
  addResourceHints();
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initPerformanceMonitoring();
      detectSlowResources();
    });
  } else {
    initPerformanceMonitoring();
    detectSlowResources();
  }
}