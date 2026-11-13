import { linhaPrescrita, prescreverSessao } from './sessao'
import type { AlvoVolume, Meso } from './tipos'

type Linha = (number | null)[]
const LIMITE_PADRAO = 15
const PCT_PADRAO = 5

// Volume = movimentos = soma das reps das séries. `pct` em porcentagem (5 = +5%, -20 = -20%).
// Sobe o nº de séries (até 6) enquanto a série passaria de `limite`; sobra vai para as primeiras séries.
export function ajustarSeries(reps: Linha, pct: number, limite: number): Linha {
  const atual = reps.filter((r): r is number => typeof r === 'number')
  let n = atual.length
  const saida: Linha = [null, null, null, null, null, null]
  if (n === 0) return saida
  const total = atual.reduce((a, b) => a + b, 0)
  // 100+pct antes de dividir (evita 20·1,1 = 22,000000000000004); arredonda o resto do ponto flutuante.
  const bruto = Math.round(((total * (100 + pct)) / 100) * 1e9) / 1e9
  const alvo = Math.max(n, pct > 0 ? Math.ceil(bruto) : Math.floor(bruto))
  while (Math.ceil(alvo / n) > limite && n < 6) n++
  const base = Math.floor(alvo / n)
  const sobra = alvo - base * n
  for (let i = 0; i < n; i++) saida[i] = base + (i < sobra ? 1 : 0)
  return saida
}

export const limiteDe = (m: Meso) => m.limiteReps ?? LIMITE_PADRAO

// Aplica `f` (recebe as linhas semana a semana, devolve as novas) aos exercícios do alvo. Devolve um meso novo.
// Treino/exercício viram override em progressaoExercicio[slotId] (nasce como cópia da linha que o motor usa hoje).
function aplicar(meso: Meso, alvo: AlvoVolume, f: (linhas: Linha[]) => Linha[]): Meso {
  const sequencia = (t: number, p: number) =>
    Array.from({ length: meso.semanas }, (_, w) => [...linhaPrescrita(meso, w + 1, t, p)])
  const posicaoDe = (slotId: string): [number, number] | undefined => {
    for (const [i, slots] of meso.divisao.entries()) {
      const j = slots.findIndex((s) => s.slotId === slotId)
      if (j >= 0) return [i + 1, j + 1]
    }
  }
  const overrides = { ...meso.progressaoExercicio }

  if (alvo.tipo === 'todos') {
    for (const [slotId, linhas] of Object.entries(overrides)) {
      const pos = posicaoDe(slotId)
      overrides[slotId] = f(pos ? sequencia(...pos) : Array.from({ length: meso.semanas }, (_, w) => [...(linhas[w] ?? [])]))
    }
    const { principais, auxiliares, padrao } = meso.progressao
    return {
      ...meso,
      progressao: { principais: f(principais), auxiliares: f(auxiliares), ...(padrao && { padrao: f(padrao) }) },
      ...(meso.progressaoExercicio && { progressaoExercicio: overrides }),
    }
  }

  const alvos: ([number, number] | undefined)[] =
    alvo.tipo === 'treino'
      ? (meso.divisao[alvo.treino - 1] ?? []).map((_, i) => [alvo.treino, i + 1])
      : alvo.tipo === 'exercicios'
        ? alvo.slotIds.map(posicaoDe)
        : [
          'slotId' in alvo ? posicaoDe(alvo.slotId) : [alvo.treino, alvo.pos],
        ]
  let mudou = false
  for (const pos of alvos) {
    const slotId = pos && meso.divisao[pos[0] - 1]?.[pos[1] - 1]?.slotId
    if (!pos || !slotId) continue
    overrides[slotId] = f(sequencia(...pos))
    mudou = true
  }
  return mudou ? { ...meso, progressaoExercicio: overrides } : meso
}

// Semanas de..ate (1-based) cada uma a partir da anterior: linha(w) = ajustarSeries(linha(w-1)).
// Semana em `pausas` repete a anterior (progressão pausada); a seguinte progride a partir dela.
export function progressaoAutomatica(
  meso: Meso,
  { pct, de, ate, alvo, pausas = [] }: { pct: number; de: number; ate: number; alvo: AlvoVolume; pausas?: number[] },
): Meso {
  const limite = limiteDe(meso)
  return aplicar(meso, alvo, (linhas) => {
    const novas = [...linhas]
    for (let w = Math.max(de, 2); w <= Math.min(ate, meso.semanas); w++) {
      novas[w - 1] = pausas.includes(w) ? [...novas[w - 2]] : ajustarSeries(novas[w - 2], pct, limite)
    }
    return novas
  })
}

// Redução de `pct`% nas semanas de..ate, volta gradual em `retorno` semanas e depois a progressão
// (+progressaoPct/semana) recomeça de `ref` (a semana antes da redução): pausada, sem "pular" o que seria.
export function reduzirVolume(
  meso: Meso,
  { pct, de, ate, retorno = 2, alvo }: { pct: number; de: number; ate: number; retorno?: number; alvo: AlvoVolume },
): Meso {
  const limite = limiteDe(meso)
  const prog = meso.progressaoPct ?? PCT_PADRAO
  return aplicar(meso, alvo, (linhas) => {
    const novas = [...linhas]
    const ref = linhas[Math.max(de - 1, 1) - 1]
    let w = Math.max(de, 1)
    for (; w <= Math.min(ate, meso.semanas); w++) novas[w - 1] = ajustarSeries(ref, -pct, limite)
    for (let k = 1; k <= retorno && w <= meso.semanas; k++, w++) {
      novas[w - 1] = ajustarSeries(ref, (-pct * (retorno + 1 - k)) / (retorno + 1), limite)
    }
    let anterior = ref
    for (; w <= meso.semanas; w++) {
      anterior = novas[w - 1] = ajustarSeries(anterior, prog, limite)
    }
    return novas
  })
}

