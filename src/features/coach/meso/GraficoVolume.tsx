import { useState } from 'react'
import type { AnaliseProgressao } from '../../../engine'
import { IcCheck, IcInfo, IcRaio } from '../../../icones'
import { Botao } from '../../../ui'

// Gráfico do volume (movimentos) por semana na prévia do "Ajustar volume": linha cheia = como vai ficar,
// tracejada = como está hoje (só aparece se mudar). Em "% da S1", cada linha é comparada à própria semana 1.
const W = 360
const H = 190
const M = { e: 44, d: 12, c: 20, b: 24 }
const fmt = (n: number) => (Math.round(n * 10) / 10).toString().replace('.', ',')
const sinal = (n: number) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${fmt(Math.abs(n))}%`

function passoBonito(faixa: number) {
  const bruto = faixa / 3 || 1
  const p = 10 ** Math.floor(Math.log10(bruto))
  return ([1, 2, 5, 10].find((m) => m * p >= bruto) ?? 10) * p
}

const FORMA: Record<AnaliseProgressao['forma'], [string, string]> = {
  linear: ['Linear', 'sobe quase o mesmo tanto toda semana.'],
  acelerando: ['Acelerando (exponencial)', 'cada semana sobe mais que a anterior.'],
  desacelerando: ['Desacelerando (hiperbólica)', 'sobe muito no começo e depois achata.'],
  ondulada: ['Ondulada', 'sobe e desce antes do pico.'],
  'sem-subida': ['Sem progressão', 'o volume não passa da semana 1.'],
  curta: ['Curta', 'só 1 semana de subida, pouco para dizer a forma.'],
}
const RITMO = {
  leve: { rotulo: 'Leve', icone: IcInfo, cor: 'text-slate-300 border-slate-600' },
  adequado: { rotulo: 'Adequado', icone: IcCheck, cor: 'text-emerald-300 border-emerald-700' },
  agressivo: { rotulo: 'Agressivo', icone: IcRaio, cor: 'text-amber-300 border-amber-700' },
}

export default function GraficoVolume({ antes, depois, analise }: { antes: number[]; depois: number[]; analise: AnaliseProgressao }) {
  const [escala, setEscala] = useState<'total' | 'pct'>('total')
  const [sel, setSel] = useState<number | null>(null)
  const n = depois.length
  if (!n) return null

  const mudou = antes.some((v, i) => v !== depois[i])
  const emPct = (s: number[]) => s.map((v) => (s[0] > 0 ? (v / s[0] - 1) * 100 : 0))
  const serie = escala === 'pct' ? emPct(depois) : depois
  const serieAntes = escala === 'pct' ? emPct(antes) : antes
  const todos = [...serie, ...(mudou ? serieAntes : []), ...(escala === 'pct' ? [0] : [])]
  const passo = passoBonito(Math.max(...todos) - Math.min(...todos))
  const y0 = Math.floor(Math.min(...todos) / passo) * passo
  const y1 = Math.max(y0 + passo, Math.ceil(Math.max(...todos) / passo) * passo)
  const ticks = Array.from({ length: Math.round((y1 - y0) / passo) + 1 }, (_, i) => y0 + i * passo)

  const x = (i: number) => (n === 1 ? (M.e + W - M.d) / 2 : M.e + (i * (W - M.e - M.d)) / (n - 1))
  const y = (v: number) => M.c + ((y1 - v) * (H - M.c - M.b)) / (y1 - y0)
  const caminho = (s: number[]) => s.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')
  const rotulo = (v: number) => (escala === 'pct' ? sinal(v) : String(Math.round(v)))
  const coluna = (W - M.e - M.d) / Math.max(n - 1, 1)
  const polimento = analise.quedaFinal < 0 && analise.pico < n - 1

  const detalhe = (i: number) => {
    const varSem = i > 0 && depois[i - 1] > 0 ? `, ${sinal((depois[i] / depois[i - 1] - 1) * 100)} sobre a S${i}` : ''
    const ant = mudou && antes[i] !== depois[i] ? ` · hoje: ${antes[i]}` : ''
    return `S${i + 1}: ${depois[i]} movimentos${varSem}${ant}`
  }
  const ritmo = analise.ritmo && RITMO[analise.ritmo]

  return (
    <div className="mt-3 space-y-2" data-testid="grafico-volume">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-semibold">Volume por semana</span>
        <div className="flex gap-1.5">
          <Botao aria-pressed={escala === 'total'} tipo={escala === 'total' ? 'primario' : undefined} onClick={() => setEscala('total')}>
            Movimentos
          </Botao>
          <Botao aria-pressed={escala === 'pct'} tipo={escala === 'pct' ? 'primario' : undefined} onClick={() => setEscala('pct')}>
            % da S1
          </Botao>
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-lg select-none" role="img" aria-label={`Volume por semana: ${depois.join(', ')} movimentos`}>
        {polimento && (
          <g>
            <rect x={x(analise.pico) + coluna / 2} y={M.c} width={x(n - 1) - x(analise.pico) - coluna / 2 + M.d / 2} height={H - M.c - M.b} className="fill-slate-800/50" rx={4} />
            <text x={x(n - 1) + M.d / 2 - 2} y={M.c - 5} textAnchor="end" className="fill-slate-400 text-[12px]">
              polimento
            </text>
          </g>
        )}
        {ticks.map((t) => (
          <g key={t}>
            <line x1={M.e} x2={W - M.d} y1={y(t)} y2={y(t)} className={escala === 'pct' && t === 0 ? 'stroke-slate-500' : 'stroke-slate-800'} strokeWidth={1} />
            <text x={M.e - 6} y={y(t) + 3} textAnchor="end" className="fill-slate-500 text-[12px]">
              {escala === 'pct' ? sinal(t) : fmt(t)}
            </text>
          </g>
        ))}
        {depois.map((_, i) => (
          <text key={i} x={x(i)} y={H - 6} textAnchor="middle" className={`text-[12px] ${sel === i ? 'fill-slate-200' : 'fill-slate-500'}`}>
            S{i + 1}
          </text>
        ))}
        {sel !== null && sel < n && <line x1={x(sel)} x2={x(sel)} y1={M.c} y2={H - M.b} className="stroke-slate-600" strokeWidth={1} />}
        {mudou && <path d={caminho(serieAntes)} fill="none" className="stroke-slate-500" strokeWidth={2} strokeDasharray="4 4" strokeLinejoin="round" />}
        <path d={caminho(serie)} fill="none" stroke="var(--color-marca-400)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        {serie.map((v, i) => (
          <circle key={i} cx={x(i)} cy={y(v)} r={sel === i ? 5 : 4} fill="var(--color-marca-400)" className="stroke-slate-900" strokeWidth={2} />
        ))}
        <text x={x(analise.pico)} y={y(serie[analise.pico]) - 9} textAnchor="middle" className="fill-slate-200 text-[12px] font-semibold">
          {rotulo(serie[analise.pico])}
        </text>
        {depois.map((_, i) => (
          <rect
            key={i}
            data-testid={`semana-grafico-${i + 1}`}
            x={x(i) - coluna / 2}
            y={0}
            width={coluna}
            height={H}
            fill="transparent"
            onPointerEnter={() => setSel(i)}
            onClick={() => setSel(i)}
          />
        ))}
      </svg>
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
        <span className="min-h-4 text-slate-200">{sel !== null && sel < n ? detalhe(sel) : 'Toque numa semana para ver os números.'}</span>
        {mudou && (
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <svg width="18" height="4" aria-hidden><line x1="0" x2="18" y1="2" y2="2" stroke="var(--color-marca-400)" strokeWidth={2} /></svg>
              Como vai ficar
            </span>
            <span className="flex items-center gap-1">
              <svg width="18" height="4" aria-hidden><line x1="0" x2="18" y1="2" y2="2" className="stroke-slate-500" strokeWidth={2} strokeDasharray="4 3" /></svg>
              Hoje
            </span>
          </span>
        )}
      </div>
      <ul className="space-y-1 rounded-lg border border-slate-800 p-2 text-sm" data-testid="analise-progressao">
        <li>
          <span className="text-slate-400">Subida: </span>
          <b>{FORMA[analise.forma][0]}</b> — {FORMA[analise.forma][1]}
        </li>
        {ritmo && (
          <li className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>
              <span className="text-slate-400">Ritmo: </span>
              {sinal(analise.mediaPct)} por semana em média
              {analise.maiorSalto && ` (maior salto: ${sinal(analise.maiorSalto.pct)} na S${analise.maiorSalto.semana})`}
            </span>
            <span className={`inline-flex items-center gap-1 rounded-full border px-2 text-xs font-semibold ${ritmo.cor}`}>
              <ritmo.icone className="size-3.5" /> {ritmo.rotulo}
            </span>
          </li>
        )}
        {polimento && (
          <li>
            <span className="text-slate-400">Polimento: </span>
            {sinal(analise.quedaFinal)} do pico (S{analise.pico + 1}) até a S{n}.
          </li>
        )}
      </ul>
    </div>
  )
}
