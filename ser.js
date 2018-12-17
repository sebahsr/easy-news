const staticassets=[
    './',
    './app.js',
    './style.css',
    './fallback.json',
    './images/fetch-dog.jpg'
    ]
self.addEventListener('install',async e=>{
   const cache= await caches.open('new-static')
      return cache.addAll(staticassets)
});
self.addEventListener('fetch',e=>{
    const req=e.request;
    const url = new URL(req.url)
    if(url.origin===location.origin){
 
    e.respondWith(cachefirst(req));
    }
    else{
        
     e.respondWith(networkfirst(req))
}
}
    )
async function cachefirst(req) {
const catchedresponse= await caches.match(req)
 return catchedresponse||fetch(req)
} 
async function networkfirst(req){
     const dynamicCache = await caches.open('news-dynamic');
  try {
    const networkResponse = await fetch(req);
    dynamicCache.put(req, networkResponse.clone());
    return networkResponse;
  } catch (err) {
    const cachedResponse = await dynamicCache.match(req);
    return cachedResponse || await caches.match('./fallback.json');
  }
  } 
