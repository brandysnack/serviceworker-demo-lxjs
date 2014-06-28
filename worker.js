importScripts('get.js');

var caches = this.caches;

this.addEventListener('install', function (event) {
    var orgCache = new Cache();
    event.waitUntil(
        caches.set('org-1', orgCache),
        orgCache.add(
            'https://api.github.com/orgs/twitter/members?access_token=c84583ea6d470a256519c1901835f43789bb9ce8'
        ).then(function (res) {
            console.log('cache populated!', res);
            return res;
        })
    );
});

this.addEventListener('fetch', function (event) {
    event.respondWith(
        caches
            .match('org-1', event.request)
            .then(function (res) {
                console.log('SW!', res);
                return res;
            })
            .catch(event.default.bind(event))
    );
});
