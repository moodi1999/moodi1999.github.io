'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "347f7cef7144517cc0246e2017de831d",
"assets/assets/agents.png": "daec01aefb4910e79abfd12292d397a4",
"assets/assets/bg_tile.png": "27546ec6a3ce8858aa52f77f8b3ae781",
"assets/assets/book-bg.png": "500324dd5116221a9a918a087ab749fd",
"assets/assets/buffer.png": "d11968d426392b0899bf20426c522bf5",
"assets/assets/celebrate_icon.png": "8ed8fd1072054b73eee03c720de5f672",
"assets/assets/comment.png": "a8fa313e785e6e13a0814ab3b001fb20",
"assets/assets/empty_image.png": "38313ef647446031c875191f75cdeb74",
"assets/assets/flat.png": "89ee0efe7cc36526451f33c875d17c20",
"assets/assets/gift.png": "457ba28966fd25cd4fae9983c7f39e60",
"assets/assets/ic_launcher.png": "84f9e48ffd4499bf2b2bc5959ac44493",
"assets/assets/intro_1.png": "548cc43a3a7de69edf068abc83e3676c",
"assets/assets/intro_2.png": "3230a89def5933b5a805075de28dcc06",
"assets/assets/intro_3.png": "efe049848094f1917e12374bd89bf47b",
"assets/assets/intro_bg.png": "942198b7b73142505f432530f7b9e531",
"assets/assets/intro_particles.png": "b6780217af556ad980e260a7feea37eb",
"assets/assets/logo.png": "71752ee78cf8cd797d7f2d27c01ebe13",
"assets/assets/man.png": "f840569c6e9baab7689542cf4055ccee",
"assets/assets/news.png": "57e4c53e35be03a57a9edc9b5528c3be",
"assets/assets/product.png": "36ddfb7c3a1423f7dd2b80a04dda53c8",
"assets/assets/products.png": "888960a4f2fa4b6dfb08c511b4aba64a",
"assets/assets/providers.png": "979c15ebdafe0876e8703b754a75882f",
"assets/assets/services_help.png": "6c71781fe63bee843b98f81b06924ede",
"assets/assets/support.png": "42040ba52f3eeb807b79b04f2ef8d6ff",
"assets/assets/support_o.png": "3c9199261e5c780c0fc572494cd90623",
"assets/assets/teamwork.png": "e4191bffa103c3636e86c11725da8271",
"assets/FontManifest.json": "c7bc69f5fd44722fe313cfe55adced9f",
"assets/fonts/CustomIcons.ttf": "0aba280474b6c4a32b92890f87b152c6",
"assets/fonts/DimaWeb.ttf": "1fa34cba4aafe5733a3133a6a219850b",
"assets/fonts/MaterialIcons-Regular.otf": "1288c9e28052e028aba623321f7826ac",
"assets/fonts/Shabnam-Bold.ttf": "b7f6b7386ee3eb72d8d709f895e7c912",
"assets/fonts/Shabnam-Light.ttf": "ecf1c57199b540fb02260ccbe1acc3f1",
"assets/fonts/Shabnam.ttf": "69fc335794c0fcfd006f49066c650505",
"assets/NOTICES": "b75b04bbcf77b8341092166c5e19c9ae",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/fluttertoast/assets/toastify.css": "8beb4c67569fb90146861e66d94163d7",
"assets/packages/fluttertoast/assets/toastify.js": "8f5ac78dd0b9b5c9959ea1ade77f68ae",
"assets/packages/flutter_markdown/assets/logo.png": "67642a0b80f3d50277c44cde8f450e50",
"assets/packages/wakelock_web/assets/no_sleep.js": "7748a45cd593f33280669b29c2c8919a",
"favicon.png": "b0d74048af095211e0639615bb6d452a",
"icons/Icon-192.png": "4829f1e971f0a0dac475c53a1a3dd1c9",
"icons/Icon-512.png": "152bdf0707b7410851dd73e658e96d2d",
"index.html": "07d7f2d26fc2d36b94401447d0ee5d05",
"/": "07d7f2d26fc2d36b94401447d0ee5d05",
"main.dart.js": "2bdcf61d7d82003a1c0754edd9543cd6",
"manifest.json": "097d1e069abc4ede04080486f9154627",
"styles.css": "6767caf05dd15f41a7aad5bccf63236f",
"version.json": "ef76827150ea199c68bfa376b24dc7cd"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
