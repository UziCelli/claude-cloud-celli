import { useState } from 'react'
import { checkinValido, PERGUNTAS_CHECKIN, type CampoCheckin, type CheckinForm } from '../../lib/checkin'
import { Botao } from '../../ui'
import { registrarCheckin } from './acoesFisio'
import RelatarDor from './RelatarDor'

const chip = (on: boolean) => `min-h-11 rounded-xl border px-3 text-sm font-semibold ${on ? 'border-marca-400 bg-marca-600 text-white' : 'border-slate-700 bg-slate-950 text-slate-200'}`

// "Como você está?" no fim do treino do aluno. Enviar e Pular fazem o cartão sumir; Pular não grava nada.
export default function CheckinFim({ uid, exercicios }: { uid: string; exercicios: string[] }) {
  const [feito, setFeito] = useState(false)
  const [dor, setDor] = useState<boolean | null>(null)
  const [n, setN] = useState<Partial<CheckinForm>>({})
  if (feito) return null
  const enviar = () => {
    if (!checkinValido(n)) return
    registrarCheckin(uid, n).catch(() => {}) // sem await: offline fica na fila
    setFeito(true)
  }
  return <section aria-label="Como você está?" className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-4">
    <div>
      <h2 className="text-lg font-bold">Como você está?</h2>
      <p className="text-sm text-slate-400">Vai só para o seu coach.</p>
    </div>
    <fieldset><legend className="mb-1 text-sm">Sentiu dor hoje?</legend>
      <div className="flex gap-2">
        <button type="button" aria-pressed={dor === false} className={`${chip(dor === false)} flex-1`} onClick={() => setDor(false)}>Não</button>
        <button type="button" aria-pressed={dor === true} className={`${chip(dor === true)} flex-1`} onClick={() => setDor(true)}>Sim</button>
      </div>
    </fieldset>
    {dor && <RelatarDor key={String(dor)} uid={uid} exercicios={exercicios} momentoInicial="fim" semBotao aoFechar={() => setDor(null)} />}
    {PERGUNTAS_CHECKIN.map((p) => <fieldset key={p.id}><legend className="mb-1 text-sm">{p.rotulo}</legend>
      <div className="grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map((v) => <button key={v} type="button" aria-pressed={n[p.id as CampoCheckin] === v} aria-label={`${p.rotulo} ${v}`} className={`${chip(n[p.id as CampoCheckin] === v)} min-h-12 px-0 text-base`} onClick={() => setN((x) => ({ ...x, [p.id]: v }))}>{v}</button>)}
      </div>
      <div className="mt-1 flex justify-between text-xs text-slate-400"><span>1 · {p.ruim}</span><span>5 · {p.bom}</span></div>
    </fieldset>)}
    <div className="flex gap-2">
      <Botao tipo="primario" tamanho="lg" className="flex-1" disabled={!checkinValido(n)} onClick={enviar}>Enviar</Botao>
      <Botao tipo="fantasma" tamanho="lg" onClick={() => setFeito(true)}>Pular</Botao>
    </div>
  </section>
}
