import { isometrico, linhaIsometrica, LIMITE_ISOMETRIA_S } from './isometria'
import type { AplicacaoMetodo, ExercicioPrescrito, Meso, Sessao, SlotSessao } from './tipos'

// MAX da planilha: campos vazios valem 0 e MAX de nada é 0.
const max = (linhas: AplicacaoMetodo[], campo: (m: AplicacaoMetodo) => number | null | undefined) =>
  Math.max(0, ...linhas.map((m) => campo(m) ?? 0))

// §4 — o escopo cobre a série `pos`?
function cobre(m: AplicacaoMetodo, pos: number, n: number): boolean {
  if (m.escopo === 'Todas as séries') return true
  if (m.escopo === 'Série específica') return pos === m.serie
  const k = Number(m.escopo.split(' ')[1]) // 'Primeiras 2 séries' → 2
  return m.escopo.startsWith('Primeiras') ? pos <= k : pos > Math.max(0, n - k)
}

// §7 — sufixo do rótulo
function sufixo(m: AplicacaoMetodo): string {
  if (m.escopo === 'Todas as séries') return 'todas'
  if (m.escopo === 'Série específica') return `S${m.serie ?? ''}`
  return m.escopo.replace(' séries', '').toLowerCase() // 'Últimas 2 séries' → 'últimas 2'
}

// §8 — tamanho do bloco que divide uma pausa (Superset e Circuito: todas as posições)
const TAMANHO: Record<string, number> = { Biset: 2, Triset: 3, Superset: 0, Circuito: 0 }

// §8 — segundos extras de uma linha de método (AvTempo)
function extraTempo(m: AplicacaoMetodo): number {
  const p = m.pausaInternaS ?? 0
  const b = m.blocos ?? 0
  const ad = m.adicional ?? 0
  const rp = (m.repsPadrao ?? 0) > 0 ? m.repsPadrao! : (m.repsPorBloco ?? 0)
  if (m.metodo === 'Clusterset') return b > 1 ? rp * (b - 1) + p * (b - 1) : 0 // [CORRIGIDO]
  if (m.metodo === 'Dropset') return p * (m.etapas ?? 0)
  if (m.metodo === 'Rest-pause') return ad + p * (b > 1 ? b - 1 : 1)
  return ad + p * (b > 1 ? b - 1 : 0)
}

// Linha de reps de um exercício na semana: a própria (por slotId do slot da divisão, também numa troca),
// senão a padrão, senão o legado (principais pos 1–2, auxiliares 3–10).
export function linhaPrescrita(meso: Meso, semana: number, treino: number, pos: number): (number | null)[] {
  const slot = meso.divisao[treino - 1]?.[pos - 1]
  const iso = slot != null && isometrico(slot)
  const proprias = meso.progressaoExercicio?.[slot?.slotId ?? ''] ?? meso.progressaoExercicio?.[`${treino}-${pos}`]
  return (
    proprias?.[semana - 1] ??
    (iso ? linhaIsometrica() : undefined) ??
    meso.progressao.padrao?.[semana - 1] ??
    (pos <= 2 ? meso.progressao.principais : meso.progressao.auxiliares)[semana - 1] ??
    []
  )
}

// Exercícios do dia: a sessão editada no presencial, senão a divisão com as trocas pontuais (de = posição)
// e, no fim, as adições daquela semana (sem `de`: exercício novo).
export function slotsDaSessao(meso: Meso, semana: number, treino: number): SlotSessao[] {
  const editada = meso.sessoes?.[`${semana}-${treino}`]
  if (editada) return editada.exercicios
  return [
    ...(meso.divisao[treino - 1] ?? []).map((original, i) => ({ ...(meso.trocas?.[`${semana}-${treino}-${i + 1}`] ?? original), de: i + 1 })),
    ...(meso.adicoes?.[`${semana}-${treino}`] ?? []),
  ]
}

// Linhas de método do dia (ativas ou não): as da sessão editada, senão as do plano.
export function metodosDaSessao(meso: Meso, semana: number, treino: number): AplicacaoMetodo[] {
  const editada = meso.sessoes?.[`${semana}-${treino}`]
  return editada ? editada.metodos : meso.metodos.filter((m) => m.semana === semana && m.treino === treino)
}

