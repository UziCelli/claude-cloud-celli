import catalogo from '../../../data/exercicios.json'
import type { Meso, Slot } from '../../../engine'

// Cresce/encolhe um array preservando os itens existentes.
export function redimensionar<T>(arr: T[], n: number, fabrica: () => T): T[] {
  if (arr.length === n) return arr
  if (arr.length > n) return arr.slice(0, n)
  return [...arr, ...Array.from({ length: n - arr.length }, fabrica)]
}

export const nomesCatalogo: string[] = catalogo.flatMap((g) => g.exercicios.map((e) => e.nome))

// Semanas (1..meso.semanas) em que a posição `pos` do treino `t` tem alguma carga registrada,
// considerando o slotId vigente naquela semana (troca pontual, se houver).
export function semanasComHistorico(
  meso: Meso,
  registros: Record<string, Record<string, (number | null)[]>>,
  t: number,
  pos: number,
): number[] {
  const semanas: number[] = []
  for (let w = 1; w <= meso.semanas; w++) {
    const slot = meso.trocas?.[`${w}-${t}-${pos}`] ?? meso.divisao[t - 1]?.[pos - 1]
    if (!slot) continue
    const cargas = registros[`${w}-${t}`]?.[slot.slotId]
    if (cargas?.some((c) => c != null)) semanas.push(w)
  }
  return semanas
}

// Repete o treino `de` no treino `para` (slots novos, métodos e progressão por exercício junto).
export function copiarTreino(meso: Meso, de: number, para: number) {
  const progressaoExercicio = { ...meso.progressaoExercicio }
  for (const s of meso.divisao[para - 1] ?? []) delete progressaoExercicio[s.slotId]
  const divisao = [...meso.divisao]
  divisao[para - 1] = (meso.divisao[de - 1] ?? []).map((s) => {
    const novo = { ...s, slotId: crypto.randomUUID() }
    const prog = meso.progressaoExercicio?.[s.slotId]
    if (prog) progressaoExercicio[novo.slotId] = structuredClone(prog)
    return novo
  })
  const metodos = [
    ...meso.metodos.filter((m) => m.treino !== para),
    ...meso.metodos.filter((m) => m.treino === de).map((m) => ({ ...structuredClone(m), treino: para })),
  ]
  return { divisao, metodos, progressaoExercicio }
}

// Nome sugerido ao importar: aba "M7" / "M (6)" / "M 3" vira "Mesociclo N"; outra aba, o próximo número.
export function nomeImportado(aba: string, qtdMesos: number): string {
  const n = /^M\s*\(?\s*(\d+)\s*\)?$/i.exec(aba.trim())?.[1]
  return `Mesociclo ${n ?? qtdMesos + 1}`
}

export interface GrupoTroca {
  tipo: 'troca' | 'adicao'
  t: number
  p: number // 0 em adição
  slot: Slot
  de: number
  ate: number
}

const semanasDe = (de: number, ate: number) => Array.from({ length: Math.max(0, ate - de + 1) }, (_, i) => de + i)

// Mesmo slot novo em todas as semanas do intervalo (cópia nova, sem mutar).
export function aplicarTroca(meso: Meso, t: number, p: number, de: number, ate: number, slot: Slot) {
  const trocas = { ...meso.trocas }
  for (const w of semanasDe(de, ate)) trocas[`${w}-${t}-${p}`] = slot
  return trocas
}

// Acrescenta o slot no fim da lista de cada semana do intervalo.
export function aplicarAdicao(meso: Meso, t: number, de: number, ate: number, slot: Slot) {
  const adicoes = { ...meso.adicoes }
  for (const w of semanasDe(de, ate)) adicoes[`${w}-${t}`] = [...(adicoes[`${w}-${t}`] ?? []), slot]
  return adicoes
}

