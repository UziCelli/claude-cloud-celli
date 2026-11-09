import { useEffect, useState } from 'react'
import { IcBalao, IcSeta } from '../../icones'
import { convidarAgora, marcarConvite } from '../../lib/feedback'
import { IconeQuadrado, Quadro } from '../../vidro'

const Faixa = ({ texto }: { texto: string }) => (
  <a href="#/feedback" className="toque block">
    <Quadro className="flex items-center gap-3">
      <IconeQuadrado><IcBalao className="size-5" /></IconeQuadrado>
      <p className="min-w-0 flex-1 text-sm font-semibold">{texto}</p>
      <IcSeta className="size-5 text-slate-400" />
    </Quadro>
  </a>
)

// Fixa: sempre aparece (Início). Convite: só se já passaram 60 dias do último (fim do treino com recorde, relatório).
export function FaixaFeedback({ texto = 'Sua opinião ajuda o app a crescer' }: { texto?: string }) {
  return <Faixa texto={texto} />
}

export default function ConviteFeedback({ texto = 'Curtiu? Conte pra gente' }: { texto?: string }) {
  const [mostrar] = useState(convidarAgora) // decide uma vez, antes de marcar
  useEffect(() => {
    if (mostrar) marcarConvite()
  }, [mostrar])
  return mostrar ? <Faixa texto={texto} /> : null
}
