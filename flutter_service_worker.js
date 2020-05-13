'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "ad901265f717ee771bf772ab75c6ab7e",
"assets/assets/animation.flr": "73d1972d84c9c084dfb284e9772e4632",
"assets/assets/animation_check.flr": "8445df54a05cdd17b75b591dd9b248c4",
"assets/assets/fonts/DimaWeb.ttf": "1fa34cba4aafe5733a3133a6a219850b",
"assets/assets/fonts/Shabnam.ttf": "7a43025a9e698087ba086fb63704b554",
"assets/assets/fonts/Vazir-Bold.ttf": "5a8c08c036a8ecb545bb92af7ab9e8c6",
"assets/assets/fonts/Vazir-Light.ttf": "89e4db17e83bbdd8ab6b90405a1c355d",
"assets/assets/fonts/Vazir-Medium.ttf": "9d89ee254d20815d43e48f2cc9a994dd",
"assets/assets/fonts/Vazir-Thin.ttf": "9f1f73d2eaa762af834bfc9de7b20b89",
"assets/assets/fonts/Vazir.ttf": "b1242234277d81c002f5be489b76920d",
"assets/assets/images/access_denied.png": "21750921deab67b0fdfe55dec875d56f",
"assets/assets/images/bg_pattern.png": "c47245af73ddb0478c82f08305d5e2d2",
"assets/assets/images/book_loading_gif.gif": "cc8db9a5f70ed861067fe343383100da",
"assets/assets/images/boy_avatar.png": "7a9c2438b118de88ad973e3581cf6618",
"assets/assets/images/empty.png": "f5cbf04e7770ea9b14067d78b713a278",
"assets/assets/images/intro-class.png": "94cb593ecdce9f64d99bc7acd9ab8a4b",
"assets/assets/images/intro-homework.png": "c1de432e83f2a98716c914dfa748d9c0",
"assets/assets/images/intro-student.png": "242ae9d49eb9e0f300e4a9e15218a965",
"assets/assets/images/logout.png": "e580d83770dd3dcb6f7c60188e3b9e47",
"assets/assets/images/madresa_logo.png": "97d43d3a1c1534c9ce250b1f57943d30",
"assets/assets/images/madresa_logo_text.png": "43a04e5ede8783033db568bb3edd92d9",
"assets/assets/images/madresa_logo_tiny_miny.png": "79a66e2be042c80e365553e70dffe9c9",
"assets/assets/images/madresa_text.png": "0b96b7ab5d697efbed2dba8d895cbb54",
"assets/assets/images/my-classes.png": "675d62147c5f4a3d1e2ed18cc4d9e6b2",
"assets/assets/images/my-homework.png": "964d3445a3ab00eac354671874234b50",
"assets/assets/images/my-student.png": "db32e5267809b5476bee435df8b9cc91",
"assets/assets/images/my-teachers.png": "2cc8f16711d0ed697b3ef8617ffd7af1",
"assets/assets/images/rocket_icon.png": "663f931f2716f15579039838d04a0088",
"assets/assets/images/splash_screen_icon.png": "053cb9aa803a5179ee64cc61686a7731",
"assets/assets/images/staff_splash_icon.png": "f79030cfd51d3c9229cc7aab59c5662b",
"assets/assets/images/teacher_avatar.png": "3a8d8ba686e1e047dc07ad8adc38aa81",
"assets/assets/images/teacher_splash_icon.png": "4a65459dc7167bad3b73bbebc549ab9f",
"assets/assets/images/verification.png": "9580c354b85046246c1d8ffbbf610f31",
"assets/assets/success_animate.flr": "66a3b52b95dce33598688b221277e421",
"assets/assets/success_animate_%25202.flr": "7e2be14fcc4331403cfdbdc21edbb072",
"assets/FontManifest.json": "25973c134c9ec08bee8d208ac93d68bb",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/LICENSE": "1c641d435719a2589846bb7f56c33af7",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/packages/flutter_inappwebview/t_rex_runner/t-rex.css": "5a8d0222407e388155d7d1395a75d5b9",
"assets/packages/flutter_inappwebview/t_rex_runner/t-rex.html": "16911fcc170c8af1c5457940bd0bf055",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "c8c4e4028746050a233e594cc980c61e",
"/": "c8c4e4028746050a233e594cc980c61e",
"main.dart.js": "4e9e20b899e11e3c83b29078da089ea9",
"manifest.json": "bc814b953f6123fc1b799265c9cd40a0"
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
        return fetch(event.request);
      })
  );
});
