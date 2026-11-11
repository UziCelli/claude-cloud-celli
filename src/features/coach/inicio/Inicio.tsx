import { useMemo, useState } from 'react'
import { collection, query, where } from 'firebase/firestore'
import { docParaMeso } from '../../../lib/conversores'
import { relatoriosParaRevisar } from '../../../lib/relatorio'
import { avaliacoesParaFazer, corteAvaliacoes } from '../../../lib/avaliacao'
import type { Usuario } from '../../../lib/acesso'
import { consultaRegistrosRecentes } from '../../../lib/acoes'
import type { MesoSalvo } from '../../../lib/conversores'
import { db } from '../../../lib/firebase'
import { TEXTO_SEM_INTERNET, useLista, useSemInternet } from '../../../lib/hooks'
import { inicioJanela, resumoCoach, type AlunoComId } from '../../../lib/resumo'
import { ir } from '../../../rota'
import { m } from 'motion/react'
import { calcularAlertas, useArquivados, type Reg } from '../alertas/Alertas'
import { Botao, Cartao, classesBotao, cascata, Contar, item, Pagina } from '../../../ui'
import { PIX } from '../../aluno/PagarPix'
import { mediaTexto, useFeedbacks } from '../feedbacks/Feedbacks'
import { resumoNotas } from '../../../lib/feedback'
import { IcBalao, IcMais, IcPlay, IcQr } from '../../../icones'
import QrCadastro from '../alunos/QrCadastro'
import { EscolherAluno } from '../presencial/Presencial'
import { anamnesesNovas, anamnesesPendentes, lerAnamnese, sinaisAtencao, type Anamnese } from '../../../lib/anamnese'
import { Quadro } from '../../../vidro'

const saudacao = (d: Date) => {
  const h = Number(d.toLocaleString('pt-BR', { hour: 'numeric', hour12: false, timeZone: 'America/Sao_Paulo' }))
  return h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite'
}

