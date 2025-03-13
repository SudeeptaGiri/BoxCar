importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js");


    // Cache HTML and static assets
    workbox.routing.registerRoute(
        ({ request }) => request.destination === "document",
        new workbox.strategies.NetworkFirst()
    );

    workbox.routing.registerRoute(
        ({ request }) => request.destination === "script" ||
                         request.destination === "style" ||
                         request.destination === "image",
        new workbox.strategies.CacheFirst()
    );

    workbox.core.skipWaiting();
    workbox.core.clientsClaim();
