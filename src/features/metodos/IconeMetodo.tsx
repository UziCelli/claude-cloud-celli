import { m } from 'motion/react'
import type { ReactNode } from 'react'
import type { Metodo } from '../../engine'

const loop = (duration: number, extra = {}) => ({ duration, repeat: Infinity, ease: 'easeInOut' as const, ...extra })

const desenhos: Record<Metodo, ReactNode> = {
  // barra sobe; anilha da ponta sai
  Dropset: (
    <m.g animate={{ y: [2, -2, 2] }} transition={loop(2.4)}>
      <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="5" y="7" width="3" height="10" rx="1" fill="currentColor" />
      <rect x="16" y="7" width="3" height="10" rx="1" fill="currentColor" />
      <m.rect x="20" y="9" width="2" height="6" rx="1" fill="currentColor" animate={{ x: [0, 2, 0], opacity: [1, 0, 1] }} transition={loop(2.4)} />
    </m.g>
  ),
  // dois halteres; destaque passa do 1º ao 2º
  Biset: (
    <>
      {[6, 18].map((x, i) => (
        <m.g key={x} animate={{ opacity: i ? [0.3, 1, 0.3] : [1, 0.3, 1] }} transition={loop(1.6)}>
          <line x1={x} y1="6" x2={x} y2="18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1={x - 3} y1="12" x2={x + 3} y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </m.g>
      ))}
    </>
  ),
  // três pontos em triângulo acendendo em sequência
  Triset: (
    <>
      {[[12, 5], [5, 18], [19, 18]].map(([cx, cy], i) => (
        <m.circle key={i} cx={cx} cy={cy} r="3" fill="currentColor" animate={{ opacity: [0.25, 1, 0.25] }} transition={loop(2.1, { delay: i * 0.7 })} />
      ))}
    </>
  ),
  // quatro pontos em quadrado acendendo em sequência
  Superset: (
    <>
      {[[6, 6], [18, 6], [18, 18], [6, 18]].map(([cx, cy], i) => (
        <m.circle key={i} cx={cx} cy={cy} r="3" fill="currentColor" animate={{ opacity: [0.25, 1, 0.25] }} transition={loop(2.8, { delay: i * 0.7 })} />
      ))}
    </>
  ),
  // seta circular girando
  Circuito: (
    <m.g animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '12px 12px' }}>
      <path d="M12 4a8 8 0 1 1-8 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
      <path d="M8 4l4 0-2 3.5z" fill="currentColor" />
      <circle cx="12" cy="4" r="1.5" fill="currentColor" />
    </m.g>
  ),
  // barra enche, pausa, enche mais
  'Rest-pause': (
    <>
      <rect x="3" y="9" width="18" height="6" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
      <m.rect x="5" y="11" height="2" rx="1" fill="currentColor" initial={{ width: 0 }} animate={{ width: [0, 8, 8, 14, 0] }} transition={loop(3.2, { times: [0, 0.3, 0.55, 0.85, 1] })} />
    </>
  ),
  // blocos com espaços aparecendo
  Clusterset: (
    <>
      {[3, 9, 15].map((x, i) => (
        <m.rect key={x} x={x} y="8" width="5" height="8" rx="1.5" fill="currentColor" animate={{ opacity: [0.15, 1, 1, 0.15], scale: [0.8, 1, 1, 0.8] }} transition={loop(2.4, { delay: i * 0.5, times: [0, 0.3, 0.8, 1] })} style={{ transformOrigin: `${x + 2.5}px 12px` }} />
      ))}
    </>
  ),
}

export default function IconeMetodo({ metodo, tamanho = 24 }: { metodo: Metodo; tamanho?: number }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" width={tamanho} height={tamanho} className="shrink-0">
      {desenhos[metodo]}
    </svg>
  )
}
