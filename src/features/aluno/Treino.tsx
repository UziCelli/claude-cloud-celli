import { collection, doc, query, where } from 'firebase/firestore'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { confete, elastico, saida, suave } from '../../movimento'
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { prescreverSessao, type Metodo } from '../../engine'
import { COR_METODO, METODOS, metodoDoRotulo } from '../../data/metodos'
import { limparTreino, marcarTreino } from '../../lib/inatividade'
import { mmss, useDescanso } from '../../lib/descanso'
import { dispensarNota, notaDispensada } from '../../lib/notasMetodo'
import { seriesDoRotulo } from '../../lib/metodoSeries'
import IconeMetodo from '../metodos/IconeMetodo'
import AvisoNotificacoes from './AvisoNotificacoes'
import FimTreino from './FimTreino'
import { cancelarTreino, marcarInicio, marcarRealizado, registrarCarga, registrarPc, registrarReps, salvarNota, salvarPeso } from '../../lib/acoes'
import { duracaoTreino, fimDaSessao, TETO_TREINO_MS } from '../../lib/resumo'
import type { Usuario } from '../../lib/acesso'
import { corpoEhCarga, fracaoPC, preencherCorpo, rebasear } from '../../lib/pesoCorporal'
import { docParaCargas, docParaMeso, docsParaRegistros, docsParaRegistrosReps, type MesoSalvo, type NotasDoc, type RegistroDoc } from '../../lib/conversores'
import { db } from '../../lib/firebase'
import { useDoc, useLista } from '../../lib/hooks'
import { historicoExercicios, recordeAnterior, resumoTreino, type RegistroEvolucao } from '../../lib/evolucao'
import { ehRecorde } from '../../lib/recorde'
import { cargaAnterior } from '../../lib/treino'
import { cargaVolta, comVolta, semanaDeVolta, travado as travadoAgenda } from '../../lib/agenda'
import { IcCadeado, IcCheck, IcInfo, IcLapis, IcMais, IcPausa, IcPlay, IcReiniciar, IcSino, IcSinoMudo } from '../../icones'
import { ir } from '../../rota'
import { Botao, cascata, Centro, item, Painel } from '../../ui'
import { acimaDoLimite, fmtMin } from '../../lib/tempo'
import { fmt, fmtData } from '../coach/semana/format'
import LoadInput from '../coach/semana/LoadInput'

type RegistroFlag = RegistroDoc & { realizado?: boolean; inicioEm?: unknown; realizadoEm?: { toMillis(): number } | null; pc?: Record<string, number> }

// Cartão "Novidades": só nas 2 primeiras aberturas (contador no localStorage; sem ele, aparece sempre).
const CHAVE_NOVIDADES = 'forca-novidades-pc'
function Novidades() {
  const [ver, setVer] = useState(() => {
    try {
      const n = Number(localStorage.getItem(CHAVE_NOVIDADES) ?? 0)
      if (n >= 2) return false
      localStorage.setItem(CHAVE_NOVIDADES, String(n + 1))
    } catch {
      /* sem armazenamento: mostra */
    }
    return true
  })
  const fechar = () => {
    try {
      localStorage.setItem(CHAVE_NOVIDADES, '2')
    } catch {
      /* ignora */
    }
    setVer(false)
  }
  return (
    <Painel aberto={ver}>
    <div className="mb-4 rounded-2xl border border-marca-400/60 bg-gradient-to-br from-marca-500/30 to-marca-700/10 p-4 text-sm shadow-lg shadow-marca-500/20">
      <div className="mb-3 flex items-center gap-2 text-base font-bold text-white">
        <span className="grid size-8 place-items-center rounded-full bg-marca-500"><IcInfo className="size-4" /></span>
        Novidades
      </div>
      <ul className="mb-4 space-y-2 text-slate-100">
        {[
          'Anotação em cada exercício',
          'Feito com o peso do corpo: já vem marcado na barra fixa e na flexão; nos campos, anote só o peso extra',
          'Número cinza = carga da semana passada',
          'Treino do dia em destaque na tela Hoje',
        ].map((t) => (
          <li key={t} className="flex gap-2"><IcCheck className="mt-0.5 size-4 shrink-0 text-marca-300" />{t}</li>
        ))}
      </ul>
      <Botao tipo="primario" className="w-full" onClick={fechar}>Entendi</Botao>
    </div>
    </Painel>
  )
}

const METODOS_SEQUENCIA = /Biset|Triset|Superset|Circuito/
const Modal = ({ rotulo, children }: { rotulo: string; children: ReactNode }) => (
  <m.div
    role="dialog"
    aria-label={rotulo}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, transition: saida }}
    transition={suave}
    className="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
  >
    <m.div
      initial={{ y: 48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 48, opacity: 0, transition: saida }}
      transition={suave}
      className="max-h-[90vh] w-full max-w-sm overflow-y-auto rounded-xl border border-slate-700 bg-slate-900 p-5"
    >
      {children}
    </m.div>
  </m.div>
)

