// Service Worker for Compleo Health
const CACHE_NAME = 'compleo-health-v1';
const STATIC_ASSETS = [
  '/',
  '/images/logo/compleo-health-logo.png',
  '/images/certifications/iso-9001-dnv.png',
  '/images/certifications/cqc-logo.png',
  '/images/certifications/cyber-essentials-plus.png',
  '/manifest.json'
];

const API_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const STATIC_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - implement caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // API requests - network first with cache fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful responses
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(request);
        })
    );
    return;
  }

  // Static assets - cache first with network fallback
  if (
    url.pathname.startsWith('/images/') ||
    url.pathname.startsWith('/videos/') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.woff2') ||
    url.pathname.endsWith('.woff')
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Check if cache is still fresh
          const cacheDate = new Date(cachedResponse.headers.get('date'));
          const now = new Date();
          if (now - cacheDate < STATIC_CACHE_DURATION) {
            return cachedResponse;
          }
        }

        // Fetch from network and update cache
        return fetch(request).then((response) => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        }).catch(() => {
          // Return cached version if network fails
          return cachedResponse;
        });
      })
    );
    return;
  }

  // HTML pages - network first with cache fallback
  if (request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cachedResponse) => {
            return cachedResponse || caches.match('/');
          });
        })
    );
    return;
  }

  // Default - network only
  event.respondWith(fetch(request));
});

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForms());
  }
});

async function syncContactForms() {
  try {
    // Get pending form submissions from IndexedDB
    const pendingForms = await getPendingFormSubmissions();
    
    for (const form of pendingForms) {
      try {
        const response = await fetch('/api/contacts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form.data)
        });
        
        if (response.ok) {
          await removePendingFormSubmission(form.id);
        }
      } catch (error) {
        console.log('Failed to sync form submission:', error);
      }
    }
  } catch (error) {
    console.log('Background sync failed:', error);
  }
}

// IndexedDB helpers for offline form storage
async function getPendingFormSubmissions() {
  return new Promise((resolve) => {
    const request = indexedDB.open('CompeleoHealthDB', 1);
    
    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(['pendingForms'], 'readonly');
      const store = transaction.objectStore('pendingForms');
      const getAllRequest = store.getAll();
      
      getAllRequest.onsuccess = () => {
        resolve(getAllRequest.result || []);
      };
    };
    
    request.onerror = () => resolve([]);
  });
}

async function removePendingFormSubmission(id) {
  return new Promise((resolve) => {
    const request = indexedDB.open('CompeleoHealthDB', 1);
    
    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(['pendingForms'], 'readwrite');
      const store = transaction.objectStore('pendingForms');
      store.delete(id);
      resolve();
    };
    
    request.onerror = () => resolve();
  });
}