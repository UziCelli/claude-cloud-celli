// Edição do treino do dia no presencial (só o coach). Cada toque grava na hora; o motor é `engine/editarSessao`.
import { useRef, useState, type ReactNode } from 'react'
import { adicionarExercicio, adicionarMetodo, iniciarEdicao, removerExercicio, removerMetodo, trocarExercicio } from '../../../engine'
import type { Meso, Metodo, SessaoEditada } from '../../../engine'
import { COR_METODO } from '../../../data/metodos'
import { salvarSessaoEditada, voltarAoPlanejado } from '../../../lib/acoes'
import { IcLapis } from '../../../icones'
import { Botao } from '../../../ui'
import IconeMetodo from '../../metodos/IconeMetodo'
import CampoExercicio from '../meso/CampoExercicio'

export const MAX_EXERCICIOS = 10
const DIRETOS: Metodo[] = ['Dropset', 'Rest-pause', 'Clusterset']
const SEQUENCIA: Metodo[] = ['Biset', 'Triset', 'Superset', 'Circuito']
const totalCerto = (m: Metodo, total: number) => (m === 'Biset' ? total === 2 : m === 'Triset' ? total === 3 : m === 'Superset' ? total >= 4 : total >= 2)

type Base = { meso: Meso; mesoId: string; semana: number; treino: number }
const grava = (mesoId: string, s: SessaoEditada) => salvarSessaoEditada(mesoId, s).catch(() => window.alert('Não foi possível salvar o ajuste. Tente de novo.'))

function Folha({ titulo, onFechar, children }: { titulo: string; onFechar: () => void; children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-40 flex items-end bg-black/60" onClick={onFechar}>
      <div role="dialog" aria-label={titulo} className="mx-auto max-h-[80dvh] w-full max-w-md space-y-4 overflow-y-auto rounded-t-3xl bg-slate-900 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-base font-bold">{titulo}</h2>
        {children}
      </div>
    </div>
  )
}

export function EditarExercicio({ meso, mesoId, semana, treino, pos, nome, n, temCarga }: Base & { pos: number; nome: string; n: number; temCarga: boolean }) {
  const [aberto, setAberto] = useState(false)
  const [juntando, setJuntando] = useState<Metodo | null>(null)
  const [parceiros, setParceiros] = useState<number[]>([])
  // Enquanto a folha está aberta, o próximo toque parte do último ajuste gravado (o snapshot pode não ter chegado).
  const ultimo = useRef<SessaoEditada | null>(null)
  const s = ultimo.current ?? iniciarEdicao(meso, semana, treino)
  const atuais = s.metodos.filter((x) => x.exercicio === pos)
  const nomesAtuais = [...new Set(atuais.map((x) => x.metodo))]
  const fechar = () => { setAberto(false); setJuntando(null); setParceiros([]); ultimo.current = null }
  const aplicar = (novo: SessaoEditada, fecha = false) => {
    if (novo === s) return
    grava(mesoId, novo)
    ultimo.current = novo
    if (fecha) fechar()
  }
  const tirar = () => {
    if (s.exercicios.length <= 1) return
    if (temCarga && !window.confirm('As cargas anotadas neste exercício ficam guardadas e voltam se você tocar em "Voltar ao planejado". Tirar?')) return
    aplicar(removerExercicio(s, pos), true)
  }
  const escolher = (m: Metodo) => {
    if (!SEQUENCIA.includes(m)) return aplicar(adicionarMetodo(s, pos, m, n))
    setJuntando(m)
    setParceiros([])
  }
  return (
    <>
      <Botao aria-label={`Editar ${nome}`} className="min-h-11" onClick={() => setAberto(true)}><IcLapis className="size-5" /></Botao>
      {aberto && (
        <Folha titulo={nome} onFechar={fechar}>
          <div>
            <div className="mb-1 text-sm font-semibold text-slate-300">Trocar exercício</div>
            <CampoExercicio placeholder="Novo exercício" onConfirmar={(t) => aplicar(trocarExercicio(s, pos, t, crypto.randomUUID()), true)} />
          </div>
          <div>
            <div className="mb-1 text-sm font-semibold text-slate-300">Métodos</div>
            {nomesAtuais.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-1.5">
                {nomesAtuais.map((m) => (
                  <span key={m} className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-bold ring-1 ${COR_METODO[m].selo}`}>
                    <IconeMetodo metodo={m} tamanho={20} /> {m}
                    <button aria-label={`Tirar ${m}`} className="min-h-8 px-1" onClick={() => aplicar(removerMetodo(s, pos, m))}>✕</button>
                  </span>
                ))}
              </div>
            )}
            <div className="flex flex-wrap gap-1.5">
              {[...DIRETOS, ...SEQUENCIA].filter((m) => !nomesAtuais.includes(m)).map((m) => (
                <Botao key={m} aria-label={`Adicionar ${m}`} tipo={juntando === m ? 'primario' : undefined} className="min-h-11" onClick={() => escolher(m)}>+ {m}</Botao>
              ))}
            </div>
            {juntando && (
              <div className="mt-3 space-y-1">
                <div className="text-sm text-slate-300">Juntar {juntando} com:</div>
                {s.exercicios.map((e, i) => i + 1 !== pos && (
                  <label key={e.slotId} className="flex min-h-11 items-center gap-3 text-sm">
                    <input type="checkbox" className="size-5" checked={parceiros.includes(i + 1)} onChange={(ev) => setParceiros((p) => (ev.target.checked ? [...p, i + 1] : p.filter((x) => x !== i + 1)))} />
                    {e.nome}
                  </label>
                ))}
                <Botao tipo="primario" className="min-h-11 w-full" disabled={!totalCerto(juntando, parceiros.length + 1)} onClick={() => { aplicar(adicionarMetodo(s, pos, juntando, n, parceiros)); setJuntando(null); setParceiros([]) }}>Juntar</Botao>
              </div>
            )}
          </div>
          {s.exercicios.length > 1 && <Botao tipo="perigo" className="min-h-11 w-full" onClick={tirar}>Tirar do treino de hoje</Botao>}
        </Folha>
      )}
    </>
  )
}

export function AdicionarExercicio({ meso, mesoId, semana, treino }: Base) {
  const [aberto, setAberto] = useState(false)
  const s = iniciarEdicao(meso, semana, treino) // a folha fecha a cada inclusão: sempre parte do snapshot
  if (s.exercicios.length >= MAX_EXERCICIOS) return null
  return (
    <>
      <Botao className="min-h-11 w-full" onClick={() => setAberto(true)}>+ Adicionar exercício</Botao>
      {aberto && (
        <Folha titulo="Adicionar exercício" onFechar={() => setAberto(false)}>
          <CampoExercicio placeholder="Nome do exercício" onConfirmar={(t) => { grava(mesoId, adicionarExercicio(s, t, crypto.randomUUID())); setAberto(false) }} />
        </Folha>
      )}
    </>
  )
}

export function FaixaAjustado({ mesoId, semana, treino }: Omit<Base, 'meso'>) {
  const voltar = () => {
    if (window.confirm('Voltar ao treino planejado? Os ajustes de hoje somem; nenhuma carga é apagada.')) voltarAoPlanejado(mesoId, semana, treino).catch(() => window.alert('Não foi possível voltar. Tente de novo.'))
  }
  return (
    <div className="mb-3 flex items-center justify-between gap-2 rounded-lg bg-amber-400/10 px-3 py-2 text-sm text-amber-300">
      <span>Treino ajustado só hoje</span>
      <Botao className="min-h-11" onClick={voltar}>Voltar ao planejado</Botao>
    </div>
  )
}
