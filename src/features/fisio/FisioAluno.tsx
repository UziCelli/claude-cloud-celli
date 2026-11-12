import { useRef, useState } from 'react'
import { metodoFisio, metodoLiberavel, type OrientacaoFisio } from '../../lib/fisio'
import { TEXTO_SEM_INTERNET, useSemInternet } from '../../lib/hooks'
import { Aviso, Botao, Cartao } from '../../ui'
import { BotaoVoltar } from '../../voltar'
import { relatarSinalFisio } from './acoesFisio'
import ConteudoMetodo from './ConteudoMetodo'
import { useOrientacoes } from './useOrientacoes'

export default function FisioAluno({ uid, pausado = false }: { uid: string; pausado?: boolean }) {
  const lista = useOrientacoes(uid)
  const offline = useSemInternet()
  return <main className="mx-auto max-w-md space-y-4 px-4 py-4">
    <BotaoVoltar para="/conta" />
    <h1 className="text-2xl font-bold">Físio · minhas orientações</h1>
    <p className="text-sm text-slate-300">Orientações individuais enviadas pelo seu coach. Não substituem avaliação de médico ou fisioterapeuta.</p>
    {pausado && <Aviso>Seu treino está pausado por saúde. Os protocolos ficam ocultos até o seu coach conversar com você e liberar. Você ainda pode consultar os alertas e relatar um sinal.</Aviso>}
    {lista.erro ? <Aviso>Não foi possível carregar suas orientações. Confira a conexão e abra esta tela novamente.</Aviso> : lista.carregando ? <p>Carregando…</p> : lista.dados.length === 0 ? <p>{offline ? TEXTO_SEM_INTERNET : 'Seu coach ainda não disponibilizou orientações aqui.'}</p> : lista.dados.map((o) => <Orientacao key={o.id} o={o} pendente={lista.pendente} pausado={pausado} />)}
    {lista.cache && <p className="text-sm text-amber-200">Você está vendo a cópia deste aparelho. Conecte-se para conferir atualizações do coach.</p>}
  </main>
}

function Orientacao({ o, pendente, pausado }: { o: OrientacaoFisio; pendente: boolean; pausado: boolean }) {
  const [relatando, setRelatando] = useState(false)
  const [erro, setErro] = useState('')
  const trava = useRef(false)
  const m = metodoFisio(o.metodoId)!
  const interrompida = o.sinalRelatado || relatando || !!erro
  async function relatar() {
    if (trava.current) return
    trava.current = true
    // A orientação de parada independe de internet ou confirmação do servidor.
    setRelatando(true)
    setErro('')
    try { await relatarSinalFisio(o.id); setRelatando(false) }
    catch { setErro('Não conseguimos confirmar o envio do relato. Fale diretamente com seu coach.'); setRelatando(false) }
    finally { trava.current = false }
  }
  return <Cartao>
    <h2 className="mb-3 font-semibold">{m.id} · {m.nome}</h2>
    <p className="mb-3 text-sm">Condição informada: {o.condicao}</p>
    {interrompida && <div className="mb-3" role="alert"><Aviso>Pare este exercício e procure médico ou fisioterapeuta. Não espere uma resposta do coach para buscar atendimento. O protocolo desta orientação foi ocultado.</Aviso></div>}
    {!interrompida && !pausado && o.recado && <p className="mb-3 whitespace-pre-wrap rounded-xl bg-slate-800 p-3 text-sm">Seu coach: {o.recado}</p>}
    {o.liberacao && <p className="mb-3 text-xs text-slate-300">Liberação registrada pelo coach: {o.liberacao.profissional} · {o.liberacao.registro} · {o.liberacao.data}</p>}
    <ConteudoMetodo metodo={m} protocolo={!interrompida && !pausado && metodoLiberavel(m.id)} />
    {!metodoLiberavel(m.id) && <Aviso>Esta orientação aguarda complemento dos sinais de alerta. Converse com seu coach antes de usar.</Aviso>}
    {!o.sinalRelatado && <Botao className="mt-3 w-full" tipo="perigo" disabled={relatando} onClick={relatar}>{relatando ? 'Relato aguardando confirmação…' : erro ? 'Tentar enviar relato novamente' : 'Estou com um desses sinais de alerta'}</Botao>}
    {(relatando || (o.sinalRelatado && pendente)) && <p role="status" className="mt-2 text-sm text-amber-200">Aguardando sincronização do relato. Se estiver sem internet, fale diretamente com seu coach.</p>}
    {o.sinalRelatado && !pendente && !relatando && <p role="status" className="mt-2 text-sm">Relato registrado para o coach.</p>}
    {erro && <p role="status" className="mt-2 text-sm text-amber-200">{erro}</p>}
  </Cartao>
}
