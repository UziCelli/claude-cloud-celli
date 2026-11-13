import { useMemo, useState } from 'react'
import type { PropostaFisio } from '../../fisio/propostaEditor'
import { acimaDoLimite, fmtMin } from '../../../lib/tempo'
import { isometrico, linhaIsometrica, progressaoIsometrica, analisarProgressao, polimento, prescreverSessao, progressaoAutomatica, reduzirVolume, tempoPorSemana } from '../../../engine'
import type { AlvoVolume, Meso, TipoPolimento } from '../../../engine'
import GraficoVolume from './GraficoVolume'
import { Botao, campoBase, Cartao, CampoNumero } from '../../../ui'

type Previa = { mov: number; tempo: number }[]
type Modo = 'prog' | 'red' | 'pol'

const fmt = (n: number) => n.toFixed(1).replace('.', ',')

const TIPOS_POL: Record<TipoPolimento, [string, string]> = {
  degrau: ['Degrau (step)', 'Corta tudo de uma vez e mantém até o fim.'],
  expRapida: ['Exponencial rápida', 'A maior parte da queda já na 1ª semana; depois cai pouco.'],
  expLenta: ['Exponencial lenta', 'Cai bem no começo, mas de forma mais suave que a rápida.'],
  linear: ['Linear', 'Cai o mesmo tanto a cada semana até chegar ao total.'],
}

// Movimentos (reps prescritas) e tempo (maior treino) de cada semana.
function resumo(meso: Meso): Previa {
  const tempos = tempoPorSemana(meso)
  return tempos.map((tempo, i) => ({
    tempo,
    mov: Array.from({ length: meso.frequencia }, (_, t) =>
      (prescreverSessao(meso, i + 1, t + 1)?.exercicios ?? []).reduce((s, e) => s + (isometrico(e.slot) ? 0 : e.reps.reduce((a, b) => a + b, 0)), 0),
    ).reduce((a, b) => a + b, 0),
  }))
}

export default function TabProgressao({ meso, onAtualizar, proposta = null }: { meso: Meso; onAtualizar: (patch: Partial<Meso>) => void; proposta?: PropostaFisio | null }) {
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
      <AjustarVolume meso={meso} onAtualizar={onAtualizar} proposta={proposta} />
      <TabelaProgressao
        titulo="Progressão padrão"
        linhas={padrao}
        onLinhas={setPadrao}
        acao={{ rotulo: 'Aplicar semana 1 em todas', fazer: () => confirm('Isso apaga as diferenças entre as semanas da progressão padrão. Continuar?') && setPadrao(padrao.map(() => [...(padrao[0] ?? vazia())])) }}
      />
      <p className="text-sm text-slate-400">Todo exercício segue a padrão, a menos que você personalize.</p>
      {meso.divisao.slice(0, meso.frequencia).map((slots, t) => (
        <Cartao key={t} className="space-y-2">
          <h3 className="font-semibold">Treino {t + 1}</h3>
          {slots.length === 0 && <p className="text-sm text-slate-500">Sem exercícios.</p>}
          {slots.map((slot) => {
            const iso = isometrico(slot)
            const propria = proprias[slot.slotId] ?? (iso ? progressaoIsometrica(meso.semanas) : undefined)
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
                unidade={iso ? 's' : 'reps'}
                linhas={Array.from({length: meso.semanas}, (_, w) => propria[w] ?? (iso ? linhaIsometrica() : deSemana(propria, w)))}
                onLinhas={(l) => setProprio(slot.slotId, l)}
                acao={{ rotulo: iso ? 'Restaurar 3 × 30 s' : 'Voltar ao padrão', fazer: () => confirm('Isso apaga a personalização deste exercício. Continuar?') && (iso ? setProprio(slot.slotId, progressaoIsometrica(meso.semanas)) : voltarPadrao(slot.slotId)) }}
              />
            )
          })}
        </Cartao>
      ))}
    </div>
  )
}

