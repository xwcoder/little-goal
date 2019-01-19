importScripts('assets.js');
const CACHE_VERSION = 1;
const CACHE_NAME = `little-goal-offline-v${CACHE_VERSION}`;
const ASSETS_TO_CACHE = [
    ...self.assets,
    './',
    './index.html'
];
addEventListener('install', (e) => {
    async function cacheAll() {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(ASSETS_TO_CACHE);
    }
    e.waitUntil(cacheAll());
});
addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request)
        .then((response) => {
        return response || fetch(event.request);
    }));
});
