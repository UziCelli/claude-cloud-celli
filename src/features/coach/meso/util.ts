import catalogo from '../../../data/exercicios.json'
import {
  emGrupo,
  linhaPrescrita,
  METODOS,
  padraoMetodo,
  polimento,
  progressaoAutomatica,
  reduzirVolume,
  salvarLinha,
  seriesDoExercicio,
  totalCerto,
  type AlvoVolume,
  type Meso,
  type Registros,
  type Slot,
} from '../../../engine'
import { acharPosicao, MAX_POR_TREINO, normalizar, type Acao } from '../../../lib/iaTreino'

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

type AcaoDivisao = Extract<Acao, { tipo: 'adicionar' | 'substituir' | 'definir' }>
const ORDEM: Record<Acao['tipo'], number> = { adicionar: 0, substituir: 0, definir: 0, progressao: 1, volume: 2, metodo: 3 }
const vazia = () => [null, null, null, null, null, null] as (number | null)[]

// Aplica as ações da IA (assistente de voz). Primeiro as da divisão (na ordem), depois progressão, volume e métodos,
// para estes acharem os exercícios que acabaram de entrar.
// - adicionar: no fim do treino, nunca apaga nem muda a posição de nada (por isso nada se perde);
// - substituir: usa `trocarExercicio` (mesma regra do editor);
// - definir: refaz a lista do treino; treino com carga registrada nunca é refeito. O treino que já tinha exercícios
//   perde métodos, progressão própria, trocas e adições (`refeitos` deixa a tela confirmar antes);
// - progressao: grava a linha de reps nas semanas (padrão, ou progressão própria de cada exercício do alvo);
// - volume: as mesmas contas da aba Progressão (progredir/reduzir/polimento);
// - metodo: grava como a aba Métodos (`salvarLinha`), com os valores iniciais de cada método.
export function aplicarAcoes(
  meso: Meso,
  registros: Registros,
  acoes: Acao[],
): { patch: Partial<Meso>; aplicados: string[]; bloqueios: string[]; refeitos: number[] } {
  let m: Meso = { ...meso, divisao: [...meso.divisao], progressaoExercicio: { ...meso.progressaoExercicio } }
  const aplicados: string[] = []
  const bloqueios: string[] = []
  const refeitos: number[] = []
  const todas = Array.from({ length: m.semanas }, (_, i) => i + 1)
  const semanasDoMeso = (ws: number[]) => (ws.length ? ws.filter((w) => w <= m.semanas) : todas)
  const posicao = (t: number, ref: string) => acharPosicao((m.divisao[t - 1] ?? []).map((s) => s.nome), ref)

  for (const a of [...acoes].sort((x, y) => ORDEM[x.tipo] - ORDEM[y.tipo])) {
    const t = a.treino
    if (t != null && (t < 1 || t > m.frequencia)) continue
    if (a.tipo === 'adicionar' || a.tipo === 'substituir' || a.tipo === 'definir') {
      m = aplicarDivisao(m, registros, a, aplicados, bloqueios, refeitos)
      continue
    }

    // Exercício falado: acha a posição na lista de agora (já com o que a divisão mudou).
    const exercicio = 'exercicio' in a ? a.exercicio : undefined
    const pos = t != null && exercicio ? posicao(t, exercicio) : 0
    if (exercicio && !pos) {
      bloqueios.push(`Treino ${t}: não achei "${exercicio}" na lista.`)
      continue
    }
    const slot = pos ? m.divisao[t! - 1][pos - 1] : undefined
    const nomeAlvo = slot ? `Treino ${t}, ${slot.nome}` : t != null ? `Treino ${t}` : ''
    if (t != null && !m.divisao[t - 1]?.length) {
      bloqueios.push(`Treino ${t}: ainda não tem exercícios.`)
      continue
    }

    if (a.tipo === 'progressao') {
      const ws = semanasDoMeso(a.semanas)
      if (!ws.length) {
        bloqueios.push(`O meso tem só ${m.semanas} semanas.`)
        continue
      }
      const linha = [...a.reps, ...vazia()].slice(0, 6)
      if (t == null) {
        const base = redimensionar(m.progressao.padrao ?? m.progressao.auxiliares, m.semanas, vazia).map((l, i) => (ws.includes(i + 1) ? [...linha] : [...l]))
        m = { ...m, progressao: { ...m.progressao, padrao: base } }
        aplicados.push(`Progressão padrão: ${a.reps.join(', ')}`)
      } else {
        const progressaoExercicio = { ...m.progressaoExercicio }
        const posicoes = pos ? [pos] : m.divisao[t - 1].map((_, i) => i + 1)
        for (const p of posicoes) {
          progressaoExercicio[m.divisao[t - 1][p - 1].slotId] = todas.map((w) => (ws.includes(w) ? [...linha] : [...linhaPrescrita(m, w, t, p)]))
        }
        m = { ...m, progressaoExercicio }
        aplicados.push(`${nomeAlvo}: ${a.reps.join(', ')}`)
      }
      continue
    }

    if (a.tipo === 'volume') {
      const alvo: AlvoVolume = slot ? { tipo: 'exercicio', slotId: slot.slotId } : t != null ? { tipo: 'treino', treino: t } : { tipo: 'todos' }
      const ate = Math.min(a.ate ?? m.semanas, m.semanas)
      if (a.de > m.semanas || (a.modo === 'polimento' && a.de < 2 && ate < 2)) {
        bloqueios.push(`Volume: semana fora do meso (ele tem ${m.semanas} semanas${a.modo === 'polimento' ? '; o polimento começa na semana 2' : ''}).`)
        continue
      }
      const novo =
        a.modo === 'progredir'
          ? progressaoAutomatica(m, { pct: a.pct ?? m.progressaoPct ?? 5, de: a.de, ate, alvo })
          : a.modo === 'reduzir'
            ? reduzirVolume(m, { pct: a.pct ?? 0, de: a.de, ate, retorno: a.retorno, alvo })
            : polimento(m, { pct: a.pct ?? 0, semanas: todas.slice(a.de - 1, ate), alvo })
      m = { ...m, progressao: novo.progressao, progressaoExercicio: novo.progressaoExercicio }
      const rotulo = a.modo === 'progredir' ? 'progressão' : a.modo === 'reduzir' ? 'redução' : 'polimento'
      aplicados.push(`${nomeAlvo || 'Todos'}: ${rotulo}`)
      continue
    }

    // Método (sempre com treino e exercício: lerResposta garante).
    if (t == null || !pos) continue
    const ws = semanasDoMeso(a.semanas)
    if (!ws.length) {
      bloqueios.push(`O meso tem só ${m.semanas} semanas.`)
      continue
    }
    if (a.remover) {
      const antes = m.metodos
      let metodos = m.metodos
      for (const metodo of a.metodo ? [a.metodo] : METODOS) {
        metodos = salvarLinha(metodos, { treino: t, pos, metodo, semanas: [], modelo: [], parceiros: [] }, ws)
      }
      if (metodos.length === antes.length) bloqueios.push(`${nomeAlvo}: não tinha ${a.metodo ?? 'método'} para tirar.`)
      else {
        m = { ...m, metodos }
        aplicados.push(`${nomeAlvo}: sem ${a.metodo ?? 'métodos'}`)
      }
      continue
    }
    const metodo = a.metodo!
    let parceiros: number[] = []
    if (emGrupo(metodo)) {
      const achados = a.parceiros.map((r) => [r, posicao(t, r)] as const)
      const faltou = achados.find(([, p]) => !p)
      if (faltou) {
        bloqueios.push(`Treino ${t}: não achei "${faltou[0]}" para o ${metodo}.`)
        continue
      }
      parceiros = [...new Set(achados.map(([, p]) => p))].filter((p) => p !== pos)
      if (!totalCerto(metodo, parceiros.length + 1)) {
        const precisa = metodo === 'Biset' ? '2' : metodo === 'Triset' ? '3' : metodo === 'Superset' ? '4 ou mais' : '2 ou mais'
        bloqueios.push(`${nomeAlvo}: ${metodo} junta ${precisa} exercícios; ${parceiros.length + 1 === 1 ? 'veio só 1' : `vieram ${parceiros.length + 1}`}.`)
        continue
      }
    }
    const n = seriesDoExercicio(m, t, pos, ws) || 1
    const base = padraoMetodo(metodo, ws[0], t, pos, n)
    const series = a.series.filter((s) => s <= n)
    if (a.series.length && !series.length) {
      bloqueios.push(`${nomeAlvo}: tem só ${n} ${n === 1 ? 'série' : 'séries'}; não pus o ${metodo} na S${a.series[0]}.`)
      continue
    }
    const modelo =
      emGrupo(metodo) || !series.length
        ? [base]
        : metodo === 'Dropset'
          ? series.map((serie) => ({ ...base, escopo: 'Série específica' as const, serie }))
          : [{ ...base, escopo: 'Série específica' as const, serie: series[0] }]
    m = { ...m, metodos: salvarLinha(m.metodos, { treino: t, pos, metodo, semanas: ws, modelo, parceiros }, ws) }
    aplicados.push(`${nomeAlvo}: ${metodo}`)
  }

  const patch: Partial<Meso> = { divisao: m.divisao, metodos: m.metodos, progressaoExercicio: m.progressaoExercicio ?? {} }
  if (m.progressao !== meso.progressao) patch.progressao = m.progressao
  if (m.trocas) patch.trocas = m.trocas
  if (m.adicoes) patch.adicoes = m.adicoes
  return { patch, aplicados, bloqueios, refeitos }
}

