import { useRef, useState } from 'react'
import { METODOS_FISIO } from '../../data/fisio'
import { CONTEXTOS_LIBERACAO, metodoFisio, metodoLiberavel, precisaLiberacao, validarOrientacao, type OrientacaoForm } from '../../lib/fisio'
import { TEXTO_SEM_INTERNET, useSemInternet } from '../../lib/hooks'
import { Aviso, Botao, Campo, Cartao, campoBase } from '../../ui'
import { BotaoVoltar } from '../../voltar'
import { enviarOrientacao, recolherOrientacao } from './acoesFisio'
import ConteudoMetodo from './ConteudoMetodo'
import { useOrientacoes } from './useOrientacoes'

const vazio = (): OrientacaoForm => ({ metodoId: '', condicao: '', recado: '', contextoLiberacao: false, liberacao: null, alertasRevisados: false })

export default function FisioCoach({ uid }: { uid: string }) {
  const lista = useOrientacoes(uid, true)
  const offline = useSemInternet()
  const [f, setF] = useState(vazio)
  const [contexto, setContexto] = useState('')
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
      await enviarOrientacao(uid, f)
      setF(vazio()); setContexto(''); setMsg('Orientação enviada ao aluno.')
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
    <a href="#/fisio" className="inline-flex min-h-11 items-center text-marca-300 underline">Consultar todos os métodos</a>
    <Cartao>
      <h2 className="mb-3 font-semibold">Nova orientação</h2>
      <form onSubmit={enviar} className="space-y-4">
        <label className="block text-sm">Método
          <select aria-label="Método" className={`${campoBase} mt-1 w-full p-3`} value={f.metodoId} disabled={enviando} onChange={(e) => { setF({ ...vazio(), metodoId: e.target.value }); setContexto(''); setMsg('') }}>
            <option value="">Escolha um método</option>
            {METODOS_FISIO.map((m) => <option key={m.id} value={m.id}>{m.id} · {m.nome}{!metodoLiberavel(m.id) ? ' (só consulta)' : ''}</option>)}
          </select>
        </label>
        {metodo && <>
          <ConteudoMetodo metodo={metodo} />
          {metodoLiberavel(metodo.id) && <fieldset disabled={enviando} className="space-y-3">
            <Campo rotulo="Condição informada pelo aluno ou já diagnosticada por médico/fisioterapeuta" maxLength={300} required value={f.condicao} onChange={(e) => setF({ ...f, condicao: e.target.value })} />
            <label className="block text-sm">Recado individual (opcional)
              <textarea maxLength={2000} className={`${campoBase} mt-1 w-full p-3`} rows={3} value={f.recado} onChange={(e) => setF({ ...f, recado: e.target.value })} />
            </label>
            <label className="block text-sm">Há algum destes contextos? {CONTEXTOS_LIBERACAO}.
              <select className={`${campoBase} mt-1 w-full p-3`} required value={contexto} onChange={(e) => { setContexto(e.target.value); setF({ ...f, contextoLiberacao: e.target.value === 'sim', liberacao: e.target.value !== 'sim' && !metodo.liberacao ? null : f.liberacao }) }}>
                <option value="">Confirme com o aluno</option><option value="nao">Não</option><option value="sim">Sim, exige liberação profissional</option>
              </select>
            </label>
            {precisa && <div className="space-y-3 rounded-xl border border-amber-700 p-3">
              <p className="text-sm text-amber-200">Registre a liberação de médico ou fisioterapeuta que você conferiu. Para os métodos com condição de liberação, o registro é obrigatório nesta versão.</p>
              <Campo rotulo="Profissional que liberou (nome e profissão)" required maxLength={120} value={f.liberacao?.profissional ?? ''} onChange={(e) => setF({ ...f, liberacao: { ...(f.liberacao ?? { profissional: '', registro: '', data: '' }), profissional: e.target.value } })} />
              <Campo rotulo="Conselho/registro do profissional" required maxLength={80} value={f.liberacao?.registro ?? ''} onChange={(e) => setF({ ...f, liberacao: { ...(f.liberacao ?? { profissional: '', registro: '', data: '' }), registro: e.target.value } })} />
              <Campo rotulo="Data da liberação" type="date" required max={new Date().toISOString().slice(0, 10)} value={f.liberacao?.data ?? ''} onChange={(e) => setF({ ...f, liberacao: { ...(f.liberacao ?? { profissional: '', registro: '', data: '' }), data: e.target.value } })} />
            </div>}
            <label className="flex min-h-11 items-start gap-3 text-sm"><input className="mt-1 size-5 shrink-0" type="checkbox" checked={f.alertasRevisados} onChange={(e) => setF({ ...f, alertasRevisados: e.target.checked })} />Revisei os sinais de alerta com o aluno e nenhum deles está presente agora.</label>
            {erro && <p className="text-sm text-slate-300">{erro}</p>}
            <Botao tipo="primario" type="submit" className="w-full" disabled={!!erro || !contexto || offline || enviando}>{enviando ? 'Confirmando envio…' : 'Enviar orientação ao aluno'}</Botao>
          </fieldset>}
        </>}
      </form>
    </Cartao>
    {offline && <Aviso>{enviando ? 'Sem internet. Aguardando sincronização para confirmar o envio.' : 'Sem internet. Conecte-se para enviar uma orientação.'}</Aviso>}
    {msg && <p role="status" className="text-sm">{msg}</p>}
    <h2 className="font-semibold">Histórico de orientações</h2>
    {lista.erro ? <Aviso>Não foi possível carregar as orientações. Confira a conexão e tente abrir esta tela novamente.</Aviso> : lista.carregando ? <p>Carregando…</p> : lista.dados.length === 0 ? <p className="text-sm text-slate-400">{offline ? TEXTO_SEM_INTERNET : 'Nenhuma orientação enviada.'}</p> : lista.dados.map((o) => <Cartao key={o.id}>
      <h3 className="font-semibold">{o.metodoId} · {metodoFisio(o.metodoId)?.nome}</h3>
      <p className="mt-2 text-sm">Condição informada: {o.condicao}</p>
      {o.recado && <p className="mt-2 whitespace-pre-wrap text-sm">{o.recado}</p>}
      {o.liberacao && <p className="mt-2 text-sm">Liberação registrada: {o.liberacao.profissional} · {o.liberacao.registro} · {o.liberacao.data}</p>}
      {o.sinalRelatado && <div className="mt-3"><Aviso>Aluno relatou um sinal de alerta. A orientação de parada foi exibida e o protocolo está oculto. Converse com ele e oriente avaliação profissional.</Aviso></div>}
      <p className="my-2 text-sm text-slate-400">{o.recolhida ? 'Recolhida · preservada no histórico' : o.sinalRelatado ? 'Interrompida por sinal de alerta' : 'Disponível ao aluno'}{o.em && ` · ${o.em.toDate().toLocaleDateString('pt-BR')}`}</p>
      {!o.recolhida && <Botao onClick={() => recolher(o.id)}>Recolher orientação</Botao>}
    </Cartao>)}
  </main>
}
