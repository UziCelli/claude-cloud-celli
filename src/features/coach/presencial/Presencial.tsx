import { collection, doc, query, where } from 'firebase/firestore'
import { m } from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Avatar } from '../../../avatar'
import type { Usuario } from '../../../lib/acesso'
import { db } from '../../../lib/firebase'
import { useDoc, useLista } from '../../../lib/hooks'
import { IcMais, IcSair } from '../../../icones'
import { Botao, Campo } from '../../../ui'
import { casar, ir, posicaoNaPilha, rotaAnterior, trocarRota, voltarAte } from '../../../rota'
import { agil } from '../../../movimento'
import Hoje from '../../aluno/Hoje'
import Treino from '../../aluno/Treino'

const CHAVE = 'forca-presencial-grupo'
const RECENTES = 'forca-presencial-recentes' // últimos alunos do presencial neste aparelho (só ids)
const padrao = (uid: string) => `/aluno/${uid}/presencial`
const useNome = (uid: string) => useDoc<Usuario>(doc(db, 'usuarios', uid)).dados?.nome ?? ''
const primeiro = (nome: string) => nome.split(' ')[0]

function lerGrupo(): string[] {
  try {
    const g = JSON.parse(sessionStorage.getItem(CHAVE) ?? '[]')
    return Array.isArray(g) ? g.filter((x) => typeof x === 'string') : []
  } catch { return [] }
}

export function lerRecentes(): string[] {
  try {
    const r = JSON.parse(localStorage.getItem(RECENTES) ?? '[]')
    return Array.isArray(r) ? r.filter((x) => typeof x === 'string') : []
  } catch { return [] }
}
const guardarRecente = (uid: string) => {
  try { localStorage.setItem(RECENTES, JSON.stringify([uid, ...lerRecentes().filter((x) => x !== uid)].slice(0, 4))) } catch { /* sem armazenamento */ }
}

// Coach no celular, com o aluno: as mesmas telas do aluno, gravando no registro do ALUNO.
// Os alunos do grupo ficam montados (escondidos): treino iniciado, cronômetro e cargas pendentes continuam vivos.
export default function Grupo({ rota }: { rota: string }) {
  const ativo = (casar('/aluno/:uid/presencial', rota) ?? casar('/aluno/:uid/presencial/treino/:mesoId/:semana/:treino', rota) ?? { uid: '' }).uid
  const [grupo, setGrupo] = useState(lerGrupo)
  const [rotas, setRotas] = useState<Record<string, string>>({})
  const [folha, setFolha] = useState(false)
  const rolagem = useRef<Record<string, number>>({})
  const saiu = useRef('') // quem acabou de sair: enquanto for o ativo, o grupo já restante vale como está
  const abertos = useRef(new Set<string>()) // alunos que já abriram sozinhos no treino de hoje (só 1x por presencial)
  // Posição na pilha da tela de antes do presencial: "Encerrar" volta para ela (-1: abriu direto no presencial).
  const [antes] = useState(() => (rotaAnterior() && !rotaAnterior().includes('/presencial') ? posicaoNaPilha() - 1 : -1))
  if (saiu.current && saiu.current !== ativo) saiu.current = ''
  const membros = grupo.includes(ativo) || saiu.current === ativo ? grupo : [ativo]

  useEffect(() => {
    setGrupo(membros)
    try { sessionStorage.setItem(CHAVE, JSON.stringify(membros)) } catch { /* sem armazenamento: o grupo vale só nesta tela */ }
  }, [membros.join()]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => { try { sessionStorage.removeItem(CHAVE) } catch { /* ok */ } }, []) // saiu do presencial: grupo acaba
  useEffect(() => { setRotas((r) => ({ ...r, [ativo]: rota })) }, [ativo, rota])
  useEffect(() => { if (ativo) guardarRecente(ativo) }, [ativo])
  useEffect(() => { window.scrollTo(0, rolagem.current[ativo] ?? 0) }, [ativo])

  const rotaDe = (u: string) => (u === ativo ? rota : rotas[u] ?? padrao(u))
  const trocar = (b: string) => {
    rolagem.current[ativo] = window.scrollY
    ir(rotaDe(b))
  }
  const sair = () => {
    const resto = membros.filter((u) => u !== ativo)
    if (!resto.length) return voltarAte(antes, `/aluno/${ativo}`)
    saiu.current = ativo
    setGrupo(resto)
    ir(rotaDe(resto[0]))
  }
  // Na 1ª vez de cada aluno, a lista de treinos já abre no treino de hoje (sem criar tela a mais no Voltar).
  const abrirHoje = (u: string) => (destino: string) => {
    if (abertos.current.has(u) || location.hash !== '#' + padrao(u)) return
    abertos.current.add(u)
    trocarRota(destino)
  }
  const adicionar = (b: string) => {
    setGrupo([...membros, b])
    setFolha(false)
    ir(padrao(b))
  }

  return (
    <>
      <Barra uid={ativo} grupo={membros.length > 1} onAdicionar={() => setFolha(true)} onSair={sair} />
      {membros.map((u) => <Membro key={u} uid={u} ativo={u === ativo} rota={rotaDe(u)} abrirHoje={abrirHoje(u)} />)}
      {membros.length > 1 && (
        <nav aria-label="Alunos do grupo" className="fixed inset-x-0 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-30 px-4">
          <div className="vidro !bg-slate-900/85 mx-auto max-w-[400px] rounded-full p-1">
            <div className="relative flex">
              {/* Pílula própria (x em %), não Bolha/layoutId: o layoutId mede pela página e, com alunos em
                  rolagens diferentes, a pílula "caçava" a diferença de rolagem ao trocar. */}
              <m.span
                aria-hidden
                className="lente absolute inset-y-0 left-0 rounded-full"
                style={{ width: `${100 / membros.length}%` }}
                initial={false}
                animate={{ x: `${membros.indexOf(ativo) * 100}%` }}
                transition={agil}
              />
              {membros.map((u) => <Aluno key={u} uid={u} ativo={u === ativo} onClick={() => u !== ativo && trocar(u)} />)}
            </div>
          </div>
        </nav>
      )}
      {folha && <EscolherAluno excluir={membros} onEscolher={adicionar} onFechar={() => setFolha(false)} />}
    </>
  )
}

