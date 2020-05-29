var dataCacheName = 'textData';
var cacheName = 'offline-cache-v1';
var filesToCache = [
    '/',
    '/javascripts/index.js',
    '/javascripts/post.js',
    '/javascripts/wall.js',
    '/javascripts/mainpage.js',
    '/javascripts/database.js',
    '/stylesheets/style.css',
    '/manifast.json'
];


/**
 * installation event: it adds all the files to be cached
 */
self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});


/**
 * activation of service worker: it removes all cashed files if necessary
 */
self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName && key !== dataCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    /*
     * Fixes a corner case in which the app wasn't returning the latest data.
     * You can reproduce the corner case by commenting out the line below and
     * then doing the following steps: 1) load app for first time so that the
     * initial New York City data is shown 2) press the refresh button on the
     * app 3) go offline 4) reload the app. You expect to see the newer NYC
     * data, but you actually see the initial data. This happens because the
     * service worker is not yet activated. The code below essentially lets
     * you activate the service worker faster.
     */
    return self.clients.claim();
});


/**
 * this is called every time a file is fetched. This is a middleware, i.e. this method is
 * called every time a page is fetched by the browser
 * there are two main branches:
 * /weather_data posts cities names to get data about the weather from the server. if offline, the fetch will fail and the
 *      control will be sent back to Ajax with an error - you will have to recover the situation
 *      from there (e.g. showing the cached data)
 * all the other pages are searched for in the cache. If not found, they are returned
 */
self.addEventListener('fetch', function (e) {
    console.log('[Service Worker] Fetch', e.request.url);
    var dataUrl = '/post';
    var dataUrl1 = '/wall1';
    var dataUrl2 = '/mainpage';
    //if the request is '/weather_data', post to the server - do nit try to cache it
    if (e.request.cache === 'only-if-cached' && e.request.mode !== 'same-origin') {
        return;
    }
    if (e.request.url.indexOf(dataUrl) || e.request.url.indexOf(dataUrl1) || e.request.url.indexOf(dataUrl2) > -1) {
        return fetch(e.request).then(function (response) {
            return response;
        })
    } else {

        e.respondWith(
            caches.match(e.request).then(function (response) {
                if(response){
                    return response;
                }
                var request = e.request.clone();
                return fetch(request).then(function(httpRes){
                    if(!httpRes || httpRes.status !== 200){
                        return httpRes;
                    }
                    var responseClone = httpRes.clone();
                    caches.open('offline-cache-v1').then(function(cache){
                        cache.put(event.request, responseClone);
                    });
                    return httpRes;
                });
            })
        );
    }
});
