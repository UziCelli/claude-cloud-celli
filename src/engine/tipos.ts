export type Metodo = 'Dropset' | 'Biset' | 'Triset' | 'Superset' | 'Circuito' | 'Rest-pause' | 'Clusterset'

export type Escopo =
  | 'Todas as séries'
  | 'Série específica'
  | 'Primeiras 2 séries'
  | 'Últimas 2 séries'
  | 'Primeiras 3 séries'
  | 'Últimas 3 séries'
  | 'Primeiras 4 séries'
  | 'Últimas 4 séries'

export interface AplicacaoMetodo {
  ativo: boolean
  semana: number
  treino: number
  exercicio: number // posição 1–10
  metodo: Metodo
  escopo: Escopo
  serie?: number
  grupo?: number
  reducaoCarga?: number
  pausaInternaS?: number
  blocos?: number
  repsPorBloco?: number
  adicional?: number
  etapas?: number
  cargaEtapa?: (number | null)[]
  repsPadrao?: number
  repsEtapa?: (number | null)[]
}

export interface Slot {
  slotId: string
  nome: string
  pausaS?: number // pausa deste exercício; sem valor = pausa da posição (principais/auxiliares)
}

// Exercício de uma sessão editada na hora. `de` = posição do treino planejado cuja progressão (séries/reps)
// e pausa ele segue; sem `de` (exercício novo) = progressão padrão (ou auxiliares) e pausa do meso.
export type SlotSessao = Slot & { de?: number }

// Treino de um dia (semana + treino) ajustado pelo coach no presencial. Substitui só aquela sessão:
// a lista de exercícios (divisão + trocas) e os métodos dela. Posições dos métodos = índice + 1 nesta lista.
export interface SessaoEditada {
  semana: number
  treino: number
  exercicios: SlotSessao[]
  metodos: AplicacaoMetodo[]
}

export interface Meso {
  frequencia: number
  semanas: number
  inicio: string // YYYY-MM-DD
  pausaS: number // pausa dos auxiliares (posição 3+) e de todos se não houver pausaPrincipaisS
  pausaPrincipaisS?: number // pausa das posições 1–2; sem valor = pausaS
  divisao: Slot[][] // [treino-1][pos-1]
  trocas?: Record<string, Slot> // chave `${semana}-${treino}-${pos}`
  // Exercícios a mais só em certas semanas, no fim do treino (sem `de`: progressão padrão). Chave `${semana}-${treino}`;
  // o mesmo slotId em todas as semanas da adição.
  adicoes?: Record<string, Slot[]>
  // [semana-1][serie-1]. `padrao` é a progressão do exercício sem linha própria; sem ele vale o legado
  // (posições 1–2 = principais, 3–10 = auxiliares).
  progressao: { principais: (number | null)[][]; auxiliares: (number | null)[][]; padrao?: (number | null)[][] }
  metodos: AplicacaoMetodo[]
  progressaoPct?: number // % de volume por semana (padrão 5)
  limiteReps?: number // máximo de reps por série (padrão 15)
  tempoLimiteMin?: number // sem valor = sem aviso de tempo
  // Dias da semana de treino (0 = domingo … 6 = sábado), ordenados, um por treino (tamanho = frequencia).
  // Sem valor = sem agenda: o app sugere o próximo treino não feito da semana.
  dias?: number[]
  // Progressão própria de cada exercício: chave = slotId do slot da divisão, valor [semana-1][serie-1].
  // (Legado: chave `${treino}-${pos}`, ainda lida pelo motor até migrarProgressao.)
  progressaoExercicio?: Record<string, (number | null)[][]>
  // Sessões ajustadas na hora (presencial). Chave `${semana}-${treino}`. Nunca gravado pelo editor do meso.
  sessoes?: Record<string, SessaoEditada>
}

// Onde um ajuste de volume se aplica.
export type AlvoVolume =
  | { tipo: 'todos' }
  | { tipo: 'treino'; treino: number }
  | { tipo: 'exercicio'; treino: number; pos: number }
  | { tipo: 'exercicio'; slotId: string }
  | { tipo: 'exercicios'; slotIds: string[] } // vários exercícios (proposta Físio: os que carregam a região com dor)

export type Cargas = Record<string /* slotId */, (number | null)[]> // índice = coluna: séries e depois etapas do dropset
export type Registros = Record<string /* `${semana}-${treino}` */, Cargas>

export interface ExercicioPrescrito {
  pos: number
  slot: Slot
  n: number // séries da progressão
  reps: number[] // n séries + etapas do dropset
  rotulo: string // '' sem método
  cargaSugerida: (number | null)[] // null nas séries; carga da etapa nas etapas do dropset
  pausaS: number // pausa resolvida: slot > principais (pos 1–2) > meso
  drops: { serie: number; etapa: number }[] // coluna n + j = etapa `etapa` do drop da série `serie` (1-based)
}

export interface Sessao {
  semana: number
  treino: number
  inicioSemana: string // YYYY-MM-DD
  pausaS: number
  series: number // maior n entre os exercícios
  exercicios: ExercicioPrescrito[]
  tempoMin: number
}
