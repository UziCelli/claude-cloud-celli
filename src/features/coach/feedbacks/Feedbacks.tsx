import marca from '@marca/marca.json'
import { collection, limit, orderBy, query, where, type Timestamp } from 'firebase/firestore'
import { useMemo, useState } from 'react'
import type { Usuario } from '../../../lib/acesso'
import { apagarFeedback, marcarFeedbackLido } from '../../../lib/acoes'
import { filtrar, rotuloAssunto, rotuloTipo, resumoNotas, textoDepoimento, textoParaCopiar, type Feedback, type Filtro } from '../../../lib/feedback'
import { db } from '../../../lib/firebase'
import { registrarErro } from '../../../lib/log'
import { TEXTO_SEM_INTERNET, useLista, useSemInternet } from '../../../lib/hooks'
import { IcEstrela } from '../../../icones'
import { Botao, Msg, Pagina } from '../../../ui'
import { Quadro } from '../../../vidro'
import { BotaoVoltar } from '../../../voltar'
import BotaoCompartilhar from '../../evolucao/BotaoCompartilhar'
import { gerarCartaoDepoimento, type DadosDepoimento } from './cartaoDepoimento'

type Doc = Omit<Feedback, 'em' | 'id'> & { em: Timestamp | null }

// Últimos 300 feedbacks, do mais novo para o mais antigo.
export function useFeedbacks() {
  const r = useLista<Doc>(useMemo(() => query(collection(db, 'feedbacks'), orderBy('em', 'desc'), limit(300)), []))
  const dados: Feedback[] = useMemo(() => r.dados.map((d) => ({ ...d, em: d.em?.toDate() ?? null })), [r.dados])
  return { ...r, dados }
}

const FILTROS: [Filtro, string][] = [
  ['todos', 'Todos'],
  ['novos', 'Novos'],
  ['sugestoes', 'Sugestões'],
  ['criticas', 'Críticas'],
  ['depoimentos', 'Depoimentos'],
]

export const mediaTexto = (m: number) => m.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })

const Estrelas = ({ nota }: { nota: number }) => (
  <span role="img" aria-label={`${nota} de 5 estrelas`} className="flex text-amber-400">
    {[1, 2, 3, 4, 5].map((n) => <IcEstrela key={n} cheia={n <= nota} className="size-5" />)}
  </span>
)

// nome: null = aluno com nome ainda carregando (ou fora da lista); aí não há Imagem nem "Copiar depoimento".
function Cartao({ f, nome, aviso }: { f: Feedback; nome: string | null; aviso: (t: string) => void }) {
  const falhou = (e: { code?: string }) => registrarErro('gravacao', `feedback: ${e?.code ?? e}`, e)
  // Copia direto no clique (exigência do iPhone).
  const copiar = (t: string) =>
    navigator.clipboard
      .writeText(t)
      .then(() => aviso('Copiado'))
      .catch(() => aviso('Não deu para copiar.'))
  return (
    <Quadro className={`space-y-2 ${f.lido ? '' : 'ring-1 ring-marca-400/50'}`}>
      <div className="flex items-start justify-between gap-2">
        <Estrelas nota={f.nota} />
        <span className="text-right text-xs text-slate-400">{nome ?? 'Aluno'} · {f.em ? f.em.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) : '…'}</span>
      </div>
      <p className="text-sm text-slate-400">{rotuloAssunto(f.assunto)}{f.tipo ? ` · ${rotuloTipo(f.tipo)}` : ''}</p>
      {f.texto && <p className="whitespace-pre-wrap break-words text-slate-100">{f.texto}</p>}
      {f.texto && !f.depoimento && <p className="text-xs text-slate-400">Sem autorização para divulgar</p>}
      <div className="flex flex-wrap items-start gap-2 pt-1">
        {f.depoimento && f.texto && nome && (
          <>
            <BotaoCompartilhar<DadosDepoimento> dados={{ texto: f.texto, nome }} gerar={gerarCartaoDepoimento} rotulo="Imagem" arquivo="depoimento.png" titulo="Depoimento" />
            <Botao onClick={() => copiar(textoDepoimento(f.texto ?? '', nome, marca.doNome))}>Copiar depoimento</Botao>
          </>
        )}
        {f.texto && <Botao onClick={() => copiar(textoParaCopiar(f))}>Copiar texto</Botao>}
        <Botao onClick={() => marcarFeedbackLido(f.id, !f.lido).catch(falhou)}>{f.lido ? 'Não lido' : 'Lido'}</Botao>
        <Botao tipo="alerta" onClick={() => window.confirm('Apagar este feedback?') && apagarFeedback(f.id).catch(falhou)}>Apagar</Botao>
      </div>
    </Quadro>
  )
}

export default function Feedbacks() {
  const fb = useFeedbacks()
  const alunos = useLista<Usuario>(useMemo(() => query(collection(db, 'usuarios'), where('papel', '==', 'aluno')), []))
  const semInternet = useSemInternet()
  const [filtro, setFiltro] = useState<Filtro>('todos')
  const [msg, setMsg] = useState('')
  const nomes = useMemo(() => new Map(alunos.dados.map((a) => [a.id, a.nome])), [alunos.dados])
  const { media, total, porNota } = resumoNotas(fb.dados)
  const novos = fb.dados.filter((f) => !f.lido).length
  const lista = filtrar(fb.dados, filtro)
  return (
    <Pagina titulo="Feedbacks" voltar={<BotaoVoltar para="/" />}>
      <Quadro className="mb-3 flex items-center gap-4">
        <div className="shrink-0">
          <p className="flex items-center gap-1 font-display text-3xl font-extrabold"><IcEstrela cheia className="size-6 text-amber-400" />{mediaTexto(media)}</p>
          <p className="text-xs text-slate-400">média · {total} {total === 1 ? 'resposta' : 'respostas'}</p>
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          {[5, 4, 3, 2, 1].map((n) => (
            <div key={n} className="flex items-center gap-2 text-xs text-slate-300">
              <span className="w-3">{n}</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                <span className="block h-full rounded-full bg-amber-400" style={{ width: `${total ? (porNota[n] / total) * 100 : 0}%` }} />
              </span>
              <span className="w-6 text-right">{porNota[n]}</span>
            </div>
          ))}
        </div>
      </Quadro>
      <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
        {FILTROS.map(([k, t]) => (
          <button key={k} type="button" aria-pressed={filtro === k} onClick={() => setFiltro(k)} className={`min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold ${filtro === k ? 'border-marca-400 bg-marca-500 text-white' : 'border-white/20 bg-white/5 text-slate-200'}`}>
            {k === 'novos' ? `Novos ${novos}` : t}
          </button>
        ))}
      </div>
      <Msg>{msg && <p role="status" className="mb-2 text-sm text-emerald-400">{msg}</p>}</Msg>
      {lista.length === 0 ? (
        <p className="py-6 text-center text-slate-400">{fb.carregando ? 'Carregando…' : semInternet ? TEXTO_SEM_INTERNET : 'Nenhum feedback aqui.'}</p>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {lista.map((f) => (
            <Cartao key={f.id} f={f} nome={f.alunoId ? (nomes.get(f.alunoId) ?? null) : 'Anônimo'} aviso={(t) => { setMsg(t); setTimeout(() => setMsg(''), 2500) }} />
          ))}
        </div>
      )}
    </Pagina>
  )
}
