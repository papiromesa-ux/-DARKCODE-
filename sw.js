const CACHE = "darkcode-Release3.1"; 

const LOCALES = [
  "./", 
  "./index.html", 
  "./ropa.css", 
  "./cerebro.js", 
  "./clases.js", 
  "./quiz.js", 
  "./manifest.json",
  "./pantalla_anti-trampa.html",
  "./icon-48.png", "./icon-72.png", "./icon-96.png", "./icon-114.png", "./icon-192.png", "./icon-512.png",
  "./audio1.mp3", "./audio2.mp3", "./audio3.mp3", "./audio4.mp3", "./audio5.mp3", 
  "./audio6.mp3", "./audio7.mp3", "./audio8.mp3", "./audio9.mp3", "./audio10.mp3", 
  "./audio11.mp3", "./audio12.mp3", "./audio13.mp3", "./audio14.mp3", "./audio15.mp3",
  "./audioquiz1.mp3", "./audioquiz2.mp3" "./audiohtml.mp3", "./audiocss.mp3", "./audiojs.mp3", 
  "./audiophp.mp3","./audioruby.mp3","./audiopy.mp3","./audioc.mp3","./audiocpp.mp3",
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
