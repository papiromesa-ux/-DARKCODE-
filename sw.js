const CACHE = "darkcode-R4"; 
const LOCALES = [
  "./", 
  "./index.html", 
  "./styles.css", 
  "./app.js", 
  "./clases.js", 
  "./quiz.js", 
  "./manifest.json",
  "./icon-48.png",
  "./icon-72.png",
  "./icon-96.png",
  "./icon-114.png",
  "./icon-192.png", 
  "./icon-512.png"
];

const NO_CACHEAR = [
  "googleapis.com", "gstatic.com", "firebaseapp.com", "firebaseio.com", 
  "google-analytics.com", "googletagmanager.com", "firestore.googleapis.com"
];

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(LOCALES).catch(() => {}))
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((claves) => 
      Promise.all(claves.filter((c) => c !== CACHE).map((c) => caches.delete(c)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = req.url;

  if (NO_CACHEAR.some((d) => url.includes(d))) return;

  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then((res) => {
        const copia = res.clone();
        caches.open(CACHE).then((c) => c.put("./index.html", copia));
        return res;
      }).catch(() => caches.match("./index.html"))
    );
    return;
  }

  e.respondWith(
    caches.match(req).then((res) => {
      return res || fetch(req).then((r) => {
        const copia = r.clone();
        caches.open(CACHE).then((c) => c.put(req, copia)).catch(() => {});
        return r;
      });
    })
  );
});
