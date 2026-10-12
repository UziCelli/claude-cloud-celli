import { collection, doc, query, where } from 'firebase/firestore'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Avatar } from '../../../avatar'
import type { Usuario } from '../../../lib/acesso'
import { db } from '../../../lib/firebase'
import { useDoc, useLista } from '../../../lib/hooks'
import { IcMais, IcSair } from '../../../icones'
import { casar, ir } from '../../../rota'
import { Bolha } from '../../../vidro'
import Hoje from '../../aluno/Hoje'
import Treino from '../../aluno/Treino'

const CHAVE = 'forca-presencial-grupo'
const padrao = (uid: string) => `/aluno/${uid}/presencial`
const useNome = (uid: string) => useDoc<Usuario>(doc(db, 'usuarios', uid)).dados?.nome ?? ''
const primeiro = (nome: string) => nome.split(' ')[0]

function lerGrupo(): string[] {
  try {
    const g = JSON.parse(sessionStorage.getItem(CHAVE) ?? '[]')
    return Array.isArray(g) ? g.filter((x) => typeof x === 'string') : []
  } catch { return [] }
}

// Coach no celular, com o aluno: as mesmas telas do aluno, gravando no registro do ALUNO.
// Os alunos do grupo ficam montados (escondidos): treino iniciado, cronômetro e cargas pendentes continuam vivos.
export default function Grupo({ rota }: { rota: string }) {
  const ativo = (casar('/aluno/:uid/presencial', rota) ?? casar('/aluno/:uid/presencial/treino/:mesoId/:semana/:treino', rota) ?? { uid: '' }).uid
  const [grupo, setGrupo] = useState(lerGrupo)
  const [rotas, setRotas] = useState<Record<string, string>>({})
  const [folha, setFolha] = useState(false)
  const rolagem = useRef<Record<string, number>>({})
  const membros = grupo.includes(ativo) ? grupo : [ativo]

  useEffect(() => {
    setGrupo(membros)
    try { sessionStorage.setItem(CHAVE, JSON.stringify(membros)) } catch { /* sem armazenamento: o grupo vale só nesta tela */ }
  }, [membros.join()]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => { try { sessionStorage.removeItem(CHAVE) } catch { /* ok */ } }, []) // saiu do presencial: grupo acaba
  useEffect(() => { setRotas((r) => ({ ...r, [ativo]: rota })) }, [ativo, rota])
  useEffect(() => { window.scrollTo(0, rolagem.current[ativo] ?? 0) }, [ativo])

  const rotaDe = (u: string) => (u === ativo ? rota : rotas[u] ?? padrao(u))
  const trocar = (b: string) => {
    rolagem.current[ativo] = window.scrollY
    ir(rotaDe(b))
  }
  const sair = () => {
    const resto = membros.filter((u) => u !== ativo)
    if (!resto.length) return ir(`/aluno/${ativo}`)
    setGrupo(resto)
    ir(rotaDe(resto[0]))
  }
  const adicionar = (b: string) => {
    setGrupo([...membros, b])
    setFolha(false)
    ir(padrao(b))
  }

  return (
    <>
      <Barra uid={ativo} onAdicionar={() => setFolha(true)} onSair={sair} />
      {membros.map((u) => <Membro key={u} uid={u} ativo={u === ativo} rota={rotaDe(u)} />)}
      {membros.length > 1 && (
        <nav aria-label="Alunos do grupo" className="fixed inset-x-0 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-30 px-4">
          <div className="vidro !bg-slate-900/85 mx-auto flex max-w-[400px] gap-1 rounded-full p-1">
            {membros.map((u) => <Aluno key={u} uid={u} ativo={u === ativo} onClick={() => u !== ativo && trocar(u)} />)}
          </div>
        </nav>
      )}
      {folha && <Folha excluir={membros} onEscolher={adicionar} onFechar={() => setFolha(false)} />}
    </>
  )
}

function Barra({ uid, onAdicionar, onSair }: { uid: string; onAdicionar: () => void; onSair: () => void }) {
  const nome = useNome(uid)
  return (
    <div role="region" aria-label="Presencial" className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/90 pt-topo backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-md items-center gap-3 px-4">
        <span className="size-2 shrink-0 rounded-full bg-amber-400" />
        <div className="min-w-0 flex-1 leading-tight">
          <div className="text-[11px] uppercase tracking-wider text-slate-400">Presencial</div>
          <div className="truncate text-sm font-semibold">{nome || '…'}</div>
        </div>
        <button onClick={onAdicionar} aria-label="Adicionar aluno" className="flex h-9 shrink-0 items-center gap-1 rounded-full px-3 text-sm text-slate-200 ring-1 ring-white/15">
          <IcMais className="size-4" /> Aluno
        </button>
        <button onClick={onSair} className="flex h-9 shrink-0 items-center gap-1 text-sm text-slate-400">
          <IcSair className="size-4" /> Sair
        </button>
      </div>
    </div>
  )
}

function Membro({ uid, ativo, rota }: { uid: string; ativo: boolean; rota: string }) {
  const nome = useNome(uid)
  const base = padrao(uid)
  const p = casar('/aluno/:uid/presencial/treino/:mesoId/:semana/:treino', rota)
  return (
    <section aria-label={`Treino de ${nome}`} hidden={!ativo} className="pb-36">
      {p
        ? <Treino uid={uid} mesoId={p.mesoId} semana={Number(p.semana)} treino={Number(p.treino)} base={base} coach />
        : <Hoje uid={uid} base={base} coach />}
    </section>
  )
}

function Aluno({ uid, ativo, onClick }: { uid: string; ativo: boolean; onClick: () => void }) {
  const nome = useNome(uid)
  return (
    <button onClick={onClick} aria-current={ativo ? 'true' : undefined} className={`relative h-11 min-w-0 flex-1 rounded-full px-4 text-sm font-semibold ${ativo ? 'text-white' : 'text-slate-300/85'}`}>
      {ativo && <Bolha id="bolha-grupo" />}
      {/* truncate fica no texto: no botão, o overflow cortaria a pílula enquanto ela desliza */}
      <span className="block truncate">{primeiro(nome)}</span>
    </button>
  )
}

function Folha({ excluir, onEscolher, onFechar }: { excluir: string[]; onEscolher: (uid: string) => void; onFechar: () => void }) {
  const { dados } = useLista<Usuario>(useMemo(() => query(collection(db, 'usuarios'), where('papel', '==', 'aluno')), []))
  const lista = dados.filter((a) => a.status !== 'arquivado' && !excluir.includes(a.id)).sort((a, b) => a.nome.localeCompare(b.nome))
  return (
    <div className="fixed inset-0 z-40 flex items-end bg-black/60" onClick={onFechar}>
      <div role="dialog" aria-label="Escolher aluno" className="mx-auto max-h-[70dvh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-slate-900 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]" onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-2 text-base font-bold">Adicionar aluno</h2>
        {lista.length === 0 && <p className="py-4 text-sm text-slate-400">Nenhum outro aluno.</p>}
        {lista.map((a) => (
          <button key={a.id} onClick={() => onEscolher(a.id)} className="flex h-14 w-full items-center gap-3 text-left text-base">
            <Avatar nome={a.nome} tamanho={36} /> <span className="truncate">{a.nome}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
