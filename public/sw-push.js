// Notificação de fim do descanso. Carregado pelo service worker do PWA (workbox.importScripts).
self.addEventListener('push', (e) => {
  let d = {}
  try {
    d = e.data.json()
  } catch {
    /* sem corpo legível: usa o texto padrão */
  }
  // O iPhone exige mostrar uma notificação a cada push, então sempre mostramos.
  e.waitUntil(
    self.registration.showNotification(d.title || 'Descanso acabou', {
      body: d.body || 'Volte para o treino 💪',
      tag: 'descanso',
      renotify: true,
      icon: '/pwa-192x192.png',
      badge: '/pwa-64x64.png',
      vibrate: [300, 150, 300],
    }),
  )
})

self.addEventListener('notificationclick', (e) => {
  e.notification.close()
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((janelas) => {
      const aberta = janelas.find((j) => 'focus' in j)
      return aberta ? aberta.focus() : self.clients.openWindow('/')
    }),
  )
})
