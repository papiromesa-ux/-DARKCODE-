// <DARKCODE> - Service Worker v8
const CACHE = "darkcode-v8";

// Archivos locales que SÍ se cachean
const LOCALES = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-192-maskable.png",
  "./icon-512-maskable.png",
  "./apple-touch-icon.png"
];

// Dominios que NUNCA se cachean (Firebase, Google, CDN)
const NO_CACHEAR = [
  "googleapis.com",
  "gstatic.com",
  "firebaseapp.com",
  "firebaseio.com",
  "google-analytics.com",
  "googletagmanager.com"
];

// Instalar: activar de inmediato
self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(LOCALES).catch(() => {}))
  );
});

// Activar: borrar cachés viejos
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((claves) => Promise.all(
        claves.filter((c) => c !== CACHE).map((c) => caches.delete(c))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = req.url;

  // 1. Nunca cachear Firebase, Google, etc.
  if (NO_CACHEAR.some((d) => url.includes(d))) {
    return; // deja que el navegador lo maneje directo
  }

  // 2. Navegación: red primero, caché si falla
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copia = res.clone();
          caches.open(CACHE).then((c) => c.put("./index.html", copia));
          return res;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // 3. Otros archivos locales: caché primero, red si no está
  e.respondWith(
    caches.match(req).then((res) => res || fetch(req).then((r) => {
      const copia = r.clone();
      caches.open(CACHE).then((c) => c.put(req, copia)).catch(() => {});
      return r;
    }))
  );
});