function AjustarVolume({ meso, onAtualizar, proposta }: { meso: Meso; onAtualizar: (patch: Partial<Meso>) => void; proposta: PropostaFisio | null }) {
  const [modo, setModo] = useState<Modo>(proposta ? 'pol' : 'prog')
  const [reducao, setReducao] = useState('5')
  const [reducaoPol, setReducaoPol] = useState('40')
  const [pausas, setPausas] = useState<number[]>([])
  const [semPol, setSemPol] = useState<number[]>(proposta?.semanas ?? [meso.semanas])
  const [tipoPol, setTipoPol] = useState<TipoPolimento>('degrau')
  const [de, setDe] = useState('2')
  const [ate, setAte] = useState(String(meso.semanas))
  const [retorno, setRetorno] = useState('2')
  const [onde, setOnde] = useState<'todos' | 'treino' | 'exercicio' | 'fisio'>(proposta ? 'fisio' : 'todos')
  const [treino, setTreino] = useState('1')
  const [slotSel, setSlotSel] = useState('')

  const slots = meso.divisao[+treino - 1] ?? []
  const slotId = slots.some((x) => x.slotId === slotSel) ? slotSel : (slots[0]?.slotId ?? '')
  const pctSemana = meso.progressaoPct ?? 5

  // Prévia sempre atual: recalcula quando o meso ou algum parâmetro muda.
  const previa = useMemo(() => {
    const alvo: AlvoVolume = onde === 'fisio' && proposta ? { tipo: 'exercicios', slotIds: proposta.slotIds } : onde === 'todos' ? { tipo: 'todos' } : onde === 'treino' ? { tipo: 'treino', treino: +treino } : { tipo: 'exercicio', slotId }
    const novo =
      modo === 'prog'
        ? progressaoAutomatica(meso, { pct: pctSemana, de: +de, ate: +ate, alvo, pausas })
        : modo === 'red'
          ? reduzirVolume(meso, { pct: Number(reducao) || 0, de: +de, ate: +ate, retorno: +retorno, alvo })
          : polimento(meso, { pct: Number(reducaoPol) || 0, semanas: semPol, alvo, tipo: tipoPol })
    const depois = resumo(novo)
    return { antes: resumo(meso), depois, novo, igual: JSON.stringify(novo) === JSON.stringify(meso), analise: analisarProgressao(depois.map((x) => x.mov)) }
  }, [meso, modo, pctSemana, reducao, reducaoPol, pausas, semPol, tipoPol, de, ate, retorno, onde, treino, slotId, proposta])

  // Chips de semana (como o seletor de séries do drop set): um clique liga/desliga.
  const alternar = (lista: number[], w: number) => (lista.includes(w) ? lista.filter((x) => x !== w) : [...lista, w].sort((a, b) => a - b))
  const chipsSemana = (semanas: number[], marcadas: number[], onClick: (w: number) => void) => (
    <div className="flex flex-wrap gap-1.5">
      {semanas.map((w) => (
        <Botao key={w} aria-pressed={marcadas.includes(w)} tipo={marcadas.includes(w) ? 'primario' : undefined} onClick={() => onClick(w)}>
          S{w}
        </Botao>
      ))}
    </div>
  )
  const semanasProg = Array.from({ length: meso.semanas }, (_, i) => i + 1).filter((w) => w >= Math.max(+de, 2) && w <= +ate)

  function aplicar() {
    const limite = meso.tempoLimiteMin
    const pior = Math.max(...previa.depois.map((x) => x.tempo))
    if (limite && pior > limite && !confirm(`Vai passar do tempo limite: treino previsto ${fmtMin(pior)} (limite ${limite}). Aplicar mesmo assim?`)) return
    onAtualizar(previa.novo)
  }

  const sel = `${campoBase} w-full px-2 py-1.5`
  const rot = 'grid gap-1 text-sm text-slate-400'
  const totalMov = previa.depois.reduce((s, x) => s + x.mov, 0)
  const totalAntes = previa.antes.reduce((s, x) => s + x.mov, 0)

  return (
    <Cartao>
      <h3 className="mb-2 font-semibold">Ajustar volume</h3>
      {proposta && <p className="mb-3 rounded-xl border border-violet-500 bg-violet-950 p-3 text-sm text-violet-100">Proposta Físio: {proposta.motivo} Exercícios: {proposta.nomes.join(', ')}. Revise a prévia e toque em Aplicar alterações. Nada muda sem você aplicar.</p>}
      <div className="grid grid-cols-2 gap-3">
        <label className={`${rot} col-span-2`}>
          Modo
          <select value={modo} onChange={(e) => setModo(e.target.value as Modo)} className={sel}>
            <option value="prog">Progressão</option>
            <option value="red">Reduzir com volta gradual</option>
            <option value="pol">Polimento (semanas finais)</option>
          </select>
        </label>
        <CampoNumero rotulo="% por semana" min={0} valor={pctSemana} onConfirmar={(n) => onAtualizar({ progressaoPct: n })} />
        <CampoNumero rotulo="Limite de reps por série" min={1} valor={meso.limiteReps ?? 15} onConfirmar={(n) => onAtualizar({ limiteReps: n })} />
        {modo === 'red' && (
          <>
            <CampoNumero rotulo="% de redução" min={0} valor={+reducao || 0} onConfirmar={(n) => setReducao(String(n))} />
            <CampoNumero rotulo="Semanas de volta" min={0} max={meso.semanas} valor={+retorno} onConfirmar={(n) => setRetorno(String(n))} />
          </>
        )}
        {modo === 'pol' && (
          <>
            <label className={`${rot} col-span-2`}>
              Tipo de polimento
              <select value={tipoPol} onChange={(e) => setTipoPol(e.target.value as TipoPolimento)} className={sel}>
                {Object.entries(TIPOS_POL).map(([v, [nome]]) => (
                  <option key={v} value={v}>{nome}</option>
                ))}
              </select>
              <span className="text-xs text-slate-500">{TIPOS_POL[tipoPol][1]}</span>
            </label>
            <CampoNumero rotulo="% de redução na última semana" min={0} max={90} valor={+reducaoPol || 0} onConfirmar={(n) => setReducaoPol(String(n))} />
            <div className={`${rot} col-span-2`}>
              Semanas de polimento
              {chipsSemana(Array.from({ length: meso.semanas - 1 }, (_, i) => i + 2), semPol, (w) => setSemPol(alternar(semPol, w)))}
              <span className="text-xs text-slate-500">
                O volume cai em relação à semana anterior ao polimento. As cargas continuam as mesmas.
                {tipoPol !== 'degrau' && semPol.length < 2 && ' Marque 2 ou mais semanas seguidas para ver a diferença entre os tipos.'}
              </span>
            </div>
          </>
        )}
        {modo !== 'pol' && (
          <>
            <CampoNumero rotulo="Da semana" min={1} max={meso.semanas} valor={+de} onConfirmar={(n) => setDe(String(n))} />
            <CampoNumero rotulo="Até a semana" min={1} max={meso.semanas} valor={+ate} onConfirmar={(n) => setAte(String(n))} />
          </>
        )}
        {modo === 'prog' && semanasProg.length > 0 && (
          <div className={`${rot} col-span-2`}>
            Pausar a progressão nas semanas
            {chipsSemana(semanasProg, pausas, (w) => setPausas(alternar(pausas, w)))}
            <span className="text-xs text-slate-500">A semana pausada repete o volume da anterior; depois a progressão continua dali.</span>
          </div>
        )}
        <label className={`${rot} col-span-2`}>
          Onde
          <select value={onde} onChange={(e) => setOnde(e.target.value as typeof onde)} className={sel}>
            <option value="todos">Todos os exercícios</option>
            <option value="treino">Um treino</option>
            <option value="exercicio">Um exercício</option>
            {proposta && <option value="fisio">Exercícios da proposta Físio</option>}
          </select>
        </label>
        {onde !== 'todos' && onde !== 'fisio' && (
          <label className={rot}>
            Treino
            <select value={treino} onChange={(e) => setTreino(e.target.value)} className={sel}>
              {Array.from({ length: meso.frequencia }, (_, i) => (
                <option key={i} value={i + 1}>T{i + 1}</option>
              ))}
            </select>
          </label>
        )}
        {onde === 'exercicio' && (
          <label className={rot}>
            Exercício
            <select value={slotId} onChange={(e) => setSlotSel(e.target.value)} className={sel}>
              {slots.map((x, i) => (
                <option key={x.slotId} value={x.slotId}>{i + 1}. {x.nome}</option>
              ))}
            </select>
          </label>
        )}
      </div>
      <p className="mt-3 text-xs text-slate-400">Isometria progride em segundos, até 60 s por série e 6 séries. O gráfico de movimentos inclui apenas exercícios com repetições.</p>
      <GraficoVolume antes={previa.antes.map((x) => x.mov)} depois={previa.depois.map((x) => x.mov)} analise={previa.analise} />
      <table className="mt-3 w-full text-sm">
        <thead>
          <tr className="text-left text-slate-400">
            <th className="font-normal">Sem</th>
            <th className="font-normal">Movimentos</th>
            <th className="font-normal">Variação</th>
            <th className="text-right font-normal">Tempo</th>
          </tr>
        </thead>
        <tbody>
          {previa.depois.map((d, i) => {
            const a = previa.antes[i]
            const var_ = i === 0 || !previa.depois[i - 1].mov ? null : (d.mov / previa.depois[i - 1].mov - 1) * 100
            return (
              <tr key={i} className={d.mov !== a.mov || d.tempo !== a.tempo ? 'text-amber-300' : ''}>
                <td className="text-slate-400">S{i + 1}</td>
                <td>{d.mov}</td>
                <td>{var_ === null ? '—' : `${var_ > 0 ? '+' : ''}${fmt(var_)}%`}</td>
                <td className={`text-right font-bold ${acimaDoLimite(d.tempo, meso.tempoLimiteMin) ? 'text-red-400' : ''}`}>{fmtMin(d.tempo)}</td>
              </tr>
            )
          })}
          <tr className={`border-t border-slate-800 font-semibold ${totalMov !== totalAntes ? 'text-amber-300' : ''}`}>
            <td>Total</td>
            <td>{totalMov}</td>
            <td />
            <td />
          </tr>
        </tbody>
      </table>
      <Botao tipo="primario" className="mt-3" disabled={previa.igual} onClick={aplicar}>
        Aplicar alterações
      </Botao>
    </Cartao>
  )
}

