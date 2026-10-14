import type { ReactNode } from 'react'

// Ícones de traço (24×24), usados na barra de abas e nos cartões. Cor = currentColor.
type P = { className?: string }
export type Icone = (p: P) => ReactNode
const svg = (d: ReactNode): Icone =>
  function Icone({ className = 'size-6' }: P) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {d}
      </svg>
    )
  }

export const IcCasa = svg(<><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" /></>)
export const IcHaltere = svg(<path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11" />)
export const IcGrafico = svg(<><path d="M4 4v16h16" /><path d="m7.5 14.5 3.5-3.5 3 3 5-5.5" /></>)
export const IcPessoa = svg(<><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></>)
export const IcCartao = svg(<><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3 10h18M7 15h4" /></>)
export const IcPrancheta = svg(<><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 3h6v3H9zM9 11h6M9 15h4" /></>)
export const IcLivro = svg(<><path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z" /><path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19M9 7h6" /></>)
export const IcCadeado = svg(<><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>)
export const IcCheck = svg(<path d="m5 12.5 4.5 4.5L19 7.5" />)
export const IcRelogio = svg(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>)
export const IcCompartilhar = svg(<><path d="M12 15V3m0 0L8 7m4-4 4 4" /><path d="M8 10H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-2" /></>)
export const IcGrupo = svg(<><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14c2.2.6 3.5 2.6 3.5 6" /></>)
export const IcSino = svg(<><path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z" /><path d="M10 20a2 2 0 0 0 4 0" /></>)
export const IcFogo = svg(<path d="M12 3c1 3 4.5 4.5 4.5 9.5a4.5 4.5 0 0 1-9 0c0-2.2 1-3.5 2.2-4.5 0 2 1 3 2.3 3 0-3-1.2-5.2 0-8z" />)
export const IcSeta = svg(<path d="M5 12h14M13 6l6 6-6 6" />)
export const IcVoltar = svg(<path d="M15 5l-7 7 7 7" />)
export const IcMais = svg(<path d="M12 5v14M5 12h14" />)
export const IcBaixar = svg(<><path d="M12 4v11m0 0-4-4m4 4 4-4" /><path d="M5 20h14" /></>)
export const IcTrofeu = svg(<path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 21h8M9.5 17h5" />)
export const IcRaio = svg(<path d="M13 2 4 14h7l-1 8 9-12h-7z" />)
export const IcNuvem = svg(<><path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 8.5a4.5 4.5 0 0 1-.5 9.5z" /><path d="m9.5 13.5 2 2 3.5-3.5" /></>)
export const IcSair = svg(<><path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" /><path d="M10 17l-5-5 5-5M5 12h11" /></>)
export const IcPontos = ({ className = 'size-6' }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <circle cx="5" cy="12" r="1.7" /><circle cx="12" cy="12" r="1.7" /><circle cx="19" cy="12" r="1.7" />
  </svg>
)
export const IcPontosV = ({ className = 'size-6' }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <circle cx="12" cy="5" r="1.7" /><circle cx="12" cy="12" r="1.7" /><circle cx="12" cy="19" r="1.7" />
  </svg>
)

export const IcNota = svg(<><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6M8 13h8M8 17h5" /></>)
export const IcLapis = svg(<><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /><path d="m14.5 5.5 3 3" /></>)
export const IcPlay = svg(<path d="M7 4.5v15l12.5-7.5z" fill="currentColor" />)
export const IcPausa = svg(<path d="M8 5v14M16 5v14" />)
export const IcReiniciar = svg(<><path d="M3 12a9 9 0 1 0 2.6-6.4L3 8" /><path d="M3 3v5h5" /></>)
export const IcSinoMudo = svg(<><path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z" /><path d="M10 20a2 2 0 0 0 4 0" /><path d="M3 3l18 18" /></>)
export const IcInfo = svg(<><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8v.01" /></>)
export const IcMedalha = svg(<><path d="M8 3l-1 6M16 3l1 6" /><circle cx="12" cy="15" r="6" /></>)
export const IcBussola = svg(<><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5z" /></>)
export const IcEngrenagem = svg(<><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></>)
export const IcCardio = svg(<path d="M2 12h4l2.5-6 4 12 3-9 1.5 3H22" />)
export const IcCamera = svg(<path d="M4 8h3l2-3h6l2 3h3v11H4zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />)
export const IcSubir = svg(<path d="M12 20V5m0 0-6 6m6-6 6 6" />)

export const D_TROFEU = 'M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 21h8M9.5 17h5'
export const D_SUBIR = 'M12 20V5m0 0-6 6m6-6 6 6'