export function prescreverSessao(meso: Meso, semana: number, treino: number): Sessao | null {
  if (semana < 1 || semana > meso.semanas || treino < 1 || treino > meso.frequencia) return null

  const [ano, mes, dia] = meso.inicio.slice(0, 10).split('-').map(Number)
  const inicioSemana = new Date(Date.UTC(ano, mes - 1, dia + 7 * (semana - 1))).toISOString().slice(0, 10)
  const doTreino = metodosDaSessao(meso, semana, treino).filter((m) => m.ativo)

  const exercicios = slotsDaSessao(meso, semana, treino).map(({ de, ...slot }, i): ExercicioPrescrito => {
    const pos = i + 1
    // Exercício novo (sem `de`): progressão padrão, senão a dos auxiliares.
    const planejado = de != null ? meso.divisao[treino - 1]?.[de - 1] : undefined
    const iso = isometrico(slot)
    const mesmaUnidade = planejado && isometrico(planejado) === iso
    const linha = (iso ? meso.progressaoExercicio?.[slot.slotId]?.[semana - 1] : undefined) ?? (mesmaUnidade ? linhaPrescrita(meso, semana, treino, de!) : iso ? linhaIsometrica() : (meso.progressao.padrao ?? meso.progressao.auxiliares)[semana - 1] ?? [])
    const base = (k: number) => linha[k - 1] ?? 0
    const n = linha.filter((r) => typeof r === 'number').length
    const linhas = doTreino.filter((m) => m.exercicio === pos)
    const dropLinhas = linhas.filter((m) => m.metodo === 'Dropset')

    // §5 — séries normais
    const reps: number[] = []
    const cargaSugerida: (number | null)[] = []
    for (let k = 1; k <= n; k++) {
      const cobrem = linhas.filter((m) => cobre(m, k, n))
      const pad = max(cobrem, (m) => m.repsPadrao)
      const bloco = max(cobrem, (m) => m.repsPorBloco)
      reps.push(pad > 0 ? pad : bloco > 0 ? bloco : base(k))
      cargaSugerida.push(null)
    }

    // §5/§6 — etapas extras do dropset. Cada linha pendura as etapas numa série: a específica (limitada a n),
    // senão a última série que o escopo cobre (Todas/Últimas = n). Linhas da mesma série se juntam (MAX).
    // Colunas depois das séries, em ordem de série; com uma série só são as mesmas de antes (cargas antigas no lugar).
    const serieDoDrop = (m: AplicacaoMetodo) =>
      m.escopo === 'Série específica'
        ? Math.min(m.serie || n, n)
        : Math.max(0, ...Array.from({ length: n }, (_, i) => i + 1).filter((k) => cobre(m, k, n))) || n
    const drops: { serie: number; etapa: number }[] = []
    for (const serie of [...new Set(dropLinhas.map(serieDoDrop))].sort((a, b) => a - b)) {
      const daSerie = dropLinhas.filter((m) => serieDoDrop(m) === serie)
      const et = max(daSerie, (m) => m.etapas)
      const padDrop = max(daSerie, (m) => m.repsPadrao)
      for (let passo = 1; passo <= et; passo++) {
        const repEt = max(daSerie, (m) => m.repsEtapa?.[passo - 1])
        reps.push(repEt > 0 ? repEt : padDrop > 0 ? padDrop : base(serie))
        cargaSugerida.push(daSerie[0].cargaEtapa?.[passo - 1] || null)
        drops.push({ serie, etapa: passo })
      }
    }

    if (iso) for (let k = 0; k < reps.length; k++) reps[k] = Math.min(LIMITE_ISOMETRIA_S, Math.max(1, reps[k]))
    const rotulo = linhas.map((m) => `${m.metodo} [${sufixo(m)}]`).join('; ')
    const pausaS = slot.pausaS ?? (de != null && de <= 2 ? (meso.pausaPrincipaisS ?? meso.pausaS) : meso.pausaS)
    return { pos, slot, n, reps, rotulo, cargaSugerida, pausaS, drops }
  })

  // §8 — tempo
  const series = Math.max(0, ...exercicios.map((e) => e.n))
  // [DECIDIDO] exercícios do mesmo grupo dividem uma pausa só: com `grupo`, economiza (posições − 1);
  // sem `grupo`, agrupa por método em blocos de 2 (Biset), 3 (Triset) ou todos (Superset, 4+ exercícios, e Circuito).
  const grupos = new Map<string, Set<number>>()
  for (const m of doTreino) {
    if (!(m.metodo in TAMANHO)) continue
    const chave = `${m.metodo}|${m.grupo ?? ''}`
    grupos.set(chave, (grupos.get(chave) ?? new Set()).add(m.exercicio))
  }
  let economizados = 0
  for (const [chave, pos] of grupos) {
    const [metodo, grupo] = chave.split('|')
    const t = grupo || !TAMANHO[metodo] ? pos.size : TAMANHO[metodo]
    economizados += Math.floor(pos.size / t) * (t - 1)
  }
  const somaReps = exercicios.reduce((s, e) => s + e.reps.reduce((a, r) => a + r, 0), 0)
  const extras = doTreino.reduce((s, m) => s + extraTempo(m), 0)
  // A pausa de cada exercício é a do slot, senão a dos principais (pos 1–2), senão a do meso; a economia usa a pausa média.
  const somaPausas = exercicios.reduce((s, e) => s + e.pausaS, 0)
  const pausas = exercicios.length ? series * (somaPausas / exercicios.length) * Math.max(0, exercicios.length - economizados) : 0
  const tempoMin = 10 + (somaReps + pausas + extras) / 60

  return { semana, treino, inicioSemana, pausaS: meso.pausaS, series, exercicios, tempoMin }
}
