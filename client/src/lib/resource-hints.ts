export interface ResourceHint {
  rel: 'preload' | 'prefetch' | 'dns-prefetch' | 'preconnect';
  href: string;
  as?: string;
  type?: string;
  crossorigin?: string;
}

export const CRITICAL_RESOURCES: ResourceHint[] = [
  // Critical fonts - removed preload to avoid MIME issues
  // Fonts are loaded via link tag in HTML head instead
  
  // DNS prefetch for external resources
  {
    rel: 'dns-prefetch',
    href: 'https://fonts.googleapis.com'
  },
  {
    rel: 'dns-prefetch',
    href: 'https://fonts.gstatic.com'
  },
  {
    rel: 'dns-prefetch',
    href: 'https://unpkg.com'
  },
  {
    rel: 'dns-prefetch',
    href: 'https://compleohealth.com'
  },
  
  // Preconnect to critical third-party origins
  {
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com',
    crossorigin: 'anonymous'
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossorigin: 'anonymous'
  }
];

export const PREFETCH_RESOURCES: ResourceHint[] = [
  // Removed problematic prefetch resources to avoid MIME type errors
  // Pages will load on-demand for better performance
];

export function addResourceHints(): void {
  if (typeof document === 'undefined') return;
  
  const head = document.head;
  
  // Add critical resource hints
  CRITICAL_RESOURCES.forEach(resource => {
    const link = document.createElement('link');
    link.rel = resource.rel;
    link.href = resource.href;
    
    if (resource.as) link.setAttribute('as', resource.as);
    if (resource.type) link.setAttribute('type', resource.type);
    if (resource.crossorigin) link.setAttribute('crossorigin', resource.crossorigin);
    
    head.appendChild(link);
  });
  
  // Add prefetch hints after a delay to avoid blocking critical resources
  setTimeout(() => {
    PREFETCH_RESOURCES.forEach(resource => {
      const link = document.createElement('link');
      link.rel = resource.rel;
      link.href = resource.href;
      head.appendChild(link);
    });
  }, 2000);
}

export function preloadCriticalImages(): void {
  if (typeof document === 'undefined') return;
  
  const criticalImages = [
    '/images/home/hero-background.jpg',
    '/images/certifications/iso-9001-dnv.png',
    '/images/certifications/cqc-logo.png',
    '/images/certifications/cyber-essentials-plus.png'
  ];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = src;
    link.as = 'image';
    document.head.appendChild(link);
  });
}

export function optimizeResourceLoading(): void {
  // Add resource hints
  addResourceHints();
  
  // Preload critical images
  preloadCriticalImages();
  
  // Add service worker for caching
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          if (import.meta.env.DEV) {

          }
        })
        .catch(registrationError => {
          if (import.meta.env.DEV) {

          }
        });
    });
  }
}