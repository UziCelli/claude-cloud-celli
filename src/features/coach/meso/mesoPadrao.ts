import { progressaoAutomatica, type Meso } from '../../../engine'
import { hojeMaisDias } from '../../../lib/acesso'

// Valores iniciais de um mesociclo novo.
export function mesoPadrao(): Meso {
  const frequencia = 3
  const semanas = 4
  const linhaProgressao = () => Array.from({ length: semanas }, () => [8, 8, 8, null, null, null])
  const meso: Meso = {
    frequencia,
    semanas,
    inicio: hojeMaisDias(0),
    pausaS: 120,
    divisao: Array.from({ length: frequencia }, () => []),
    trocas: {},
    progressao: { principais: linhaProgressao(), auxiliares: linhaProgressao() },
    metodos: [],
  }
  return progressaoAutomatica(meso, { pct: 5, de: 2, ate: semanas, alvo: { tipo: 'todos' } })
}
