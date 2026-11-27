/* Page de reconnexion. Seuls cette page, la feuille de style et les polices sont gardées
   en réserve : le portfolio vient toujours du réseau, donc jamais de version périmée.
   Changer le nom de CACHE après une modification de hors-ligne.html. */
const CACHE = "reconnexion-v1";
const PAGE = "/hors-ligne.html";
const FILES = [PAGE, "/style.css",
  "/fonts/ibm-plex-sans-condensed-latin-700-normal.woff2",
  "/fonts/ibm-plex-sans-latin-400-normal.woff2",
  "/fonts/ibm-plex-sans-latin-600-normal.woff2"];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE)
    .then(cache => cache.addAll(FILES.map(file => new Request(file, { cache: "reload" }))))
    .then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys()
    .then(names => Promise.all(names.filter(name => name !== CACHE).map(name => caches.delete(name))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(fetch(request).catch(() => caches.match(PAGE)));
  } else if (FILES.includes(url.pathname) && !url.search) {
    event.respondWith(fetch(request).then(response => {
      if (response.ok) {
        const copy = response.clone();
        event.waitUntil(caches.open(CACHE).then(cache => cache.put(url.pathname, copy)));
      }
      return response;
    }).catch(() => caches.match(url.pathname)));
  }
});
