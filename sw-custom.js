const CACHE_DATA = "appV1";
const urlsToCache = [
   '/',
   '/index.html',
   '/static/js/main.js',
   '/static/css/main.css',
   '/assets/index-DiwrgTda.css',  
   '/manifest.webmanifest',
   '/registerSW.js',
   '/assets/index-DiwrgTda.js',
   '/pwa-192x192.png',
   '/assets/index-DsjFLGrr.js',
   '/assets/index-C2cmsO4h.js',
   '/vite.svg',

];
this.addEventListener("install", (event) =>{
   event.waitUntil(
       caches.open(CACHE_DATA).then((cache)=>{
           cache.addAll(urlsToCache)
       })
   )
})

this.addEventListener('fetch', (event) =>{
   if(!navigator.onLine){
       event.respondWith(
           caches.match(event.request).then((resp) =>{
               if(resp){
                   return resp
               } 
               let requestUrl = event.request.clone()
               fetch(requestUrl)
              
           })
       )
   }
  
})


if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.ready.then(registration => {
      return registration.sync.register('sync-tasks');
    }).then(() => {
      console.log('Sincronización de fondo registrada');
    }).catch(error => {
      console.log('Error al registrar la sincronización de fondo:', error);
    });
  } else {
    console.log('Sincronización en background no soportada');
  }
  