// Tipos de polimento (taper): como a queda se distribui nas semanas seguidas de polimento.
// `pct` é sempre a queda da ÚLTIMA semana do bloco; o tipo muda o caminho até lá.
export type TipoPolimento = 'degrau' | 'linear' | 'expRapida' | 'expLenta'
const CURVA_EXP = { expRapida: 3, expLenta: 1.5 } // quanto maior, mais da queda vem logo na 1ª semana

// Fração (0..1) da queda total na k-ésima semana (1..n) de um bloco de n semanas.
export function fracaoPolimento(tipo: TipoPolimento, k: number, n: number): number {
  if (tipo === 'degrau' || n <= 1) return 1
  if (tipo === 'linear') return k / n
  const c = CURVA_EXP[tipo]
  return (1 - Math.exp((-c * k) / n)) / (1 - Math.exp(-c))
}

// Polimento: cada bloco de semanas seguidas (2 em diante) cai sobre a última semana normal antes dele.
// A semana 1 não tem anterior e fica de fora. As outras não mudam; aplicar de novo dá o mesmo resultado.
export function polimento(
  meso: Meso,
  { pct, semanas, alvo, tipo = 'degrau' }: { pct: number; semanas: number[]; alvo: AlvoVolume; tipo?: TipoPolimento },
): Meso {
  if (!semanas.length) return meso
  const limite = limiteDe(meso)
  return aplicar(meso, alvo, (linhas) =>
    linhas.map((l, i) => {
      if (i === 0 || !semanas.includes(i + 1)) return l
      let r = i // semana de referência (1-based)
      while (r > 1 && semanas.includes(r)) r--
      let fim = i + 1
      while (fim < linhas.length && semanas.includes(fim + 1)) fim++
      return ajustarSeries(linhas[r - 1], -pct * fracaoPolimento(tipo, i + 1 - r, fim - r), limite)
    }),
  )
}

// Forma da subida do volume (semana 1 até o pico), para o coach ver se a progressão está exagerada.
export type FormaProgressao = 'linear' | 'acelerando' | 'desacelerando' | 'ondulada' | 'sem-subida' | 'curta'
export type AnaliseProgressao = {
  forma: FormaProgressao
  pico: number // índice (0 = semana 1) da 1ª vez que chega ao máximo
  mediaPct: number // subida média por semana até o pico (composta)
  maiorSalto: { semana: number; pct: number } | null
  ritmo: 'leve' | 'adequado' | 'agressivo' | null
  quedaFinal: number // % da última semana em relação ao pico (polimento); 0 = sem queda
}
// Limites do ritmo (% por semana). Ajuste aqui se o Victor quiser outro critério.
export const RITMO = { leve: 2.5, agressivoMedia: 10, agressivoSalto: 15 }
const um = (x: number) => Math.round(x * 10) / 10

export function analisarProgressao(v: number[]): AnaliseProgressao {
  const max = Math.max(0, ...v)
  const pico = Math.max(0, v.indexOf(max))
  const ultima = v[v.length - 1] ?? 0
  const quedaFinal = max > 0 ? um((ultima / max - 1) * 100) : 0
  const base = { pico, quedaFinal }
  if (pico === 0) return { ...base, forma: 'sem-subida', mediaPct: 0, maiorSalto: null, ritmo: null }

  const d = v.slice(1, pico + 1).map((x, i) => x - v[i])
  let maiorSalto: AnaliseProgressao['maiorSalto'] = null
  for (let i = 1; i <= pico; i++) {
    if (v[i - 1] <= 0) continue
    const pct = um((v[i] / v[i - 1] - 1) * 100)
    if (!maiorSalto || pct > maiorSalto.pct) maiorSalto = { semana: i + 1, pct }
  }
  const mediaPct = v[0] > 0 ? um(((max / v[0]) ** (1 / pico) - 1) * 100) : 0
  const ritmo =
    v[0] <= 0 ? null : mediaPct > RITMO.agressivoMedia || (maiorSalto?.pct ?? 0) > RITMO.agressivoSalto ? 'agressivo' : mediaPct < RITMO.leve ? 'leve' : 'adequado'

  let forma: FormaProgressao
  if (d.some((x) => x < 0)) forma = 'ondulada'
  else if (d.length < 2) forma = 'curta'
  else {
    const h = Math.floor(d.length / 2)
    const media = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length
    const a = media(d.slice(0, h))
    const b = media(d.slice(d.length - h))
    forma = b > a * 1.3 ? 'acelerando' : b < a * 0.7 ? 'desacelerando' : 'linear'
  }
  return { ...base, forma, mediaPct, maiorSalto, ritmo }
}

// Maior tempoMin entre os treinos de cada semana (índice 0 = semana 1).
export function tempoPorSemana(meso: Meso): number[] {
  return Array.from({ length: meso.semanas }, (_, w) =>
    Math.max(0, ...Array.from({ length: meso.frequencia }, (_, t) => prescreverSessao(meso, w + 1, t + 1)?.tempoMin ?? 0)),
  )
}
