const CACHE_NAME = 'agenda-digital-ccb-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/img/ccb.png', // Certifique-se de que os ícones estejam na pasta correta
  '/styles.css', // Caso você tenha um arquivo CSS
  '/app.js' // Caso você tenha um arquivo JS
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker instalado');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Arquivos armazenados em cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker ativado');
  // Limpar cache antigo, se necessário
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptando requisições para retornar do cache ou da rede
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse; // Retorna o cache se houver
        }
        return fetch(event.request); // Caso contrário, faz a requisição de rede
      })
  );
});
