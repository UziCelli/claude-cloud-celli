// Assistente de voz do coach: transforma a fala ("adiciona crucifixo no treino 1", "3x12 em todas as semanas",
// "deload na semana 4", "dropset na última série do supino") em ações sobre o meso: divisão, progressão e métodos.
// Parte pura (sem rede, sem Firebase): o pedido ao Haiku e a leitura/limpeza da resposta. A chamada fica em ia.ts.
import catalogo from '../data/exercicios.json'
import { isometrico, METODOS, semanasTexto, type Metodo } from '../engine'

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
export type ModoVolume = 'progredir' | 'reduzir' | 'polimento'
// Divisão: adicionar = vai para o fim do treino, sem apagar nada (o padrão) · substituir = troca um exercício que já
// existe (pos = posição dele no treino, de = nome atual) · definir = refaz a lista inteira do treino.
// Progressão: progressao = séries×reps nas semanas (sem treino = progressão padrão; com treino = cada exercício dele;
// com exercício = só ele) · volume = progredir/reduzir/polimento, como na aba Progressão.
// Métodos: metodo = põe (ou tira) um método num exercício. `exercicio`/`parceiros` ficam como falados (nome ou
// posição) e são achados na lista na hora de aplicar, depois das mudanças da divisão.
// `semanas` vazio = todas.
export type Acao =
  | { tipo: 'adicionar'; treino: number; exercicios: ExercicioProposto[] }
  | { tipo: 'definir'; treino: number; exercicios: ExercicioProposto[] }
  | { tipo: 'substituir'; treino: number; pos: number; de: string; por: ExercicioProposto }
  | { tipo: 'progressao'; treino?: number; exercicio?: string; semanas: number[]; reps: number[] }
  | { tipo: 'volume'; modo: ModoVolume; pct?: number; de: number; ate?: number; retorno?: number; treino?: number; exercicio?: string }
  | { tipo: 'metodo'; treino: number; exercicio: string; metodo?: Metodo; semanas: number[]; parceiros: string[]; series: number[]; remover: boolean }
export interface Proposta {
  acoes: Acao[]
  avisos: string[]
}

export const FERRAMENTA = {
  name: 'montar_treinos',
  description: 'Registra o que o personal pediu: exercícios de cada treino, séries e repetições, volume e métodos.',
  input_schema: {
    type: 'object',
    properties: {
      acoes: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            acao: { type: 'string', enum: ['adicionar', 'substituir', 'definir', 'progressao', 'volume', 'metodo'] },
            treino: { type: 'integer', description: 'Número do treino (1 = Treino 1, 2 = Treino 2…). Em progressao e volume, sem treino = todos.' },
            exercicios: { type: 'array', items: { type: 'string' }, description: 'Para adicionar e definir: os exercícios, na ordem falada.' },
            de: { type: 'string', description: 'Para substituir: o exercício que sai, como está na lista atual do treino (ou a posição, ex.: "2").' },
            por: { type: 'string', description: 'Para substituir: o exercício que entra.' },
            exercicio: { type: 'string', description: 'Para progressao, volume e metodo: o exercício, como está na lista (ou a posição). Precisa do treino.' },
            semanas: { type: 'array', items: { type: 'integer' }, description: 'Para progressao e metodo: as semanas (1, 2…). Vazio = todas.' },
            reps: { type: 'array', items: { type: 'integer' }, description: 'Para progressao: repetições de cada série, em ordem (3x12 = [12, 12, 12]). Em isometria são segundos (3×30 s = [30, 30, 30], máximo 60 s). No máximo 6 séries.' },
            modo: { type: 'string', enum: ['progredir', 'reduzir', 'polimento'], description: 'Para volume.' },
            pct: { type: 'number', description: 'Para volume: a porcentagem (progredir = % por semana; reduzir e polimento = quanto cai).' },
            de_semana: { type: 'integer', description: 'Para volume: primeira semana.' },
            ate_semana: { type: 'integer', description: 'Para volume: última semana.' },
            retorno: { type: 'integer', description: 'Para volume reduzir: semanas para voltar ao normal depois (padrão 2).' },
            metodo: { type: 'string', enum: METODOS, description: 'Para metodo: qual método.' },
            parceiros: { type: 'array', items: { type: 'string' }, description: 'Para Biset, Triset, Superset e Circuito: os outros exercícios do grupo (nome ou posição).' },
            series: { type: 'array', items: { type: 'integer' }, description: 'Para Dropset, Rest-pause e Clusterset: em quais séries (ex.: [3]). Vazio = o padrão (última série; Clusterset todas).' },
            remover: { type: 'boolean', description: 'Para metodo: true = tirar o método (sem metodo = tira todos do exercício).' },
          },
          required: ['acao'],
        },
      },
      avisos: { type: 'array', items: { type: 'string' }, description: 'Pedidos que não dá para fazer aqui (remover ou reordenar exercícios, cargas, número de semanas ou de treinos) ou partes que você não entendeu. Frases curtas em português.' },
    },
    required: ['acoes'],
  },
} as const

