import { useMemo } from 'react'
import { collection, query, where } from 'firebase/firestore'
import { docParaMeso } from '../../../lib/conversores'
import { relatoriosParaRevisar } from '../../../lib/relatorio'
import type { Usuario } from '../../../lib/acesso'
import { consultaRegistrosRecentes } from '../../../lib/acoes'
import type { MesoSalvo } from '../../../lib/conversores'
import { db } from '../../../lib/firebase'
import { useLista } from '../../../lib/hooks'
import { inicioJanela, resumoCoach, type AlunoComId } from '../../../lib/resumo'
import { ir } from '../../../rota'
import { m } from 'motion/react'
import { calcularAlertas, useArquivados, type Reg } from '../alertas/Alertas'
import { Botao, Cartao, cascata, Contar, item, Pagina } from '../../../ui'
import { PIX } from '../../aluno/PagarPix'
import { IcMais } from '../../../icones'
import { Quadro } from '../../../vidro'

const saudacao = (d: Date) => {
  const h = Number(d.toLocaleString('pt-BR', { hour: 'numeric', hour12: false, timeZone: 'America/Sao_Paulo' }))
  return h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite'
}

export default function Inicio({ nome }: { nome: string }) {
  const alunos = useLista<Usuario>(useMemo(() => query(collection(db, 'usuarios'), where('papel', '==', 'aluno')), []))
  const mesos = useLista<MesoSalvo & { id: string }>(useMemo(() => query(collection(db, 'mesos')), []))
  const agora = new Date()
  const chave = inicioJanela(agora, 14)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const registros = useLista<Reg>(useMemo(() => consultaRegistrosRecentes(agora), [chave]))
  const r = resumoCoach(alunos.dados as AlunoComId[], registros.dados, agora, mesos.dados)
  const arquivados = useArquivados()
  const liberados = useLista<{ id: string }>(useMemo(() => query(collection(db, 'relatorios'), where('liberado', '==', true)), []))
  const alertas = calcularAlertas(alunos.dados as AlunoComId[], mesos.dados, registros.dados, agora, arquivados.chaves)
  if (!alunos.carregando && alunos.dados.length === 0)
    return (
      <Pagina titulo="Início">
        <Cartao className="space-y-4 text-center">
          <p className="text-slate-400">Nenhum aluno ainda.</p>
          <Botao tipo="primario" className="w-full py-4 text-base" onClick={() => ir('/alunos/novo')}>
            Cadastrar primeiro aluno
          </Botao>
        </Cartao>
      </Pagina>
    )

  const nomeDe = new Map(alunos.dados.filter((a) => a.status !== 'arquivado').map((a) => [a.id, a.nome]))
  const paraRevisar = relatoriosParaRevisar(
    mesos.dados.filter((d) => nomeDe.has(d.alunoId)).map((d) => ({ id: d.id, meso: docParaMeso(d), nome: d.nome })),
    new Set(liberados.dados.map((x) => x.id)),
    agora,
  )
  const avisosPix = alunos.dados.filter((a) => a.pagamentoInformadoEm).length
  const blocos: [string, AlunoComId[], string][] = [
    ['Aguardando aprovação', r.aguardando, 'Ninguém aguardando.'],
    ['Vencendo em 7 dias', r.vencendo, 'Ninguém vencendo.'],
    ['Vencidos', r.vencidos, 'Nenhum vencido.'],
    ['Treinaram hoje', r.treinaramHoje, 'Ninguém treinou hoje ainda.'],
    ['Sumidos (7+ dias sem treinar)', r.sumidos, 'Ninguém sumido.'],
    ['Frequência caindo (14 dias)', r.frequenciaCaindo, 'Ninguém com frequência caindo.'],
  ]
  const kpis: [number, string, string][] = [
    [alunos.dados.filter((a) => a.status === 'ativo').length, 'Alunos ativos', 'text-white'],
    [r.treinaramHoje.length, 'Treinaram hoje', 'text-emerald-400'],
    [alertas.total, 'Alertas', 'text-rose-400'],
    [r.vencendo.length, 'Vencem em 7 dias', 'text-amber-300'],
  ]
  return (
    <Pagina titulo={<><span className="sr-only">Início</span><span className="block text-[15px] font-normal text-slate-300">{agora.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'America/Sao_Paulo' })}</span>{saudacao(agora)}, {nome.split(' ')[0]}</>}>
      <div className="mb-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map(([n, rotulo, cor]) => (
          <Quadro key={rotulo} className="!p-3">
            <p className={`font-display text-3xl font-extrabold leading-none lg:text-5xl ${cor}`}><Contar n={n} /></p>
            <p className="mt-1.5 text-[15px] leading-tight text-slate-300 lg:text-base">{rotulo}</p>
          </Quadro>
        ))}
      </div>
      <div className="mb-3 grid grid-cols-[1fr_auto] gap-3 lg:max-w-md">
        <Botao tipo="primario" className="flex h-12 items-center justify-center gap-2 rounded-2xl text-base font-bold" onClick={() => ir('/alunos/novo')}>
          <IcMais className="size-5" /> Novo aluno
        </Botao>
        <a href="#/ranking" className="grid h-12 place-items-center rounded-2xl bg-white/10 px-6 text-base font-bold ring-1 ring-white/20">
          Ranking de evolução
        </a>
      </div>
      {PIX && avisosPix > 0 && (
        <a href="#/alunos" className="mb-3 flex items-center justify-between gap-3 rounded-3xl border border-amber-500/60 bg-amber-950/70 p-4 text-amber-100">
          <span className="font-semibold">
            <span className="font-display text-3xl font-bold text-amber-300">{avisosPix}</span> {avisosPix === 1 ? 'aluno informou pagamento' : 'alunos informaram pagamento'}
          </span>
          <span className="font-semibold underline">Ver lista</span>
        </a>
      )}
      {paraRevisar.length > 0 && (
        <section className="mb-3 space-y-2 rounded-3xl border border-marca-500/60 bg-marca-900/40 p-4">
          <h2 className="font-semibold">
            Relatórios para revisar <span className="font-display text-lg font-bold text-marca-300">{paraRevisar.length}</span>
          </h2>
          <ul className="flex flex-wrap gap-2">
            {paraRevisar.map((x) => {
              const d = mesos.dados.find((y) => y.id === x.id)!
              return (
                <li key={x.id}>
                  <a href={`#/meso/${x.id}/relatorio`} className="block min-h-11 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm hover:bg-white/15">
                    {nomeDe.get(d.alunoId)} · {x.nome}
                  </a>
                </li>
              )
            })}
          </ul>
        </section>
      )}
      {alertas.total > 0 && (
        <a href="#/alertas" className="mb-3 flex items-center justify-between gap-3 rounded-3xl border border-rose-500/60 bg-rose-950/70 p-4 text-rose-100">
          <span className="font-semibold">
            <span className="font-display text-3xl font-bold text-rose-300">{alertas.total}</span> {alertas.total === 1 ? 'alerta' : 'alertas'}
          </span>
          <span className="font-semibold underline">Ver alertas</span>
        </a>
      )}
      <m.div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" variants={cascata} initial="hidden" animate="show">
        {blocos.map(([titulo, lista, vazio]) => (
          <m.div key={titulo} variants={item}>
          <Quadro className="h-full space-y-2 !p-3.5">
            <h2 className="font-semibold">
              {titulo} <span className="font-display text-lg font-bold text-marca-300"><Contar n={lista.length} /></span>
            </h2>
            {lista.length === 0 ? (
              <p className="text-sm text-slate-500">{vazio}</p>
            ) : (
              <ul className="flex flex-wrap gap-2">
                {lista.flatMap((a) => {
                  const hoje = titulo === 'Treinaram hoje' ? r.treinosHoje[a.id] : undefined
                  const links = hoje?.length
                    ? hoje.map((t) => ({
                        k: `${t.mesoId}-${t.semana}-${t.treino}`,
                        href: `#/meso/${t.mesoId}/semana/${t.semana}`,
                        texto: `${a.nome} · Treino ${t.treino}${t.feito ? ' (feito)' : ' (em andamento)'}`,
                      }))
                    : [{ k: a.id, href: `#/aluno/${a.id}`, texto: a.nome }]
                  return links.map((l) => (
                    <li key={`${a.id}-${l.k}`} className="flex min-w-0 items-center gap-2">
                      <a href={l.href} className="block min-h-11 max-w-full truncate rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm hover:bg-white/15">
                        {l.texto}
                      </a>
                      {titulo === 'Aguardando aprovação' && (
                        <a href="#/alunos" className="grid h-11 place-items-center rounded-full border border-marca-400 bg-marca-500 px-5 text-sm font-bold text-white">Liberar</a>
                      )}
                    </li>
                  ))
                })}
              </ul>
            )}
          </Quadro>
          </m.div>
        ))}
      </m.div>
    </Pagina>
  )
}
