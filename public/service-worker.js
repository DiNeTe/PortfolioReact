self.addEventListener('install', (event) => {
  console.log('Service worker installed');
  event.waitUntil(
    caches.open('static-v1').then((cache) => {
      return cache.addAll([
        './',
        './index.html',
        './robots.txt',
        './favicon.ico',
        './android-chrome-192x192.png',
        './android-chrome-512x512.png',
        './apple-touch-icon.png',
        './site.webmanifest',
        './public/pp/avatar192.png',
        './public/pp/avatar512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => caches.match('./index.html'));
    })
  );
});