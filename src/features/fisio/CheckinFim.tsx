import { useState } from 'react'
import { registroId } from '../../lib/conversores'
import { useSemInternet } from '../../lib/hooks'
import { checkinValido, PERGUNTAS_CHECKIN, type CampoCheckin, type CheckinForm, type SessaoCheckin } from '../../lib/checkin'
import { Botao } from '../../ui'
import { checkinJaExiste, registrarCheckin } from './acoesFisio'
import RelatarDor from './RelatarDor'
import { useCheckins } from './useCheckins'
import { useDores } from './useDores'

const chip = (on: boolean) => `min-h-11 rounded-xl border px-3 text-sm font-semibold ${on ? 'border-marca-400 bg-marca-600 text-white' : 'border-slate-700 bg-slate-950 text-slate-200'}`

type Estado = 'form' | 'enviando' | 'recebido' | 'ja' | 'erro' | 'pulado'

// "Como você está?" no fim do treino do aluno: um por sessão (id = registroId). Some se a sessão já tem resposta
// (servidor ou localStorage). Enviar mostra o andamento; Pular grava só o localStorage.
export default function CheckinFim({ uid, exercicios, sessao }: { uid: string; exercicios: string[]; sessao: SessaoCheckin }) {
  const id = registroId(sessao.mesoId, sessao.semana, sessao.treino)
  const chave = `forca-checkin-${id}`
  const [estado, setEstado] = useState<Estado>('form')
  const [dor, setDor] = useState<boolean | null>(null)
  const [n, setN] = useState<Partial<CheckinForm>>({})
  const lista = useCheckins(uid)
  // A1: "a dor do último treino passou em até 1 dia?" só quando houve relato de dor em outro treino nos últimos 7 dias
  // (mais de 4 h atrás, para não pegar o relato deste treino). É o sinal mais confiável depois da lesão prévia.
  const dores = useDores(uid)
  const [dor24h, setDor24h] = useState<boolean | null>(null)
  const agora = Date.now()
  const doeuAntes = dores.todos.some((d) => d.tipo === 'dor' && d.em && agora - d.em.toMillis() > 4 * 3600_000 && agora - d.em.toMillis() <= 7 * 86400_000)
  const offline = useSemInternet()
  if (estado === 'pulado') return null
  if (estado === 'form' && (lista.carregando || localStorage.getItem(chave) || lista.todos.some((c) => c.id === id))) return null
  const enviar = () => {
    if (!checkinValido(n)) return
    setEstado('enviando')
    // Sem await: offline fica na fila e o treino não espera. Não marca o localStorage aqui: o envio pendente já aparece
    // na lista local (o cartão some ao voltar) e, se o servidor recusar, o documento sai da lista e o cartão volta.
    registrarCheckin(uid, sessao, n, doeuAntes ? dor24h : null).then(() => setEstado('recebido'), async () => {
      const existe = await checkinJaExiste(sessao).catch(() => false)
      setEstado(existe ? 'ja' : 'erro')
    })
  }
  if (estado !== 'form' && estado !== 'erro') return <section aria-label="Como você está?" role="status" className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-sm">
    {estado === 'recebido' ? 'Recebido pelo seu coach.' : estado === 'ja' ? 'Você já respondeu este treino.' : offline ? 'Salvo no aparelho; vai para o seu coach quando houver internet.' : 'Enviando…'}
  </section>
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
    {doeuAntes && <fieldset><legend className="mb-1 text-sm">A dor do último treino passou em até 1 dia?</legend>
      <div className="flex gap-2">
        <button type="button" aria-pressed={dor24h === true} className={`${chip(dor24h === true)} flex-1`} onClick={() => setDor24h(true)}>Sim, passou</button>
        <button type="button" aria-pressed={dor24h === false} className={`${chip(dor24h === false)} flex-1`} onClick={() => setDor24h(false)}>Não passou</button>
      </div>
    </fieldset>}
    {PERGUNTAS_CHECKIN.map((p) => <fieldset key={p.id}><legend className="mb-1 text-sm">{p.rotulo}</legend>
      <div className="grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map((v) => <button key={v} type="button" aria-pressed={n[p.id as CampoCheckin] === v} aria-label={`${p.rotulo} ${v}`} className={`${chip(n[p.id as CampoCheckin] === v)} min-h-12 px-0 text-base`} onClick={() => setN((x) => ({ ...x, [p.id]: v }))}>{v}</button>)}
      </div>
      <div className="mt-1 flex justify-between text-xs text-slate-400"><span>1 · {p.ruim}</span><span>5 · {p.bom}</span></div>
    </fieldset>)}
    {estado === 'erro' && <p role="alert" className="text-sm text-amber-200">Não conseguimos enviar. Confira a conexão e tente de novo.</p>}
    <div className="flex gap-2">
      <Botao tipo="primario" tamanho="lg" className="flex-1" disabled={!checkinValido(n)} onClick={enviar}>{estado === 'erro' ? 'Tentar de novo' : 'Enviar'}</Botao>
      <Botao tipo="fantasma" tamanho="lg" onClick={() => { localStorage.setItem(chave, 'pulado'); setEstado('pulado') }}>Pular</Botao>
    </div>
  </section>
}
