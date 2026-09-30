import { useState } from 'react'
import { acimaDoLimite, fmtMin } from '../../../lib/tempo'
import { prescreverSessao, progressaoAutomatica, reduzirVolume, tempoPorSemana } from '../../../engine'
import type { AlvoVolume, Meso } from '../../../engine'
import { Botao, campoBase, Cartao, Painel } from '../../../ui'

type Previa = { mov: number; tempo: number }[]

const fmt = (n: number) => n.toFixed(1).replace('.', ',')
const num = (v: string, min: number, max: number) => Math.min(max, Math.max(min, Number(v) || min))

// Movimentos (reps prescritas) e tempo (maior treino) de cada semana.
function resumo(meso: Meso): Previa {
  const tempos = tempoPorSemana(meso)
  return tempos.map((tempo, i) => ({
    tempo,
    mov: Array.from({ length: meso.frequencia }, (_, t) =>
      (prescreverSessao(meso, i + 1, t + 1)?.exercicios ?? []).reduce((s, e) => s + e.reps.reduce((a, b) => a + b, 0), 0),
    ).reduce((a, b) => a + b, 0),
  }))
}

export default function TabProgressao({ meso, onAtualizar }: { meso: Meso; onAtualizar: (patch: Partial<Meso>) => void }) {
  const padrao = meso.progressao.padrao ?? meso.progressao.auxiliares
  const proprias = meso.progressaoExercicio ?? {}
  const setPadrao = (l: (number | null)[][]) => onAtualizar({ progressao: { ...meso.progressao, padrao: l } })
  const setProprio = (slotId: string, l: (number | null)[][]) => onAtualizar({ progressaoExercicio: { ...proprias, [slotId]: l } })
  const voltarPadrao = (slotId: string) => {
    const { [slotId]: _, ...resto } = proprias
    onAtualizar({ progressaoExercicio: resto })
  }
  const vazia = () => Array.from({ length: 6 }, () => null)
  const deSemana = (l: (number | null)[][], w: number) => l[w] ?? padrao[w] ?? vazia()

  return (
    <div className="space-y-4">
      <AjustarVolume meso={meso} onAtualizar={onAtualizar} />
      <TabelaProgressao
        titulo="Progressão padrão"
        linhas={padrao}
        onLinhas={setPadrao}
        acao={{ rotulo: 'Aplicar semana 1 em todas', fazer: () => setPadrao(padrao.map(() => [...(padrao[0] ?? vazia())])) }}
      />
      <p className="text-sm text-slate-400">Todo exercício segue a padrão, a menos que você personalize.</p>
      {meso.divisao.map((slots, t) => (
        <Cartao key={t} className="space-y-2">
          <h3 className="font-semibold">Treino {t + 1}</h3>
          {slots.length === 0 && <p className="text-sm text-slate-500">Sem exercícios.</p>}
          {slots.map((slot) => {
            const propria = proprias[slot.slotId]
            if (!propria)
              return (
                <div key={slot.slotId} className="flex items-center justify-between gap-2 border-t border-slate-800 pt-2 first:border-0 first:pt-0">
                  <span className="min-w-0 break-words text-sm">{slot.nome}</span>
                  <Botao className="shrink-0" onClick={() => setProprio(slot.slotId, padrao.map((l) => [...l]))}>
                    Personalizar
                  </Botao>
                </div>
              )
            return (
              <TabelaProgressao
                key={slot.slotId}
                titulo={slot.nome}
                linhas={padrao.map((_, w) => deSemana(propria, w))}
                onLinhas={(l) => setProprio(slot.slotId, l)}
                acao={{ rotulo: 'Voltar ao padrão', fazer: () => voltarPadrao(slot.slotId) }}
              />
            )
          })}
        </Cartao>
      ))}
    </div>
  )
}

