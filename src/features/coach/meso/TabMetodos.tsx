import { useMemo } from 'react'
import type { AplicacaoMetodo, Escopo, Meso, Metodo } from '../../../engine'
import { Aviso, Botao, Campo, campoBase, Cartao } from '../../../ui'
import { seriesDaPosicao } from './util'

const METODOS: Metodo[] = ['Dropset', 'Biset', 'Triset', 'Superset', 'Circuito', 'Rest-pause', 'Clusterset']
const ESCOPOS: Escopo[] = [
  'Todas as séries',
  'Série específica',
  'Primeiras 2 séries',
  'Últimas 2 séries',
  'Primeiras 3 séries',
  'Últimas 3 séries',
  'Primeiras 4 séries',
  'Últimas 4 séries',
]
const TAMANHO_GRUPO: Partial<Record<Metodo, number>> = { Biset: 2, Triset: 3, Superset: 4 }

function padrao(metodo: Metodo, meso: Meso, semana: number, treino: number, exercicio: number): AplicacaoMetodo {
  const n = seriesDaPosicao(meso, semana, exercicio) || 1
  const base = { ativo: true, semana, treino, exercicio, metodo }
  switch (metodo) {
    case 'Dropset':
      return { ...base, escopo: 'Série específica', serie: n, pausaInternaS: 10, blocos: 1, etapas: 1, reducaoCarga: 20 }
    case 'Rest-pause':
      return { ...base, escopo: 'Série específica', serie: n, pausaInternaS: 20, blocos: 2 }
    case 'Clusterset':
      return { ...base, escopo: 'Todas as séries', pausaInternaS: 30, blocos: 3 }
    case 'Circuito':
      return { ...base, escopo: 'Todas as séries', pausaInternaS: 20, blocos: 3, grupo: 1 }
    default: // Biset, Triset, Superset
      return { ...base, escopo: 'Todas as séries', pausaInternaS: 15, blocos: 1, grupo: 1 }
  }
}

export default function TabMetodos({ meso, onAtualizar }: { meso: Meso; onAtualizar: (patch: Partial<Meso>) => void }) {
  const metodos = meso.metodos

  function set(idx: number, patch: Partial<AplicacaoMetodo>) {
    const lista = metodos.map((m, i) => (i === idx ? { ...m, ...patch } : m))
    onAtualizar({ metodos: lista })
  }

  function remover(idx: number) {
    onAtualizar({ metodos: metodos.filter((_, i) => i !== idx) })
  }

  function adicionar() {
    onAtualizar({ metodos: [...metodos, padrao('Dropset', meso, 1, 1, 1)] })
  }

  function copiarParaTodas(idx: number) {
    const item = metodos[idx]
    const copias = Array.from({ length: meso.semanas }, (_, i) => i + 1)
      .filter((w) => w !== item.semana)
      .map((w) => ({ ...item, semana: w }))
    onAtualizar({ metodos: [...metodos, ...copias] })
  }

  const avisos = useMemo(() => {
    const grupos = new Map<string, Set<number>>()
    for (const m of metodos) {
      if (m.grupo == null || !(m.metodo in TAMANHO_GRUPO)) continue
      const chave = `${m.semana}-${m.treino}-${m.metodo}-${m.grupo}`
      grupos.set(chave, (grupos.get(chave) ?? new Set()).add(m.exercicio))
    }
    const lista: string[] = []
    for (const [chave, pos] of grupos) {
      const [semana, treino, metodo] = chave.split('-')
      const esperado = TAMANHO_GRUPO[metodo as Metodo]!
      const minimo = metodo === 'Superset'
      if (minimo ? pos.size < esperado : pos.size !== esperado) {
        lista.push(`${metodo} da semana ${semana}, treino ${treino}: tem ${pos.size} exercício(s), ${minimo ? 'o mínimo' : 'o esperado'} é ${esperado}.`)
      }
    }
    return lista
  }, [metodos])

  return (
    <div className="space-y-4">
      {avisos.map((a, i) => (
        <Aviso key={i}>{a}</Aviso>
      ))}
      <Botao tipo="primario" onClick={adicionar}>
        Adicionar método
      </Botao>
      <div className="space-y-3">
        {metodos.map((m, idx) => (
          <LinhaMetodo key={idx} m={m} meso={meso} onSet={(p) => set(idx, p)} onRemover={() => remover(idx)} onCopiar={() => copiarParaTodas(idx)} />
        ))}
        {metodos.length === 0 && <p className="text-slate-500">Nenhum método avançado.</p>}
      </div>
    </div>
  )
}

