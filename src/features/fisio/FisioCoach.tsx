import { collection, query, where } from 'firebase/firestore'
import { useMemo, useRef, useState } from 'react'
import { PERGUNTAS, maisRecente } from '../../lib/anamnese'
import { CONTEXTOS_LIBERACAO, contextoPelaAnamnese, doresDaAnamnese, metodoFisio, metodoLiberavel, metodosRelacionados, precisaLiberacao, validarOrientacao, type OrientacaoFisio, type OrientacaoForm } from '../../lib/fisio'
import { docParaMeso, type MesoSalvo } from '../../lib/conversores'
import { db } from '../../lib/firebase'
import { mesoAtual } from '../aluno/mesoAtual'
import { useAnamnesesDoAluno } from '../anamnese/AnamneseCoach'
import SeletorExercicios from './SeletorExercicios'
import { TEXTO_SEM_INTERNET, useLista, useSemInternet } from '../../lib/hooks'
import { Aviso, Botao, Campo, Cartao, campoBase } from '../../ui'
import { BotaoVoltar } from '../../voltar'
import { enviarOrientacao, marcarDorVista, recolherOrientacao, responderDor, salvarExerciciosFisio } from './acoesFisio'
import ConteudoMetodo from './ConteudoMetodo'
import { type RelatoDor } from '../../lib/dor'
import { descreverDor } from './FisioAluno'
import { useDores } from './useDores'
import { useOrientacoes } from './useOrientacoes'

const rotuloResposta = (id: string, v: unknown) => PERGUNTAS.flatMap((e) => e.perguntas).flatMap((p) => ('opcoes' in p && p.id === id ? p.opcoes.filter((o) => o.id === v) : [])).map((o) => o.rotulo)[0]
const MES = 30 * 86_400_000

const vazio = (): OrientacaoForm => ({ metodoId: '', condicao: '', recado: '', contextoLiberacao: false, liberacao: null, alertasRevisados: false })

