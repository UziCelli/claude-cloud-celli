import { useState } from 'react'
import { Botao } from '../../ui'

const permissao = (): NotificationPermission | null => {
  try {
    return 'Notification' in window ? Notification.permission : null
  } catch {
    return null
  }
}

// Cartão persistente: só some quando a permissão é concedida.
export default function AvisoNotificacoes() {
  const [p, setP] = useState(permissao)
  if (p == null || p === 'granted') return null
  const ios = /iPhone|iPad|iPod/.test(navigator.userAgent)
  const pedir = async () => {
    try {
      setP(await Notification.requestPermission())
    } catch {
      setP(permissao())
    }
  }
  return (
    <div className="mb-4 rounded-xl border border-amber-500/60 bg-slate-900 p-3 text-sm">
      <p className="font-semibold">🔔 Permita as notificações para o cronômetro te chamar de volta ao treino.</p>
      {p === 'denied' ? (
        <p className="mt-1 text-slate-300">
          Para liberar: {ios ? 'Ajustes → Notificações → VFITCOACH.' : 'segure o ícone do app → Informações do app → Notificações.'}
        </p>
      ) : (
        <Botao tipo="primario" className="mt-2 w-full" onClick={pedir}>
          Permitir notificações
        </Botao>
      )}
    </div>
  )
}
