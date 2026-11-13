import { docParaMeso, type MesoSalvo } from '../../lib/conversores'
import { propostaPolimento } from '../../lib/progressaoFisio'
import { semanaAtual } from '../../lib/treino'

// Passagem da proposta Físio para o editor do meso (só nesta aba do navegador; some depois de lida).
export type PropostaFisio = { mesoId: string; slotIds: string[]; nomes: string[]; semanas: number[]; motivo: string }
const CHAVE = 'forca-proposta-fisio'

export function prepararProposta(doc: MesoSalvo & { id: string }, regiao: string | null, motivo: string): string | null {
  const meso = docParaMeso(doc)
  const p = propostaPolimento(meso, regiao, semanaAtual(meso, new Date()).semana)
  if (!p) return null
  sessionStorage.setItem(CHAVE, JSON.stringify({ mesoId: doc.id, ...p, motivo } satisfies PropostaFisio))
  return `#/meso/${doc.id}`
}

export function lerProposta(mesoId: string): PropostaFisio | null {
  try {
    const p = JSON.parse(sessionStorage.getItem(CHAVE) ?? 'null') as PropostaFisio | null
    if (!p || p.mesoId !== mesoId) return null
    sessionStorage.removeItem(CHAVE)
    return p
  } catch {
    return null
  }
}
