'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "/assets\AssetManifest.json": "e33cfed216a6c4dc3a766498a555c16f",
"/assets\assets\fonts\DimaWeb.ttf": "1fa34cba4aafe5733a3133a6a219850b",
"/assets\assets\fonts\Shabnam-Bold.ttf": "6434a8c072c7c2bbc349ccfff4f5c496",
"/assets\assets\fonts\Shabnam-Light.ttf": "f38fd5507e7435535401ae038755e7a0",
"/assets\assets\fonts\Shabnam-Medium.ttf": "c4edea41d105d1060a4d9b7bee7798f0",
"/assets\assets\fonts\Shabnam-Thin.ttf": "60377b61dec191c3bb311d8390207890",
"/assets\assets\fonts\Shabnam.ttf": "7a43025a9e698087ba086fb63704b554",
"/assets\assets\images\advertisement.png": "1542ac86c4c092f214ec81f21663fe6f",
"/assets\assets\images\chat.png": "d8cf95dc7db7ae5ccadfa45b66f94e6f",
"/assets\assets\images\cut_map.jpg": "6cd0464b8a1d7b4a29d541303f9dc612",
"/assets\assets\images\empty_message.png": "b2744729fea0dcc83374c85f41c4de15",
"/assets\assets\images\empty_view.png": "ea6f5b017524c7113f547a8f569c21da",
"/assets\assets\images\intro1.png": "ae0fef824dcc6ff7d33ee15e8144fd70",
"/assets\assets\images\intro2.png": "677fd5939aa2a4fa02b0dc3ff6ac2a07",
"/assets\assets\images\intro3.png": "bce851fb3c1b0bfbacc097ad06650cf5",
"/assets\assets\images\main.png": "51ea532c0dac1c3df588198aa0e7785a",
"/assets\assets\images\map.jpg": "a4c727051874e22fab51d0fabbc36b84",
"/assets\assets\images\microscope.png": "6a18f6c1bcaa4898daff922dc5cdbef6",
"/assets\assets\images\nikan_logo.png": "6cee8f2db4b9418143a0ea35a62e22be",
"/assets\assets\images\nurse.png": "938eb73360c5f3ebd16befe161ef335a",
"/assets\assets\images\pill.png": "dd051015055e9c91124027a60aedd9b9",
"/assets\assets\images\profile.png": "0c7814cd8e254f214833efc9d49f9cbd",
"/assets\assets\images\verification.png": "9580c354b85046246c1d8ffbbf610f31",
"/assets\FontManifest.json": "0bd90f096b16c1cb8234727814528ec5",
"/assets\fonts\MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"/assets\LICENSE": "0ad6c02cb1ff847867b49c7edb41ecff",
"/assets\packages\cupertino_icons\assets\CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"/assets\packages\map_launcher\assets\icons\amap.png": "eb0053889bd5a874cf3fa38d8ada078d",
"/assets\packages\map_launcher\assets\icons\apple.png": "b6abfa26b3b7c7474d91ecf656b7a55e",
"/assets\packages\map_launcher\assets\icons\baidu.png": "20fca1c586f8c05c06b54aa123b08592",
"/assets\packages\map_launcher\assets\icons\google.png": "e61e895ab828e6d34dba1bd969d1706a",
"/assets\packages\map_launcher\assets\icons\waze.png": "f128032892d6e2c606a24c0d6a297f2f",
"/assets\packages\map_launcher\assets\icons\yandexMaps.png": "6b005a2abb5debbe236e5a0caeba6625",
"/assets\packages\map_launcher\assets\icons\yandexNavi.png": "734c39c9c55e62ed8cd8107c56a63f3e",
"/icons\Icon-192.png": "fef16b00ba867b47b86c26ebb8ccb807",
"/icons\Icon-512.png": "fef16b00ba867b47b86c26ebb8ccb807",
"/index.html": "16e85c1a0dfa0a2ff1698199a8eeb8c7",
"/main.dart.js": "09a4be577ab7a79e9b9283b844f80590",
"/manifest.json": "f0f83bae2414f6cb34d9b7af0e831e6a"
};

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      return cache.addAll(Object.keys(RESOURCES));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request, {
          credentials: 'include'
        });
      })
  );
});