// Explicação de um método (toque no selo): sempre abre.
function ExplicacaoMetodo({ metodo, fechar }: { metodo: Metodo; fechar: () => void }) {
  const t = METODOS[metodo]
  return (
    <Modal rotulo={`Como fazer ${metodo}`}>
      <div className={`mb-3 flex items-center gap-3 ${COR_METODO[metodo].texto}`}>
        <IconeMetodo metodo={metodo} tamanho={48} />
        <h2 className="text-lg font-bold text-slate-100">{metodo}</h2>
      </div>
      <h3 className="mb-1 text-sm font-semibold">Como fazer</h3>
      <ol className="mb-3 list-decimal space-y-1 pl-5 text-sm text-slate-300">
        {t.comoFazer.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ol>
      {t.dica && <p className="mb-3 text-sm text-slate-400">Dica: {t.dica}</p>}
      <a href="#/metodos" className="mb-4 block text-sm text-marca-500 underline">
        Ver todos os métodos
      </a>
      <Botao tipo="primario" className="w-full" onClick={fechar}>
        Fechar
      </Botao>
    </Modal>
  )
}

// Nota ao abrir o treino: uma só, com os métodos ainda não dispensados.
function NotaMetodos({ metodos }: { metodos: Metodo[] }) {
  const [ver, setVer] = useState(() => metodos.length > 0)
  return (
    <AnimatePresence>
      {ver && (
        <Modal rotulo="Métodos deste treino">
          <h2 className="mb-3 text-lg font-bold">Métodos deste treino</h2>
          <div className="mb-3 space-y-3">
            {metodos.map((x) => (
              <div key={x} className={`flex gap-3 ${COR_METODO[x].texto}`}>
                <IconeMetodo metodo={x} tamanho={40} />
                <div className="min-w-0 text-sm text-slate-300">
                  <div className="font-bold text-slate-100">{x}</div>
                  {METODOS[x].comoFazer.join(' ')}
                </div>
              </div>
            ))}
          </div>
          <p className="mb-4 text-xs text-slate-400">Toque no selo colorido do exercício para ver esta explicação de novo.</p>
          <div className="flex flex-col gap-2">
            <Botao tipo="primario" className="w-full" onClick={() => setVer(false)}>
              Entendi
            </Botao>
            <Botao
              className="w-full"
              onClick={() => {
                metodos.forEach(dispensarNota)
                setVer(false)
              }}
            >
              Não mostrar de novo
            </Botao>
          </div>
        </Modal>
      )}
    </AnimatePresence>
  )
}

function AvisoAdaptado({ chave }: { chave: string }) {
  const [ver, setVer] = useState(() => {
    try {
      return localStorage.getItem(chave) !== '1'
    } catch {
      return true
    }
  })
  const fechar = () => {
    try {
      localStorage.setItem(chave, '1')
    } catch {
      /* ignora */
    }
    setVer(false)
  }
  return (
    <AnimatePresence>
      {ver && (
        <m.div
          role="dialog"
          aria-label="Treino adaptado"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: saida }}
          transition={suave}
          className="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
        >
          <m.div
            initial={{ y: 48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 48, opacity: 0, transition: saida }}
            transition={suave}
            className="w-full max-w-sm rounded-xl border border-slate-700 bg-slate-900 p-5"
          >
            <p className="mb-4 text-sm text-slate-300">Seu coach adaptou seu treino para você progredir dentro do seu tempo.</p>
            <Botao tipo="primario" className="w-full" onClick={fechar}>
              Entendi
            </Botao>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )
}

function Nota({ uid, nome, texto }: { uid: string; nome: string; texto: string }) {
  const [editando, setEditando] = useState(false)
  const [rascunho, setRascunho] = useState('')
  const conteudo = editando ? (
      <div className="mb-2">
        <textarea
          autoFocus
          maxLength={300}
          rows={3}
          value={rascunho}
          onChange={(ev) => setRascunho(ev.target.value)}
          placeholder="Ex.: banco na posição 3, aparelho Life"
          aria-label={`Anotação de ${nome}`}
          className="w-full rounded border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100 outline-none transition-[border-color,box-shadow] focus:border-marca-500 focus:shadow-[0_0_0_3px_rgba(63,114,166,0.3)]"
        />
        <div className="mt-1 flex gap-2">
          <Botao
            tipo="primario"
            onClick={() => {
              salvarNota(uid, nome, rascunho)
              setEditando(false)
            }}
          >
            Salvar
          </Botao>
          <Botao onClick={() => setEditando(false)}>Cancelar</Botao>
        </div>
      </div>
    ) : null
  const abrir = () => {
    setRascunho(texto)
    setEditando(true)
  }
  const fechado = texto ? (
    <button onClick={abrir} aria-label={`Editar anotação de ${nome}`} className="mb-3 flex w-full items-start justify-between gap-3 border-l-2 border-marca-500/50 py-1 pl-3 text-left text-sm text-slate-300">
      <span className="min-w-0 break-words">{texto}</span>
      <IcLapis className="size-4 shrink-0 text-slate-500" />
    </button>
  ) : (
    <button onClick={abrir} className="mb-3 inline-flex items-center gap-1.5 py-1 text-sm text-slate-400">
      <IcMais className="size-4" /> Anotação
    </button>
  )
  return (
    <AnimatePresence initial={false} mode="wait">
      <m.div
        key={editando ? 'e' : 'v'}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0, transition: saida }}
        transition={suave}
        className="overflow-hidden"
      >
        {conteudo ?? fechado}
      </m.div>
    </AnimatePresence>
  )
}

