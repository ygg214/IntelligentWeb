self.addEventListener('fetch',function (e) {
    console.log('url is',e.request.url)
    e.respondWith(
        caches.match(e.request).then(function (cacheRes) {
            if(cacheRes){
                return cacheRes;
            }
            var request = e.request.clone();

            return fetch(request).then(function (httpRes) {
                if(!httpRes || httpRes.status !== 200){
                    return httpRes;
                }
                var responseClone = httpRes.clone();
                caches.open('offline-cache-v1').then(function (cache) {
                    cache.put(e.request, responseClone);
                });
                return httpRes;
            });
        })
    );
})