import { registerRoute } from "workbox-routing";
import { NetworkFirst, CacheFirst } from "workbox-strategies";
import { skipWaiting, clientsClaim } from "workbox-core";
// Cache HTML and static assets
registerRoute(({ request }) => (request === null || request === void 0 ? void 0 : request.destination) === "document", new NetworkFirst());
registerRoute(({ request }) => (request === null || request === void 0 ? void 0 : request.destination) === "script" ||
    (request === null || request === void 0 ? void 0 : request.destination) === "style" ||
    (request === null || request === void 0 ? void 0 : request.destination) === "image", new CacheFirst());
// Ensure the service worker takes control immediately
skipWaiting();
clientsClaim();
