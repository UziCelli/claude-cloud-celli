import { useMemo, useState } from 'react'
import { emGrupo, linhasDoExercicio, METODOS, padraoMetodo, removerLinha, salvarLinha, semanasTexto, serieDoDrop, alternarSerieDropset, seriesDoExercicio, seriesTexto, totalCerto } from '../../../engine'
import type { AplicacaoMetodo, LinhaMetodo, Meso, Metodo } from '../../../engine'
import { COR_METODO } from '../../../data/metodos'
import { Aviso, Botao, Campo, Folha, Painel } from '../../../ui'
import IconeMetodo from '../../metodos/IconeMetodo'
import { opcoesSeries } from '../presencial/EditarTreino'

const TAMANHO_GRUPO: Partial<Record<Metodo, number>> = { Biset: 2, Triset: 3, Superset: 4 }

interface Rascunho { metodo: Metodo | null; semanas: number[]; modelo: AplicacaoMetodo[]; parceiros: number[] }
type Aberta = { pos: number; linha?: LinhaMetodo }

export default function TabMetodos({ meso, onAtualizar }: { meso: Meso; onAtualizar: (patch: Partial<Meso>) => void }) {
  const metodos = meso.metodos
  const [treino, setTreino] = useState(1)
  const [aberta, setAberta] = useState<Aberta | null>(null)
  const sel = Math.min(treino, meso.frequencia)
  const exercicios = meso.divisao[sel - 1] ?? []
  const nome = (p: number) => exercicios[p - 1]?.nome ?? `Posição ${p}`
  const maxPos = Math.max(exercicios.length, ...metodos.filter((m) => m.treino === sel).map((m) => m.exercicio))

  const avisos = useMemo(() => {
    const grupos = new Map<string, Set<number>>()
    for (const m of metodos) {
      if (m.grupo == null || !(m.metodo in TAMANHO_GRUPO)) continue
      const chave = `${m.semana}-${m.treino}-${m.metodo}-${m.grupo}`
      grupos.set(chave, (grupos.get(chave) ?? new Set()).add(m.exercicio))
    }
    const lista: string[] = []
    for (const [chave, pos] of grupos) {
      const [semana, treino, metodo] = chave.split('-')
      const esperado = TAMANHO_GRUPO[metodo as Metodo]!
      const minimo = metodo === 'Superset'
      if (minimo ? pos.size < esperado : pos.size !== esperado) {
        lista.push(`${metodo} da semana ${semana}, treino ${treino}: tem ${pos.size} exercício(s), ${minimo ? 'o mínimo' : 'o esperado'} é ${esperado}.`)
      }
    }
    return lista
  }, [metodos])

  return (
    <div className="space-y-4">
      {avisos.map((a, i) => (
        <Aviso key={i}>{a}</Aviso>
      ))}
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: meso.frequencia }, (_, i) => i + 1).map((t) => (
          <Botao key={t} aria-pressed={t === sel} tipo={t === sel ? 'primario' : undefined} className="min-h-11" onClick={() => setTreino(t)}>
            Treino {t}
          </Botao>
        ))}
      </div>
      {exercicios.length === 0 && maxPos === 0 && <p className="text-slate-500">Este treino ainda não tem exercícios. Monte na aba Divisão.</p>}
      <ul className="space-y-4">
        {Array.from({ length: maxPos }, (_, i) => i + 1).map((pos) => (
          <li key={pos} className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="min-w-0 break-words font-semibold">{exercicios[pos - 1] ? `${pos}. ${nome(pos)}` : `Posição ${pos} (sem exercício)`}</span>
              {exercicios[pos - 1] && (
                <Botao aria-label={`Adicionar método em ${nome(pos)}`} className="min-h-11 shrink-0" onClick={() => setAberta({ pos })}>
                  + Método
                </Botao>
              )}
            </div>
            {linhasDoExercicio(metodos, sel, pos).map((l) => {
              const n = seriesDoExercicio(meso, sel, pos, l.semanas)
              const texto = `${l.metodo}${l.parceiros.length ? ` com ${l.parceiros.map((p) => `${p}. ${nome(p)}`).join(', ')}` : ''} · ${seriesTexto(l.modelo, n)} · ${semanasTexto(l.semanas, meso.semanas)}${l.modelo[0].ativo ? '' : ' · desligado'}`
              return (
                <div key={`${l.metodo}-${l.semanas.join()}-${l.parceiros.join()}-${l.modelo.map((e) => e.serie).join()}`} className="flex items-stretch gap-2">
                  <button type="button" onClick={() => setAberta({ pos, linha: l })} className={`flex min-h-11 min-w-0 flex-1 items-center gap-2 rounded-lg px-3 py-2 text-left text-sm ring-1 ${COR_METODO[l.metodo].selo}`}>
                    <IconeMetodo metodo={l.metodo} tamanho={16} />
                    <span className="min-w-0 break-words">{texto}</span>
                  </button>
                  <Botao aria-label={`Tirar ${l.metodo} de ${nome(pos)}`} className="min-h-11 shrink-0" onClick={() => window.confirm(`Tirar ${l.metodo} de ${nome(pos)}?${emGrupo(l.metodo) ? ' O grupo inteiro sai.' : ''}`) && onAtualizar({ metodos: removerLinha(metodos, sel, pos, l) })}>
                    ✕
                  </Botao>
                </div>
              )
            })}
          </li>
        ))}
      </ul>
      {aberta && (
        <FolhaMetodo
          key={`${aberta.pos}-${aberta.linha?.metodo ?? 'novo'}`}
          meso={meso}
          treino={sel}
          aberta={aberta}
          nome={nome}
          onFechar={() => setAberta(null)}
          onAtualizar={onAtualizar}
        />
      )}
    </div>
  )
}

