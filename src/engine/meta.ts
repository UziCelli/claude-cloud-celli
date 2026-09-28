const mediana = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b)
  const h = Math.floor(s.length / 2)
  return s.length % 2 ? s[h] : (s[h - 1] + s[h]) / 2
}

// §11 — meta semanal robusta a partir dos valores semanais (vazios são ignorados)
export function metaRobusta(valores: (number | null)[]): number | null {
  const y = valores.filter((v): v is number => typeof v === 'number')
  const n = y.length
  if (!n) return null
  const med = mediana(y)
  const mad = mediana(y.map((v) => Math.abs(v - med)))
  const lo = Math.max(0, med - 2.5 * mad)
  const hi = med + 2.5 * mad
  const w = mad === 0 ? y : y.map((v) => Math.min(hi, Math.max(lo, v)))
  const avg = w.reduce((s, v) => s + v, 0) / n
  const xm = (n + 1) / 2 // média de 1..n
  const sl =
    n >= 3
      ? w.reduce((s, v, i) => s + (i + 1 - xm) * (v - avg), 0) / w.reduce((s, _, i) => s + (i + 1 - xm) ** 2, 0)
      : 0
  const raw = w[n - 1] + sl
  return Math.max(0, Math.min(avg * 1.15, Math.max(avg * 0.85, raw)))
}

// §11 — [CORRIGIDO] meta do ciclo usa as semanas do meso, não 12 fixo
export const metaCiclo = (metaSemanal: number | null, semanas: number) =>
  metaSemanal === null ? null : metaSemanal * semanas