function Barra({ uid, grupo, onAdicionar, onSair }: { uid: string; grupo: boolean; onAdicionar: () => void; onSair: () => void }) {
  const nome = useNome(uid)
  return (
    <div role="region" aria-label="Presencial" className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/95 pt-topo">
      <div className="mx-auto flex h-12 max-w-md items-center gap-3 px-4">
        <span className="size-2 shrink-0 rounded-full bg-amber-400" />
        <div className="min-w-0 flex-1 leading-tight">
          <div className="text-[11px] uppercase tracking-wider text-slate-400">Presencial</div>
          <div className="truncate text-sm font-semibold">{nome || '…'}</div>
        </div>
        <Botao tipo="vidro" onClick={onAdicionar} aria-label="Adicionar aluno" className="flex shrink-0 items-center gap-1 !px-3">
          <IcMais className="size-4" /> Aluno
        </Botao>
        <Botao tipo="fantasma" onClick={onSair} aria-label={grupo ? `Tirar ${nome} do grupo` : undefined} className="flex shrink-0 items-center gap-1 !px-2">
          <IcSair className="size-4" /> {grupo ? 'Tirar' : 'Encerrar'}
        </Botao>
      </div>
    </div>
  )
}

function Membro({ uid, ativo, rota, abrirHoje }: { uid: string; ativo: boolean; rota: string; abrirHoje: (destino: string) => void }) {
  const nome = useNome(uid)
  const base = padrao(uid)
  const p = casar('/aluno/:uid/presencial/treino/:mesoId/:semana/:treino', rota)
  return (
    <section aria-label={`Treino de ${nome}`} hidden={!ativo} className="pb-36">
      {p
        ? <Treino uid={uid} mesoId={p.mesoId} semana={Number(p.semana)} treino={Number(p.treino)} base={base} coach />
        : <Hoje uid={uid} base={base} coach abrirHoje={ativo ? abrirHoje : undefined} />}
    </section>
  )
}

function Aluno({ uid, ativo, onClick }: { uid: string; ativo: boolean; onClick: () => void }) {
  const nome = useNome(uid)
  return (
    <button onClick={onClick} aria-current={ativo ? 'true' : undefined} className={`relative h-11 min-w-0 flex-1 rounded-full px-4 text-sm font-semibold ${ativo ? 'text-white' : 'text-slate-300/85'}`}>
      <span className="block truncate">{primeiro(nome)}</span>
    </button>
  )
}

const semAcento = (t: string) => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

// Folha embaixo para escolher aluno: busca + recentes no topo. Usada no "+ Aluno" do presencial e no Início do coach.
export function EscolherAluno({ titulo = 'Adicionar aluno', excluir = [], onEscolher, onFechar }: { titulo?: string; excluir?: string[]; onEscolher: (uid: string) => void; onFechar: () => void }) {
  const { dados } = useLista<Usuario>(useMemo(() => query(collection(db, 'usuarios'), where('papel', '==', 'aluno')), []))
  const [busca, setBusca] = useState('')
  const [recentes] = useState(lerRecentes)
  const termo = semAcento(busca.trim())
  const lista = dados
    .filter((a) => a.status !== 'arquivado' && !excluir.includes(a.id) && (!termo || semAcento(a.nome).includes(termo)))
    .sort((a, b) => a.nome.localeCompare(b.nome))
  const topo = termo ? [] : recentes.map((id) => lista.find((a) => a.id === id)).filter((a) => !!a)
  const linha = (a: Usuario & { id: string }) => (
    <button key={a.id} onClick={() => onEscolher(a.id)} className="flex h-14 w-full items-center gap-3 text-left text-base">
      <Avatar nome={a.nome} tamanho={36} /> <span className="truncate">{a.nome}</span>
    </button>
  )
  return (
    <div className="fixed inset-0 z-40 flex items-end bg-black/60" onClick={onFechar}>
      <div role="dialog" aria-label="Escolher aluno" className="mx-auto max-h-[80dvh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-slate-900 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]" onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-2 text-base font-bold">{titulo}</h2>
        {dados.length > 5 && <Campo rotulo="Buscar" placeholder="Nome do aluno" value={busca} onChange={(e) => setBusca(e.target.value)} />}
        {topo.length > 0 && (
          <>
            <h3 className="mt-3 text-xs uppercase tracking-wider text-slate-400">Recentes</h3>
            {topo.map(linha)}
            <h3 className="mt-2 text-xs uppercase tracking-wider text-slate-400">Todos</h3>
          </>
        )}
        {lista.length === 0 && <p className="py-4 text-sm text-slate-400">{termo ? 'Nenhum aluno com esse nome.' : 'Nenhum outro aluno.'}</p>}
        {lista.map(linha)}
      </div>
    </div>
  )
}
