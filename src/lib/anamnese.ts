// Anamnese (histórico de saúde): anamneses/{id automático}. Funções puras (plano: anamnese no
// .claude/plans; resumo em docs/mapa.md, "Pontos sensíveis"). Dado de saúde: nunca em log, alerta ou IA.
// PERGUNTAS é a fonte única da tela, da validação e das regras: as chaves, opções e limites existem
// também em firestore.rules (respostasValidas) e o teste compara os dois.

// Sobe quando as perguntas mudarem (e as regras junto).
export const VERSAO_ANAMNESE = 1

type Opcao = { id: string; rotulo: string }
type Base = { id: string; rotulo: string }
export type Pergunta = Base &
  (
    | { tipo: 'simnao'; obrigatoria?: true } // boolean
    | { tipo: 'aceite'; obrigatoria?: true; soMenor?: true } // só true; obrigatória = precisa vir
    | { tipo: 'opcao' | 'multi'; opcoes: readonly Opcao[] } // multi = lista sem opção de fora
    | { tipo: 'texto'; max: number }
    | { tipo: 'inteiro'; min: number; max: number }
  )
export type Etapa = { titulo: string; perguntas: readonly Pergunta[] }

const parq = (id: string, rotulo: string): Pergunta => ({ id, rotulo, tipo: 'simnao', obrigatoria: true })

export const PERGUNTAS: readonly Etapa[] = [
  {
    titulo: 'Prontidão para atividade física',
    perguntas: [
      parq('coracao', 'Algum médico já disse que você tem problema no coração ou pressão alta?'),
      parq('dorPeito', 'Sente dor no peito em repouso, no dia a dia ou ao fazer exercício?'),
      parq('tontura', 'Já perdeu o equilíbrio por tontura ou desmaiou nos últimos 12 meses?'),
      parq('doencaCronica', 'Tem alguma doença crônica (diabetes, asma, outra)?'),
      parq('remedio', 'Toma algum remédio de uso contínuo?'),
      parq('ossoArticulacao', 'Tem problema de osso, articulação ou coluna que piora com exercício?'),
      parq('supervisaoMedica', 'Algum médico disse que você só deve treinar com supervisão médica?'),
      { id: 'parqQual', rotulo: 'Conte qual', tipo: 'texto', max: 500 }, // aparece com algum "sim"
    ],
  },
  {
    titulo: 'Saúde',
    perguntas: [
      {
        id: 'gestante',
        rotulo: 'Está gestante ou teve bebê nos últimos 6 meses?',
        tipo: 'opcao',
        opcoes: [
          { id: 'sim', rotulo: 'Sim' },
          { id: 'nao', rotulo: 'Não' },
          { id: 'naoSeAplica', rotulo: 'Não se aplica' },
        ],
      },
      { id: 'cirurgia12m', rotulo: 'Fez alguma cirurgia nos últimos 12 meses?', tipo: 'simnao' },
      { id: 'fuma', rotulo: 'Fuma?', tipo: 'simnao' },
    ],
  },
  {
    titulo: 'Dores e lesões',
    perguntas: [
      {
        id: 'dores',
        rotulo: 'Sente dor em alguma região?',
        tipo: 'multi',
        opcoes: [
          { id: 'ombro', rotulo: 'Ombro' },
          { id: 'cotovelo', rotulo: 'Cotovelo' },
          { id: 'punho', rotulo: 'Punho' },
          { id: 'cervical', rotulo: 'Cervical (pescoço)' },
          { id: 'lombar', rotulo: 'Lombar' },
          { id: 'quadril', rotulo: 'Quadril' },
          { id: 'joelho', rotulo: 'Joelho' },
          { id: 'tornozelo', rotulo: 'Tornozelo' },
          { id: 'outra', rotulo: 'Outra' },
        ],
      },
      { id: 'lesoes', rotulo: 'Lesões antigas e o que piora a dor', tipo: 'texto', max: 500 },
    ],
  },
  {
    titulo: 'Rotina',
    perguntas: [
      {
        id: 'sono',
        rotulo: 'Quantas horas dorme por noite?',
        tipo: 'opcao',
        opcoes: [
          { id: 'ate5', rotulo: 'Até 5 h' },
          { id: '5a6', rotulo: '5 a 6 h' },
          { id: '7a8', rotulo: '7 a 8 h' },
          { id: 'mais8', rotulo: 'Mais de 8 h' },
        ],
      },
      {
        id: 'trabalho',
        rotulo: 'No trabalho, você passa mais tempo',
        tipo: 'opcao',
        opcoes: [
          { id: 'sentado', rotulo: 'Sentado' },
          { id: 'emPe', rotulo: 'Em pé' },
          { id: 'bracal', rotulo: 'Em trabalho braçal' },
        ],
      },
      {
        id: 'estresse',
        rotulo: 'Seu nível de estresse',
        tipo: 'opcao',
        opcoes: [
          { id: 'baixo', rotulo: 'Baixo' },
          { id: 'medio', rotulo: 'Médio' },
          { id: 'alto', rotulo: 'Alto' },
        ],
      },
    ],
  },
  {
    titulo: 'Treino',
    perguntas: [
      {
        id: 'objetivo',
        rotulo: 'Seu objetivo principal',
        tipo: 'opcao',
        opcoes: [
          { id: 'hipertrofia', rotulo: 'Ganhar massa muscular' },
          { id: 'emagrecimento', rotulo: 'Emagrecer' },
          { id: 'forca', rotulo: 'Ganhar força' },
          { id: 'saude', rotulo: 'Saúde e qualidade de vida' },
          { id: 'condicionamento', rotulo: 'Condicionamento' },
        ],
      },
      {
        id: 'experiencia',
        rotulo: 'Há quanto tempo treina musculação?',
        tipo: 'opcao',
        opcoes: [
          { id: 'nunca', rotulo: 'Nunca treinei' },
          { id: 'menos6m', rotulo: 'Menos de 6 meses' },
          { id: '6ma2a', rotulo: '6 meses a 2 anos' },
          { id: 'mais2a', rotulo: 'Mais de 2 anos' },
        ],
      },
      {
        id: 'tempoParado',
        rotulo: 'Está parado há quanto tempo?',
        tipo: 'opcao',
        opcoes: [
          { id: 'treinando', rotulo: 'Estou treinando' },
          { id: 'ate3m', rotulo: 'Até 3 meses' },
          { id: '3a12m', rotulo: '3 a 12 meses' },
          { id: 'mais1a', rotulo: 'Mais de 1 ano' },
        ],
      },
      { id: 'diasSemana', rotulo: 'Quantos dias por semana pode treinar?', tipo: 'inteiro', min: 1, max: 7 },
      {
        id: 'minutos',
        rotulo: 'Quanto tempo tem por treino?',
        tipo: 'opcao',
        opcoes: [
          { id: 'ate30', rotulo: 'Até 30 min' },
          { id: '30a45', rotulo: '30 a 45 min' },
          { id: '45a60', rotulo: '45 a 60 min' },
          { id: 'mais60', rotulo: 'Mais de 60 min' },
        ],
      },
      { id: 'outrasAtividades', rotulo: 'Faz outras atividades físicas? Quais?', tipo: 'texto', max: 300 },
      { id: 'algoMais', rotulo: 'Algo mais que seu treinador deva saber?', tipo: 'texto', max: 1000 },
      { id: 'declaracao', rotulo: 'Respondi com verdade e aviso se algo mudar.', tipo: 'aceite', obrigatoria: true },
      // Menor de 18 anos: o responsável confirma junto (LGPD). A tela pede só para menores.
      { id: 'responsavelConfirmou', rotulo: 'Meu responsável legal leu e concorda.', tipo: 'aceite', soMenor: true },
    ],
  },
]