// Texto fixo (igual em toda chamada, para o cache da API valer). O pedido e a lista atual vão na mensagem do usuário.
export const PROMPT_SISTEMA = `Você ajuda um personal trainer brasileiro a montar o mesociclo de um aluno falando: os exercícios de cada treino (divisão), as séries e repetições semana a semana (progressão) e os métodos. O texto vem de ditado por voz e pode ter erros de transcrição. Você recebe quantas semanas o meso tem, a lista ATUAL de exercícios de cada treino e o que o personal falou.

Responda SEMPRE chamando a ferramenta montar_treinos, com uma ou mais ações. Uma fala pode misturar tudo: faça uma ação para cada pedido.

DIVISÃO (exercícios de cada treino):
- adicionar (o PADRÃO): ele fala exercícios sem pedir para trocar ("coloca crucifixo no treino 1", "treino 2: agachamento e leg press", "mais tríceps corda"). Os exercícios entram no FIM do treino e NUNCA apagam o que já existe. Se o treino já tem esse exercício, não repita.
- substituir: só quando ele pede para trocar ("troca X por Y", "tira o X e coloca Y", "no lugar do X"). Em "de" use o nome do exercício como está na lista atual (ou a posição); em "por", o novo.
- definir: só quando o treino está vazio na lista atual, ou quando ele pede para refazer ("refaz o treino 1", "apaga tudo e coloca…", "do zero"). Substitui a lista inteira do treino.
- Se ele falar vários treinos, faça uma ação por treino.

PROGRESSÃO (séries e repetições):
- progressao: "3x12" = reps [12, 12, 12]; "12, 10 e 8" = [12, 10, 8]; "4 séries de 10" = [10, 10, 10, 10]. No máximo 6 séries, reps de 1 a 50 (isometria: segundos de 1 a 60). Para exercícios isométricos do catálogo, reps significa SEGUNDOS por série (padrão 3×30 s, máximo 60 s); nunca contar segundos como movimentos ou volume de carga. Para prescrever isometria, preencha treino e exercicio com o nome completo do catálogo, mesmo quando o pedido usar a posição. Se não houver prescrição explícita, mantenha 3×30 s na isometria.
  Sem treino = progressão padrão (vale para todos os exercícios sem progressão própria). Com treino e sem exercício = todos os exercícios daquele treino. Com treino e exercício = só aquele exercício.
  semanas: as que ele falou ("nas semanas 1 a 3" = [1, 2, 3]); se não falou, deixe vazio (= todas). Se ele der reps diferentes por semana, faça uma ação por grupo de semanas.
- volume: ajuste em porcentagem, como a aba Progressão.
  modo progredir: "progride 5% por semana até a semana 6" (pct = 5, de_semana = 2, ate_semana = 6). Sem % dita, não mande pct.
  modo reduzir: "deload de 30% na semana 4", "reduz 20% nas semanas 4 e 5" (pct = quanto cai; retorno = semanas para voltar, só se ele falar).
  modo polimento: "polimento de 40% na última semana" (pct = quanto cai; de_semana e ate_semana = as semanas do polimento).
  Treino/exercício: como na progressao (sem treino = todos).

MÉTODOS (sempre com treino e exercício):
- metodo: Dropset, Biset, Triset, Superset, Circuito, Rest-pause ou Clusterset. "drop" = Dropset, "bi-set"/"conjugado com" = Biset, "rest pause" = Rest-pause, "cluster" = Clusterset.
  Biset (2 exercícios), Triset (3), Superset (4 ou mais) e Circuito (2 ou mais) juntam exercícios: em "exercicio" o primeiro e em "parceiros" os outros, todos do mesmo treino. Se um parceiro ainda não está no treino e ele pediu para colocar, faça também a ação adicionar.
  series: em quais séries. Dropset aceita várias ("na 2ª e na 3ª" = [2, 3]); Rest-pause e Clusterset, uma só. "na última série" = deixe vazio.
  semanas: as que ele falou; senão vazio (= todas).
  Tirar método ("tira o dropset do supino"): remover = true (sem metodo = tira todos daquele exercício).

Regras gerais:
- Use o número do treino que ele disse ("treino A" = 1, "B" = 2, "C" = 3…). Se não disser o número e houver só um treino citado na lista atual ou o contexto for óbvio, use-o; se ficar duvidoso, avise em "avisos".
- Para cada exercício novo, escolha o nome EXATO do catálogo abaixo que melhor corresponde ao que ele disse (corrija erros de transcrição, ex.: "supino reto com alteres" = o supino reto com halter do catálogo). Só se não existir nada parecido, escreva o nome como ele falou, em português. Para exercício que já está no treino, use o nome como está na lista atual.
- Remover ou reordenar exercícios, cargas, número de semanas ou de treinos NÃO dá para fazer aqui: não invente ação, explique em "avisos".
- Não invente exercícios, séries ou métodos que ele não falou.

Catálogo de exercícios:
${nomes.join('\n')}`

