/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  "push7-worker.js",
  "precache-manifest.fd1b1765381e5336a0513bc83970b524.js"
);

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute("/images/stage/", new workbox.strategies.NetworkFirst({ "cacheName":"my-api-cache","networkTimeoutSeconds":10,"fetchOptions":{"mode":"no-cors"},"matchOptions":{"ignoreSearch":true}, plugins: [new workbox.expiration.Plugin({ maxEntries: 64, maxAgeSeconds: 60, purgeOnQuotaError: false }), new workbox.backgroundSync.Plugin("my-queue-name", { maxRetentionTime: 3600 }), new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ], headers: { 'x-test': 'true' } }), new workbox.broadcastUpdate.Plugin({ channelName: 'my-update-channel' })] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/app.splatoon2.nintendo.net\//, new workbox.strategies.StaleWhileRevalidate({ plugins: [new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] })] }), 'GET');
