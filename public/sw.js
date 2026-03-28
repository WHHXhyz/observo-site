// ══════════════════════════════════════════════════════════════
// Aegis8 · Service Worker
// Habilita la app como PWA instalable + notificaciones push
// ══════════════════════════════════════════════════════════════

const CACHE_NAME = 'aegis8-v2';
const CACHE_URLS = [
  '/',
  
  '/herramientas',
  '/quiz',
  '/checklist',
  '/agente-seguridad.html',
  '/quiz.js',
  '/amenaza.json',
];

// ── INSTALL ──────────────────────────────────────────────────
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CACHE_URLS))
  );
  self.skipWaiting();
});

// ── ACTIVATE ─────────────────────────────────────────────────
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ── FETCH — Network first, cache fallback ────────────────────
self.addEventListener('fetch', e => {
  // Solo requests GET
  if (e.request.method !== 'GET') return;
  // No cachear requests del Worker externo
  if (e.request.url.includes('workers.dev')) return;

  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Actualizar cache con respuesta fresca
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});

// ── PUSH NOTIFICATIONS ───────────────────────────────────────
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {};
  const title   = data.title   || '⚠️ Aegis8 — Nueva alerta';
  const body    = data.body    || 'Hay una nueva amenaza de ciberseguridad relevante para Chile.';
  const url     = data.url     || '/';
  const icon    = data.icon    || '/favicon.svg';

  e.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon,
      badge: '/favicon.svg',
      tag: 'aegis8-alerta',
      renotify: true,
      data: { url },
      actions: [
        { action: 'ver', title: 'Ver ahora →' },
        { action: 'cerrar', title: 'Cerrar' },
      ]
    })
  );
});

// ── NOTIFICATION CLICK ───────────────────────────────────────
self.addEventListener('notificationclick', e => {
  e.notification.close();
  if (e.action === 'cerrar') return;

  const url = e.notification.data?.url || '/';
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      const existing = list.find(c => c.url.includes(self.location.origin));
      if (existing) { existing.focus(); existing.navigate(url); }
      else clients.openWindow(url);
    })
  );
});