const hms = (ms: number) => {
  const t = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(t / 3600)
  const r = `${String(Math.floor((t % 3600) / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`
  return h ? `${h}:${r}` : r
}

// Tempo corrido do treino: conta de inicioEm até "Concluir treino"; concluído mostra a duração final parada.
function RelogioTreino({ inicio, fim, realizado, quieto, previsto, onIniciar, onCancelar }: { inicio: number | null; fim: number | null; realizado: boolean; quieto: boolean | null; previsto: string; onIniciar: () => void; onCancelar: () => void }) {
  const [agora, setAgora] = useState(Date.now)
  // Parado: concluído, ou "Desfazer" (mantém a hora do fim desta sessão): o relógio não volta a contar de um início antigo.
  const parado = realizado || fim != null
  const rodando = inicio != null && !parado
  // A marca de treino em andamento só sai no "Concluir treino" (abrir um treino antigo já concluído não pode
  // apagar a de outro treino que está rodando neste aparelho).
  useEffect(() => {
    if (!rodando) return
    setAgora(Date.now())
    const id = setInterval(() => setAgora(Date.now()), 1000)
    return () => clearInterval(id)
  }, [rodando])
  if (parado) {
    const d = duracaoTreino(inicio, fim) // acima de 3 h é treino esquecido aberto: sem duração falsa
    return d != null ? <p className="mb-3 text-sm text-slate-400">Duração do treino · <span className="font-semibold tabular-nums text-slate-100">{hms(d)}</span> · previsto {previsto}</p> : null
  }
  if (inicio == null) return <Botao tipo="primario" aria-label="Iniciar treino" className="borda-brilho mb-3 min-h-11 flex w-full items-center justify-center gap-2 shadow-lg shadow-marca-500/40" onClick={onIniciar}><IcPlay className="size-5" /> Iniciar treino</Botao>
  return (
    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
      <p role="timer" className="flex items-center gap-2 whitespace-nowrap text-sm text-slate-400">
        <span aria-hidden className={`h-2 w-2 rounded-full bg-emerald-400 ${quieto ? '' : 'animate-pulse'}`} />
        Treino em andamento · <span data-testid="relogio-treino" className="font-semibold tabular-nums text-slate-100">{agora - inicio > TETO_TREINO_MS ? 'mais de 3 h' : hms(agora - inicio)}</span>
        <span className="text-slate-500">· previsto {previsto}</span>
      </p>
      <Botao tipo="alerta" className="min-h-11 whitespace-nowrap" onClick={onCancelar}>Cancelar treino</Botao>
    </div>
  )
}

const CONFETE = ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#facc15', '#a78bfa']

// Aviso de recorde: some sozinho em ~5 s (o pai troca a `key` a cada recorde).
// Fica a 30% da área visível: no iPhone o app passa por baixo da barra de status (black-translucent) e,
// com o teclado aberto, `fixed top` sai da tela; o visualViewport diz onde está a parte que se vê.
function FestaRecorde({ texto, quieto, fechar }: { texto: string; quieto: boolean | null; fechar: () => void }) {
  const [topo, setTopo] = useState<number | null>(null)
  useEffect(() => {
    const t = setTimeout(fechar, 5000)
    return () => clearTimeout(t)
  }, [fechar])
  useEffect(() => {
    const vv = window.visualViewport
    if (!vv) return
    const pos = () => setTopo(vv.offsetTop + vv.height * 0.3)
    pos()
    vv.addEventListener('resize', pos)
    vv.addEventListener('scroll', pos)
    return () => {
      vv.removeEventListener('resize', pos)
      vv.removeEventListener('scroll', pos)
    }
  }, [])
  return (
    <m.div
      role="status"
      style={topo == null ? undefined : { top: topo }}
      initial={{ opacity: 0, y: quieto ? 0 : -16, scale: quieto ? 1 : 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, transition: saida }}
      transition={elastico}
      className="pointer-events-none fixed inset-x-4 top-[calc(env(safe-area-inset-top)+25vh)] z-40 mx-auto max-w-sm rounded-2xl border-2 border-amber-400 bg-slate-900 px-5 py-4 text-center text-base font-bold text-amber-200 shadow-2xl shadow-amber-500/20"
    >
      {!quieto &&
        CONFETE.map((cor, i) => (
          <m.span
            key={i}
            aria-hidden
            className="absolute left-1/2 top-1/2 h-2 w-2 rounded-sm"
            style={{ backgroundColor: cor }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{ x: (i - 2.5) * 44, y: i % 2 ? 56 : -40, rotate: i * 120, opacity: 0 }}
            transition={confete}
          />
        ))}
      {texto}
    </m.div>
  )
}

