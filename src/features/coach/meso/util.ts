import catalogo from '../../../data/exercicios.json'
import type { Meso, Registros, Slot } from '../../../engine'
import { MAX_POR_TREINO, normalizar, type Acao } from '../../../lib/iaTreino'

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

// Posições do treino `t` criadas em "Trocas e adições": vêm depois da divisão, só nas semanas da adição.
// Na mesma posição pode haver exercícios diferentes em semanas diferentes (os nomes saem juntos).
export function posicoesAdicionadas(meso: Meso, t: number): { pos: number; nome: string; semanas: number[] }[] {
  const base = (meso.divisao[t - 1] ?? []).length
  const mapa = new Map<number, { nomes: string[]; semanas: number[] }>()
  for (let w = 1; w <= meso.semanas; w++)
    (meso.adicoes?.[`${w}-${t}`] ?? []).forEach((slot, k) => {
      const p = mapa.get(base + k + 1) ?? { nomes: [], semanas: [] }
      if (!p.nomes.includes(slot.nome)) p.nomes.push(slot.nome)
      p.semanas.push(w)
      mapa.set(base + k + 1, p)
    })
  return [...mapa].sort((a, b) => a[0] - b[0]).map(([pos, p]) => ({ pos, nome: p.nomes.join(' / '), semanas: p.semanas }))
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

// Troca o exercício da posição `p` do treino `t` por `nome` (slot novo, como o editor faz). As semanas que já têm
// carga continuam mostrando o exercício antigo (guardado em `trocas`). `preservou` = alguma semana ficou com o antigo.
export function trocarExercicio(meso: Meso, registros: Registros, t: number, p: number, nome: string) {
  const arr = meso.divisao[t - 1] ?? []
  const atual = arr[p - 1]
  const trocas = { ...meso.trocas }
  let preservou = false
  for (const w of semanasComHistorico(meso, registros, t, p)) {
    const chave = `${w}-${t}-${p}`
    if (!trocas[chave]) {
      trocas[chave] = atual
      preservou = true
    }
  }
  const divisao = [...meso.divisao]
  const novoArr = [...arr]
  novoArr[p - 1] = { slotId: crypto.randomUUID(), nome }
  divisao[t - 1] = novoArr
  return { divisao, trocas, preservou }
}

// Algum exercício do treino `t` tem carga registrada? Olha a divisão (com as trocas vigentes por semana),
// toda troca guardada e os exercícios adicionados por semana.
function treinoTemCarga(meso: Meso, registros: Registros, t: number): boolean {
  const comCarga = (semanaTreino: string, slot: Slot) => registros[semanaTreino]?.[slot.slotId]?.some((c) => c != null) ?? false
  const arr = meso.divisao[t - 1] ?? []
  if (arr.some((_, i) => semanasComHistorico(meso, registros, t, i + 1).length)) return true
  const trocadas = Object.entries(meso.trocas ?? {}).some(([k, slot]) => {
    const [w, tr] = k.split('-')
    return tr === String(t) && comCarga(`${w}-${t}`, slot)
  })
  return trocadas || Object.entries(meso.adicoes ?? {}).some(([k, slots]) => k.endsWith(`-${t}`) && slots.some((sl) => comCarga(k, sl)))
}

// Aplica as ações da IA (assistente de voz) na divisão, na ordem.
// - adicionar: no fim do treino, nunca apaga nem muda a posição de nada (por isso nada se perde);
// - substituir: usa `trocarExercicio` (mesma regra do editor);
// - definir: refaz a lista do treino; treino com carga registrada nunca é refeito. O treino que já tinha exercícios
//   perde métodos, progressão própria, trocas e adições (`refeitos` deixa a tela confirmar antes).
export function aplicarAcoes(
  meso: Meso,
  registros: Registros,
  acoes: Acao[],
): { patch: Partial<Meso>; aplicados: string[]; bloqueios: string[]; refeitos: number[] } {
  let m: Meso = { ...meso, divisao: [...meso.divisao] }
  let { metodos, trocas, adicoes } = meso
  const progressaoExercicio = { ...meso.progressaoExercicio }
  const aplicados: string[] = []
  const bloqueios: string[] = []
  const refeitos: number[] = []
  for (const a of acoes) {
    const t = a.treino
    if (t < 1 || t > m.frequencia) continue
    const arr = m.divisao[t - 1] ?? []
    if (a.tipo === 'adicionar') {
      const novos = a.exercicios.filter((e) => !arr.some((s) => normalizar(s.nome) === normalizar(e.nome))).slice(0, MAX_POR_TREINO - arr.length)
      if (!novos.length) {
        bloqueios.push(`Treino ${t}: nada para adicionar (já tem esses exercícios ou chegou em ${MAX_POR_TREINO}).`)
        continue
      }
      m.divisao[t - 1] = [...arr, ...novos.map((e) => ({ slotId: crypto.randomUUID(), nome: e.nome }))]
      aplicados.push(`Treino ${t}: +${novos.length}`)
    } else if (a.tipo === 'substituir') {
      if (normalizar(arr[a.pos - 1]?.nome ?? '') !== normalizar(a.de)) {
        bloqueios.push(`Treino ${t}: "${a.de}" mudou de lugar. Peça de novo.`)
        continue
      }
      if (arr.some((s) => normalizar(s.nome) === normalizar(a.por.nome))) {
        bloqueios.push(`Treino ${t}: "${a.por.nome}" já está no treino, então não troquei.`)
        continue
      }
      const r = trocarExercicio(m, registros, t, a.pos, a.por.nome)
      m = { ...m, divisao: r.divisao, trocas: r.trocas }
      trocas = r.trocas
      aplicados.push(`Treino ${t}: ${a.de} por ${a.por.nome}`)
    } else {
      if (treinoTemCarga(m, registros, t)) {
        bloqueios.push(`Treino ${t}: já tem cargas registradas, então a lista não foi refeita. Peça para adicionar ou trocar.`)
        continue
      }
      for (const s of arr) delete progressaoExercicio[s.slotId]
      if (arr.length) refeitos.push(t)
      metodos = metodos.filter((x) => x.treino !== t)
      // Trocas e adições pontuais do treino mandam mais que a divisão: saem junto.
      if (trocas) trocas = Object.fromEntries(Object.entries(trocas).filter(([k]) => k.split('-')[1] !== String(t)))
      if (adicoes) adicoes = Object.fromEntries(Object.entries(adicoes).filter(([k]) => !k.endsWith(`-${t}`)))
      m = { ...m, trocas }
      m.divisao[t - 1] = a.exercicios.slice(0, MAX_POR_TREINO).map((e) => ({ slotId: crypto.randomUUID(), nome: e.nome }))
      aplicados.push(`Treino ${t}: lista refeita`)
    }
  }
  const patch: Partial<Meso> = { divisao: m.divisao, metodos, progressaoExercicio }
  if (trocas) patch.trocas = trocas
  if (adicoes) patch.adicoes = adicoes
  return { patch, aplicados, bloqueios, refeitos }
}
