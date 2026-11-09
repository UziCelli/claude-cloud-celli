// Assistente de voz do coach: transforma a fala ("adiciona crucifixo no treino 1", "troca leg press por hack",
// "treino 2: agachamento, leg press") em ações sobre a divisão. Parte pura (sem rede, sem Firebase): o pedido ao
// Haiku e a leitura/limpeza da resposta. A chamada fica em ia.ts.
import catalogo from '../data/exercicios.json'

export const MODELO_IA = 'claude-haiku-5-5'
export const MAX_TEXTO = 2000
export const MAX_POR_TREINO = 10 // mesmo teto das posições do editor

export const normalizar = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim()
const nomes = catalogo.flatMap((g) => g.exercicios.map((e) => e.nome))
const doCatalogo = new Map(nomes.map((n) => [normalizar(n), n]))

export interface ExercicioProposto {
  nome: string
  noCatalogo: boolean
}
// adicionar = vai para o fim do treino, sem apagar nada (o padrão) · substituir = troca um exercício que já existe
// (pos = posição dele no treino, de = nome atual) · definir = refaz a lista inteira do treino.
export type Acao =
  | { tipo: 'adicionar'; treino: number; exercicios: ExercicioProposto[] }
  | { tipo: 'definir'; treino: number; exercicios: ExercicioProposto[] }
  | { tipo: 'substituir'; treino: number; pos: number; de: string; por: ExercicioProposto }
export interface Proposta {
  acoes: Acao[]
  avisos: string[]
}

export const FERRAMENTA = {
  name: 'montar_treinos',
  description: 'Registra o que o personal pediu: adicionar, substituir ou refazer a lista de exercícios de cada treino.',
  input_schema: {
    type: 'object',
    properties: {
      acoes: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            acao: { type: 'string', enum: ['adicionar', 'substituir', 'definir'] },
            treino: { type: 'integer', description: 'Número do treino (1 = Treino 1, 2 = Treino 2…).' },
            exercicios: { type: 'array', items: { type: 'string' }, description: 'Para adicionar e definir: os exercícios, na ordem falada.' },
            de: { type: 'string', description: 'Para substituir: o exercício que sai, como está na lista atual do treino (ou a posição, ex.: "2").' },
            por: { type: 'string', description: 'Para substituir: o exercício que entra.' },
          },
          required: ['acao', 'treino'],
        },
      },
      avisos: { type: 'array', items: { type: 'string' }, description: 'Pedidos que não dá para fazer aqui (remover, reordenar, séries, repetições, cargas) ou partes que você não entendeu. Frases curtas em português.' },
    },
    required: ['acoes'],
  },
} as const

// Texto fixo (igual em toda chamada, para o cache da API valer). O pedido e a lista atual vão na mensagem do usuário.
export const PROMPT_SISTEMA = `Você ajuda um personal trainer brasileiro a montar os treinos de um aluno falando. O texto vem de ditado por voz e pode ter erros de transcrição. Você recebe a lista ATUAL de exercícios de cada treino e o que o personal falou.

Responda SEMPRE chamando a ferramenta montar_treinos, com uma ou mais ações:
- adicionar (o PADRÃO): ele fala exercícios sem pedir para trocar ("coloca crucifixo no treino 1", "treino 2: agachamento e leg press", "mais tríceps corda"). Os exercícios entram no FIM do treino e NUNCA apagam o que já existe. Se o treino já tem esse exercício, não repita.
- substituir: só quando ele pede para trocar ("troca X por Y", "tira o X e coloca Y", "no lugar do X"). Em "de" use o nome do exercício como está na lista atual (ou a posição); em "por", o novo.
- definir: só quando o treino está vazio na lista atual, ou quando ele pede para refazer ("refaz o treino 1", "apaga tudo e coloca…", "do zero"). Substitui a lista inteira do treino.
- Remover, reordenar, mudar séries, repetições ou cargas NÃO dá para fazer aqui: não invente ação, explique em "avisos".
- Se ele falar vários treinos, faça uma ação por treino.

Regras gerais:
- Use o número do treino que ele disse ("treino A" = 1, "B" = 2, "C" = 3…). Se não disser o número e houver só um treino citado na lista atual ou o contexto for óbvio, use-o; se ficar duvidoso, avise em "avisos".
- Para cada exercício, escolha o nome EXATO do catálogo abaixo que melhor corresponde ao que ele disse (corrija erros de transcrição, ex.: "supino reto com alteres" = o supino reto com halter do catálogo). Só se não existir nada parecido, escreva o nome como ele falou, em português.
- Ignore séries, repetições e cargas ditas junto (e avise que não foram aplicadas).
- Não invente exercícios que ele não falou.

Catálogo de exercícios:
${nomes.join('\n')}`

