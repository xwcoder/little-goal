importScripts('assets.js');
const CACHE_VERSION = 2;
const CACHE_NAME = `little-goal-offline-v${CACHE_VERSION}`;
const ASSETS_TO_CACHE = [
    ...self.assets,
    './',
    './index.html',
    './manifest.json',
    './imgs/favicon.png',
    './imgs/icon-114.png',
    './imgs/icon-192.png'
];
addEventListener('install', (e) => {
    async function cacheAll() {
        const cache = await caches.open(CACHE_NAME);
        return cache.addAll(ASSETS_TO_CACHE);
    }
    e.waitUntil(cacheAll());
});
addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request)
        .then((response) => {
        return response || fetch(event.request);
    }));
});
addEventListener('activate', (event) => {
    async function clear() {
        const keys = await caches.keys();
        const deleteKeys = keys.filter((key) => key !== CACHE_NAME);
        return Promise.all(deleteKeys.map((key) => caches.delete(key)));
    }
    event.waitUntil(clear());
});
