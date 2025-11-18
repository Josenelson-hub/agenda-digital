const CACHE_NAME = 'agenda-digital-ccb-v1';

const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './img/ccb.png',
  './styles.css',
  './app.js'
];

self.addEventListener('install', (event) => {
  console.log('Service Worker instalado');

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        urlsToCache.map(url =>
          fetch(url)
            .then(response => {
              if (!response.ok) throw new Error('Erro ao buscar: ' + url);
              return cache.put(url, response);
            })
            .catch(err => {
              console.warn('Falha ao cachear:', url, err);
            })
        )
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker ativado');

  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(names => {
      return Promise.all(
        names.map(name => {
          if (!cacheWhitelist.includes(name)) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});
