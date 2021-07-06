const CACHE_NAME = 'version-1';
const urlsToCache = [ 'index.html', 'offline.html' ];

const self = this;

// Install SW
self.addEventListener('install', (event) => {
  // Open version-1 cache, cache index.html and offline.html
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');

        return cache.addAll(urlsToCache);
      })
  )
});

// Listen for requests
self.addEventListener('fetch', (event) => {
  // Respond to fetch requests with requested resource, if that fails, return offline.html
  event.respondWith(
    caches.match(event.request)
      .then(() => {
        return fetch(event.request)
          .catch(() => caches.match('offline.html'));
      })
  )
});

// Activate SW
self.addEventListener('activate', (event) => {
  // Delete all caches not matching a name in our whitelist
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames.forEach((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      ))
  )
});