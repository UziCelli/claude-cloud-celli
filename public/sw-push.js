// Notificações push (descanso, treino novo, mensalidade). Carregado pelo service worker do PWA (workbox.importScripts).
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
      body: d.body || 'Volte para o treino',
      tag: d.tag || 'descanso',
      data: { url: d.url || '/' },
      renotify: true,
      icon: '/pwa-192x192.png',
      badge: '/badge-96.png',
      vibrate: [300, 150, 300],
    }),
  )
})

self.addEventListener('notificationclick', (e) => {
  e.notification.close()
  const url = (e.notification.data && e.notification.data.url) || '/'
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(async (janelas) => {
      const aberta = janelas.find((j) => 'focus' in j)
      if (!aberta) return self.clients.openWindow(url)
      // Só troca de hash (ex.: '/#/conta'): '/' recarregaria a página e o treino em andamento se perderia.
      try {
        if (url.includes('#')) await aberta.navigate(url)
      } catch {
        /* navigate pode falhar (janela não controlada): só traz para a frente */
      }
      return aberta.focus()
    }),
  )
})
