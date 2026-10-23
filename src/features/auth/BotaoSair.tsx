import { useState } from 'react'
import { sair } from '../../lib/acoes'
import { IcSair } from '../../icones'

// Sair com retorno: desativa e avisa enquanto espera as gravações pendentes.
export function useSair() {
  const [saindo, setSaindo] = useState(false)
  return [saindo, () => { setSaindo(true); sair().catch(() => setSaindo(false)) }] as const
}

// Sair discreto para o topo do celular: pede confirmação antes.
export default function BotaoSair() {
  const [saindo, sairAgora] = useSair()
  return (
    <button
      disabled={saindo}
      onClick={() => { if (confirm('Sair da conta?')) sairAgora() }}
      className="flex min-h-11 items-center gap-2 px-2 text-base font-semibold text-slate-300 hover:text-white disabled:opacity-50"
    >
      <IcSair className="size-5" /> {saindo ? 'Saindo…' : 'Sair'}
    </button>
  )
}
