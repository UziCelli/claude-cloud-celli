import type { Metodo } from '../engine'

// Fonte única dos textos dos métodos (selo, nota e guia leem daqui).
export const METODOS: Record<Metodo, { oQueE: string; comoFazer: string[]; dica?: string }> = {
  Dropset: {
    oQueE: 'Continuar o exercício depois do cansaço, com menos peso.',
    comoFazer: ['Faça a série.', 'Sem descansar, tire uns 20–30% do peso e faça as reps do D1.', 'Anote a carga do D1.'],
    dica: 'Deixe o peso menor separado antes de começar.',
  },
  Biset: {
    oQueE: '2 exercícios seguidos, sem descanso entre eles.',
    comoFazer: ['Faça o A1 e vá direto para o A2.', 'Descanse só depois do A2.', 'Repita.'],
    dica: 'Deixe os dois aparelhos prontos antes.',
  },
  Triset: {
    oQueE: '3 exercícios seguidos, sem descanso entre eles.',
    comoFazer: ['A1 → A2 → A3.', 'Descanse só depois do último.'],
  },
  Superset: {
    oQueE: '4 ou mais exercícios seguidos, sem descanso entre eles.',
    comoFazer: ['Faça A1 → A2 → A3 → A4… em sequência.', 'Descanse só depois do último.', 'Repita a volta.'],
    dica: 'Deixe todos os aparelhos prontos antes.',
  },
  Circuito: {
    oQueE: 'Todos os exercícios do grupo em sequência, como uma volta.',
    comoFazer: ['Uma série de cada exercício, com pausa curta entre eles.', 'O descanso normal vem no fim da volta.'],
  },
  'Rest-pause': {
    oQueE: 'Uma série "esticada" com mini-pausas.',
    comoFazer: ['Vá até perto da falha.', 'Pare uns 20 s com o mesmo peso e faça mais algumas reps.', 'Repita se o treino pedir.'],
  },
  Clusterset: {
    oQueE: 'A série dividida em blocos pequenos.',
    comoFazer: ['Faça poucas reps e pare uns 30 s.', 'Faça mais um bloco com o mesmo peso.', 'Os blocos juntos contam como uma série.'],
  },
}

export const ORDEM: Metodo[] = ['Dropset', 'Biset', 'Triset', 'Superset', 'Circuito', 'Rest-pause', 'Clusterset']

// "Dropset [últimas 2]" → 'Dropset'
export function metodoDoRotulo(parte: string): Metodo | null {
  const nome = parte.split(' [')[0].trim()
  return ORDEM.find((x) => x === nome) ?? null
}
