const CACHE = "darkcode-R3"; // Tu nombre exacto solicitado

const LOCALES = [
  "./", 
  "./index.html", 
  "./styles.css", 
  "./app.js", 
  "./clases.js", 
  "./quiz.js", 
  "./manifest.json",
  "./icon-192.png", 
  "./icon-512.png", 
  "./icon-192-maskable.png", 
  "./icon-512-maskable.png", 
  "./apple-touch-icon.png"
];

// Archivos de Google/Firebase que NUNCA deben guardarse en caché
const NO_CACHEAR = [
  "googleapis.com", 
  "gstatic.com", 
  "firebaseapp.com", 
  "firebaseio.com", 
  "google-analytics.com", 
  "googletagmanager.com", 
  "firestore.googleapis.com"
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

  // 1. Ignorar Firebase y Google (para que el login y XP no fallen)
  if (NO_CACHEAR.some((d) => url.includes(d))) return;

  // 2. Si el usuario navega a la app: Red primero, Caché si falla
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

  // 3. Para el resto de archivos: Caché primero, Red si no está
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
