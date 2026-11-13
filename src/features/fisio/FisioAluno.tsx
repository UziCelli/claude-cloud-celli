import { useMemo } from 'react'
import { metodoFisio, metodoLiberavel, type OrientacaoFisio } from '../../lib/fisio'
import { TEXTO_SEM_INTERNET, useSemInternet } from '../../lib/hooks'
import { Aviso, Cartao } from '../../ui'
import { BotaoVoltar } from '../../voltar'
import BotaoSinal from './BotaoSinal'
import ConteudoMetodo from './ConteudoMetodo'
import { type RelatoDor } from '../../lib/dor'
import { ROTULO_LOCAL } from './RelatarDor'
import { useDores } from './useDores'
import { alunosComDorRecente, useProgressao } from './useProgressao'
import { useOrientacoes } from './useOrientacoes'

export default function FisioAluno({ uid, pausado = false }: { uid: string; pausado?: boolean }) {
  const lista = useOrientacoes(uid)
  const offline = useSemInternet()
  const dores = useDores(uid)
  // A1: aviso descritivo ao aluno (pedido do Victor) só quando há progressão acima do planejado E dor na mesma região
  // nos últimos 14 dias. Sem diagnóstico; a decisão é do coach.
  const comDor = useMemo(() => alunosComDorRecente(dores.todos), [dores.todos])
  const prog = useProgressao(comDor, uid)
  const avisos = useMemo(() => {
    const agora = Date.now()
    const regioes = new Set<string>(dores.todos.filter((d) => d.tipo === 'dor' && d.em && agora - d.em.toMillis() <= 14 * 86400_000).map((d) => d.articulacao))
    return prog.progressao.filter((p) => p.articulacoes.some((a) => regioes.has(a)))
  }, [prog.progressao, dores.todos])
  return <main className="mx-auto max-w-md space-y-4 px-4 py-4">
    <BotaoVoltar para="/conta" />
    <h1 className="text-2xl font-bold">Físio · minhas orientações</h1>
    <p className="text-sm text-slate-300">Orientações individuais enviadas pelo seu coach. Não substituem avaliação de médico ou fisioterapeuta.</p>
    {pausado && <Aviso>Seu treino está pausado por saúde. Os protocolos ficam ocultos até o seu coach conversar com você e liberar. Você ainda pode consultar os alertas e relatar um sinal.</Aviso>}
    {lista.erro ? <Aviso>Não foi possível carregar suas orientações. Confira a conexão e abra esta tela novamente.</Aviso> : lista.carregando ? <p>Carregando…</p> : lista.dados.length === 0 ? (offline ? <p>{TEXTO_SEM_INTERNET}</p> : dores.dados.length === 0 && !dores.carregando && !dores.erro ? <p>Aqui aparecem as orientações do seu coach e os seus relatos de dor. No treino, toque em Senti dor.</p> : null) : lista.dados.map((o) => <Orientacao key={o.id} o={o} pendente={lista.pendente} pausado={pausado} />)}
    {avisos.length > 0 && <section aria-label="Seu treino nas últimas semanas" className="space-y-2 rounded-2xl border border-amber-600 bg-amber-950/50 p-4 text-sm text-amber-100">
      <h2 className="text-base font-bold">Seu treino nas últimas semanas</h2>
      {avisos.map((p) => <p key={p.tipo + p.id}>{p.texto}</p>)}
      <p className="text-amber-200">Você relatou dor nessa região. Converse com seu coach antes de mudar o treino.</p>
    </section>}
    <h2 className="pt-2 text-xl font-bold">Meus relatos de dor</h2>
    {dores.erro ? <Aviso>Não foi possível carregar seus relatos.</Aviso> : dores.carregando ? <p>Carregando…</p> : dores.dados.length === 0 ? <p className="text-sm text-slate-400">{offline ? TEXTO_SEM_INTERNET : 'Você ainda não relatou dor. Use "Senti dor" na tela do treino.'}</p> : dores.dados.map((d) => <Cartao key={d.id}>
      <p className="font-semibold">{d.exercicio}</p>
      <p className="text-sm">{descreverDor(d)}</p>
      {d.texto && <p className="mt-1 whitespace-pre-wrap text-sm text-slate-300">{d.texto}</p>}
      {d.resposta && <p className="mt-2 whitespace-pre-wrap rounded-xl bg-slate-800 p-3 text-sm">Seu coach: {d.resposta}</p>}
    </Cartao>)}
    {lista.cache && <p className="text-sm text-amber-200">Você está vendo a cópia deste aparelho. Conecte-se para conferir atualizações do coach.</p>}
  </main>
}

function Orientacao({ o, pendente, pausado }: { o: OrientacaoFisio; pendente: boolean; pausado: boolean }) {
  const m = metodoFisio(o.metodoId)!
  return <Cartao>
    <h2 className="mb-3 font-semibold">{m.id} · {m.nome}</h2>
    <p className="mb-3 text-sm">Condição informada: {o.condicao}</p>
    {o.exercicios.length > 0 && <p className="mb-3 text-sm text-slate-300">No seu treino em: {o.exercicios.join(', ')}</p>}
    <BotaoSinal id={o.id} sinalRelatado={o.sinalRelatado} pendente={pendente}>{(interrompida) => <>
      {!interrompida && !pausado && o.recado && <p className="mb-3 whitespace-pre-wrap rounded-xl bg-slate-800 p-3 text-sm">Seu coach: {o.recado}</p>}
      {o.liberacao && <p className="mb-3 text-xs text-slate-300">Liberação registrada pelo coach: {o.liberacao.profissional} · {o.liberacao.registro} · {o.liberacao.data}</p>}
      <ConteudoMetodo metodo={m} protocolo={!interrompida && !pausado && metodoLiberavel(m.id)} />
    </>}</BotaoSinal>
  </Cartao>
}

export const descreverDor = (d: RelatoDor) => `${d.em ? d.em.toDate().toLocaleDateString('pt-BR') : 'Agora'} · ${ROTULO_LOCAL[d.articulacao]} · ${d.tipo === 'dor' ? 'Dor' : 'Outra sensação'} ${d.intensidade}/10 · ${d.momento === 'durante' ? 'durante o treino' : 'no fim do treino'}`
