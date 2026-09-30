import type { Meso } from './tipos'

type Linhas = (number | null)[][]
const igual = (a: Linhas, b: Linhas) => JSON.stringify(a) === JSON.stringify(b)

// Meso no modelo antigo (principais/auxiliares + overrides 'treino-pos') -> modelo por exercício.
// Não muda o que o aluno vê. Idempotente.
export function migrarProgressao(meso: Meso): Meso {
  const { principais, auxiliares, padrao } = meso.progressao
  const slotDe = (t: number, p: number) => meso.divisao[t - 1]?.[p - 1]?.slotId
  const novos: Record<string, Linhas> = {}

  if (!padrao && !igual(principais, auxiliares)) {
    for (const slots of meso.divisao) for (const s of slots.slice(0, 2)) novos[s.slotId] = principais
  }
  for (const [chave, linhas] of Object.entries(meso.progressaoExercicio ?? {})) {
    const m = /^(\d+)-(\d+)$/.exec(chave)
    if (!m) novos[chave] = linhas
    else if (slotDe(+m[1], +m[2])) novos[slotDe(+m[1], +m[2])!] = linhas // a chave antiga vence a de principais
  }

  const { progressaoExercicio: _, ...resto } = meso
  return {
    ...resto,
    progressao: { ...meso.progressao, padrao: padrao ?? auxiliares },
    ...(Object.keys(novos).length > 0 && { progressaoExercicio: novos }),
  }
}
