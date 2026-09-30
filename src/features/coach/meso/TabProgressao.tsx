import { useState } from 'react'
import { acimaDoLimite, fmtMin } from '../../../lib/tempo'
import { linhaPrescrita, prescreverSessao, progressaoAutomatica, reduzirVolume, tempoPorSemana } from '../../../engine'
import type { AlvoVolume, Meso } from '../../../engine'
import { Botao, campoBase, Cartao, Painel } from '../../../ui'

type Tabela = 'principais' | 'auxiliares'
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
  const setTabela = (tabela: Tabela, tab: (number | null)[][]) => onAtualizar({ progressao: { ...meso.progressao, [tabela]: tab } })
  const aplicarSemana1 = (tabela: Tabela) => setTabela(tabela, meso.progressao[tabela].map(() => [...(meso.progressao[tabela][0] ?? [])]))
  const overrides = Object.entries(meso.progressaoExercicio ?? {})

  function voltarPadrao(chave: string) {
    const { [chave]: _, ...resto } = meso.progressaoExercicio ?? {}
    onAtualizar({ progressaoExercicio: resto })
  }

  return (
    <div className="space-y-4">
      <AjustarVolume meso={meso} onAtualizar={onAtualizar} />
      <TabelaProgressao titulo="Principais (posições 1–2)" linhas={meso.progressao.principais} onLinhas={(l) => setTabela('principais', l)} acao={{ rotulo: 'Aplicar semana 1 em todas', fazer: () => aplicarSemana1('principais') }} />
      <TabelaProgressao titulo="Auxiliares (posições 3–10)" linhas={meso.progressao.auxiliares} onLinhas={(l) => setTabela('auxiliares', l)} acao={{ rotulo: 'Aplicar semana 1 em todas', fazer: () => aplicarSemana1('auxiliares') }} />
      {overrides.map(([chave, linhas]) => {
        const [t, p] = chave.split('-').map(Number)
        return (
          <TabelaProgressao
            key={chave}
            titulo={`T${t} · ${meso.divisao[t - 1]?.[p - 1]?.nome ?? `Posição ${p}`}`}
            linhas={linhas.map((_, w) => [...linhaPrescrita(meso, w + 1, t, p)])}
            onLinhas={(l) => onAtualizar({ progressaoExercicio: { ...meso.progressaoExercicio, [chave]: l } })}
            acao={{ rotulo: 'Voltar ao padrão', fazer: () => voltarPadrao(chave) }}
          />
        )
      })}
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
  const [pos, setPos] = useState('1')
  const [previa, setPrevia] = useState<{ antes: Previa; depois: Previa; novo: Meso } | null>(null)

  const alvo = (): AlvoVolume =>
    onde === 'todos' ? { tipo: 'todos' } : onde === 'treino' ? { tipo: 'treino', treino: +treino } : { tipo: 'exercicio', treino: +treino, pos: +pos }

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
  const posicoes = meso.divisao[+treino - 1]?.length || 1

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
            <select value={pos} onChange={(e) => mudou(setPos)(e.target.value)} className={sel}>
              {Array.from({ length: posicoes }, (_, i) => (
                <option key={i} value={i + 1}>{i + 1}. {meso.divisao[+treino - 1]?.[i]?.nome ?? `Posição ${i + 1}`}</option>
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
