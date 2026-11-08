// Edição do treino do dia no presencial (só o coach). Cada toque grava na hora; o motor é `engine/editarSessao`.
import { useRef, useState } from 'react'
import { adicionarExercicio, adicionarMetodo, alternarSerieDropset, iniciarEdicao, removerExercicio, escoposPara, mudarSeries, removerMetodo, serieDoDrop, trocarExercicio } from '../../../engine'
import type { Escopo, Meso, Metodo, SessaoEditada } from '../../../engine'
import { COR_METODO } from '../../../data/metodos'
import { salvarSessaoEditada, voltarAoPlanejado } from '../../../lib/acoes'
import { IcLapis } from '../../../icones'
import { Botao, Folha } from '../../../ui'
import IconeMetodo from '../../metodos/IconeMetodo'
import CampoExercicio from '../meso/CampoExercicio'

export const MAX_EXERCICIOS = 10
export const DIRETOS: Metodo[] = ['Dropset', 'Rest-pause', 'Clusterset']
export const SEQUENCIA: Metodo[] = ['Biset', 'Triset', 'Superset', 'Circuito']
export const totalCerto = (m: Metodo, total: number) => (m === 'Biset' ? total === 2 : m === 'Triset' ? total === 3 : m === 'Superset' ? total >= 4 : total >= 2)

export const opcoesSeries = (n: number): [string, Escopo, number?][] => [
  ['Todas', 'Todas as séries'],
  ...Array.from({ length: n }, (_, k): [string, Escopo, number] => [`S${k + 1}`, 'Série específica', k + 1]),
  ...escoposPara(n).filter((e) => e !== 'Todas as séries' && e !== 'Série específica').map((e): [string, Escopo] => [e.replace(' séries', ''), e]),
]

type Base = { meso: Meso; mesoId: string; semana: number; treino: number }
const grava = (mesoId: string, s: SessaoEditada) => salvarSessaoEditada(mesoId, s).catch(() => window.alert('Não foi possível salvar o ajuste. Tente de novo.'))

export function EditarExercicio({ meso, mesoId, semana, treino, pos, nome, n, temCarga }: Base & { pos: number; nome: string; n: number; temCarga: boolean }) {
  const [aberto, setAberto] = useState(false)
  const [seriesDe, setSeriesDe] = useState<Metodo | null>(null)
  const [juntando, setJuntando] = useState<Metodo | null>(null)
  const [parceiros, setParceiros] = useState<number[]>([])
  // Enquanto a folha está aberta, o próximo toque parte do último ajuste gravado (o snapshot pode não ter chegado).
  const ultimo = useRef<SessaoEditada | null>(null)
  const s = ultimo.current ?? iniciarEdicao(meso, semana, treino)
  const atuais = s.metodos.filter((x) => x.exercicio === pos)
  const nomesAtuais = [...new Set(atuais.map((x) => x.metodo))]
  const fechar = () => { setAberto(false); setSeriesDe(null); setJuntando(null); setParceiros([]); ultimo.current = null }
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
                    <button aria-label={`Séries do ${m}`} aria-expanded={seriesDe === m} className="flex min-h-8 items-center gap-1.5" onClick={() => setSeriesDe(seriesDe === m ? null : m)}>
                      <IconeMetodo metodo={m} tamanho={20} /> {m}
                    </button>
                    <button aria-label={`Tirar ${m}`} className="min-h-8 px-1" onClick={() => aplicar(removerMetodo(s, pos, m))}>✕</button>
                  </span>
                ))}
              </div>
            )}
            {seriesDe === 'Dropset' && nomesAtuais.includes('Dropset') && (
              // Dropset: liga/desliga em cada série (drop em várias séries); a última ligada não desliga.
              <div className="mb-2 flex flex-wrap gap-1.5">
                {Array.from({ length: n }, (_, k) => k + 1).map((k) => {
                  const ativo = atuais.some((x) => x.metodo === 'Dropset' && serieDoDrop(x, n) === k)
                  return <Botao key={k} aria-pressed={ativo} tipo={ativo ? 'primario' : undefined} className="min-h-11" onClick={() => aplicar(alternarSerieDropset(s, pos, k, n))}>S{k}</Botao>
                })}
              </div>
            )}
            {seriesDe && seriesDe !== 'Dropset' && nomesAtuais.includes(seriesDe) && (
              <div className="mb-2 flex flex-wrap gap-1.5">
                {opcoesSeries(n).map(([rotulo, escopo, serie]) => {
                  const a = atuais.find((x) => x.metodo === seriesDe)
                  const ativo = a?.escopo === escopo && (escopo !== 'Série específica' || a.serie === serie)
                  return <Botao key={rotulo} aria-pressed={ativo} tipo={ativo ? 'primario' : undefined} className="min-h-11" onClick={() => aplicar(mudarSeries(s, pos, seriesDe, escopo, serie))}>{rotulo}</Botao>
                })}
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