function LinhaMetodo({
  m,
  meso,
  onSet,
  onRemover,
  onCopiar,
}: {
  m: AplicacaoMetodo
  meso: Meso
  onSet: (p: Partial<AplicacaoMetodo>) => void
  onRemover: () => void
  onCopiar: () => void
}) {
  const exerciciosDoTreino = meso.divisao[m.treino - 1] ?? []

  return (
    <Cartao className="space-y-3">
      <div className="flex flex-wrap items-end gap-2">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={m.ativo} onChange={(e) => onSet({ ativo: e.target.checked })} />
          Ativo
        </label>
        <Selecao rotulo="Semana" valor={m.semana} opcoes={Array.from({ length: meso.semanas }, (_, i) => i + 1)} onChange={(v) => onSet({ semana: v })} />
        <Selecao
          rotulo="Treino"
          valor={m.treino}
          opcoes={Array.from({ length: meso.frequencia }, (_, i) => i + 1)}
          onChange={(v) => onSet({ treino: v, exercicio: 1 })}
        />
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-slate-400">Exercício</span>
          <select
            value={m.exercicio}
            onChange={(e) => onSet({ exercicio: Number(e.target.value) })}
            className={`${campoBase} px-2 py-2`}
          >
            {exerciciosDoTreino.map((s, i) => (
              <option key={s.slotId} value={i + 1}>
                {i + 1}. {s.nome}
              </option>
            ))}
            {exerciciosDoTreino.length === 0 && <option value={1}>(sem exercícios)</option>}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-slate-400">Método</span>
          <select
            value={m.metodo}
            onChange={(e) => onSet(padrao(e.target.value as Metodo, meso, m.semana, m.treino, m.exercicio))}
            className={`${campoBase} px-2 py-2`}
          >
            {METODOS.map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-slate-400">Escopo</span>
          <select
            value={m.escopo}
            onChange={(e) => onSet({ escopo: e.target.value as Escopo })}
            className={`${campoBase} px-2 py-2`}
          >
            {ESCOPOS.map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </select>
        </label>
        {m.escopo === 'Série específica' && (
          <Selecao rotulo="Série" valor={m.serie ?? 1} opcoes={[1, 2, 3, 4, 5, 6]} onChange={(v) => onSet({ serie: v })} />
        )}
      </div>

      <div className="flex flex-wrap items-end gap-2">
        {m.metodo === 'Dropset' && (
          <>
            <Selecao rotulo="Etapas" valor={m.etapas ?? 1} opcoes={[1, 2, 3]} onChange={(v) => onSet({ etapas: v })} />
            {Array.from({ length: m.etapas ?? 1 }, (_, i) => i + 1).map((e) => (
              <div key={e} className="flex flex-wrap gap-1">
                <CampoNum rotulo={`Carga etapa ${e} (kg)`} valor={m.cargaEtapa?.[e - 1] ?? null} onChange={(v) => {
                  const arr = [...(m.cargaEtapa ?? [])]
                  arr[e - 1] = v ?? null
                  onSet({ cargaEtapa: arr })
                }} />
                <CampoNum rotulo={`Reps etapa ${e}`} valor={m.repsEtapa?.[e - 1] ?? null} onChange={(v) => {
                  const arr = [...(m.repsEtapa ?? [])]
                  arr[e - 1] = v ?? null
                  onSet({ repsEtapa: arr })
                }} />
              </div>
            ))}
            <CampoNum rotulo="Pausa interna (s)" valor={m.pausaInternaS ?? null} onChange={(v) => onSet({ pausaInternaS: v ?? undefined })} />
          </>
        )}
        {m.metodo === 'Clusterset' && (
          <>
            <CampoNum rotulo="Blocos" valor={m.blocos ?? null} onChange={(v) => onSet({ blocos: v ?? undefined })} />
            <CampoNum rotulo="Reps por bloco" valor={m.repsPorBloco ?? null} onChange={(v) => onSet({ repsPorBloco: v ?? undefined })} />
            <CampoNum rotulo="Pausa interna (s)" valor={m.pausaInternaS ?? null} onChange={(v) => onSet({ pausaInternaS: v ?? undefined })} />
          </>
        )}
        {m.metodo === 'Rest-pause' && (
          <>
            <CampoNum rotulo="Blocos" valor={m.blocos ?? null} onChange={(v) => onSet({ blocos: v ?? undefined })} />
            <CampoNum rotulo="Adicional" valor={m.adicional ?? null} onChange={(v) => onSet({ adicional: v ?? undefined })} />
            <CampoNum rotulo="Pausa interna (s)" valor={m.pausaInternaS ?? null} onChange={(v) => onSet({ pausaInternaS: v ?? undefined })} />
          </>
        )}
        {(m.metodo === 'Biset' || m.metodo === 'Superset' || m.metodo === 'Triset' || m.metodo === 'Circuito') && (
          <>
            <CampoNum rotulo="Grupo" valor={m.grupo ?? null} onChange={(v) => onSet({ grupo: v ?? undefined })} />
            <CampoNum rotulo="Pausa interna (s)" valor={m.pausaInternaS ?? null} onChange={(v) => onSet({ pausaInternaS: v ?? undefined })} />
          </>
        )}
        <CampoNum rotulo="Reps padrão (opcional)" valor={m.repsPadrao ?? null} onChange={(v) => onSet({ repsPadrao: v ?? undefined })} />
      </div>

      <div className="flex flex-wrap gap-2">
        <Botao onClick={onCopiar}>Copiar para todas as semanas</Botao>
        <Botao tipo="perigo" onClick={onRemover}>
          Remover
        </Botao>
      </div>
    </Cartao>
  )
}

function CampoNum({ rotulo, valor, onChange }: { rotulo: string; valor: number | null; onChange: (v: number | undefined) => void }) {
  return (
    <Campo
      rotulo={rotulo}
      type="number"
      value={valor ?? ''}
      onChange={(e) => onChange(e.target.value === '' ? undefined : Number(e.target.value))}
      className="w-32"
    />
  )
}

function Selecao({ rotulo, valor, opcoes, onChange }: { rotulo: string; valor: number; opcoes: number[]; onChange: (v: number) => void }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="text-slate-400">{rotulo}</span>
      <select
        value={valor}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`${campoBase} px-2 py-2`}
      >
        {opcoes.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  )
}
