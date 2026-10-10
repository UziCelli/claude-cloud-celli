import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { collection, query, where, type Timestamp } from 'firebase/firestore'
import type { Usuario } from '../../../lib/acesso'
import { arquivarAlerta, consultaRegistrosRecentes, desarquivarAlerta, limparArquivadosAntigos, marcarAdaptado, salvarMeso } from '../../../lib/acoes'
import type { MesoSalvo } from '../../../lib/conversores'
import { db } from '../../../lib/firebase'
import { useLista } from '../../../lib/hooks'
import { inicioJanela } from '../../../lib/resumo'
import { linkEmail, linkWhatsApp, primeiroNome } from '../../../lib/contato'
import { saida, suave } from '../../../movimento'
import { Botao, Painel, Pagina } from '../../../ui'
import { LinhaAcima } from '../meso/SugestaoTempo'
import marca from '@marca/marca.json'
import { calcularAlertas, chavesAtuais, type AlertaAbaixo, type AlertaAcima, type AlertaDemorado, type Reg } from './calcularAlertas'

export { calcularAlertas, type Reg }

// Alertas arquivados pelo coach (arquivados/{chave} = { em }). `chaves` vai para calcularAlertas.
export function useArquivados() {
  const l = useLista<{ em: Timestamp | null }>(useMemo(() => collection(db, 'arquivados'), []))
  const chaves = useMemo(() => new Set(l.dados.map((d) => d.id)), [l.dados])
  return { docs: l.dados, chaves, carregando: l.carregando }
}

// Carrega tudo o que os alertas precisam (alunos, mesos, registros de 14 dias). O Início já tem esses dados
// e chama `calcularAlertas` direto.
export function useAlertasCoach() {
  const alunos = useLista<Usuario & { id: string }>(useMemo(() => query(collection(db, 'usuarios'), where('papel', '==', 'aluno')), []))
  const mesos = useLista<MesoSalvo & { id: string }>(useMemo(() => query(collection(db, 'mesos')), []))
  const agora = new Date()
  const chave = inicioJanela(agora, 14)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const registros = useLista<Reg>(useMemo(() => consultaRegistrosRecentes(agora), [chave]))
  const arquivados = useArquivados()
  const r = calcularAlertas(alunos.dados, mesos.dados, registros.dados, agora, arquivados.chaves)
  const carregando = alunos.carregando || mesos.carregando || registros.carregando || arquivados.carregando
  // Uma vez por abertura da tela, com tudo carregado (senão um alerta ainda não lido pareceria antigo).
  const limpou = useRef(false)
  useEffect(() => {
    if (carregando || limpou.current) return
    limpou.current = true
    limparArquivadosAntigos(arquivados.docs, chavesAtuais(r), agora)
  })
  return { ...r, carregando }
}

const Grupo = ({ titulo, n, cor, children }: { titulo: string; n: number; cor: string; children: ReactNode }) =>
  n > 0 ? (
    <section className="space-y-2">
      <h2 className="font-semibold">
        {titulo} <span className={`font-display text-lg font-bold ${cor}`}>{n}</span>
      </h2>
      <AnimatePresence initial={false}>{children}</AnimatePresence>
    </section>
  ) : null

// Item que some com animação ao ser arquivado.
const Saindo = ({ children }: { children: ReactNode }) => (
  <m.div exit={{ opacity: 0, x: -40, height: 0 }} transition={{ ...suave, opacity: saida }} className="overflow-hidden">
    {children}
  </m.div>
)

const btn = 'rounded-lg border border-current/40 px-3 py-1.5 text-xs font-semibold opacity-90 active:scale-95'

// Arquivar, WhatsApp e E-mail com a mensagem pronta. Sem telefone guardado: o WhatsApp abre sem contato.
function Acoes({ chave, email, assunto, texto }: { chave: string; email: string; assunto: string; texto: string }) {
  return (
    <div className="flex flex-wrap gap-2 pt-1">
      <button type="button" className={btn} onClick={() => arquivarAlerta(chave).catch(() => {})}>Arquivar</button>
      <a className={btn} href={linkWhatsApp(texto)} target="_blank" rel="noopener">WhatsApp</a>
      {email && <a className={btn} href={linkEmail(email, `${marca.nome}: ${assunto}`, texto)}>E-mail</a>}
    </div>
  )
}

const abertura = (aluno: string) => `Oi, ${primeiroNome(aluno)}! `

const textoAbaixo = (x: AlertaAbaixo) =>
  `${abertura(x.aluno)}Nos últimos 7 dias, ${x.alerta.abaixo} de ${x.alerta.feitas} séries ficaram abaixo das reps previstas` +
  ` (${x.alerta.exercicios.slice(0, 3).map((e) => e.nome).join(', ')}). Vamos ajustar a carga e o descanso? Me conta como está o treino.`
const textoAcima = (x: AlertaAcima) =>
  `${abertura(x.aluno)}Ajustei seu Treino ${x.a.treino} para caber no seu tempo. Já está no app!`
const textoDemorado = (x: AlertaDemorado) =>
  `${abertura(x.aluno)}Seu Treino ${x.treino} durou ${x.minutos} min e o previsto era ${x.previsto} min. Tente manter o descanso indicado entre as séries.`