function FolhaMetodo({ meso, treino, aberta, nome, onFechar, onAtualizar }: { meso: Meso; treino: number; aberta: Aberta; nome: (p: number) => string; onFechar: () => void; onAtualizar: (patch: Partial<Meso>) => void }) {
  const { pos, linha } = aberta
  const todas = Array.from({ length: meso.semanas }, (_, i) => i + 1)
  const [r, setR] = useState<Rascunho>(linha ? { metodo: linha.metodo, semanas: linha.semanas, modelo: linha.modelo, parceiros: linha.parceiros } : { metodo: null, semanas: todas, modelo: [], parceiros: [] })
  const [mais, setMais] = useState(false)
  const n = seriesDoExercicio(meso, treino, pos, r.semanas.length ? r.semanas : todas) || 1
  const { metodo } = r
  const m0 = r.modelo[0]
  const todos = (patch: Partial<AplicacaoMetodo>) => setR({ ...r, modelo: r.modelo.map((e) => ({ ...e, ...patch })) })
  const escolher = (m: Metodo) => setR({ ...r, metodo: m, modelo: [padraoMetodo(m, 1, treino, pos, n)], parceiros: [] })
  const alternarSemana = (w: number) => setR({ ...r, semanas: r.semanas.includes(w) ? r.semanas.filter((x) => x !== w) : [...r.semanas, w].sort((a, b) => a - b) })
  const outros = (meso.divisao[treino - 1] ?? []).map((_, i) => i + 1).filter((p) => p !== pos)
  const etapas = m0?.etapas ?? 1
  const lista = (v?: (number | null)[]) => [...(v ?? [])]
  const chip = (ativo: boolean, rotulo: string, onClick: () => void) => (
    <Botao key={rotulo} aria-pressed={ativo} tipo={ativo ? 'primario' : undefined} className="min-h-11" onClick={onClick}>{rotulo}</Botao>
  )
  const titulo = linha ? `${linha.metodo} · ${nome(pos)}` : `Novo método · ${nome(pos)}`
  const pronto = metodo != null && r.semanas.length > 0 && (!emGrupo(metodo) || totalCerto(metodo, r.parceiros.length + 1))
  const gravar = (novos: AplicacaoMetodo[]) => { onAtualizar({ metodos: novos }); onFechar() }

  return (
    <Folha titulo={titulo} onFechar={onFechar}>
      {!linha && (
        <section className="space-y-2">
          <div className="text-sm font-semibold text-slate-300">Método</div>
          <div className="flex flex-wrap gap-1.5">{METODOS.map((m) => chip(metodo === m, m, () => escolher(m)))}</div>
        </section>
      )}
      {metodo && m0 && (
        <>
          <section className="space-y-2">
            <div className="text-sm font-semibold text-slate-300">Semanas</div>
            <div className="flex flex-wrap gap-1.5">
              {chip(r.semanas.length === todas.length, 'Todas', () => setR({ ...r, semanas: todas }))}
              {todas.map((w) => chip(r.semanas.includes(w), String(w), () => alternarSemana(w)))}
            </div>
          </section>
          <section className="space-y-2">
            <div className="text-sm font-semibold text-slate-300">Em quais séries</div>
            {metodo === 'Dropset' ? (
              <>
                <div className="flex flex-wrap gap-1.5">
                  {Array.from({ length: n }, (_, i) => i + 1).map((k) =>
                    chip(r.modelo.some((e) => serieDoDrop(e, n) === k), `S${k}`, () =>
                      setR({ ...r, modelo: alternarSerieDropset({ semana: 0, treino, exercicios: [], metodos: r.modelo }, pos, k, n).metodos }),
                    ),
                  )}
                </div>
                <div className="text-sm text-slate-300">Etapas</div>
                <div className="flex flex-wrap gap-1.5">{[1, 2, 3].map((e) => chip(etapas === e, String(e), () => todos({ etapas: e })))}</div>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: etapas }, (_, i) => i + 1).map((e) => (
                    <div key={e} className="flex flex-wrap gap-2">
                      <CampoNum rotulo={`Carga etapa ${e} (kg)`} valor={m0.cargaEtapa?.[e - 1] ?? null} onChange={(v) => { const a = lista(m0.cargaEtapa); a[e - 1] = v ?? null; todos({ cargaEtapa: a }) }} />
                      <CampoNum rotulo={`Reps etapa ${e}`} valor={m0.repsEtapa?.[e - 1] ?? null} onChange={(v) => { const a = lista(m0.repsEtapa); a[e - 1] = v ?? null; todos({ repsEtapa: a }) }} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {opcoesSeries(n).map(([rotulo, escopo, serie]) =>
                  chip(m0.escopo === escopo && (escopo !== 'Série específica' || m0.serie === serie), rotulo, () => {
                    const { serie: _s, ...resto } = m0
                    setR({ ...r, modelo: [serie ? { ...resto, escopo, serie } : { ...resto, escopo }] })
                  }),
                )}
              </div>
            )}
          </section>
          {emGrupo(metodo) && (
            <section className="space-y-1">
              <div className="text-sm font-semibold text-slate-300">Juntar com</div>
              {outros.map((p) => (
                <label key={p} className="flex min-h-11 items-center gap-2 text-sm">
                  <input type="checkbox" checked={r.parceiros.includes(p)} onChange={() => setR({ ...r, parceiros: r.parceiros.includes(p) ? r.parceiros.filter((x) => x !== p) : [...r.parceiros, p].sort((a, b) => a - b) })} />
                  <span className="min-w-0 break-words">{p}. {nome(p)}</span>
                </label>
              ))}
              <p className="text-xs text-slate-400">Biset: 1 parceiro · Triset: 2 · Superset: 3 ou mais · Circuito: 1 ou mais</p>
            </section>
          )}
          <section className="space-y-2">
            <Botao aria-expanded={mais} className="min-h-11 w-full" onClick={() => setMais(!mais)}>Mais ajustes</Botao>
            <Painel aberto={mais} className="space-y-3">
              <label className="flex min-h-11 items-center gap-2 text-sm">
                <input type="checkbox" checked={m0.ativo} onChange={(e) => todos({ ativo: e.target.checked })} />
                Ligado
              </label>
              <div className="flex flex-wrap gap-2">
                <CampoNum rotulo="Pausa interna (s)" valor={m0.pausaInternaS ?? null} onChange={(v) => todos({ pausaInternaS: v })} />
                {metodo === 'Clusterset' && (
                  <>
                    <CampoNum rotulo="Blocos" valor={m0.blocos ?? null} onChange={(v) => todos({ blocos: v })} />
                    <CampoNum rotulo="Reps por bloco" valor={m0.repsPorBloco ?? null} onChange={(v) => todos({ repsPorBloco: v })} />
                  </>
                )}
                {metodo === 'Rest-pause' && (
                  <>
                    <CampoNum rotulo="Blocos" valor={m0.blocos ?? null} onChange={(v) => todos({ blocos: v })} />
                    <CampoNum rotulo="Adicional" valor={m0.adicional ?? null} onChange={(v) => todos({ adicional: v })} />
                  </>
                )}
                <CampoNum rotulo="Reps padrão (opcional)" valor={m0.repsPadrao ?? null} onChange={(v) => todos({ repsPadrao: v })} />
              </div>
            </Painel>
          </section>
        </>
      )}
      <div className="flex gap-2">
        <Botao tipo="primario" className="min-h-11 flex-1" disabled={!pronto} onClick={() => gravar(salvarLinha(meso.metodos, { treino, pos, metodo: metodo!, semanas: r.semanas, modelo: r.modelo, parceiros: r.parceiros }, linha?.semanas ?? []))}>
          Pronto
        </Botao>
        {linha && (
          <Botao tipo="perigo" className="min-h-11" onClick={() => gravar(removerLinha(meso.metodos, treino, pos, linha))}>
            Tirar
          </Botao>
        )}
      </div>
    </Folha>
  )
}

function CampoNum({ rotulo, valor, onChange }: { rotulo: string; valor: number | null; onChange: (v: number | undefined) => void }) {
  return (
    <Campo
      rotulo={rotulo}
      type="number"
      value={valor ?? ''}
      onChange={(e) => onChange(e.target.value === '' ? undefined : Number(e.target.value))}
      className="w-32"
    />
  )
}