export default function Treino({ uid, mesoId, semana, treino, base = '', coach }: { uid: string; mesoId: string; semana: number; treino: number; base?: string; coach?: boolean }) {
  const { dados, carregando } = useDoc<MesoSalvo>(doc(db, 'mesos', mesoId))
  const { dados: docsRegistros, pendente } = useLista<RegistroFlag>(
    query(collection(db, 'registros'), where('alunoId', '==', uid), where('mesoId', '==', mesoId)),
  )
  const { dados: notas } = useDoc<NotasDoc>(doc(db, 'notas', uid))
  const [pcLocal, setPcLocal] = useState<Record<string, number>>({}) // vale até o Firestore confirmar
  const { dados: perfil } = useDoc<Usuario>(doc(db, 'usuarios', uid))
  const descanso = useDescanso()
  const [explicar, setExplicar] = useState<Metodo | null>(null)
  const [inicioLocal, setInicioLocal] = useState<number | null>(null) // hora do toque, até o servidor confirmar
  const jaIniciou = useRef(false)
  // Festa no recorde: só leitura do histórico inteiro do aluno.
  const quieto = useReducedMotion()
  const qTodos = useMemo(() => query(collection(db, 'registros'), where('alunoId', '==', uid)), [uid])
  const qMesos = useMemo(() => query(collection(db, 'mesos'), where('alunoId', '==', uid)), [uid])
  const { dados: todosRegistros } = useLista<RegistroEvolucao>(qTodos)
  const { dados: todosMesos } = useLista<MesoSalvo>(qMesos)
  const historico = useMemo(
    () => historicoExercicios(todosMesos.map((x) => ({ id: x.id, meso: docParaMeso(x), nome: x.nome })), todosRegistros),
    [todosMesos, todosRegistros],
  )
  const festejados = useRef(new Set<string>())
  const [festa, setFesta] = useState<{ n: number; texto: string } | null>(null)
  const fecharFesta = useCallback(() => setFesta(null), [])
  const [verResumo, setVerResumo] = useState(false)
  const [fimLocal, setFimLocal] = useState<number | null>(null) // hora do "Concluir", até o servidor confirmar

  if (carregando) return <Centro>Carregando…</Centro>
  if (!dados) return <Centro>Treino não encontrado.</Centro>

  const hoje = new Date()
  const meso = comVolta(docParaMeso(dados), docsRegistros, hoje) // semana de volta: prescrição com −5%
  const volta = semanaDeVolta(meso, docsRegistros, hoje, semana) // e a carga anterior (número cinza) também
  const sessao = prescreverSessao(meso, semana, treino)
  if (!sessao) return <Centro>Treino não encontrado.</Centro>

  const cargas = docsParaRegistros(docsRegistros, meso) // totais normalizados (ver normalizarCargas)
  const repsFeitas = docsParaRegistrosReps(docsRegistros)
  const chave = `${semana}-${treino}`
  const cs = cargas[chave] ?? {}
  const rs = repsFeitas[chave] ?? {}
  const docAtual = docsRegistros.find((r) => r.semana === semana && r.treino === treino)
  const pcs = docAtual?.pc ?? {}
  const cargasCruas = docParaCargas(docAtual?.cargas) // o que está gravado de fato (para decidir o que gravar)
  const pcsPorRegistro = Object.fromEntries(docsRegistros.map((r) => [`${r.semana}-${r.treino}`, r.pc]))
  const iniciou = () => {
    if (inicioMs != null || jaIniciou.current) return // início pendente offline lê null: não conta, senão o botão fica morto depois de recarregar
    jaIniciou.current = true
    const t = Date.now()
    setInicioLocal(t)
    marcarTreino(t) // treino em andamento neste aparelho conta como uso (inatividade)
    marcarInicio(mesoId, uid, semana, treino)
  }
  const cancelar = () => {
    if (!window.confirm('Cancelar este treino? O tempo zera e as cargas e reps anotadas nele são apagadas.')) return
    cancelarTreino(mesoId, semana, treino, docAtual)
    limparTreino()
    setInicioLocal(null)
    setFimLocal(null)
    setPcLocal({})
    jaIniciou.current = false
    descanso.parar()
  }
  const vermelho = acimaDoLimite(sessao.tempoMin, meso.tempoLimiteMin)
  const realizado = docsRegistros.some((r) => r.semana === semana && r.treino === treino && r.realizado)
  const ms = (t: unknown) => (t as { toMillis?: () => number } | null | undefined)?.toMillis?.() ?? null
  const inicioMs = ms(docAtual?.inicioEm) ?? inicioLocal
  const fimMs = fimDaSessao(inicioMs, ms(docAtual?.realizadoEm)) ?? fimLocal
  const comecou = inicioMs != null || docAtual?.inicioEm !== undefined || fimMs != null // início pendente offline (null) também conta; fimMs é só o fim desta sessão (fim sem início, da planilha, não conta)
  const travado = !coach && !comecou && !realizado // aluno só anota depois de "Iniciar treino" (treino concluído continua editável)
  if (!coach && !comecou && !realizado && travadoAgenda(meso, docsRegistros, hoje, semana, treino) && ms(docAtual?.realizadoEm) == null) { // já tem fim salvo ("Desfazer" numa semana antiga): não tranca
    return (
      <Centro>
        <div className="flex flex-col items-center gap-3 text-center">
          <IcCadeado className="size-10 text-slate-400" />
          <p className="text-lg font-semibold">Semana {semana} já passou.</p>
          <button onClick={() => ir(base || '/')} className="inline-flex min-h-11 items-center pr-4 text-sm text-marca-400 underline">← Hoje</button>
        </div>
      </Centro>
    )
  }
  const abrirResumo = () => {
    setVerResumo(true)
    window.scrollTo(0, 0)
  }

  // Peso do corpo de um exercício (render e "Concluir"). Automático só em slot sem carga e sem escolha explícita: o histórico nunca muda.
  const estadoCorpo = (e: (typeof sessao.exercicios)[number]) => {
    const slot = e.slot.slotId
    const explicito = slot in pcLocal || slot in pcs
    const auto = !explicito && !(cs[slot] ?? []).some((c) => c != null) && corpoEhCarga(e.slot.nome) && !!perfil?.pesoKg
    const corpo = explicito ? (pcLocal[slot] ?? (pcs[slot] || 0)) : auto ? Math.round(perfil!.pesoKg! * fracaoPC(e.slot.nome) * 10) / 10 : 0
    return { auto, corpo }
  }
  const concluir = () => {
    for (const e of sessao.exercicios) {
      const { corpo } = estadoCorpo(e)
      if (!(corpo > 0)) continue
      const slot = e.slot.slotId
      if (!(slot in pcs)) registrarPc(mesoId, uid, semana, treino, slot, corpo)
      // Crua: série vazia só com reps feitas (que a leitura já conta como corpo) também é gravada.
      for (const { coluna, kg } of preencherCorpo(cargasCruas[slot] ?? [], e.n, corpo)) registrarCarga(mesoId, uid, semana, treino, slot, coluna, kg)
    }
    limparTreino()
    marcarRealizado(mesoId, uid, semana, treino, true, fimMs != null) // fim real desta sessão (inclusive offline, pendente) é mantido; fim de fora (planilha/antigo) é trocado por agora
    setFimLocal(Date.now())
    abrirResumo()
  }

  // Exercícios do mesmo grupo de método ficam juntos (só a ordem de exibição muda).
  const grupoDe = (pos: number) => {
    const l = meso.metodos.find((x) => x.ativo && x.semana === semana && x.treino === treino && x.exercicio === pos && x.grupo != null && METODOS_SEQUENCIA.test(x.metodo))
    return l ? `${l.metodo}|${l.grupo}` : null
  }
  const chaves = sessao.exercicios.map((e) => grupoDe(e.pos))
  const ordemGrupos = [...new Set(chaves.filter(Boolean))]
  const visitado = new Set<number>()
  const exibicao = sessao.exercicios.flatMap((e, i) => {
    if (visitado.has(i)) return []
    const membros = chaves[i] ? sessao.exercicios.filter((_, j) => chaves[j] === chaves[i]) : [e]
    membros.forEach((x) => visitado.add(sessao.exercicios.indexOf(x)))
    return membros
  })
  const notaInicial = [...new Set(sessao.exercicios.flatMap((e) => (e.rotulo ? e.rotulo.split('; ') : []).map(metodoDoRotulo)))].filter((x): x is Metodo => x != null && !notaDispensada(x))
  const adaptadoEm = (dados as { adaptadoEm?: { toMillis(): number } }).adaptadoEm?.toMillis() // docParaMeso não traz adaptadoEm

  if (verResumo)
    return (
      <FimTreino
        nome={perfil?.nome?.trim().split(/\s+/)[0]}
        duracaoMs={duracaoTreino(inicioMs, fimMs)}
        resumo={resumoTreino(historico, { mesoId, semana, treino })}
        semana={semana}
        feitosSemana={new Set(docsRegistros.filter((r) => r.semana === semana && r.realizado).map((r) => r.treino)).size}
        frequencia={meso.frequencia}
        quieto={quieto}
        voltar={() => ir(base || '/')}
        verTreino={() => setVerResumo(false)}
      />
    )

  return (
    <main className="mx-auto max-w-md px-4 pb-[calc(7rem+env(safe-area-inset-bottom))] pt-4">
      <AvisoNotificacoes />
      <button onClick={() => ir(base || '/')} className="mb-2 inline-flex min-h-11 items-center pr-4 text-sm text-slate-400">
        ← Hoje
      </button>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-lg font-bold">Treino {treino}</h1>
          <p className="text-xs text-slate-400">
            Semana {semana} · pausa {meso.pausaPrincipaisS != null && meso.pausaPrincipaisS !== meso.pausaS ? `${meso.pausaPrincipaisS}s/${meso.pausaS}` : sessao.pausaS}s · início {fmtData(sessao.inicioSemana)}
          </p>
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 font-display text-lg font-bold ${vermelho ? 'bg-red-500/20 text-red-400' : 'bg-slate-800 text-slate-100'}`}>{fmtMin(sessao.tempoMin)}</span>
        {pendente && <span className="max-w-[40%] text-right text-xs text-amber-400">salvo no celular · envia quando tiver internet</span>}
      </div>

      <RelogioTreino inicio={inicioMs} fim={fimMs} realizado={realizado} quieto={quieto} previsto={fmtMin(sessao.tempoMin)} onIniciar={iniciou} onCancelar={cancelar} />
      {!comecou && !realizado && (coach
        ? <p className="mb-3 text-sm text-slate-400">Sem iniciar: as cargas ficam salvas, mas o treino não conta como feito.</p>
        : <p className="mb-3 text-sm text-amber-300">Toque em Iniciar treino para anotar as cargas.</p>)}
      <AnimatePresence>{festa && <FestaRecorde key={festa.n} texto={festa.texto} quieto={quieto} fechar={fecharFesta} />}</AnimatePresence>
      <NotaMetodos metodos={notaInicial} />
      <AnimatePresence>{explicar && <ExplicacaoMetodo metodo={explicar} fechar={() => setExplicar(null)} />}</AnimatePresence>
      {adaptadoEm != null && <AvisoAdaptado chave={`forca-adaptado-${mesoId}-${adaptadoEm}`} />}
      <Novidades />
      <m.div className="space-y-4" variants={cascata} initial="hidden" animate="show">
        {exibicao.map((e, idx) => {
          const gk = grupoDe(e.pos)
          const membros = gk ? exibicao.filter((x) => grupoDe(x.pos) === gk) : []
          const ordem = membros.indexOf(e)
          const letra = String.fromCharCode(65 + ordemGrupos.indexOf(gk))
          void idx
          const colunasCargas = cs[e.slot.slotId] ?? []
          const colunasReps = rs[e.slot.slotId] ?? []
          const anterior = cargaAnterior(meso, cargas, semana, treino, e.pos, pcsPorRegistro) // só o extra, com o corpo do registro de origem
          const slot = e.slot.slotId
          const partes = e.rotulo ? e.rotulo.split('; ').map((p) => ({ p, mt: metodoDoRotulo(p) })) : []
          const gc = gk ? COR_METODO[gk.split('|')[0] as Metodo] : undefined
          const frac = fracaoPC(e.slot.nome)
          const { auto, corpo } = estadoCorpo(e)
          // Troca do corpo ainda não confirmada pelo Firestore: um 2º toque rebasearia sobre cargas velhas.
          const trocandoPc = slot in pcLocal && pcLocal[slot] !== (pcs[slot] ?? 0)
          const gravaPc = (kg: number) => {
            setPcLocal((p) => ({ ...p, [slot]: kg }))
            // Cargas já digitadas mantêm o extra: c - corpo antigo + corpo novo (valores normalizados), tudo numa gravação.
            // Desmarcar: série que estava vazia no banco (só a leitura contava o corpo) volta a vazia, não vira 0.
            const muda = rebasear(colunasCargas, corpo, kg).filter((g) => kg > 0 || cargasCruas[slot]?.[g.coluna] != null)
            registrarPc(mesoId, uid, semana, treino, slot, kg, muda).catch(() =>
              setPcLocal(({ [slot]: _, ...resto }) => resto), // recusada: volta ao que está gravado
            )
          }
          const alternarPc = () => {
            if (trocandoPc) return
            if (corpo) return gravaPc(0)
            let peso = perfil?.pesoKg
            if (!peso) {
              const n = Number((window.prompt('Qual é o seu peso (kg)?') ?? '').replace(',', '.'))
              if (!(n >= 20 && n <= 300)) return
              salvarPeso(uid, n)
              peso = n
            }
            gravaPc(Math.round(peso * frac * 10) / 10)
          }
          return (
            <m.div key={e.slot.slotId} variants={item} className={`relative rounded-xl border bg-slate-900 p-4 ${gc ? gc.borda : 'border-slate-800'}`}>
              {gk && ordem > 0 && <span aria-hidden className={`absolute -top-4 left-6 h-4 w-0.5 ${gc?.faixa}`} />}
              {gk && (
                <div className={`mb-2 text-xs font-semibold ${gc?.texto}`}>
                  {gk.split('|')[0]} {membros.map((_, k) => <span key={k}>{k > 0 && ' / '}<span className={k === ordem ? 'text-slate-100' : ''}>{letra}{k + 1}</span></span>)}
                </div>
              )}
              <div className="mb-2 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="font-semibold">{e.slot.nome}</div>
                  {e.rotulo && (
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {e.rotulo.split('; ').map((parte) => {
                        const mt = metodoDoRotulo(parte)
                        return (
                          <button
                            key={parte}
                            disabled={!mt}
                            onClick={() => mt && setExplicar(mt)}
                            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-bold ring-1 ${mt ? COR_METODO[mt].selo : 'bg-slate-700 text-slate-100 ring-slate-500'}`}
                          >
                            {mt && <IconeMetodo metodo={mt} tamanho={20} />}
                            {parte} <IcInfo className="size-4" />
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
                <div className="flex shrink-0 gap-1">
                  <Botao aria-label="Som do cronômetro" className="min-h-11" onClick={descanso.alternarSom}>
                    {descanso.som ? <IcSino className="size-5" /> : <IcSinoMudo className="size-5" />}
                  </Botao>
                  <Botao
                    tipo={descanso.slot === slot ? 'primario' : undefined}
                    aria-label={descanso.slot === slot ? `${descanso.rodando ? 'Pausar' : 'Continuar'} ${mmss(descanso.restante)}` : `Descansar ${e.pausaS} s`}
                    className="inline-flex min-h-11 items-center gap-1"
                    onClick={() => descanso.alternar(e.pausaS, slot)}
                  >
                    {descanso.slot === slot ? <>{descanso.rodando ? <IcPausa className="size-4" /> : <IcPlay className="size-4" />} {mmss(descanso.restante)}</> : <><IcPlay className="size-4" /> {e.pausaS} s</>}
                  </Botao>
                  {descanso.slot === slot && (
                    <Botao aria-label="Reiniciar" className="min-h-11" onClick={() => descanso.iniciar(e.pausaS, slot)}>
                      <IcReiniciar className="size-4" />
                    </Botao>
                  )}
                </div>
              </div>
              <Nota key={notas?.exercicios?.[e.slot.nome.trim()] ?? ''} uid={uid} nome={e.slot.nome.trim()} texto={notas?.exercicios?.[e.slot.nome.trim()] ?? ''} />
              <div className="space-y-2">
                {e.reps.map((repAlvo, k) => {
                  const dropStage = k >= e.n
                  const rotuloCol = dropStage ? `D${k - e.n + 1}` : `S${k + 1}`
                  const placeholderKg = dropStage
                    ? (e.cargaSugerida[k] ?? null)
                    : anterior?.[k] != null
                      ? fmt(volta ? cargaVolta(anterior[k]!) : anterior[k]!)
                      : null
                  // Uma faixa colorida por método que cobre esta série (etapas do drop = Dropset).
                  const cores = [...new Set(partes.filter(({ p, mt }) => mt && (dropStage ? mt === 'Dropset' : seriesDoRotulo(p, e.n).includes(k + 1))).map(({ mt }) => mt!))]
                  return (
                    <div key={k} className={`relative grid grid-cols-[1.75rem_3.25rem_minmax(0,1fr)_auto_minmax(0,1fr)_auto] items-center gap-1.5 ${e.rotulo ? 'pl-3' : ''}`}>
                      {cores.length > 0 && (
                        <span aria-hidden className="absolute inset-y-0 left-0 flex gap-0.5">
                          {cores.map((c) => (
                            <span key={c} className={`w-1 rounded-full ${COR_METODO[c].faixa}`} />
                          ))}
                        </span>
                      )}
                      <span className={`text-xs ${cores[0] ? `font-bold ${COR_METODO[cores[0]].texto}` : 'text-slate-400'}`}>{rotuloCol}</span>
                      <span className="truncate text-xs text-slate-400">{repAlvo} reps</span>
                      <LoadInput
                        className="w-full min-w-0"
                        disabled={travado}
                        valor={colunasCargas[k] != null ? Math.max(0, Math.round((colunasCargas[k]! - corpo) * 100) / 100) : null}
                        placeholder={placeholderKg}
                        onSalvar={(v) => {
                          if (auto && v != null) gravaPc(corpo) // fixa a escolha antes da 1ª carga
                          const total = v == null ? null : Math.round((v + corpo) * 100) / 100
                          registrarCarga(mesoId, uid, semana, treino, e.slot.slotId, k, total)
                          if (comecou && !festejados.current.has(e.slot.nome) && ehRecorde(recordeAnterior(historico, e.slot.nome, { mesoId, semana, treino }), total)) {
                            festejados.current.add(e.slot.nome)
                            navigator.vibrate?.([80, 40, 120])
                            setFesta({ n: festejados.current.size, texto: `Novo recorde! ${e.slot.nome}: ${fmt(total!)} kg` })
                          }
                        }}
                      />
                      <span className="text-xs text-slate-600">kg</span>
                      <LoadInput
                        className="w-full min-w-0"
                        disabled={travado}
                        valor={colunasReps[k] ?? null}
                        placeholder={repAlvo}
                        onSalvar={(v) => { registrarReps(mesoId, uid, semana, treino, e.slot.slotId, k, v) }}
                      />
                      <span className="text-xs text-slate-600">feitas</span>
                    </div>
                  )
                })}
              </div>
              {/* Logo abaixo das séries: o app soma o peso do corpo ao extra digitado. */}
              <label className="mt-3 flex items-start gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-200">
                <input type="checkbox" checked={!!corpo} disabled={trocandoPc || travado} onChange={alternarPc} className="mt-0.5 h-5 w-5 shrink-0" />
                <span>
                  <b>Feito com o peso do corpo</b>
                  <span className="block text-xs text-slate-400">
                    {auto || (corpo > 0 && corpoEhCarga(e.slot.nome))
                      ? 'Já vem marcado porque neste exercício o corpo é a carga. Nos campos, anote só o peso extra (anilha, colete, cinto).'
                      : 'Nos campos, anote só o peso extra (anilha, colete, cinto).'}
                  </span>
                  {!!corpo && <span className="mt-1 block text-xs text-slate-400">Séries em branco contam só o peso do corpo ao concluir.</span>}
                </span>
              </label>
              {corpo > 0 && perfil?.pesoKg && (
                <p className="mt-2 text-xs text-slate-400">
                  Peso do corpo contado: {fmt(corpo)} kg ({Math.round(frac * 100)}% de {fmt(perfil.pesoKg)} kg)
                </p>
              )}
            </m.div>
          )
        })}
      </m.div>

      <div className="mt-6">
        {realizado ? (
          <div className="space-y-2 text-center">
            <p className="font-semibold text-emerald-400">
              Treino concluído{' '}
              <m.span
                className="inline-block"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={elastico}
              >
                <IcCheck className="size-5" />
              </m.span>
            </p>
            <div className="flex justify-center gap-2">
              <Botao tipo="primario" onClick={abrirResumo}>
                Ver resumo
              </Botao>
              <Botao onClick={() => marcarRealizado(mesoId, uid, semana, treino, false)}>Desfazer</Botao>
            </div>
          </div>
        ) : (
          comecou && (
            <Botao tipo="primario" className="w-full py-4 text-base" onClick={concluir}>
              Concluir treino
            </Botao>
          )
        )}
      </div>

      <AnimatePresence>
      {descanso.visivel && (
        <m.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0, transition: saida }}
          transition={suave}
          className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-800 bg-slate-900 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3"
        >
          <div className="mx-auto mb-2 h-1.5 max-w-md overflow-hidden rounded bg-slate-800">
            <m.div
              key={descanso.ciclo}
              className="h-full rounded bg-marca-500"
              initial={{ width: '100%' }}
              animate={{ width: descanso.pausado ? `${(descanso.restante / descanso.total) * 100}%` : '0%' }}
              transition={{ duration: descanso.pausado ? 0 : descanso.restante, ease: 'linear' }}
            />
          </div>
          <div className="mx-auto flex max-w-md items-center justify-between">
            <div>
              <div className="text-xs text-slate-400">Descanso</div>
              <div className="font-display text-2xl font-bold tabular-nums">{mmss(descanso.restante)}</div>
            </div>
            <Botao className="min-h-11" onClick={descanso.parar}>Pular</Botao>
          </div>
        </m.div>
      )}
      </AnimatePresence>
    </main>
  )
}
