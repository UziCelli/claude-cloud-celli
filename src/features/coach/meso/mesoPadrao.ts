import type { Meso } from '../../../engine'

// Valores iniciais de um mesociclo novo.
export function mesoPadrao(): Meso {
  const frequencia = 3
  const semanas = 4
  const linhaProgressao = () => Array.from({ length: semanas }, () => [8, 8, 8, null, null, null])
  return {
    frequencia,
    semanas,
    inicio: new Date().toISOString().slice(0, 10),
    pausaS: 120,
    divisao: Array.from({ length: frequencia }, () => []),
    trocas: {},
    progressao: { principais: linhaProgressao(), auxiliares: linhaProgressao() },
    metodos: [],
  }
}
