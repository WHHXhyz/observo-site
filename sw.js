// Aegis8 · Service Worker v3
// Sin caché agresivo — solo notificaciones push

self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  // Borrar todos los cachés anteriores
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(k) { return caches.delete(k); }));
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// Sin interceptar fetch — el browser carga directo desde la red

self.addEventListener('push', function(e) {
  var data = e.data ? e.data.json() : {};
  var title = data.title || 'Aegis8 — Nueva alerta';
  var body  = data.body  || 'Hay una nueva amenaza relevante para Chile.';
  var url   = data.url   || '/';
  e.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      tag: 'aegis8-alerta',
      data: { url: url }
    })
  );
});

self.addEventListener('notificationclick', function(e) {
  e.notification.close();
  var url = e.notification.data ? e.notification.data.url : '/';
  e.waitUntil(clients.openWindow(url));
});