export default function FisioCoach({ uid }: { uid: string }) {
  const lista = useOrientacoes(uid, true)
  const dores = useDores(uid)
  const offline = useSemInternet()
  const [f0, setF] = useState(vazio)
  const [exercicios, setExercicios] = useState<string[]>([])
  const an = useAnamnesesDoAluno(uid)
  const r = maisRecente(an.dados)?.r
  const mesos = useLista<MesoSalvo>(useMemo(() => query(collection(db, 'mesos'), where('alunoId', '==', uid)), [uid]))
  const doMeso = useMemo(() => { const a = mesoAtual(mesos.dados); return a ? [...new Set(a.meso.divisao.flat().map((s) => s.nome.trim()))] : [] }, [mesos.dados])
  const motivo = contextoPelaAnamnese(r)
  const noAnamnese = doresDaAnamnese(r)
  const f = motivo ? { ...f0, contextoLiberacao: true } : f0
  const { relacionados, outros } = metodosRelacionados([...noAnamnese, ...dores.dados.filter((d) => d.em && Date.now() - d.em.toMillis() < MES).map((d) => d.articulacao)])
  const opcaoMetodo = (m: { id: string; nome: string }) => <option key={m.id} value={m.id}>{m.id} · {m.nome}{!metodoLiberavel(m.id) ? ' (só consulta)' : ''}</option>
  const [contextoEscolhido, setContexto] = useState('')
  const contexto = motivo ? 'sim' : contextoEscolhido
  const [enviando, setEnviando] = useState(false)
  const [msg, setMsg] = useState('')
  const trava = useRef(false)
  const metodo = metodoFisio(f.metodoId)
  const precisa = precisaLiberacao(f)
  const erro = validarOrientacao(f, new Date().toISOString().slice(0, 10))
  async function enviar(e: React.FormEvent) {
    e.preventDefault()
    if (erro || !contexto || offline || trava.current) return
    trava.current = true
    setEnviando(true)
    setMsg('')
    try {
      await enviarOrientacao(uid, f, exercicios)
      setF(vazio()); setContexto(''); setExercicios([]); setMsg('Orientação enviada ao aluno.')
    } catch { setMsg('Não foi possível confirmar o envio. Confira a conexão e tente de novo.') }
    finally { setEnviando(false); trava.current = false }
  }
  async function recolher(id: string) {
    if (!confirm('Recolher esta orientação? O aluno deixará de vê-la. O histórico será preservado.')) return
    setMsg('Recolhimento aguardando confirmação do servidor…')
    try { await recolherOrientacao(id); setMsg('Orientação recolhida.') }
    catch { setMsg('Não foi possível recolher. Confira a conexão e tente de novo.') }
  }
  return <main className="mx-auto max-w-md space-y-4 px-4 py-4 lg:max-w-2xl">
    <BotaoVoltar para={`/aluno/${uid}`} />
    <h1 className="text-2xl font-bold">Físio · orientações do aluno</h1>
    <p className="text-sm text-slate-300">Revise os alertas com o aluno. Registre uma liberação profissional existente quando exigida. O app não emite liberação clínica nem altera o treino automaticamente.</p>
    <Cartao>
      <h2 className="mb-2 font-semibold">Da anamnese</h2>
      {!r ? <p className="text-sm text-slate-400">Sem anamnese respondida.</p> : <ul className="space-y-1 text-sm">
        <li>Dores: {noAnamnese.length ? noAnamnese.map((d) => rotuloResposta('dores', d) ?? d).join(', ') : 'nenhuma marcada'}</li>
        {typeof r.lesoes === 'string' && r.lesoes.trim() && <li>Lesões: {r.lesoes}</li>}
        {rotuloResposta('sono', r.sono) && <li>Sono: {rotuloResposta('sono', r.sono)}</li>}
        {rotuloResposta('estresse', r.estresse) && <li>Estresse: {rotuloResposta('estresse', r.estresse)}</li>}
      </ul>}
    </Cartao>
    <a href="#/fisio" className="inline-flex min-h-11 items-center text-marca-300 underline">Consultar todos os métodos</a>
    <Cartao>
      <h2 className="mb-3 font-semibold">Nova orientação</h2>
      <form onSubmit={enviar} className="space-y-4">
        <label className="block text-sm">Método
          <select aria-label="Método" className={`${campoBase} mt-1 w-full p-3`} value={f.metodoId} disabled={enviando} onChange={(e) => { setF({ ...vazio(), metodoId: e.target.value }); setContexto(''); setMsg('') }}>
            <option value="">Escolha um método</option>
            {relacionados.length > 0 && <optgroup label="Relacionados às queixas do aluno">{relacionados.map(opcaoMetodo)}</optgroup>}
            <optgroup label="Outros métodos">{outros.map(opcaoMetodo)}</optgroup>
          </select>
        </label>
        {metodo && <>
          <ConteudoMetodo metodo={metodo} />
          {metodoLiberavel(metodo.id) && <fieldset disabled={enviando} className="space-y-3">
            <Campo rotulo="Condição informada pelo aluno ou já diagnosticada por médico/fisioterapeuta" maxLength={300} required value={f.condicao} onChange={(e) => setF({ ...f0, condicao: e.target.value })} />
            <label className="block text-sm">Recado individual (opcional)
              <textarea maxLength={2000} className={`${campoBase} mt-1 w-full p-3`} rows={3} value={f.recado} onChange={(e) => setF({ ...f0, recado: e.target.value })} />
            </label>
            <label className="block text-sm">Há algum destes contextos? {CONTEXTOS_LIBERACAO}.
              <select className={`${campoBase} mt-1 w-full p-3`} required disabled={!!motivo} value={contexto} onChange={(e) => { setContexto(e.target.value); setF({ ...f0, contextoLiberacao: e.target.value === 'sim', liberacao: e.target.value !== 'sim' && !metodo.liberacao ? null : f.liberacao }) }}>
                <option value="">Confirme com o aluno</option><option value="nao">Não</option><option value="sim">Sim, exige liberação profissional</option>
              </select>
              {motivo && <span className="mt-1 block text-slate-300">{motivo}</span>}
            </label>
            <SeletorExercicios valor={exercicios} doMeso={doMeso} aoMudar={setExercicios} />
            {precisa && <div className="space-y-3 rounded-xl border border-amber-700 p-3">
              <p className="text-sm text-amber-200">Registre a liberação de médico ou fisioterapeuta que você conferiu. Para os métodos com condição de liberação, o registro é obrigatório nesta versão.</p>
              <Campo rotulo="Profissional que liberou (nome e profissão)" required maxLength={120} value={f.liberacao?.profissional ?? ''} onChange={(e) => setF({ ...f0, liberacao: { ...(f0.liberacao ?? { profissional: '', registro: '', data: '' }), profissional: e.target.value } })} />
              <Campo rotulo="Conselho/registro do profissional" required maxLength={80} value={f.liberacao?.registro ?? ''} onChange={(e) => setF({ ...f0, liberacao: { ...(f0.liberacao ?? { profissional: '', registro: '', data: '' }), registro: e.target.value } })} />
              <Campo rotulo="Data da liberação" type="date" required max={new Date().toISOString().slice(0, 10)} value={f.liberacao?.data ?? ''} onChange={(e) => setF({ ...f0, liberacao: { ...(f0.liberacao ?? { profissional: '', registro: '', data: '' }), data: e.target.value } })} />
            </div>}
            <label className="flex min-h-11 items-start gap-3 text-sm"><input className="mt-1 size-5 shrink-0" type="checkbox" checked={f.alertasRevisados} onChange={(e) => setF({ ...f0, alertasRevisados: e.target.checked })} />Revisei os sinais de alerta com o aluno e nenhum deles está presente agora.</label>
            {erro && <p className="text-sm text-slate-300">{erro}</p>}
            <Botao tipo="primario" type="submit" className="w-full" disabled={!!erro || !contexto || offline || enviando}>{enviando ? 'Confirmando envio…' : 'Enviar orientação ao aluno'}</Botao>
          </fieldset>}
        </>}
      </form>
    </Cartao>
    {offline && <Aviso>{enviando ? 'Sem internet. Aguardando sincronização para confirmar o envio.' : 'Sem internet. Conecte-se para enviar uma orientação.'}</Aviso>}
    {msg && <p role="status" className="text-sm">{msg}</p>}
    <h2 className="font-semibold">Relatos de dor</h2>
    {dores.erro ? <Aviso>Não foi possível carregar os relatos de dor.</Aviso> : dores.carregando ? <p>Carregando…</p> : dores.dados.length === 0 ? <p className="text-sm text-slate-400">{offline ? TEXTO_SEM_INTERNET : 'Nenhum relato de dor.'}</p> : dores.dados.map((d) => <Relato key={d.id} d={d} naAnamnese={noAnamnese.includes(d.articulacao)} />)}
    <h2 className="font-semibold">Histórico de orientações</h2>
    {lista.erro ? <Aviso>Não foi possível carregar as orientações. Confira a conexão e tente abrir esta tela novamente.</Aviso> : lista.carregando ? <p>Carregando…</p> : lista.dados.length === 0 ? <p className="text-sm text-slate-400">{offline ? TEXTO_SEM_INTERNET : 'Nenhuma orientação enviada.'}</p> : lista.dados.map((o) => <Cartao key={o.id}>
      <h3 className="font-semibold">{o.metodoId} · {metodoFisio(o.metodoId)?.nome}</h3>
      <p className="mt-2 text-sm">Condição informada: {o.condicao}</p>
      {o.recado && <p className="mt-2 whitespace-pre-wrap text-sm">{o.recado}</p>}
      {o.liberacao && <p className="mt-2 text-sm">Liberação registrada: {o.liberacao.profissional} · {o.liberacao.registro} · {o.liberacao.data}</p>}
      {o.sinalRelatado && <div className="mt-3"><Aviso>Aluno relatou um sinal de alerta. A orientação de parada foi exibida e o protocolo está oculto. Converse com ele e oriente avaliação profissional.</Aviso></div>}
      <p className="my-2 text-sm text-slate-400">{o.recolhida ? 'Recolhida · preservada no histórico' : o.sinalRelatado ? 'Interrompida por sinal de alerta' : 'Disponível ao aluno'}{o.em && ` · ${o.em.toDate().toLocaleDateString('pt-BR')}`}</p>
      {!o.recolhida && <ExerciciosDaOrientacao o={o} doMeso={doMeso} />}
      {!o.recolhida && <Botao onClick={() => recolher(o.id)}>Recolher orientação</Botao>}
    </Cartao>)}
  </main>
}

