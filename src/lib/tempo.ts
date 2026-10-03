// Exibição do tempo do treino: o motor é preciso, a tela arredonda para cima.
export const fmtMin = (min: number) => `${Math.ceil(min)} min`

export const acimaDoLimite = (min: number, limite?: number) => limite != null && min > limite

// Esquema de reps: séries (as primeiras n) "3×10" ou "10/10/8"; etapas do dropset " + 8/6 drop".
export function fmtReps(reps: number[], n: number) {
  const s = reps.slice(0, n)
  if (!s.length) return '—'
  const base = s.every((r) => r === s[0]) ? `${s.length}×${s[0]}` : s.join('/')
  const drop = reps.slice(n)
  return drop.length ? `${base} + ${drop.join('/')} drop` : base
}
