import { useState } from 'react'
import type { Meso, Registros, Slot } from '../../../engine'
import { Aviso, Botao, campoBase, Cartao, Msg } from '../../../ui'
import CampoExercicio from './CampoExercicio'
import { semanasComHistorico } from './util'


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
  const [treinoSel, setTreinoSel] = useState(1)

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

  function mudarPausa(t: number, p: number, v: string) {
    const slot = meso.divisao[t - 1]?.[p - 1]
    const n = v.trim() === '' ? undefined : Math.max(0, Math.round(Number(v)))
    if (!slot || n === slot.pausaS || (n !== undefined && Number.isNaN(n))) return
    const { pausaS: _, ...resto } = slot
    const divisao = [...meso.divisao]
    divisao[t - 1] = meso.divisao[t - 1].map((x, i) => (i === p - 1 ? (n === undefined ? resto : { ...resto, pausaS: n }) : x))
    onAtualizar({ divisao })
  }

  const treinos = Array.from({ length: meso.frequencia }, (_, i) => i + 1)
  const posicoes = Array.from({ length: 10 }, (_, i) => i + 1)

  const sel = Math.min(treinoSel, meso.frequencia)

  // Cartão de um treino: usado em grade (md+) e sozinho (celular).
  function cartaoTreino(t: number) {
    const arr = meso.divisao[t - 1] ?? []
    return (
      <div key={t} data-testid={`treino-${t}`} className={`rounded-lg border border-slate-800 bg-slate-950 text-sm ${t === sel ? '' : 'hidden md:block'}`}>
        <p className="border-b border-slate-800 px-3 py-2 font-semibold">Treino {t}</p>
        <ul className="divide-y divide-slate-800">
          {posicoes.map((p) => {
            if (p > arr.length + 1) return null
            const slot = arr[p - 1]
            return (
              <li key={p} className="flex items-center gap-2 px-3 py-2">
                <span className="w-4 shrink-0 text-slate-500">{p}</span>
                <CampoExercicio
                  key={slot?.slotId ?? `novo-${t}-${p}`}
                  inicial={slot?.nome ?? ''}
                  placeholder={p === arr.length + 1 ? 'Adicionar…' : ''}
                  onConfirmar={(nome) => commit(t, p, nome)}
                  className="flex-1"
                />
                {slot && (
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    aria-label={`Pausa em segundos, posição ${p}`}
                    placeholder="pausa (s)"
                    defaultValue={slot.pausaS ?? ''}
                    key={`${slot.slotId}-${slot.pausaS ?? ''}`}
                    onBlur={(e) => mudarPausa(t, p, e.target.value)}
                    className={`${campoBase} w-20 shrink-0 px-2 py-2 text-center outline-none focus:border-marca-500`}
                  />
                )}
                {slot && p === arr.length && (
                  <button type="button" title="Remover" onClick={() => commit(t, p, '')} className="shrink-0 px-1 text-lg text-slate-500 hover:text-red-400">
                    ×
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Msg>{aviso && <Aviso>{aviso}</Aviso>}</Msg>
      <Cartao>
        <div className="mb-3 flex gap-2 overflow-x-auto md:hidden">
          {treinos.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTreinoSel(t)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-semibold ${sel === t ? 'bg-marca-500 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              Treino {t}
            </button>
          ))}
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{treinos.map(cartaoTreino)}</div>
        <p className="mt-3 text-xs text-slate-400">Pausa em branco = pausa do mesociclo.</p>
      </Cartao>
      <Msg>{hint && <Aviso>{hint}</Aviso>}</Msg>
      <TrocasPontuais meso={meso} onAtualizar={onAtualizar} />
    </div>
  )
}

function TrocasPontuais({ meso, onAtualizar }: { meso: Meso; onAtualizar: (patch: Partial<Meso>) => void }) {
  const [semana, setSemana] = useState(1)
  const [treino, setTreino] = useState(1)
  const [pos, setPos] = useState(1)
  const [nome, setNome] = useState('')
  const [chaveCampo, setChaveCampo] = useState(0)
  const trocas = meso.trocas ?? {}

  function adicionar() {
    if (!nome.trim()) return
    const chave = `${semana}-${treino}-${pos}`
    onAtualizar({ trocas: { ...trocas, [chave]: { slotId: crypto.randomUUID(), nome: nome.trim() } } })
    setNome('')
    setChaveCampo((k) => k + 1)
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
              <span className="min-w-0">
                Semana {w} · Treino {t} · Pos. {p}
                <b className="block text-base">{slot.nome}</b>
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
        <label className="flex w-full flex-col gap-1 text-sm md:w-auto">
          <span className="text-slate-400">Exercício</span>
          <CampoExercicio key={chaveCampo} onTexto={setNome} className="w-full md:w-72" />
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
        className={`${campoBase} px-2 py-2`}
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
