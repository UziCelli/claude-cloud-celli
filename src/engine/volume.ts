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

const limiteDe = (m: Meso) => m.limiteReps ?? LIMITE_PADRAO

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
export function progressaoAutomatica(
  meso: Meso,
  { pct, de, ate, alvo }: { pct: number; de: number; ate: number; alvo: AlvoVolume },
): Meso {
  const limite = limiteDe(meso)
  return aplicar(meso, alvo, (linhas) => {
    const novas = [...linhas]
    for (let w = Math.max(de, 2); w <= Math.min(ate, meso.semanas); w++) {
      novas[w - 1] = ajustarSeries(novas[w - 2], pct, limite)
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

// Maior tempoMin entre os treinos de cada semana (índice 0 = semana 1).
export function tempoPorSemana(meso: Meso): number[] {
  return Array.from({ length: meso.semanas }, (_, w) =>
    Math.max(0, ...Array.from({ length: meso.frequencia }, (_, t) => prescreverSessao(meso, w + 1, t + 1)?.tempoMin ?? 0)),
  )
}
