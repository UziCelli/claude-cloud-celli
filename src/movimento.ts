// Molas no modelo da Apple (SwiftUI .smooth/.snappy/.bouncy): duração percebida + quique.
// Toda animação do app usa estes tokens (CSS: --mola-* em index.css). Tempo linear só em cronômetro e progresso.
export const suave = { type: 'spring', visualDuration: 0.5, bounce: 0 } as const // telas, folhas, listas
export const agil = { type: 'spring', visualDuration: 0.3, bounce: 0.15 } as const // toques, chaves, bolha das abas
export const elastico = { type: 'spring', visualDuration: 0.5, bounce: 0.3 } as const // recordes, conquistas, fim de treino
export const confete = { ...suave, visualDuration: 1.1 } as const // partículas que voam
export const saida = { type: 'spring', visualDuration: 0.15, bounce: 0 } as const // o que some
