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
  // console.log("Install Event >>> ", e)
  e.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(coreFiles)));
})

self.addEventListener("active", e => {
  // console.log("Active Event >>> ", e)
  // if ("xr" in navigator) {
  //   const XRAPI = navigator.xr
  //   const sessionInit = {
  //     optionalFeatures: [
  //       "local-floor",
  //       "bounded-floor",
  //       "hand-tracking",
  //       "layers"
  //     ]
  //   }
  //   window.session = XRAPI.requestSession("immersive-ar", sessionInit)
  //   console.log(window.session)
  // }
})

self.addEventListener('fetch', (e) => {
  // console.log('Fetch Event', e);
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        console.log("got it from cache")
        return cachedResponse;
      }
      return fetch(e.request);
    }),
  );
});


// self.addEventListener('fetch', (e) => {
//   const req = e.request;
//   const url = new URL(req.url);

//   if(url.origin === location.origin){
//       e.respondWith(cacheFirst(req));
//   }else{
//       e.respondWith(networkFirst(req));
//   }
//   return;
// });

// self.addEventListener("install", (e) => {
//   console.log("[Service Worker] Install", e);
//   e.waitUntil(
//     (async () => {
//       const cache = await caches.open(cacheName);
//       console.log("[Service Worker] Caching all: app shell and content");
//       await cache.addAll(coreFiles);
//     })(),
//   );
// });

// async function cacheFirst(req){
//   const cachedResponse = await caches.match(req);
//   return cachedResponse || fetch(req);
// }

// async function networkFirst(req){
//   const cache = await caches.open('dynamic-content');
//   try{
//       const res = await fetch(req);
//       cache.put(req, res.clone());
//       return res;
//   }catch(err){
//       const cachedResponse = await cache.match(req);
//       return cachedResponse || caches.match('./fallback.json');
//   }
// }