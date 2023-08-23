const cacheName = "landsecXR-v1"

const coreFiles = [
  "/",
  "/index.html",
  "/serviceworker.js",
  "/manifest.json",
  "/plugin.css",
  "/plugin.js",
  "/plugin.js.map",
  "/icon.ico",
  "/192.png",
  "/512.png",
  "/videos/test.mp4",
  "/textures/bogota.jpg",
  "/textures/hoboken/hudson.jpg",
  "/textures/hoboken/plaza.jpg",
  "/textures/hoboken/terrace.jpg",
  "/textures/lesbordes/bedroom.jpg",
  "/textures/lesbordes/living.jpg",
  "/textures/lesbordes/master.jpg"
]

self.addEventListener("install", e => {
  e.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(coreFiles)));
})

self.addEventListener("active", e => {
})

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(e.request);
    }),
  );
});

