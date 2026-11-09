// Assistente de voz do coach: transforma a fala ("Treino 1: supino reto, …") em lista de exercícios.
// Parte pura (sem rede, sem Firebase): o pedido ao Haiku e a leitura/limpeza da resposta. A chamada fica em ia.ts.
import catalogo from '../data/exercicios.json'

export const MODELO_IA = 'claude-haiku-5-5'
export const MAX_TEXTO = 2000
export const MAX_POR_TREINO = 10 // mesmo teto das posições do editor

const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim()
const nomes = catalogo.flatMap((g) => g.exercicios.map((e) => e.nome))
const doCatalogo = new Map(nomes.map((n) => [norm(n), n]))

export interface ExercicioProposto {
  nome: string
  noCatalogo: boolean
}
export interface TreinoProposto {
  treino: number
  exercicios: ExercicioProposto[]
}

export const FERRAMENTA = {
  name: 'montar_treinos',
  description: 'Registra os exercícios de cada treino, na ordem em que o personal falou.',
  input_schema: {
    type: 'object',
    properties: {
      treinos: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            treino: { type: 'integer', description: 'Número do treino (1 = Treino 1, 2 = Treino 2…).' },
            exercicios: { type: 'array', items: { type: 'string' }, description: 'Nomes dos exercícios, na ordem falada.' },
          },
          required: ['treino', 'exercicios'],
        },
      },
    },
    required: ['treinos'],
  },
} as const

// Texto fixo (igual em toda chamada, para o cache da API valer). O pedido do personal vai na mensagem do usuário.
export const PROMPT_SISTEMA = `Você ajuda um personal trainer brasileiro a montar a lista de exercícios de cada treino a partir do que ele falou (ditado por voz, pode ter erros de transcrição).

Regras:
- Responda SEMPRE chamando a ferramenta montar_treinos.
- Use o número do treino que ele disse ("treino A" = 1, "treino B" = 2, "treino C" = 3…). Se ele não numerar, use 1, 2, 3 na ordem.
- Mantenha a ordem dos exercícios que ele falou.
- Para cada exercício, escolha o nome EXATO do catálogo abaixo que melhor corresponde ao que ele disse (corrija erros de transcrição, ex.: "supino reto com alteres" = o supino reto com halter do catálogo). Só se não existir nada parecido, escreva o nome como ele falou, em português.
- Ignore séries, repetições e cargas: aqui só vale a lista de exercícios.
- Não invente exercícios que ele não falou.

Catálogo de exercícios:
${nomes.join('\n')}`

export function pedidoUsuario(texto: string, frequencia: number): string {
  return `Treinos disponíveis: 1 a ${frequencia}.\n\nO que o personal falou:\n${texto.trim().slice(0, MAX_TEXTO)}`
}

export function corpoPedido(texto: string, frequencia: number) {
  return {
    model: MODELO_IA,
    max_tokens: 1500,
    system: [{ type: 'text', text: PROMPT_SISTEMA, cache_control: { type: 'ephemeral' } }],
    tools: [FERRAMENTA],
    tool_choice: { type: 'tool', name: FERRAMENTA.name },
    messages: [{ role: 'user', content: pedidoUsuario(texto, frequencia) }],
  }
}

// Lê a resposta da API com desconfiança: a IA pode errar o formato. Treino fora de 1..frequencia, exercício
// vazio ou repetido e mais de 10 por treino são descartados; nome igual ao do catálogo (sem acento/maiúscula) vira o do catálogo.
export function lerResposta(corpo: unknown, frequencia: number): TreinoProposto[] {
  const blocos = (corpo as { content?: unknown })?.content
  if (!Array.isArray(blocos)) return []
  const uso = blocos.find((b) => b?.type === 'tool_use' && b?.name === FERRAMENTA.name)
  const lista = uso?.input?.treinos
  if (!Array.isArray(lista)) return []

  const porTreino = new Map<number, ExercicioProposto[]>()
  for (const item of lista) {
    const t = item?.treino
    if (!Number.isInteger(t) || t < 1 || t > frequencia || !Array.isArray(item?.exercicios)) continue
    const atual = porTreino.get(t) ?? []
    for (const bruto of item.exercicios) {
      if (typeof bruto !== 'string' || atual.length >= MAX_POR_TREINO) continue
      const texto = bruto.trim().slice(0, 80)
      if (!texto) continue
      const chave = norm(texto)
      const nome = doCatalogo.get(chave)
      if (atual.some((e) => norm(e.nome) === chave)) continue
      atual.push({ nome: nome ?? texto, noCatalogo: !!nome })
    }
    porTreino.set(t, atual)
  }
  return [...porTreino.entries()]
    .filter(([, ex]) => ex.length)
    .sort(([a], [b]) => a - b)
    .map(([treino, exercicios]) => ({ treino, exercicios }))
}
