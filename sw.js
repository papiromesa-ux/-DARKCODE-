const CACHE = "darkcode-v1";

const ARCHIVOS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.json"
];

self.addEventListener("install", (evento) => {
  evento.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ARCHIVOS))
  );
});

self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    caches.keys().then((claves) =>
      Promise.all(
        claves.filter((c) => c !== CACHE).map((c) => caches.delete(c))
      )
    )
  );
});

self.addEventListener("fetch", (evento) => {
  evento.respondWith(
    caches.match(evento.request).then((respuesta) => {
      return respuesta || fetch(evento.request).catch(() => caches.match("./index.html"));
    })
  );
});