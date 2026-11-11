// Anamnese (histórico de saúde): anamneses/{id automático}. Funções puras (plano: anamnese no
// .claude/plans; resumo em docs/mapa.md, "Pontos sensíveis"). Dado de saúde: nunca em log, alerta ou IA.
// PERGUNTAS é a fonte única da tela, da validação e das regras: as chaves, opções e limites existem
// também em firestore.rules (respostasValidas) e o teste compara os dois.

import type { Meso } from '../engine'
import { diaSP } from './acesso'
import { somarDias } from './avaliacao'
import { cicloTerminou, diasDesdeFim, fimISO, RELATORIO_DIAS } from './relatorio'

// Rascunho do formulário no aparelho (chave + uid); apagado ao sincronizar e ao sair.
export const CHAVE_RASCUNHO = 'anamnese-rascunho-'

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
          { id: '5a7', rotulo: '5 a 7 h' },
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
  liberadoEm: number | null // o coach liberou o treino pausado por saúde
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
    liberadoEm: ms(x.liberadoEm),
  }
}

const PARQ_ORDEM = ['coracao', 'dorPeito', 'tontura', 'supervisaoMedica', 'doencaCronica', 'remedio', 'ossoArticulacao']
const FRASE_PARQ: Record<string, string> = {
  coracao: 'Problema no coração ou pressão alta',
  dorPeito: 'Dor no peito ao se exercitar ou em repouso',
  tontura: 'Tontura ou desmaio nos últimos 12 meses',
  supervisaoMedica: 'Só deve treinar com supervisão médica',
  doencaCronica: 'Doença crônica',
  remedio: 'Remédio de uso contínuo',
  ossoArticulacao: 'Problema de osso, articulação ou coluna',
}

// "Sim" nestas 4 pausa o treino até o coach liberar.
export const PARQ_GRAVES = ['coracao', 'dorPeito', 'tontura', 'supervisaoMedica']
export const parqGrave = (r: Respostas) => PARQ_GRAVES.some((k) => r[k] === true)

// Pausado: alguma anamnese (de qualquer data) com sim grave e sem liberação. Responder de novo não desfaz.
export const pausadoSaude = (docs: Anamnese[]) => docs.some((d) => parqGrave(d.r) && d.liberadoEm === null)

export const avisoMedico = (r: Respostas) => PARQ_ORDEM.some((k) => r[k] === true)

// Pontos para o coach olhar com atenção. Não é diagnóstico.
export function sinaisAtencao(r: Respostas): string[] {
  const s = PARQ_ORDEM.filter((k) => r[k] === true).map((k) => FRASE_PARQ[k])
  if (r.gestante === 'sim') s.push('Gestante ou com bebê de até 6 meses')
  if (r.cirurgia12m === true) s.push('Cirurgia nos últimos 12 meses')
  if (Array.isArray(r.dores) && r.dores.length > 0) s.push(`Dor: ${r.dores.join(', ')}`)
  return s
}

const tem = (a: Anamnese) => sinaisAtencao(a.r).length > 0
const emOuAgora = (a: Anamnese) => a.em ?? Infinity

// A versão que vale: a mais recente (gravação pendente conta como agora).
export const maisRecente = (docs: Anamnese[]): Anamnese | null => docs.reduce<Anamnese | null>((m, d) => (!m || emOuAgora(d) > emOuAgora(m) ? d : m), null)

const rotuloDe = (p: Pergunta, v: Resposta): string => {
  if (typeof v === 'boolean') return v ? 'Sim' : 'Não'
  if ('opcoes' in p) return [v].flat().map((x) => p.opcoes.find((o) => o.id === x)?.rotulo ?? String(x)).join(', ') || 'Nenhuma'
  return String(v)
}

// Linhas "Pergunta: resposta" da ficha, na ordem das perguntas. Sem a declaração e sem texto vazio.
export const resumoAnamnese = (r: Respostas): string[] =>
  TODAS.filter((p) => p.tipo !== 'aceite' && p.id in r && r[p.id] !== '').map((p) => `${p.rotulo}${p.rotulo.endsWith('?') ? '' : ':'} ${rotuloDe(p, r[p.id])}`)

// Ficha por etapa, a partir de PERGUNTAS: só o respondido (sem a declaração e sem texto vazio). `alerta` = sim grave.
export const fichaAnamnese = (r: Respostas) =>
  PERGUNTAS.map((e) => ({
    etapa: e.titulo,
    itens: e.perguntas
      .filter((p) => p.tipo !== 'aceite' && p.id in r && r[p.id] !== '')
      .map((p) => ({ pergunta: p.rotulo, resposta: rotuloDe(p, r[p.id]), alerta: PARQ_GRAVES.includes(p.id) && r[p.id] === true })),
  })).filter((e) => e.itens.length > 0)

// Não vistas pelo coach: com atenção primeiro, depois as mais recentes.
// Só conta a versão mais recente de cada aluno (se é do coach ou já foi vista, o aluno não está "novo").
export const anamnesesNovas = (docs: Anamnese[]) =>
  [...new Set(docs.map((d) => d.alunoId))]
    .map((id) => maisRecente(docs.filter((d) => d.alunoId === id)))
    .filter((d): d is Anamnese => !!d && d.origem === 'aluno' && d.vistaEm === null)
    .sort((a, b) => Number(tem(b)) - Number(tem(a)) || emOuAgora(b) - emOuAgora(a))

// Última anotação do coach que não está vazia (da versão mais nova para a mais antiga).
export const ultimaAnotacao = (docs: Anamnese[]): string => [...docs].sort((a, b) => emOuAgora(b) - emOuAgora(a)).find((d) => d.obsCoach)?.obsCoach ?? ''

// 'primeira' = nunca respondeu. 'ciclo' = um ciclo terminou (há até 30 dias) e a última resposta é de antes dos 7 dias finais.
export function precisaAtualizar(ultimaDia: string | null, mesos: Meso[], agora: Date): 'primeira' | 'ciclo' | null {
  if (!ultimaDia) return 'primeira'
  const ciclo = mesos.some((m) => cicloTerminou(m, agora) && diasDesdeFim(m, agora) <= RELATORIO_DIAS && ultimaDia < somarDias(fimISO(m), -7))
  return ciclo ? 'ciclo' : null
}

// Motivo para o aluno responder agora, a partir das anamneses e dos mesos dele.
export function motivoAnamnese(docs: Anamnese[], mesos: Meso[], agora: Date) {
  const ult = maisRecente(docs)
  const dia = ult && new Date(diaSP(ult.em ?? agora.getTime()) * 86400_000).toISOString().slice(0, 10)
  return precisaAtualizar(dia, mesos, agora)
}

type AlunoAnam = { id: string; nome: string; status: string; presencial?: boolean }

// Alunos ativos com app que precisam responder (ou atualizar) a anamnese.
export function anamnesesPendentes(alunos: AlunoAnam[], docs: Anamnese[], mesos: { alunoId: string; meso: Meso }[], agora: Date) {
  return alunos.flatMap((a) => {
    if (a.status !== 'ativo' || a.presencial) return []
    const motivo = motivoAnamnese(docs.filter((d) => d.alunoId === a.id), mesos.filter((m) => m.alunoId === a.id).map((m) => m.meso), agora)
    return motivo ? [{ alunoId: a.id, nome: a.nome, motivo }] : []
  })
}
