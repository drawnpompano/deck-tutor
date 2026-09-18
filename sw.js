/* Deck Tutor service worker.
   Keeps the app shell available offline. Card lookups still need the
   internet, because they come live from Scryfall. */
const CACHE = 'deck-tutor-v4';
const SHELL = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  // Always go to the network for card data and images.
  if (url.hostname.endsWith('scryfall.com') || url.hostname.endsWith('scryfall.io')) return;
  const isPage = e.request.mode === 'navigate' || /\.(html|js|json)$/.test(url.pathname) || url.pathname.endsWith('/');
  if (isPage){
    // Pages and code: take the newest version when online, so updates actually
    // arrive; fall back to the cached copy when there is no signal.
    e.respondWith(
      fetch(e.request).then(res => {
        if (res.ok && url.origin === self.location.origin){
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      }).catch(() => caches.match(e.request).then(hit => hit || caches.match('./index.html')))
    );
    return;
  }
  // Icons and the like: cache first, they don't change.
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      if (res.ok && url.origin === self.location.origin){
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
      }
      return res;
    }))
  );
});
