import { useState } from 'react'
import { sair } from '../../lib/acoes'
import { IcSair } from '../../icones'
import { Botao } from '../../ui'

// Sair com retorno: desativa e avisa enquanto espera as gravações pendentes.
export function useSair() {
  const [saindo, setSaindo] = useState(false)
  return [saindo, () => { setSaindo(true); sair().catch(() => setSaindo(false)) }] as const
}

// Sair discreto para o topo do celular: pede confirmação antes.
export default function BotaoSair() {
  const [saindo, sairAgora] = useSair()
  return (
    <Botao
      tipo="fantasma"
      disabled={saindo}
      onClick={() => { if (confirm('Sair da conta?')) sairAgora() }}
      className="flex items-center gap-2"
    >
      <IcSair className="size-5" /> {saindo ? 'Saindo…' : 'Sair'}
    </Botao>
  )
}