function CartaoAbaixo({ x }: { x: AlertaAbaixo }) {
  const { aluno, mesoId, alerta } = x
  const [aberto, setAberto] = useState(false)
  return (
    <div className="mb-2 space-y-2 rounded-xl border-2 border-rose-500 bg-rose-950 p-4 text-rose-100">
      <p className="font-semibold">
        {aluno} — {alerta.abaixo} de {alerta.feitas} séries abaixo da meta (−{alerta.faltaram} reps)
      </p>
      <p className="text-sm text-rose-200">
        {alerta.exercicios.slice(0, 3).map((e) => `${e.nome} (${e.abaixo})`).join(' · ')}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <a href={`#/meso/${mesoId}/semana/${alerta.semana}`} className="text-sm font-semibold underline">Ver semana</a>
        <Botao onClick={() => setAberto((a) => !a)}>{aberto ? 'Fechar' : 'Ver sugestão'}</Botao>
      </div>
      <Painel aberto={aberto}>
        <p className="pt-1 text-sm">
          Reduzir a carga 5–10% nesses exercícios e conversar sobre descanso entre séries, sono e alimentação.
        </p>
      </Painel>
      <Acoes chave={x.chave} email={x.email} assunto="suas séries da semana" texto={textoAbaixo(x)} />
    </div>
  )
}

const rotulo = {
  abaixo: (x: AlertaAbaixo) => `Reps abaixo da meta · ${x.alerta.abaixo} de ${x.alerta.feitas} séries`,
  acima: (x: AlertaAcima) => `Treino ${x.a.treino} acima do tempo`,
  demorado: (x: AlertaDemorado) => `Treino ${x.treino} demorou (semana ${x.semana})`,
}

export default function Alertas() {
  const a = useAlertasCoach()
  const [verArq, setVerArq] = useState(false)
  const arq = a.arquivados
  const nArq = arq.abaixo.length + arq.acima.length + arq.demorados.length
  const linhas = [
    ...arq.abaixo.map((x) => ({ chave: x.chave, nome: x.aluno, desc: rotulo.abaixo(x) })),
    ...arq.acima.map((x) => ({ chave: x.chave, nome: x.aluno, desc: rotulo.acima(x) })),
    ...arq.demorados.map((x) => ({ chave: x.chave, nome: x.aluno, desc: rotulo.demorado(x) })),
  ]
  return (
    <Pagina titulo="Alertas">
      {a.carregando ? (
        <p className="text-slate-400">Carregando…</p>
      ) : (
        <div className="space-y-6">
          {a.total === 0 && <p className="text-slate-400">Nenhum alerta. Tudo em dia ✓</p>}
          <Grupo titulo="Reps abaixo da meta (7 dias)" n={a.abaixo.length} cor="text-rose-300">
            {a.abaixo.map((x) => <Saindo key={x.chave}><CartaoAbaixo x={x} /></Saindo>)}
          </Grupo>
          <Grupo titulo="Treinos acima do tempo" n={a.acima.length} cor="text-amber-300">
            {a.acima.map((x) => (
              <Saindo key={x.chave}>
                <div className="mb-2 space-y-2 rounded-xl border-2 border-amber-500 bg-amber-950 p-4 text-amber-100">
                  <LinhaAcima
                    meso={x.meso}
                    acima={x.a}
                    prefixo={x.aluno}
                    onAplicar={(novo) => {
                      salvarMeso(x.d.id, x.d.alunoId, x.d.nome, novo).gravado.then(() => marcarAdaptado(x.d.id)).catch(() => {})
                    }}
                  />
                  <Acoes chave={x.chave} email={x.email} assunto={`Treino ${x.a.treino} ajustado`} texto={textoAcima(x)} />
                </div>
              </Saindo>
            ))}
          </Grupo>
          <Grupo titulo="Treinos que demoraram" n={a.demorados.length} cor="text-sky-300">
            {a.demorados.map((x) => (
              <Saindo key={x.chave}>
                <div className="mb-2 space-y-1 rounded-xl border-2 border-sky-500 bg-sky-950 p-4 text-sky-100">
                  <p>
                    <a href={`#/meso/${x.mesoId}/semana/${x.semana}`} className="font-semibold underline">
                      {x.aluno} — Treino {x.treino} (semana {x.semana})
                    </a>
                    : {x.minutos} min, previsto {x.previsto} min
                  </p>
                  <Acoes chave={x.chave} email={x.email} assunto={`Treino ${x.treino}`} texto={textoDemorado(x)} />
                </div>
              </Saindo>
            ))}
          </Grupo>
          {nArq > 0 && (
            <section className="space-y-2">
              <button type="button" aria-expanded={verArq} onClick={() => setVerArq((v) => !v)} className="font-semibold text-slate-300">
                Arquivados ({nArq}) {verArq ? '▾' : '▸'}
              </button>
              <Painel aberto={verArq}>
                <ul className="space-y-2 pt-1">
                  {linhas.map((l) => (
                    <li key={l.chave} className="flex items-center justify-between gap-3 rounded-xl border border-slate-700 p-3 text-sm text-slate-300">
                      <span className="min-w-0"><b>{l.nome}</b> · {l.desc}</span>
                      <button type="button" className={btn} onClick={() => desarquivarAlerta(l.chave).catch(() => {})}>Desarquivar</button>
                    </li>
                  ))}
                </ul>
              </Painel>
            </section>
          )}
        </div>
      )}
    </Pagina>
  )
}