// Junta entradas com o mesmo slot (e mesmo treino/pos) em semanas consecutivas.
export function agruparTrocas(meso: Meso): GrupoTroca[] {
  const itens: (Omit<GrupoTroca, 'de' | 'ate'> & { w: number })[] = []
  for (const [chave, slot] of Object.entries(meso.trocas ?? {})) {
    const [w, t, p] = chave.split('-').map(Number)
    itens.push({ tipo: 'troca', t, p, slot, w })
  }
  for (const [chave, lista] of Object.entries(meso.adicoes ?? {})) {
    const [w, t] = chave.split('-').map(Number)
    for (const slot of lista) itens.push({ tipo: 'adicao', t, p: 0, slot, w })
  }
  itens.sort((a, b) => a.t - b.t || a.tipo.localeCompare(b.tipo) || a.p - b.p || a.slot.slotId.localeCompare(b.slot.slotId) || a.w - b.w)
  const grupos: GrupoTroca[] = []
  for (const { w, ...i } of itens) {
    const g = grupos[grupos.length - 1]
    if (g && g.tipo === i.tipo && g.t === i.t && g.p === i.p && g.slot.slotId === i.slot.slotId && g.ate === w - 1) g.ate = w
    else grupos.push({ ...i, de: w, ate: w })
  }
  // Troca antes de adição; adição pelo início.
  return grupos.sort((a, b) => a.t - b.t || (a.tipo === b.tipo ? 0 : a.tipo === 'troca' ? -1 : 1) || a.p - b.p || a.de - b.de)
}

// Remove o grupo todo; em adição, apaga a chave da semana que ficar vazia.
export function removerGrupo(meso: Meso, g: GrupoTroca): Partial<Meso> {
  if (g.tipo === 'troca') {
    const trocas = { ...meso.trocas }
    for (const w of semanasDe(g.de, g.ate)) delete trocas[`${w}-${g.t}-${g.p}`]
    return { trocas }
  }
  const adicoes = { ...meso.adicoes }
  for (const w of semanasDe(g.de, g.ate)) {
    const chave = `${w}-${g.t}`
    const resto = (adicoes[chave] ?? []).filter((s) => s.slotId !== g.slot.slotId)
    if (resto.length) adicoes[chave] = resto
    else delete adicoes[chave]
  }
  return { adicoes }
}

// Alguma semana do grupo já tem carga desse slot?
export function grupoTemCarga(g: GrupoTroca, registros: Record<string, Record<string, (number | null)[]>>): boolean {
  return semanasDe(g.de, g.ate).some((w) => registros[`${w}-${g.t}`]?.[g.slot.slotId]?.some((c) => c != null))
}

// Aplica a proposta da IA (assistente de voz) na divisão. Treino que já tem carga registrada nunca é tocado
// (mesma regra do "Copiar de…"). Treino que já tinha exercícios é substituído e perde métodos e progressão própria.
export function aplicarProposta(
  meso: Meso,
  registros: Record<string, Record<string, (number | null)[]>>,
  proposta: { treino: number; exercicios: { nome: string }[] }[],
): { patch: Partial<Meso>; aplicados: number[]; bloqueados: number[]; substituidos: number[] } {
  const divisao = [...meso.divisao]
  const progressaoExercicio = { ...meso.progressaoExercicio }
  let metodos = meso.metodos
  const aplicados: number[] = []
  const bloqueados: number[] = []
  const substituidos: number[] = []
  for (const { treino: t, exercicios } of proposta) {
    if (t < 1 || t > meso.frequencia || !exercicios.length) continue
    const antigos = meso.divisao[t - 1] ?? []
    if (antigos.some((_, i) => semanasComHistorico(meso, registros, t, i + 1).length)) {
      bloqueados.push(t)
      continue
    }
    for (const s of antigos) delete progressaoExercicio[s.slotId]
    if (antigos.length) substituidos.push(t)
    metodos = metodos.filter((m) => m.treino !== t)
    divisao[t - 1] = exercicios.slice(0, 10).map((e) => ({ slotId: crypto.randomUUID(), nome: e.nome }))
    aplicados.push(t)
  }
  return { patch: { divisao, metodos, progressaoExercicio }, aplicados, bloqueados, substituidos }
}
