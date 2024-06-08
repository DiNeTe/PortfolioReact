self.addEventListener('install', (event) => {
    console.log('Service worker installed');
    event.waitUntil(
      caches.open('static-v1').then((cache) => {
        return cache.addAll([
          './',
          './index.html',
          './manifest.json',
          './public/pp/avatar192.png',
          './public/pp/avatar512.png'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  