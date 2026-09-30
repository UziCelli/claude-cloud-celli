import type { AplicacaoMetodo, ExercicioPrescrito, Meso, Sessao } from './tipos'

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

// §8 — tamanho do bloco que divide uma pausa (Circuito: todas as posições)
const TAMANHO: Record<string, number> = { Biset: 2, Superset: 2, Triset: 3, Circuito: 0 }

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

// Linha de reps de um exercício na semana: o override dele, senão a do grupo (principais pos 1–2, auxiliares).
export function linhaPrescrita(meso: Meso, semana: number, treino: number, pos: number): (number | null)[] {
  return (
    meso.progressaoExercicio?.[`${treino}-${pos}`]?.[semana - 1] ??
    (pos <= 2 ? meso.progressao.principais : meso.progressao.auxiliares)[semana - 1] ??
    []
  )
}

export function prescreverSessao(meso: Meso, semana: number, treino: number): Sessao | null {
  if (semana < 1 || semana > meso.semanas || treino < 1 || treino > meso.frequencia) return null

  const [ano, mes, dia] = meso.inicio.slice(0, 10).split('-').map(Number)
  const inicioSemana = new Date(Date.UTC(ano, mes - 1, dia + 7 * (semana - 1))).toISOString().slice(0, 10)
  const doTreino = meso.metodos.filter((m) => m.ativo && m.semana === semana && m.treino === treino)

  const exercicios = (meso.divisao[treino - 1] ?? []).map((original, i): ExercicioPrescrito => {
    const pos = i + 1
    const slot = meso.trocas?.[`${semana}-${treino}-${pos}`] ?? original
    const linha = linhaPrescrita(meso, semana, treino, pos)
    const base = (k: number) => linha[k - 1] ?? 0
    const n = linha.filter((r) => typeof r === 'number').length
    const linhas = doTreino.filter((m) => m.exercicio === pos)
    const drops = linhas.filter((m) => m.metodo === 'Dropset')

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

    // §5/§6 — etapas extras do dropset (escopo não filtra)
    const et = max(drops, (m) => m.etapas)
    const padDrop = max(drops, (m) => m.repsPadrao)
    const alvo = max(drops, (m) => m.serie) || n
    for (let passo = 1; passo <= et; passo++) {
      const repEt = max(drops, (m) => m.repsEtapa?.[passo - 1])
      reps.push(repEt > 0 ? repEt : padDrop > 0 ? padDrop : base(Math.min(alvo, n)))
      cargaSugerida.push(drops[0].cargaEtapa?.[passo - 1] || null)
    }

    const rotulo = linhas.map((m) => `${m.metodo} [${sufixo(m)}]`).join('; ')
    return { pos, slot, n, reps, rotulo, cargaSugerida }
  })

  // §8 — tempo
  const series = Math.max(0, ...exercicios.map((e) => e.n))
  // [DECIDIDO] exercícios do mesmo grupo dividem uma pausa só: com `grupo`, economiza (posições − 1);
  // sem `grupo`, agrupa por método em blocos de 2 (Biset/Superset), 3 (Triset) ou todos (Circuito).
  const grupos = new Map<string, Set<number>>()
  for (const m of doTreino) {
    if (!(m.metodo in TAMANHO)) continue
    const chave = `${m.metodo}|${m.grupo ?? ''}`
    grupos.set(chave, (grupos.get(chave) ?? new Set()).add(m.exercicio))
  }
  let economizados = 0
  for (const [chave, pos] of grupos) {
    const [metodo, grupo] = chave.split('|')
    const t = grupo || metodo === 'Circuito' ? pos.size : TAMANHO[metodo]
    economizados += Math.floor(pos.size / t) * (t - 1)
  }
  const somaReps = exercicios.reduce((s, e) => s + e.reps.reduce((a, r) => a + r, 0), 0)
  const extras = doTreino.reduce((s, m) => s + extraTempo(m), 0)
  const pausas = series * meso.pausaS * Math.max(0, exercicios.length - economizados)
  const tempoMin = 10 + (somaReps + pausas + extras) / 60

  return { semana, treino, inicioSemana, pausaS: meso.pausaS, series, exercicios, tempoMin }
}
