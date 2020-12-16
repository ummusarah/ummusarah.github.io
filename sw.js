let ver = 1;
//komen 2
self.addEventListener("install", (event) => {
    console.log('berhasil', event);
    //caching
    event.waitUntil(
        caches.open('aplikasiku' + ver)
            .then((cache) => {
                console.log('mulai caching');
                return cache.addAll([
                    '/index.html',
                    '/sw.js'
                ]);
            })
            .then(() => {
                self.skipWaiting();
            }));
});

//listen fetch
self.addEventListener("fetch", (event) => {
    console.log('fetching', event);
    event.respondWith(
        caches.match(event.request).then((resp) => { //pencocokan dengan cache
            if (resp) { //jika ada maka
                return resp; //ambil resp
            } else {
                return fetch(event.request); //ambil dari internet
            }
        }));
});