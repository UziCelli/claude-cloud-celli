import { useState } from 'react'
import { buscarExercicios, norm } from '../../lib/busca'
import { MAX_EXERCICIOS } from '../../lib/fisio'
import { campoBase } from '../../ui'

const chip = 'min-h-11 rounded-xl border border-slate-700 bg-slate-950 px-3 text-sm'

// Escolhe exercícios do treino do aluno ou do catálogo. Nunca texto livre.
export default function SeletorExercicios({ valor, doMeso, aoMudar, desabilitado = false }: { valor: string[]; doMeso: string[]; aoMudar: (v: string[]) => void; desabilitado?: boolean }) {
  const [texto, setTexto] = useState('')
  const tem = (nome: string) => valor.some((v) => norm(v.trim()) === norm(nome.trim()))
  const cheio = valor.length >= MAX_EXERCICIOS
  const add = (nome: string) => { if (!cheio && !tem(nome)) aoMudar([...valor, nome]); setTexto('') }
  const sugestoes = texto.trim() ? buscarExercicios(texto).filter((e) => !tem(e.nome)) : []
  const nenhum = valor.length > 0 && !valor.some((v) => doMeso.some((n) => norm(n.trim()) === norm(v.trim())))
  return <div className="space-y-2 text-sm">
    <p className="font-semibold">Exercícios do treino <span className="font-normal text-slate-400">({valor.length}/{MAX_EXERCICIOS})</span></p>
    <div className="flex flex-wrap gap-2">
      {valor.map((v) => <button key={v} type="button" disabled={desabilitado} aria-label={`Tirar ${v}`} className={`${chip} border-teal-600`} onClick={() => aoMudar(valor.filter((x) => x !== v))}>{v} ✕</button>)}
    </div>
    {nenhum && <p className="text-amber-200">Nenhum treino atual tem estes exercícios.</p>}
    {!cheio && <>
      {doMeso.filter((n) => !tem(n)).length > 0 && <>
        <p className="text-slate-400">Do treino atual do aluno</p>
        <div className="flex flex-wrap gap-2">{doMeso.filter((n) => !tem(n)).map((n) => <button key={n} type="button" disabled={desabilitado} className={chip} onClick={() => add(n)}>+ {n}</button>)}</div>
      </>}
      <input aria-label="Buscar exercício no catálogo" placeholder="Buscar no catálogo" disabled={desabilitado} className={`${campoBase} w-full p-3`} value={texto} onChange={(e) => setTexto(e.target.value)} />
      <div className="flex flex-wrap gap-2">{sugestoes.map((e) => <button key={e.nome} type="button" disabled={desabilitado} className={chip} onClick={() => add(e.nome)}>+ {e.nome}</button>)}</div>
    </>}
    {cheio && <p className="text-slate-400">Limite de {MAX_EXERCICIOS} exercícios.</p>}
  </div>
}
