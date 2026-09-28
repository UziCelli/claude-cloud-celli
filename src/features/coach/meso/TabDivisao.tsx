import { useState } from 'react'
import type { Meso, Registros, Slot } from '../../../engine'
import { Aviso, Botao, Cartao } from '../../../ui'
import { nomesCatalogo, semanasComHistorico } from './util'

const rotuloPos = (p: number) => (p <= 2 ? 'Principal' : 'Auxiliar')

export default function TabDivisao({
  meso,
  registros,
  onAtualizar,
}: {
  meso: Meso
  registros: Registros
  onAtualizar: (patch: Partial<Meso>) => void
}) {
  const [aviso, setAviso] = useState<string | null>(null)
  const [hint, setHint] = useState<string | null>(null)

  function commit(t: number, p: number, nomeBruto: string) {
    const arr = meso.divisao[t - 1] ?? []
    const nome = nomeBruto.trim()

    if (p > arr.length + 1) return

    if (p === arr.length + 1) {
      if (!nome) return
      const divisao = [...meso.divisao]
      divisao[t - 1] = [...arr, { slotId: crypto.randomUUID(), nome }]
      onAtualizar({ divisao })
      return
    }

    const atual = arr[p - 1]
    if (!nome) {
      if (p !== arr.length) {
        setHint(`Não dá para limpar a posição ${p}: existem exercícios depois dela no treino ${t}.`)
        return
      }
      const divisao = [...meso.divisao]
      divisao[t - 1] = arr.slice(0, -1)
      onAtualizar({ divisao })
      return
    }

    if (nome === atual.nome) return

    const semanas = semanasComHistorico(meso, registros, t, p)
    const novoSlot: Slot = { slotId: crypto.randomUUID(), nome }
    const trocas = { ...meso.trocas }
    let preservou = false
    for (const w of semanas) {
      const chave = `${w}-${t}-${p}`
      if (!trocas[chave]) {
        trocas[chave] = atual
        preservou = true
      }
    }
    const divisao = [...meso.divisao]
    const novoArr = [...arr]
    novoArr[p - 1] = novoSlot
    divisao[t - 1] = novoArr
    onAtualizar({ divisao, trocas })
    if (preservou) {
      setAviso(
        `"${atual.nome}" foi trocado por "${nome}" no treino ${t}, posição ${p}. As semanas já com carga registrada continuam mostrando "${atual.nome}".`,
      )
    }
  }

  return (
    <div className="space-y-4">
      {aviso && <Aviso>{aviso}</Aviso>}
      <Cartao className="overflow-x-auto">
        <table className="w-full min-w-[500px] border-separate border-spacing-2 text-sm">
          <thead>
            <tr>
              <th className="text-left text-slate-400">Posição</th>
              {Array.from({ length: meso.frequencia }, (_, i) => i + 1).map((t) => (
                <th key={t} className="text-left text-slate-400">
                  Treino {t}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((p) => (
              <tr key={p}>
                <td className="whitespace-nowrap text-slate-400">
                  {p} · {rotuloPos(p)}
                </td>
                {Array.from({ length: meso.frequencia }, (_, i) => i + 1).map((t) => {
                  const arr = meso.divisao[t - 1] ?? []
                  if (p > arr.length + 1) return <td key={t} />
                  const slot = arr[p - 1]
                  return (
                    <td key={t}>
                      <div className="flex items-center gap-1">
                        <input
                          list="catalogo"
                          defaultValue={slot?.nome ?? ''}
                          key={slot?.slotId ?? `novo-${t}-${p}`}
                          placeholder={p === arr.length + 1 ? 'Adicionar…' : ''}
                          onBlur={(e) => commit(t, p, e.target.value)}
                          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2 py-1 text-base text-slate-100 outline-none focus:border-orange-500"
                        />
                        {slot && p === arr.length && (
                          <button
                            type="button"
                            title="Remover"
                            onClick={() => commit(t, p, '')}
                            className="px-1 text-slate-500 hover:text-red-400"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <datalist id="catalogo">
          {nomesCatalogo.map((n) => (
            <option key={n} value={n} />
          ))}
        </datalist>
      </Cartao>
      {hint && <Aviso>{hint}</Aviso>}
      <TrocasPontuais meso={meso} onAtualizar={onAtualizar} />
    </div>
  )
}

function TrocasPontuais({ meso, onAtualizar }: { meso: Meso; onAtualizar: (patch: Partial<Meso>) => void }) {
  const [semana, setSemana] = useState(1)
  const [treino, setTreino] = useState(1)
  const [pos, setPos] = useState(1)
  const [nome, setNome] = useState('')
  const trocas = meso.trocas ?? {}

  function adicionar() {
    if (!nome.trim()) return
    const chave = `${semana}-${treino}-${pos}`
    onAtualizar({ trocas: { ...trocas, [chave]: { slotId: crypto.randomUUID(), nome: nome.trim() } } })
    setNome('')
  }

  function remover(chave: string) {
    const copia = { ...trocas }
    delete copia[chave]
    onAtualizar({ trocas: copia })
  }

  const tamanhoTreino = meso.divisao[treino - 1]?.length ?? 0

  return (
    <Cartao className="space-y-3">
      <h3 className="font-semibold">Trocas pontuais</h3>
      <p className="text-sm text-slate-400">Troca o exercício de uma posição só numa semana específica.</p>
      <ul className="space-y-1 text-sm">
        {Object.entries(trocas).map(([chave, slot]) => {
          const [w, t, p] = chave.split('-')
          return (
            <li key={chave} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-slate-950 px-3 py-2">
              <span>
                Semana {w}, treino {t}, posição {p}: <b>{slot.nome}</b>
              </span>
              <Botao tipo="perigo" onClick={() => remover(chave)}>
                Remover
              </Botao>
            </li>
          )
        })}
        {Object.keys(trocas).length === 0 && <li className="text-slate-500">Nenhuma troca pontual.</li>}
      </ul>
      <div className="flex flex-wrap items-end gap-2">
        <Seletor rotulo="Semana" valor={semana} max={meso.semanas} onChange={setSemana} />
        <Seletor rotulo="Treino" valor={treino} max={meso.frequencia} onChange={(v) => { setTreino(v); setPos(1) }} />
        <Seletor rotulo="Posição" valor={pos} max={Math.max(1, tamanhoTreino)} onChange={setPos} />
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-slate-400">Exercício</span>
          <input
            list="catalogo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-base text-slate-100"
          />
        </label>
        <Botao tipo="primario" onClick={adicionar}>
          Adicionar
        </Botao>
      </div>
    </Cartao>
  )
}

function Seletor({ rotulo, valor, max, onChange }: { rotulo: string; valor: number; max: number; onChange: (v: number) => void }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="text-slate-400">{rotulo}</span>
      <select
        value={valor}
        onChange={(e) => onChange(Number(e.target.value))}
        className="rounded-lg border border-slate-700 bg-slate-950 px-2 py-2 text-base text-slate-100"
      >
        {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </label>
  )
}