function aplicarDivisao(m: Meso, registros: Registros, a: AcaoDivisao, aplicados: string[], bloqueios: string[], refeitos: number[]): Meso {
  const t = a.treino
  const arr = m.divisao[t - 1] ?? []
  const divisao = [...m.divisao]
  if (a.tipo === 'adicionar') {
    const novos = a.exercicios.filter((e) => !arr.some((s) => normalizar(s.nome) === normalizar(e.nome))).slice(0, MAX_POR_TREINO - arr.length)
    if (!novos.length) {
      bloqueios.push(`Treino ${t}: nada para adicionar (já tem esses exercícios ou chegou em ${MAX_POR_TREINO}).`)
      return m
    }
    divisao[t - 1] = [...arr, ...novos.map((e) => ({ slotId: crypto.randomUUID(), nome: e.nome }))]
    aplicados.push(`Treino ${t}: +${novos.length}`)
    return { ...m, divisao }
  }
  if (a.tipo === 'substituir') {
    if (normalizar(arr[a.pos - 1]?.nome ?? '') !== normalizar(a.de)) {
      bloqueios.push(`Treino ${t}: "${a.de}" mudou de lugar. Peça de novo.`)
      return m
    }
    if (arr.some((s) => normalizar(s.nome) === normalizar(a.por.nome))) {
      bloqueios.push(`Treino ${t}: "${a.por.nome}" já está no treino, então não troquei.`)
      return m
    }
    const r = trocarExercicio(m, registros, t, a.pos, a.por.nome)
    aplicados.push(`Treino ${t}: ${a.de} por ${a.por.nome}`)
    return { ...m, divisao: r.divisao, trocas: r.trocas }
  }
  if (treinoTemCarga(m, registros, t)) {
    bloqueios.push(`Treino ${t}: já tem cargas registradas, então a lista não foi refeita. Peça para adicionar ou trocar.`)
    return m
  }
  const progressaoExercicio = { ...m.progressaoExercicio }
  for (const s of arr) delete progressaoExercicio[s.slotId]
  if (arr.length) refeitos.push(t)
  // Trocas e adições pontuais do treino mandam mais que a divisão: saem junto.
  const trocas = m.trocas && Object.fromEntries(Object.entries(m.trocas).filter(([k]) => k.split('-')[1] !== String(t)))
  const adicoes = m.adicoes && Object.fromEntries(Object.entries(m.adicoes).filter(([k]) => !k.endsWith(`-${t}`)))
  divisao[t - 1] = a.exercicios.slice(0, MAX_POR_TREINO).map((e) => ({ slotId: crypto.randomUUID(), nome: e.nome }))
  aplicados.push(`Treino ${t}: lista refeita`)
  return { ...m, divisao, progressaoExercicio, metodos: m.metodos.filter((x) => x.treino !== t), trocas, adicoes }
}
