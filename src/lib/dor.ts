// Relato de dor no treino (Etapa 3 do Físio, docs/plano-fisio.md): fisioDores/{id automático}.
// Dado de saúde: nunca em log, push ou IA. Funções puras; regras em firestore.rules (fisioDores).
import type { Timestamp } from 'firebase/firestore'
import { ARTICULACOES, type ArticulacaoId } from './anatomia'

export const COLECAO_DORES = 'fisioDores'
export const LOCAIS_DOR = [...ARTICULACOES, 'outro'] as const
export type LocalDor = ArticulacaoId | 'outro'
export type TipoDor = 'dor' | 'sensacao'
export type MomentoDor = 'durante' | 'fim'
export type DorForm = { exercicio: string; articulacao: LocalDor; tipo: TipoDor; intensidade: number; momento: MomentoDor; texto: string }
export type RelatoDor = Omit<DorForm, 'texto'> & {
  id: string; alunoId: string; texto: string; em: Timestamp | null
  resposta: string | null; respondidoEm: Timestamp | null; vistoEm: Timestamp | null
}

// Faixas decididas pelo Victor (12/11/2026), a partir da R1 da pesquisa. A dor tem origem desconhecida,
// então o texto nunca chama a dor de "aceitável" ou "normal" (nota do Codex em docs/fisio-continuidade.md).
export const ALERTA_DOR = 'Dor forte que não passa, inchaço, travamento ou formigamento: pare e procure um médico ou fisioterapeuta.'
const COACH_VAI_VER = 'Seu coach vai ver o relato no app.'
export function dicaDaDor(intensidade: number): { nivel: 'seguir' | 'reduzir' | 'parar'; texto: string; coach: string } {
  if (intensidade >= 6) return { nivel: 'parar', texto: 'Pare esse exercício hoje.', coach: COACH_VAI_VER }
  if (intensidade >= 4) return { nivel: 'reduzir', texto: 'Reduza a carga, a amplitude ou a velocidade.', coach: COACH_VAI_VER }
  return { nivel: 'seguir', texto: 'Pode seguir com atenção. Se aumentar, reduza ou pare.', coach: COACH_VAI_VER }
}

const textoOk = (v: unknown, max: number, minimo = 1): v is string => typeof v === 'string' && v.trim().length >= minimo && v.length <= max
const intensidadeOk = (v: unknown): v is number => Number.isInteger(v) && (v as number) >= 0 && (v as number) <= 10

export function validarDor(f: DorForm): string | null {
  if (!textoOk(f.exercicio, 120)) return 'Exercício inválido.'
  if (!(LOCAIS_DOR as readonly string[]).includes(f.articulacao)) return 'Escolha onde sentiu.'
  if (!intensidadeOk(f.intensidade)) return 'Escolha a intensidade de 0 a 10.'
  if (f.texto.length > 300) return 'O texto deve ter até 300 caracteres.'
  if (f.articulacao === 'outro' && !textoOk(f.texto, 300)) return 'Conte onde sentiu.'
  return null
}

const tempo = (v: unknown) => (v && typeof (v as Timestamp).toMillis === 'function' ? (v as Timestamp) : null)

// Leitura desconfiada: documento que não confere é ignorado (nunca vira relato com valor inventado).
export function lerDor(id: string, valor: unknown): RelatoDor | null {
  if (!valor || typeof valor !== 'object') return null
  const d = valor as Record<string, unknown>
  if (!textoOk(d.alunoId, 128) || !textoOk(d.exercicio, 120) || !(LOCAIS_DOR as readonly unknown[]).includes(d.articulacao)
    || (d.tipo !== 'dor' && d.tipo !== 'sensacao') || (d.momento !== 'durante' && d.momento !== 'fim') || !intensidadeOk(d.intensidade)) return null
  return {
    id, alunoId: d.alunoId, exercicio: d.exercicio, articulacao: d.articulacao as LocalDor, tipo: d.tipo, intensidade: d.intensidade,
    momento: d.momento, texto: typeof d.texto === 'string' ? d.texto : '', em: tempo(d.em),
    resposta: typeof d.resposta === 'string' ? d.resposta : null, respondidoEm: tempo(d.respondidoEm), vistoEm: tempo(d.vistoEm),
  }
}
