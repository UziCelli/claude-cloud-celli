// Séries (1-based) que um método destaca, a partir do sufixo do rótulo do motor: "Dropset [últimas 2]".
export function seriesDoRotulo(parte: string, n: number): number[] {
  const suf = /\[(.+)\]/.exec(parte)?.[1].trim().toLowerCase() ?? ''
  const faixa = (a: number, b: number) => Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i)
  if (suf === 'todas') return faixa(1, n)
  const k = Number(/(\d+)$/.exec(suf)?.[1])
  if (!(k >= 1)) return []
  if (suf.startsWith('últimas')) return faixa(Math.max(1, n - k + 1), n)
  if (suf.startsWith('primeiras')) return faixa(1, Math.min(k, n))
  if (/^s\d+$/.test(suf)) return k <= n ? [k] : []
  return []
}

export const seriesDestacadas = (rotulo: string, n: number): Set<number> =>
  new Set(rotulo.split('; ').flatMap((p) => seriesDoRotulo(p, n)))
