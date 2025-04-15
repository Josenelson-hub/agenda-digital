self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('cache-v1').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/styles.css',
          '/script.js',
        ]);
      })
    );
  });