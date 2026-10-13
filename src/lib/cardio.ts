// Cardio avulso: cardios/{uid}_{dia}, um doc por dia (dia = AAAA-MM-DD de São Paulo). Separado do treino de força.
export const TIPOS = [
  { id: 'caminhada', rotulo: 'Caminhada' },
  { id: 'corrida', rotulo: 'Corrida' },
  { id: 'esteira', rotulo: 'Esteira' },
  { id: 'bicicleta', rotulo: 'Bicicleta' },
  { id: 'eliptico', rotulo: 'Elíptico' },
  { id: 'escada', rotulo: 'Escada' },
  { id: 'outro', rotulo: 'Outro' },
] as const

export type TipoCardio = (typeof TIPOS)[number]['id']
export type CardioDoc = { alunoId: string; dia: string; tipo?: TipoCardio; min?: number }

export const idCardio = (uid: string, dia: string) => `${uid}_${dia}`
export const rotuloCardio = (tipo: string) => TIPOS.find((t) => t.id === tipo)?.rotulo ?? tipo
// Mesmo "dia" numérico de diaSP (src/lib/acesso.ts).
export const diaNumero = (dia: string) => Date.parse(dia + 'T00:00:00Z') / 86_400_000