function TabelaProgressao({
  titulo,
  linhas,
  onLinhas,
  acao,
  unidade = 'reps',
}: {
  titulo: string
  unidade?: 'reps' | 's'
  linhas: (number | null)[][]
  onLinhas: (linhas: (number | null)[][]) => void
  acao: { rotulo: string; fazer: () => void }
}) {
  const setCelula = (w: number, s: number, val: number | null) => {
    const tab = linhas.map((r) => [...r])
    tab[w - 1][s - 1] = val == null ? null : Math.min(unidade === 's' ? 60 : Infinity, Math.max(1, Math.round(val)))
    onLinhas(tab)
  }
  const copiarAnterior = (w: number) => onLinhas(linhas.map((r, i) => (i === w - 1 ? [...linhas[w - 2]] : r)))
  return (
    <Cartao>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-semibold">{titulo} · {unidade === 's' ? 'segundos por série (até 60 s)' : 'reps'}</h3>
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
                    <button type="button" aria-label="Copiar anterior" onClick={() => copiarAnterior(w)} className="grid size-11 place-items-center text-marca-300 md:hidden">
                      ↑
                    </button>
                  )}
                </td>
                {linha.map((v, j) => (
                  <td key={j}>
                    <input
                      type="number"
                      min={1}
                      max={unidade === 's' ? 60 : undefined}
                      aria-label={`${titulo}, semana ${w}, série ${j + 1}, ${unidade}`}
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