function ExerciciosDaOrientacao({ o, doMeso }: { o: OrientacaoFisio; doMeso: string[] }) {
  const [msg, setMsg] = useState('')
  const semInternet = useSemInternet()
  async function mudar(v: string[]) {
    setMsg('')
    if (semInternet) { setMsg(TEXTO_SEM_INTERNET); return }
    try { await salvarExerciciosFisio(o.id, v) } catch { setMsg('Não foi possível salvar. Confira a conexão e tente de novo.') }
  }
  return <div className="my-3"><SeletorExercicios valor={o.exercicios} doMeso={doMeso} aoMudar={mudar} />{msg && <p role="status" className="mt-2 text-sm">{msg}</p>}</div>
}

function Relato({ d, naAnamnese }: { d: RelatoDor; naAnamnese: boolean }) {
  const [resposta, setResposta] = useState('')
  const [msg, setMsg] = useState('')
  const semInternet = useSemInternet()
  const rodar = async (f: () => Promise<void>, ok: string) => {
    setMsg('')
    if (semInternet) { setMsg(TEXTO_SEM_INTERNET); return } // offline o updateDoc só termina ao sincronizar: a tela ficaria sem resposta
    try { await f(); setMsg(ok) } catch { setMsg('Não foi possível salvar. Confira a conexão e tente de novo.') }
  }
  return <Cartao>
    <h3 className="font-semibold">{d.exercicio}</h3>
    <p className="text-sm">{descreverDor(d)}</p>
    {d.articulacao !== 'outro' && <span className="mt-1 inline-block rounded-full bg-slate-800 px-2 py-0.5 text-xs">{naAnamnese ? 'já na anamnese' : 'novo'}</span>}
    {d.texto && <p className="mt-1 whitespace-pre-wrap text-sm">{d.texto}</p>}
    {d.resposta ? <p className="mt-2 whitespace-pre-wrap rounded-xl bg-slate-800 p-3 text-sm">Sua resposta: {d.resposta}</p> : <>
      <label className="mt-2 block text-sm">Responder
        <textarea maxLength={1000} rows={2} className={`${campoBase} mt-1 w-full p-3`} value={resposta} onChange={(e) => setResposta(e.target.value)} />
      </label>
      <Botao className="mt-2" tipo="primario" disabled={!resposta.trim()} onClick={() => rodar(() => responderDor(d.id, resposta), 'Resposta enviada.')}>Enviar resposta</Botao>
    </>}
    {!d.vistoEm && !d.resposta && <Botao className="ml-2 mt-2" onClick={() => rodar(() => marcarDorVista(d.id), 'Marcado como visto.')}>Marcar como visto</Botao>}
    {d.vistoEm && <p className="mt-2 text-xs text-slate-400">Visto</p>}
    {msg && <p role="status" className="mt-2 text-sm">{msg}</p>}
  </Cartao>
}
