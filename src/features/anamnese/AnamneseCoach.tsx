import { collection, doc, query, where } from 'firebase/firestore'
import { useMemo, useState } from 'react'
import { diaSP, type Usuario } from '../../lib/acesso'
import { anotarAnamnese, marcarAnamneseVista } from '../../lib/acoes'
import { lerAnamnese, maisRecente, resumoAnamnese, sinaisAtencao, type Anamnese } from '../../lib/anamnese'
import { dataBR } from '../../lib/avaliacao'
import { db } from '../../lib/firebase'
import { TEXTO_SEM_INTERNET, useDoc, useLista, useSemInternet } from '../../lib/hooks'
import { registrarErro } from '../../lib/log'
import { Aviso, Botao, campoBase, Centro } from '../../ui'
import { Quadro } from '../../vidro'
import { BotaoVoltar } from '../../voltar'
import { Conteudo } from './AnamneseAluno'

const quando = (a: Anamnese) => (a.em == null ? 'agora' : dataBR(new Date(diaSP(a.em) * 86_400_000).toISOString().slice(0, 10)))
const codigo = (e: unknown) => (e as { code?: string })?.code ?? 'erro'
const falhou = (e: unknown) => registrarErro('gravacao', `anamnese coach: ${codigo(e)}`, e) // nunca a resposta

// Todas as anamneses do aluno (a coleção toda é lida pelo coach; filtrada pelo aluno), da mais nova para a mais antiga.
export function useAnamnesesDoAluno(uid: string) {
  const l = useLista<object>(useMemo(() => query(collection(db, 'anamneses'), where('alunoId', '==', uid)), [uid]))
  const dados = useMemo(
    () => l.dados.map((d) => lerAnamnese(d.id, d)).filter((a): a is Anamnese => !!a).sort((a, b) => (b.em ?? Infinity) - (a.em ?? Infinity)),
    [l.dados],
  )
  return { dados, carregando: l.carregando }
}

export default function AnamneseCoach({ uid }: { uid: string }) {
  const aluno = useDoc<Usuario>(useMemo(() => doc(db, 'usuarios', uid), [uid]))
  const an = useAnamnesesDoAluno(uid)
  const semInternet = useSemInternet()
  const [escolhida, setEscolhida] = useState<string | null>(null)
  const [novaVersao, setNovaVersao] = useState(false)
  const [erro, setErro] = useState('')
  const ultima = maisRecente(an.dados)
  const atual = an.dados.find((a) => a.id === escolhida) ?? ultima

  if (!aluno.carregando && !aluno.dados) return <main className="mx-auto max-w-md px-4 py-4"><BotaoVoltar para="/" /><p className="py-6 text-center text-slate-400">Aluno não encontrado.</p></main>
  if (novaVersao && !an.carregando) return <Conteudo uid={uid} ultima={ultima} motivo={null} coach={{ aoFim: () => { setNovaVersao(false); setEscolhida(null) } }} />

  const sinais = atual ? sinaisAtencao(atual.r) : []
  const rotuloAcao = aluno.dados?.presencial || !ultima ? 'Lançar pelo aluno' : 'Nova versão'
  return (
    <main className="mx-auto max-w-md px-4 py-4 lg:max-w-3xl">
      <BotaoVoltar para={`/aluno/${uid}`} />
      <h1 className="mb-4 break-words text-2xl">Anamnese de {aluno.dados?.nome ?? '…'}</h1>
      {an.carregando ? (
        <Centro>Carregando…</Centro>
      ) : !atual ? (
        <p className="py-6 text-center text-slate-400">{semInternet ? TEXTO_SEM_INTERNET : 'O aluno ainda não respondeu.'}</p>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-slate-400">
            {atual.origem === 'coach' ? 'Lançada por você' : 'Respondida pelo aluno'} em {quando(atual)}
            {atual.id !== ultima?.id && ' (versão antiga)'}
          </p>
          {sinais.length > 0 && (
            <Aviso>
              <p className="font-semibold">Atenção</p>
              <ul className="mt-1 list-disc space-y-0.5 pl-5">{sinais.map((s) => <li key={s}>{s}</li>)}</ul>
            </Aviso>
          )}
          <Quadro>
            <ul className="space-y-2 text-sm">{resumoAnamnese(atual.r).map((l) => <li key={l} className="break-words">{l}</li>)}</ul>
          </Quadro>
          <Anotacao key={atual.id} a={atual} />
          {an.dados.length > 1 && (
            <section className="space-y-2">
              <h2 className="font-semibold">Histórico</h2>
              <ul className="space-y-2">
                {an.dados.map((a) => (
                  <li key={a.id}>
                    <button type="button" aria-pressed={a.id === atual.id} onClick={() => setEscolhida(a.id)} className={`flex min-h-11 w-full items-center justify-between gap-3 rounded-xl border p-3 text-left text-sm ${a.id === atual.id ? 'border-marca-400 bg-marca-500/15' : 'border-slate-800 bg-slate-900'}`}>
                      <span className="font-semibold">{quando(a)}</span>
                      <span className="text-slate-400">{a.origem === 'coach' ? 'Coach' : 'Aluno'}{a.vistaEm == null && a.origem === 'aluno' ? ' · nova' : ''}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
      {erro && <div className="mt-4"><Aviso>{erro}</Aviso></div>}
      <div className="sticky bottom-[calc(66px+1rem+env(safe-area-inset-bottom))] mt-6 lg:bottom-2"> {/* acima das abas do coach (66px) no celular */}
        <div className="flex gap-2 rounded-2xl bg-slate-950/90 p-2 backdrop-blur">
          {atual && atual.origem === 'aluno' && atual.vistaEm == null && (
            <Botao className="min-h-12 flex-1" onClick={() => marcarAnamneseVista(atual.id).catch((e) => { falhou(e); setErro(`Não foi possível marcar como vista (${codigo(e)}).`) })}>Marcar como vista</Botao>
          )}
          <Botao tipo="primario" className="min-h-12 flex-1" disabled={an.carregando} onClick={() => setNovaVersao(true)}>{rotuloAcao}</Botao>
        </div>
      </div>
    </main>
  )
}

// Anotação do coach: o aluno LÊ este texto (o Firestore não esconde campo). Nunca dado secreto aqui.
function Anotacao({ a }: { a: Anamnese }) {
  const [txt, setTxt] = useState(a.obsCoach)
  const [estado, setEstado] = useState<'' | 'salvando' | 'salvo' | 'erro'>('')
  return (
    <section className="space-y-2">
      <h2 className="font-semibold">Anotação</h2>
      <Aviso>O aluno vê esta anotação.</Aviso>
      <textarea
        aria-label="Anotação do coach"
        value={txt}
        maxLength={2000}
        rows={3}
        onChange={(e) => { setTxt(e.target.value); setEstado('') }}
        className={`${campoBase} w-full p-3`}
      />
      {estado === 'erro' && <Aviso>Não foi possível salvar a anotação. Tente de novo.</Aviso>}
      <Botao
        className="min-h-11 w-full"
        disabled={txt === a.obsCoach || estado === 'salvando'}
        onClick={() => {
          setEstado('salvando')
          anotarAnamnese(a.id, txt.trim()).then(() => setEstado('salvo')).catch((e) => { falhou(e); setEstado('erro') })
        }}
      >
        {estado === 'salvando' ? 'Salvando…' : estado === 'salvo' ? 'Anotação salva' : 'Salvar anotação'}
      </Botao>
    </section>
  )
}
