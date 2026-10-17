// <DARKCODE> - Service Worker v9 (Ignora Firebase)
const CACHE = "darkcode-v9";

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

// No cachear nada de Google o Firebase
const NO_CACHEAR = [
  "googleapis.com", "gstatic.com", "firebaseapp.com", 
  "firebaseio.com", "google-analytics.com", "googletagmanager.com"
];

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(LOCALES).catch(() => {}))
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((claves) => Promise.all(
        claves.filter((c) => c !== CACHE).map((c) => caches.delete(c))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = req.url;

  if (NO_CACHEAR.some((d) => url.includes(d))) return;

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

  e.respondWith(
    caches.match(req).then((res) => res || fetch(req).then((r) => {
      const copia = r.clone();
      caches.open(CACHE).then((c) => c.put(req, copia)).catch(() => {});
      return r;
    }))
  );
});