function AjustarVolume({ meso, onAtualizar }: { meso: Meso; onAtualizar: (patch: Partial<Meso>) => void }) {
  const [modo, setModo] = useState<'prog' | 'red'>('prog')
  const [pct, setPct] = useState('5')
  const [de, setDe] = useState('2')
  const [ate, setAte] = useState(String(meso.semanas))
  const [retorno, setRetorno] = useState('2')
  const [onde, setOnde] = useState<'todos' | 'treino' | 'exercicio'>('todos')
  const [treino, setTreino] = useState('1')
  const [slotSel, setSlotSel] = useState('')
  const [previa, setPrevia] = useState<{ antes: Previa; depois: Previa; novo: Meso } | null>(null)

  const alvo = (): AlvoVolume =>
    onde === 'todos' ? { tipo: 'todos' } : onde === 'treino' ? { tipo: 'treino', treino: +treino } : { tipo: 'exercicio', slotId }

  function calcular() {
    const args = { pct: Number(pct) || 0, de: +de, ate: +ate, alvo: alvo() }
    const novo = modo === 'prog' ? progressaoAutomatica(meso, args) : reduzirVolume(meso, { ...args, retorno: +retorno })
    setPrevia({ antes: resumo(meso), depois: resumo(novo), novo })
  }

  function aplicar() {
    if (!previa) return
    const limite = meso.tempoLimiteMin
    const pior = Math.max(...previa.depois.map((x) => x.tempo))
    if (limite && pior > limite && !confirm(`Vai passar do tempo limite: treino previsto ${fmtMin(pior)} (limite ${limite}). Aplicar mesmo assim?`)) return
    onAtualizar(previa.novo)
    setPrevia(null)
  }

  const sel = `${campoBase} w-full px-2 py-1.5`
  const rot = 'grid gap-1 text-sm text-slate-400'
  const mudou = (f: (v: string) => void) => (v: string) => {
    f(v)
    setPrevia(null)
  }
  const slots = meso.divisao[+treino - 1] ?? []
  const slotId = slots.some((x) => x.slotId === slotSel) ? slotSel : (slots[0]?.slotId ?? '')

  return (
    <Cartao>
      <h3 className="mb-2 font-semibold">Ajustar volume</h3>
      <div className="grid grid-cols-2 gap-3">
        <label className={`${rot} col-span-2`}>
          Modo
          <select value={modo} onChange={(e) => mudou((v) => setModo(v as 'prog' | 'red'))(e.target.value)} className={sel}>
            <option value="prog">Progressão</option>
            <option value="red">Reduzir com volta gradual</option>
          </select>
        </label>
        <label className={rot}>
          {modo === 'prog' ? '% por semana' : '% de redução'}
          <input type="number" min={0} value={pct} onChange={(e) => mudou(setPct)(e.target.value)} className={`${sel} text-center`} />
        </label>
        {modo === 'red' && (
          <label className={rot}>
            Semanas de volta
            <input type="number" min={0} max={meso.semanas} value={retorno} onChange={(e) => mudou(setRetorno)(String(num(e.target.value, 0, meso.semanas)))} className={`${sel} text-center`} />
          </label>
        )}
        <label className={rot}>
          Da semana
          <input type="number" min={1} max={meso.semanas} value={de} onChange={(e) => mudou(setDe)(String(num(e.target.value, 1, meso.semanas)))} className={`${sel} text-center`} />
        </label>
        <label className={rot}>
          Até a semana
          <input type="number" min={1} max={meso.semanas} value={ate} onChange={(e) => mudou(setAte)(String(num(e.target.value, 1, meso.semanas)))} className={`${sel} text-center`} />
        </label>
        <label className={`${rot} col-span-2`}>
          Onde
          <select value={onde} onChange={(e) => mudou((v) => setOnde(v as typeof onde))(e.target.value)} className={sel}>
            <option value="todos">Todos os exercícios</option>
            <option value="treino">Um treino</option>
            <option value="exercicio">Um exercício</option>
          </select>
        </label>
        {onde !== 'todos' && (
          <label className={rot}>
            Treino
            <select value={treino} onChange={(e) => mudou(setTreino)(e.target.value)} className={sel}>
              {Array.from({ length: meso.frequencia }, (_, i) => (
                <option key={i} value={i + 1}>T{i + 1}</option>
              ))}
            </select>
          </label>
        )}
        {onde === 'exercicio' && (
          <label className={rot}>
            Exercício
            <select value={slotId} onChange={(e) => mudou(setSlotSel)(e.target.value)} className={sel}>
              {slots.map((x, i) => (
                <option key={x.slotId} value={x.slotId}>{i + 1}. {x.nome}</option>
              ))}
            </select>
          </label>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <Botao onClick={calcular}>Calcular prévia</Botao>
        {previa && <Botao tipo="primario" onClick={aplicar}>Aplicar</Botao>}
      </div>
      <Painel aberto={!!previa}>
      {previa && (
        <table className="mt-3 w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400">
              <th className="font-normal">Sem</th>
              <th className="font-normal">Movimentos</th>
              <th className="font-normal">Tempo</th>
            </tr>
          </thead>
          <tbody>
            {previa.antes.map((a, i) => (
              <tr key={i}>
                <td className="text-slate-400">S{i + 1}</td>
                <td>{a.mov} → {previa.depois[i].mov}</td>
                <td className="font-bold">
                  {fmtMin(a.tempo)} →{' '}
                  <span className={acimaDoLimite(previa.depois[i].tempo, meso.tempoLimiteMin) ? 'text-red-400' : ''}>{fmtMin(previa.depois[i].tempo)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </Painel>
    </Cartao>
  )
}

function TabelaProgressao({
  titulo,
  linhas,
  onLinhas,
  acao,
}: {
  titulo: string
  linhas: (number | null)[][]
  onLinhas: (linhas: (number | null)[][]) => void
  acao: { rotulo: string; fazer: () => void }
}) {
  const setCelula = (w: number, s: number, val: number | null) => {
    const tab = linhas.map((r) => [...r])
    tab[w - 1][s - 1] = val
    onLinhas(tab)
  }
  const copiarAnterior = (w: number) => onLinhas(linhas.map((r, i) => (i === w - 1 ? [...linhas[w - 2]] : r)))
  return (
    <Cartao>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-semibold">{titulo}</h3>
        <Botao onClick={acao.fazer}>{acao.rotulo}</Botao>
      </div>
      <div className="overflow-x-auto">
      <table className="mx-auto border-separate border-spacing-x-0.5 border-spacing-y-1 text-sm md:mx-0 md:w-full md:border-spacing-2">
        <thead>
          <tr>
            <th className="text-left text-slate-400">
              <span className="md:hidden">Sem</span>
              <span className="hidden md:inline">Semana</span>
            </th>
            {Array.from({ length: 6 }, (_, i) => i + 1).map((s) => (
              <th key={s} className="text-center font-normal text-slate-400 md:text-left">
                <span className="md:hidden">S{s}</span>
                <span className="hidden md:inline">Série {s}</span>
              </th>
            ))}
            <th className="hidden md:table-cell" />
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha, i) => {
            const w = i + 1
            return (
              <tr key={w}>
                <td className="text-slate-400">
                  <span className="md:hidden">S{w}</span>
                  <span className="hidden md:inline">{w}</span>
                  {w > 1 && (
                    <button type="button" aria-label="Copiar anterior" onClick={() => copiarAnterior(w)} className="block px-1 text-marca-300 md:hidden">
                      ↑
                    </button>
                  )}
                </td>
                {linha.map((v, j) => (
                  <td key={j}>
                    <input
                      type="number"
                      value={v ?? ''}
                      onChange={(e) => setCelula(w, j + 1, e.target.value === '' ? null : Number(e.target.value))}
                      className={`${campoBase} w-11 px-0 py-1 text-center md:w-16 md:px-2 md:text-left outline-none focus:border-marca-500`}
                    />
                  </td>
                ))}
                <td className="hidden md:table-cell">
                  {w > 1 && (
                    <Botao onClick={() => copiarAnterior(w)} className="text-xs">
                      Copiar anterior
                    </Botao>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      </div>
    </Cartao>
  )
}
