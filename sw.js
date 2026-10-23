const CACHE = "darkcode-Release3.5";

const LOCALES = [
  "./", "./index.html", "./ropa.css", "./cerebro.js", "./clases.js",
  "./quiz.js", "./manifest.json", "./pantalla_anti-trampa.html", "./minicode.js",
  "./kiosco.js", "./chibis.js", "./minijuego.js", "./firebase.js", "./deepseek.js", 
  "./descargas.js", "./gráficos.js", "./cosméticos.js", "./créditos.js", "./ablandador.js",
  "./icon-48.png", "./icon-72.png", "./icon-96.png", "./icon-114.png", "./icon-192.png", "./icon-512.png",
  "./c1.png", "./c2.png", "./cpp1.png", "./cpp2.png", "./js1.png", "./js2.png", 
  "./php1.png", "./php2.png", "./python1.png", "./python2.png", "./ruby1.png", "./ruby2.png",
  "./audio1.mp3", "./audio2.mp3", "./audio3.mp3", "./audio4.mp3", "./audio5.mp3",
  "./audio6.mp3", "./audio7.mp3", "./audio8.mp3", "./audio9.mp3", "./audio10.mp3",
  "./audio11.mp3", "./audio12.mp3", "./audio13.mp3", "./audio14.mp3", "./audio15.mp3",
  "./audioquiz1.mp3", "./audioquiz2.mp3", "./audiohtml.mp3", "./audiocss.mp3", "./audiojs.mp3",
  "./audiophp.mp3", "./audioruby.mp3", "./audiopyt.mp3", "./audioc.mp3", "./audiocpp.mp3", 
  "./minicode.vrm"
];

const NO_CACHEAR = [
  "googleapis.com", "gstatic.com", "firebaseapp.com", "firebaseio.com",
  "google-analytics.com", "googletagmanager.com", "firestore.googleapis.com",
  "unpkg.com", "esm.sh", "jsdelivr.net"
];

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then((c) => {
      return c.addAll(LOCALES).catch((err) => console.log("Error guardando caché:", err));
    })
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((claves) =>
      Promise.all(
        claves.filter((c) => c !== CACHE).map((c) => caches.delete(c))
      )
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