export function listaAtual(divisao: string[][]): string {
  return divisao.map((arr, i) => `Treino ${i + 1}: ${arr.length ? arr.map((n, j) => `${j + 1}. ${n}`).join('; ') : '(vazio)'}`).join('\n')
}

export function pedidoUsuario(texto: string, divisao: string[][], semanas?: number): string {
  const meso = semanas ? `O meso tem ${semanas} ${semanas === 1 ? 'semana' : 'semanas'}.\n\n` : ''
  return `${meso}Lista atual:\n${listaAtual(divisao)}\n\nO que o personal falou:\n${texto.trim().slice(0, MAX_TEXTO)}`
}

export function corpoPedido(texto: string, divisao: string[][], semanas?: number) {
  return {
    model: MODELO_IA,
    max_tokens: 3000,
    system: [{ type: 'text', text: PROMPT_SISTEMA, cache_control: { type: 'ephemeral' } }],
    tools: [FERRAMENTA],
    tool_choice: { type: 'tool', name: FERRAMENTA.name },
    messages: [{ role: 'user', content: pedidoUsuario(texto, divisao, semanas) }],
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
// repetido, mais de 10 por treino, reps/semanas/% fora da faixa e substituição de exercício que não existe são
// descartados (os que o coach precisa saber viram aviso).
const inteiros = (v: unknown, min: number, max: number): number[] =>
  Array.isArray(v) ? v.filter((x): x is number => Number.isInteger(x) && x >= min && x <= max) : []
const unicosOrdenados = (xs: number[]) => [...new Set(xs)].sort((a, b) => a - b)
const ref = (v: unknown) => (typeof v === 'string' ? v.trim().slice(0, 80) : Number.isInteger(v) ? String(v) : '')
const inteiroOpc = (v: unknown, min: number, max: number) => (Number.isInteger(v) && (v as number) >= min && (v as number) <= max ? (v as number) : undefined)
const MODOS: ModoVolume[] = ['progredir', 'reduzir', 'polimento']

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
  const treinoOk = (t: unknown): t is number => Number.isInteger(t) && (t as number) >= 1 && (t as number) <= divisao.length
  for (const item of entrada.acoes) {
    if (!item || typeof item !== 'object') continue
    const t = item.treino
    if (item.acao === 'progressao' || item.acao === 'volume') {
      if (t != null && !treinoOk(t)) continue
      const exercicio = ref(item.exercicio) || undefined
      if (exercicio && t == null) {
        avisos.push(`Faltou dizer o treino do "${exercicio}".`)
        continue
      }
      const alvo = { ...(t != null && { treino: t }), ...(exercicio && { exercicio }) }
      if (item.acao === 'progressao') {
        const reps = inteiros(item.reps, 1, typeof item.exercicio === 'string' && isometrico({ nome: item.exercicio }) ? 60 : 50).slice(0, 6)
        if (!reps.length) {
          avisos.push('Não entendi as séries e repetições. Diga, por exemplo, "3x12".')
          continue
        }
        acoes.push({ tipo: 'progressao', ...alvo, semanas: unicosOrdenados(inteiros(item.semanas, 1, 52)), reps })
        continue
      }
      const modo: ModoVolume | undefined = MODOS.find((x) => x === item.modo)
      if (!modo) continue
      const pct = typeof item.pct === 'number' && item.pct > 0 && item.pct <= (modo === 'progredir' ? 30 : 90) ? item.pct : undefined
      if (pct == null && (modo !== 'progredir' || item.pct != null)) {
        avisos.push(modo === 'progredir' ? 'Porcentagem de progressão fora da faixa (até 30%).' : `Faltou dizer quanto ${modo === 'reduzir' ? 'reduzir' : 'cai no polimento'} (em %).`)
        continue
      }
      const de = inteiroOpc(item.de_semana, 1, 52) ?? (modo === 'progredir' ? 2 : undefined)
      if (de == null) {
        avisos.push(`Faltou dizer em que semana ${modo === 'reduzir' ? 'reduzir' : 'fazer o polimento'}.`)
        continue
      }
      const ateBruto = inteiroOpc(item.ate_semana, 1, 52)
      const ate = ateBruto != null ? Math.max(ateBruto, de) : modo === 'progredir' ? undefined : de
      const retorno = modo === 'reduzir' ? inteiroOpc(item.retorno, 0, 52) : undefined
      acoes.push({ tipo: 'volume', modo, de, ...alvo, ...(pct != null && { pct }), ...(ate != null && { ate }), ...(retorno != null && { retorno }) })
      continue
    }
    if (!treinoOk(t)) continue
    if (item.acao === 'metodo') {
      const exercicio = ref(item.exercicio)
      const remover = item.remover === true
      const metodo = METODOS.find((x) => x === item.metodo)
      if (!exercicio || (!metodo && !remover)) continue
      const parceiros = Array.isArray(item.parceiros) ? item.parceiros.map(ref).filter(Boolean).slice(0, MAX_POR_TREINO) : []
      // Só o Dropset cai em várias séries; Rest-pause e Clusterset numa só; os de grupo não têm série.
      const todas = unicosOrdenados(inteiros(item.series, 1, 6))
      const series = metodo === 'Dropset' ? todas : metodo === 'Rest-pause' || metodo === 'Clusterset' ? todas.slice(0, 1) : []
      acoes.push({
        tipo: 'metodo',
        treino: t,
        exercicio,
        ...(metodo && { metodo }),
        semanas: unicosOrdenados(inteiros(item.semanas, 1, 52)),
        parceiros,
        series,
        remover,
      })
      continue
    }
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

// Texto da prévia de uma ação de progressão ou método (as da divisão a tela mostra como lista).
export function descreverAcao(a: Acao, semanasTotal: number): string {
  const sem = (ws: number[]) => (ws.length ? semanasTexto(ws, semanasTotal) : 'todas as semanas')
  const quem = (x: { treino?: number; exercicio?: string }) =>
    x.exercicio ? `${x.exercicio} (Treino ${x.treino})` : x.treino ? `todos do Treino ${x.treino}` : 'progressão padrão'
  if (a.tipo === 'progressao') return `${quem(a)} · ${sem(a.semanas)} · ${a.reps.length} ${a.reps.length === 1 ? 'série' : 'séries'}: ${a.reps.join(', ')}`
  if (a.tipo === 'volume') {
    const alvo = a.exercicio || a.treino ? quem(a) : 'todos os exercícios'
    const faixa = a.ate == null ? `da semana ${a.de} ao fim` : a.ate === a.de ? `semana ${a.de}` : `semanas ${a.de}–${a.ate}`
    if (a.modo === 'progredir') return `${alvo} · progredir ${a.pct != null ? `${a.pct}%` : 'o padrão'} por semana · ${faixa}`
    if (a.modo === 'reduzir') return `${alvo} · reduzir ${a.pct}% · ${faixa} · volta em ${a.retorno ?? 2} ${(a.retorno ?? 2) === 1 ? 'semana' : 'semanas'}`
    return `${alvo} · polimento de ${a.pct}% · ${faixa}`
  }
  if (a.tipo === 'metodo') {
    if (a.remover) return `Tirar ${a.metodo ?? 'todos os métodos'} · ${a.exercicio} · ${sem(a.semanas)}`
    const junto = a.parceiros.length ? ` + ${a.parceiros.join(' + ')}` : ''
    const series = a.series.length ? ` · ${a.series.map((s) => `S${s}`).join(', ')}` : ''
    return `${a.metodo} · ${a.exercicio}${junto}${series} · ${sem(a.semanas)}`
  }
  return ''
}
