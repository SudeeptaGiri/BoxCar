import { registerRoute } from "workbox-routing";
import { NetworkFirst, CacheFirst } from "workbox-strategies";
import { skipWaiting, clientsClaim } from "workbox-core";

// Cache HTML and static assets
registerRoute(
    ({ request }) => request?.destination === "document",
    new NetworkFirst()
);

registerRoute(
    ({ request }) =>
        request?.destination === "script" ||
        request?.destination === "style" ||
        request?.destination === "image",
    new CacheFirst()
);

// Ensure the service worker takes control immediately
skipWaiting();
clientsClaim();
