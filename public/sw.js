const CACHE_DATA = "appV1";
const urlsToCache = [
   '/',
   '/index.html',
   '/static/js/main.js',
   '/static/css/main.css',
   '/manifest.webmanifest',
   '/registerSW.js',
   '/pwa-192x192.png',
   '/vite.svg',
   '/assets/index-CPVmn-au.css',
   '/injected.js',
   '/assets/index-hqR0ejj9.js'
   
   
];

self.addEventListener("install", (event) =>{
   event.waitUntil(
       caches.open(CACHE_DATA).then((cache)=>{
           cache.addAll(urlsToCache)
       })
   )
})

self.addEventListener('fetch', (event) =>{
   if(!navigator.onLine){
       event.respondWith(
           caches.match(event.request).then((resp) =>{
               if(resp){
                   return resp
               } 
                 
           })
       )
   }
  
})
self.addEventListener('sync', (event)=> {
    if(event.tag === 'post-data'){
        event.waitUntil(addData())
    }
})

function addData() { 
    const data = JSON.parse(localStorage.getItem("addTodo"))
    fetch('http://localhost:3000/add',{
        method:"POST",
        body: JSON.stringify({
            body:data
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(() => Promise.resolve().catch(() => Promise.reject()));
}
