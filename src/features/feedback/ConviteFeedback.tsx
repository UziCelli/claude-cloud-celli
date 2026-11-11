import { useEffect, useState } from 'react'
import { IcBalao, IcSeta } from '../../icones'
import { convidarAgora, marcarConvite } from '../../lib/feedback'
import { IconeQuadrado, Quadro } from '../../vidro'

const Faixa = ({ texto }: { texto: string }) => (
  <a href="#/feedback" className="toque block">
    <Quadro className="flex items-center gap-3 border border-marca-400/60 bg-marca-500/15">
      <IconeQuadrado><IcBalao className="size-5" /></IconeQuadrado>
      <p className="min-w-0 flex-1 text-sm font-semibold">{texto}</p>
      <IcSeta className="size-5 text-slate-400" />
    </Quadro>
  </a>
)

// Fixa: sempre aparece (Início). Convite: só se já passaram 7 dias do último (fim do treino, relatório).
export function FaixaFeedback({ texto = 'O que melhorar no app? Conte em 1 minuto' }: { texto?: string }) {
  return <Faixa texto={texto} />
}

export default function ConviteFeedback({ texto = 'O que podemos melhorar no app? Conte em 1 minuto' }: { texto?: string }) {
  const [mostrar] = useState(convidarAgora) // decide uma vez, antes de marcar
  useEffect(() => {
    if (mostrar) marcarConvite()
  }, [mostrar])
  return mostrar ? <Faixa texto={texto} /> : null
}