export function listaAtual(divisao: string[][]): string {
  return divisao.map((arr, i) => `Treino ${i + 1}: ${arr.length ? arr.map((n, j) => `${j + 1}. ${n}`).join('; ') : '(vazio)'}`).join('\n')
}

export function pedidoUsuario(texto: string, divisao: string[][]): string {
  return `Lista atual:\n${listaAtual(divisao)}\n\nO que o personal falou:\n${texto.trim().slice(0, MAX_TEXTO)}`
}

export function corpoPedido(texto: string, divisao: string[][]) {
  return {
    model: MODELO_IA,
    max_tokens: 1500,
    system: [{ type: 'text', text: PROMPT_SISTEMA, cache_control: { type: 'ephemeral' } }],
    tools: [FERRAMENTA],
    tool_choice: { type: 'tool', name: FERRAMENTA.name },
    messages: [{ role: 'user', content: pedidoUsuario(texto, divisao) }],
  }
}

// Posição (1-based) do exercício `ref` na lista: número ("2"), nome igual ou nome que contém/está contido (só se for único). 0 = não achou.
export function acharPosicao(lista: string[], ref: string): number {
  const r = normalizar(ref)
  if (!r) return 0
  if (/^\d+$/.test(r)) return Number(r) >= 1 && Number(r) <= lista.length ? Number(r) : 0
  const ns = lista.map(normalizar)
  const exato = ns.indexOf(r)
  if (exato >= 0) return exato + 1
  const parecidos = ns.flatMap((n, i) => (n.includes(r) || r.includes(n) ? [i + 1] : []))
  return parecidos.length === 1 ? parecidos[0] : 0
}

function proposto(bruto: unknown): ExercicioProposto | null {
  if (typeof bruto !== 'string') return null
  const texto = bruto.trim().slice(0, 80)
  if (!texto) return null
  const nome = doCatalogo.get(normalizar(texto))
  return { nome: nome ?? texto, noCatalogo: !!nome }
}

// Lê a resposta da API com desconfiança: a IA pode errar o formato. Treino fora de 1..divisao.length, exercício vazio ou
// repetido, mais de 10 por treino e substituição de exercício que não existe são descartados (os dois últimos viram aviso).
export function lerResposta(corpo: unknown, divisao: string[][]): Proposta {
  const vazio: Proposta = { acoes: [], avisos: [] }
  const blocos = (corpo as { content?: unknown })?.content
  if (!Array.isArray(blocos)) return vazio
  const entrada = blocos.find((b) => b?.type === 'tool_use' && b?.name === FERRAMENTA.name)?.input
  if (!Array.isArray(entrada?.acoes)) return vazio

  const avisos: string[] = Array.isArray(entrada.avisos)
    ? entrada.avisos.filter((a: unknown): a is string => typeof a === 'string' && !!a.trim()).map((a: string) => a.trim().slice(0, 200)).slice(0, 5)
    : []
  const acoes: Acao[] = []
  for (const item of entrada.acoes) {
    const t = item?.treino
    if (!Number.isInteger(t) || t < 1 || t > divisao.length) continue
    if (item.acao === 'substituir') {
      const por = proposto(item.por)
      const de = typeof item.de === 'string' ? item.de : String(item.de ?? '')
      const pos = acharPosicao(divisao[t - 1], de)
      if (!por) continue
      if (!pos) avisos.push(`Treino ${t}: não achei "${de.trim() || '?'}" na lista para trocar.`)
      else acoes.push({ tipo: 'substituir', treino: t, pos, de: divisao[t - 1][pos - 1], por })
      continue
    }
    if ((item.acao !== 'adicionar' && item.acao !== 'definir') || !Array.isArray(item.exercicios)) continue
    const lista: ExercicioProposto[] = []
    for (const bruto of item.exercicios) {
      const e = proposto(bruto)
      if (e && lista.length < MAX_POR_TREINO && !lista.some((x) => normalizar(x.nome) === normalizar(e.nome))) lista.push(e)
    }
    if (lista.length) acoes.push({ tipo: item.acao, treino: t, exercicios: lista })
  }
  return { acoes, avisos }
}
