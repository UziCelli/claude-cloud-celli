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

// Cor de cada método (selo, faixa na série, borda do grupo): métodos juntos no mesmo exercício não se confundem.
// Classes escritas por extenso: o Tailwind só gera as que aparecem no código.
export const COR_METODO: Record<Metodo, { selo: string; faixa: string; texto: string; borda: string }> = {
  Dropset: { selo: 'bg-rose-500/20 text-rose-100 ring-rose-400/60', faixa: 'bg-rose-400', texto: 'text-rose-300', borda: 'border-rose-400/60' },
  Biset: { selo: 'bg-sky-500/20 text-sky-100 ring-sky-400/60', faixa: 'bg-sky-400', texto: 'text-sky-300', borda: 'border-sky-400/60' },
  Triset: { selo: 'bg-violet-500/20 text-violet-100 ring-violet-400/60', faixa: 'bg-violet-400', texto: 'text-violet-300', borda: 'border-violet-400/60' },
  Superset: { selo: 'bg-lime-500/20 text-lime-100 ring-lime-400/60', faixa: 'bg-lime-400', texto: 'text-lime-300', borda: 'border-lime-400/60' },
  Circuito: { selo: 'bg-emerald-500/20 text-emerald-100 ring-emerald-400/60', faixa: 'bg-emerald-400', texto: 'text-emerald-300', borda: 'border-emerald-400/60' },
  'Rest-pause': { selo: 'bg-amber-500/20 text-amber-100 ring-amber-400/60', faixa: 'bg-amber-400', texto: 'text-amber-300', borda: 'border-amber-400/60' },
  Clusterset: { selo: 'bg-fuchsia-500/20 text-fuchsia-100 ring-fuchsia-400/60', faixa: 'bg-fuchsia-400', texto: 'text-fuchsia-300', borda: 'border-fuchsia-400/60' },
}

export const ORDEM: Metodo[] =['Dropset', 'Biset', 'Triset', 'Superset', 'Circuito', 'Rest-pause', 'Clusterset']

// "Dropset [últimas 2]" → 'Dropset'
export function metodoDoRotulo(parte: string): Metodo | null {
  const nome = parte.split(' [')[0].trim()
  return ORDEM.find((x) => x === nome) ?? null
}