export const TODAS: readonly Pergunta[] = PERGUNTAS.flatMap((e) => e.perguntas)

export type Resposta = boolean | number | string | string[]
export type Respostas = Record<string, Resposta>
export type Anamnese = {
  id: string
  alunoId: string
  versao: number // 0 = inválida no documento
  origem: 'aluno' | 'coach'
  r: Respostas
  em: number | null // ms; null = gravação ainda pendente (offline)
  obsCoach: string
  vistaEm: number | null
}

// Mesmas condições de respostasValidas em firestore.rules, por pergunta.
function valida(p: Pergunta, v: unknown): boolean {
  switch (p.tipo) {
    case 'simnao':
      return typeof v === 'boolean'
    case 'aceite':
      return v === true
    case 'opcao':
      return p.opcoes.some((o) => o.id === v)
    case 'multi':
      return Array.isArray(v) && v.length <= p.opcoes.length && v.every((x) => p.opcoes.some((o) => o.id === x))
    case 'texto':
      return typeof v === 'string' && v.length <= p.max
    case 'inteiro':
      return Number.isInteger(v) && (v as number) >= p.min && (v as number) <= p.max
  }
}

// Chaves com problema (faltando, inválidas ou desconhecidas), na ordem das perguntas. Vazio = as regras aceitam.
// Obs.: o limite de texto das regras conta caracteres; aqui conta unidades UTF-16 (emoji conta 2 aqui):
// nunca aceita o que as regras recusam (a gravação offline não é recusada ao sincronizar).
export function validarRespostas(r: Record<string, unknown>): string[] {
  const erros = TODAS.filter((p) => (p.id in r ? !valida(p, r[p.id]) : 'obrigatoria' in p && p.obrigatoria === true)).map((p) => p.id)
  return [...erros, ...Object.keys(r).filter((k) => !TODAS.some((p) => p.id === k))]
}

const ms = (v: unknown) => (v && typeof v === 'object' && 'toMillis' in v && typeof v.toMillis === 'function' ? (v.toMillis() as number) : null)

// Leitura com desconfiança: resposta inválida ou desconhecida é ignorada; sem dono ou sem respostas, descarta.
export function lerAnamnese(id: string, d: unknown): Anamnese | null {
  if (!d || typeof d !== 'object') return null
  const x = d as Record<string, unknown>
  if (typeof x.alunoId !== 'string' || !x.r || typeof x.r !== 'object' || Array.isArray(x.r)) return null
  const origem = x.r as Record<string, unknown>
  const r: Respostas = {}
  for (const p of TODAS) if (p.id in origem && valida(p, origem[p.id])) r[p.id] = origem[p.id] as Resposta
  return {
    id,
    alunoId: x.alunoId,
    versao: Number.isInteger(x.versao) && (x.versao as number) >= 1 ? (x.versao as number) : 0,
    origem: x.origem === 'coach' ? 'coach' : 'aluno',
    r,
    em: ms(x.em),
    obsCoach: typeof x.obsCoach === 'string' ? x.obsCoach : '',
    vistaEm: ms(x.vistaEm),
  }
}