export default function Inicio({ nome }: { nome: string }) {
  const [escolher, setEscolher] = useState(false)
  const [qr, setQr] = useState(false)
  const alunos = useLista<Usuario>(useMemo(() => query(collection(db, 'usuarios'), where('papel', '==', 'aluno')), []))
  const mesos = useLista<MesoSalvo & { id: string }>(useMemo(() => query(collection(db, 'mesos')), []))
  const agora = new Date()
  const chave = inicioJanela(agora, 14)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const registros = useLista<Reg>(useMemo(() => consultaRegistrosRecentes(agora), [chave]))
  const semInternet = useSemInternet()
  const r = resumoCoach(alunos.dados as AlunoComId[], registros.dados, agora, mesos.dados)
  const arquivados = useArquivados()
  const liberados = useLista<{ id: string }>(useMemo(() => query(collection(db, 'relatorios'), where('liberado', '==', true)), []))
  const corte = corteAvaliacoes(agora)
  const avaliacoes = useLista<{ alunoId: string; data: string }>(useMemo(() => query(collection(db, 'avaliacoes'), where('data', '>=', corte)), [corte]))
  const fb = useFeedbacks()
  const anamneses = useLista<object>(useMemo(() => query(collection(db, 'anamneses')), [])) // uma consulta só: coleção pequena
  const alertas = calcularAlertas(alunos.dados as AlunoComId[], mesos.dados, registros.dados, agora, arquivados.chaves)
  if (!alunos.carregando && alunos.dados.length === 0)
    return (
      <Pagina titulo="Início">
        <Cartao className="space-y-4 text-center">
          <p className="text-slate-400">{semInternet ? TEXTO_SEM_INTERNET : 'Nenhum aluno ainda.'}</p>
          <Botao tipo="primario" tamanho="lg" className="w-full" onClick={() => ir('/alunos/novo')}>
            Cadastrar primeiro aluno
          </Botao>
        </Cartao>
      </Pagina>
    )

  const nomeDe = new Map(alunos.dados.filter((a) => a.status !== 'arquivado').map((a) => [a.id, a.nome]))
  const mesosAtivos = mesos.dados.filter((d) => nomeDe.has(d.alunoId)).map((d) => ({ id: d.id, alunoId: d.alunoId, meso: docParaMeso(d), nome: d.nome }))
  const paraRevisar = relatoriosParaRevisar(mesosAtivos, new Set(liberados.dados.map((x) => x.id)), agora)
  const paraAvaliar = avaliacoesParaFazer(mesosAtivos, avaliacoes.dados, agora)
  const docsAnam = anamneses.dados.map((d) => lerAnamnese(d.id, d)).filter((a): a is Anamnese => !!a && nomeDe.has(a.alunoId))
  const novasAnam = anamnesesNovas(docsAnam) // uma por aluno
  const pendentesAnam = anamnesesPendentes(alunos.dados.map((a) => ({ id: a.id, nome: a.nome, status: a.status, presencial: a.presencial })), docsAnam, mesosAtivos, agora)
  const avisosPix = alunos.dados.filter((a) => a.pagamentoInformadoEm && a.status === 'ativo' && !a.presencial).length
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
      {/* Atalho do dia a dia: escolher o aluno e cair no treino de hoje (2 toques). */}
      <Botao tipo="destaque" className="mb-3 flex w-full items-center justify-center gap-2 lg:max-w-md" onClick={() => setEscolher(true)}>
        <IcPlay className="size-5" /> Treino presencial
      </Botao>
      {escolher && <EscolherAluno titulo="Treino presencial: qual aluno?" onEscolher={(uid) => ir(`/aluno/${uid}/presencial`)} onFechar={() => setEscolher(false)} />}
      <div className="mb-3 grid grid-cols-2 gap-3 lg:max-w-md">
        <Botao tipo="primario" className="flex min-w-0 items-center justify-center gap-2" onClick={() => ir('/alunos/novo')}>
          <IcMais className="size-5" /> Novo aluno
        </Botao>
        <a href="#/ranking" className={classesBotao('vidro', 'md', 'grid min-w-0 place-items-center text-center leading-tight')}>
          Ranking de evolução
        </a>
      </div>
      <Botao className="mb-3 flex w-full items-center justify-center gap-2 lg:max-w-md" onClick={() => setQr(true)}>
        <IcQr className="size-5" /> QR Code de cadastro
      </Botao>
      {qr && <QrCadastro onFechar={() => setQr(false)} />}
      {fb.dados.length > 0 && (
        <a href="#/feedbacks" className="mb-3 flex items-center gap-3 rounded-3xl bg-white/10 p-4 ring-1 ring-white/20 lg:max-w-md">
          <IcBalao className="size-5 text-marca-400" />
          <span className="flex-1 font-semibold">Feedbacks · {mediaTexto(resumoNotas(fb.dados).media)} média · {fb.dados.filter((f) => !f.lido).length} novos</span>
        </a>
      )}
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
                <li key={x.id} className="max-w-full min-w-0">
                  <a href={`#/meso/${x.id}/relatorio`} className="block min-h-11 min-w-0 max-w-full truncate rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm hover:bg-white/15">
                    {nomeDe.get(d.alunoId)} · {x.nome}
                  </a>
                </li>
              )
            })}
          </ul>
        </section>
      )}
      {paraAvaliar.length > 0 && (
        <section className="mb-3 space-y-2 rounded-3xl border border-marca-500/60 bg-marca-900/40 p-4">
          <h2 className="font-semibold">
            Avaliações a fazer <span className="font-display text-lg font-bold text-marca-300">{paraAvaliar.length}</span>
          </h2>
          <ul className="flex flex-wrap gap-2">
            {paraAvaliar.map((x) => (
              <li key={x.mesoId} className="max-w-full min-w-0">
                <a href={`#/aluno/${x.alunoId}/avaliacoes`} className="block min-h-11 min-w-0 max-w-full truncate rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm hover:bg-white/15">
                  {nomeDe.get(x.alunoId)} · {x.nome}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
      {(novasAnam.length > 0 || pendentesAnam.length > 0) && (
        <section className="mb-3 space-y-2 rounded-3xl border border-marca-500/60 bg-marca-900/40 p-4">
          <h2 className="font-semibold">
            Anamneses <span className="font-display text-lg font-bold text-marca-300">{novasAnam.length + pendentesAnam.length}</span>
          </h2>
          <ul className="flex flex-wrap gap-2">
            {novasAnam.map((a) => (
              <li key={a.id} className="max-w-full min-w-0">
                <a href={`#/aluno/${a.alunoId}/anamnese`} className="block min-h-11 min-w-0 max-w-full truncate rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm hover:bg-white/15">
                  {nomeDe.get(a.alunoId)} · nova{sinaisAtencao(a.r).length > 0 && ' · Atenção'}
                </a>
              </li>
            ))}
            {pendentesAnam.map((x) => (
              <li key={x.alunoId} className="max-w-full min-w-0">
                <a href={`#/aluno/${x.alunoId}/anamnese`} className="block min-h-11 min-w-0 max-w-full truncate rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/15">
                  {x.nome} · {x.motivo === 'primeira' ? 'não respondeu' : 'atualizar'}
                </a>
              </li>
            ))}
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
          <m.div key={titulo} variants={item} className="min-w-0">
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
                    <li key={`${a.id}-${l.k}`} className="flex max-w-full min-w-0 items-center gap-2">
                      <a href={l.href} className="block min-h-11 max-w-full truncate rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm hover:bg-white/15">
                        {l.texto}
                      </a>
                      {titulo === 'Aguardando aprovação' && (
                        <a href="#/alunos" className={classesBotao('primario', 'md', 'grid shrink-0 place-items-center')}>Liberar</a>
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
