// Sua opinião (feedback): feedbacks/{id automático}. Regras em firestore.rules ("feedbacks").
// Com nome: alunoId = uid. Anônimo: sem alunoId (nada liga o documento ao aluno; ninguém lê quem foi).
// Depoimento (uso na divulgação): só com nome, nota 5 e texto, por autorização do aluno.
export const ASSUNTOS = [
  { id: 'app', rotulo: 'O app' },
  { id: 'treinos', rotulo: 'Meus treinos' },
  { id: 'atendimento', rotulo: 'Atendimento' },
] as const

export const TIPOS = [
  { id: 'sugestao', rotulo: 'Sugestão' },
  { id: 'elogio', rotulo: 'Elogio' },
  { id: 'critica', rotulo: 'Crítica' },
  { id: 'problema', rotulo: 'Problema' },
] as const

export type Assunto = (typeof ASSUNTOS)[number]['id']
export type TipoFeedback = (typeof TIPOS)[number]['id']

export const TEXTO_MAX = 1000

// O que vai para o Firestore (sem `em`, que é a hora do servidor).
export type NovoFeedback = { nota: number; assunto: Assunto; tipo?: TipoFeedback; texto?: string; alunoId?: string; depoimento?: true }
// O que o coach lê.
export type Feedback = NovoFeedback & { id: string; em: Date | null; lido?: boolean }

export type Entrada = { nota: number; assunto: Assunto; tipo?: TipoFeedback; texto: string; anonimo: boolean; depoimento: boolean }

export const podeDepoimento = (e: Pick<Entrada, 'nota' | 'anonimo' | 'texto'>) => !e.anonimo && e.nota === 5 && e.texto.trim() !== ''

// Monta o documento sem campos undefined (o Firestore recusa) e sem o uid no anônimo.
export function montarFeedback(e: Entrada, uid: string): NovoFeedback {
  const texto = e.texto.trim().slice(0, TEXTO_MAX)
  return {
    nota: e.nota,
    assunto: e.assunto,
    ...(e.tipo ? { tipo: e.tipo } : {}),
    ...(texto ? { texto } : {}),
    ...(e.anonimo ? {} : { alunoId: uid }),
    ...(e.depoimento && podeDepoimento(e) ? { depoimento: true as const } : {}),
  }
}

export const rotuloAssunto = (id: string) => ASSUNTOS.find((a) => a.id === id)?.rotulo ?? id
export const rotuloTipo = (id: string) => TIPOS.find((t) => t.id === id)?.rotulo ?? id

// Texto para colar num prompt: nunca leva o nome do aluno.
export const textoParaCopiar = (f: Pick<Feedback, 'nota' | 'assunto' | 'tipo' | 'texto'>) =>
  `Feedback de aluno (${f.nota}/5 · ${rotuloAssunto(f.assunto)}${f.tipo ? ` · ${rotuloTipo(f.tipo)}` : ''}):\n"${(f.texto ?? '').trim()}"`

// Convite em bons momentos (fim do treino, relatório): no máximo 1 vez a cada 7 dias neste aparelho.
// Conta tanto o convite mostrado quanto o feedback enviado.
export const CHAVE_CONVITE = 'forca-feedback-convite'
export const DIAS_CONVITE = 7

export const podeConvidar = (agoraMs: number, ultimoMs: number | null) =>
  ultimoMs == null || agoraMs - ultimoMs >= DIAS_CONVITE * 86_400_000

export function convidarAgora(agoraMs = Date.now()): boolean {
  try {
    const v = Number(localStorage.getItem(CHAVE_CONVITE))
    return podeConvidar(agoraMs, v > 0 ? v : null)
  } catch {
    return false
  }
}

export function marcarConvite(agoraMs = Date.now()) {
  try {
    localStorage.setItem(CHAVE_CONVITE, String(agoraMs))
  } catch {
    // sem localStorage (modo privado): o convite pode voltar, sem problema
  }
}

// Média e contagem por estrela (índice 1 a 5; o 0 fica sem uso).
export function resumoNotas(lista: { nota: number }[]) {
  const porNota = [0, 0, 0, 0, 0, 0]
  for (const f of lista) if (f.nota >= 1 && f.nota <= 5) porNota[f.nota]++
  const total = porNota.reduce((a, b) => a + b, 0)
  const soma = porNota.reduce((a, n, i) => a + n * i, 0)
  return { media: total ? soma / total : 0, total, porNota }
}

export type Filtro = 'todos' | 'novos' | 'sugestoes' | 'criticas' | 'depoimentos'

export function filtrar<T extends Pick<Feedback, 'tipo' | 'lido' | 'depoimento'>>(lista: T[], f: Filtro): T[] {
  if (f === 'novos') return lista.filter((x) => !x.lido)
  if (f === 'sugestoes') return lista.filter((x) => x.tipo === 'sugestao')
  if (f === 'criticas') return lista.filter((x) => x.tipo === 'critica' || x.tipo === 'problema')
  if (f === 'depoimentos') return lista.filter((x) => x.depoimento === true)
  return lista
}

export const primeiroNome = (nome: string) => nome.trim().split(/\s+/)[0] ?? ''

// marca.doNome "do X" → "treina com o X"; "da Y" → "treina com a Y" (sem supor o gênero do aluno).
export const assinaturaMarca = (doNome: string) => 'treina ' + doNome.replace(/^d([oa]) /, 'com $1 ')

// Texto pronto para colar no site.
export const textoDepoimento = (texto: string, nome: string, doNome: string) =>
  `“${texto.trim()}” — ${primeiroNome(nome)}, ${assinaturaMarca(doNome)}`
