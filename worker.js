var caches = this.caches;

this.addEventListener('install', function (event) {
    var orgCache = new Cache();
    event.waitUntil(
        caches.set('org-1', orgCache),
        orgCache.add(
            'https://api.github.com/orgs/twitter/members?access_token=c84583ea6d470a256519c1901835f43789bb9ce8'
        )
    );
});

this.addEventListener('fetch', function (event) {
    event.respondWith(
        caches
            .match('org-1', event.request)
            .catch(fetch)
    );
});
