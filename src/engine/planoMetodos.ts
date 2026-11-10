// Aba Métodos do editor do meso: junta as semanas iguais de um exercício numa "linha" e grava a linha
// substituindo as semanas dela (nunca duplica). Funções puras sobre meso.metodos (uma entrada por semana).
import { serieDoDrop } from './editarSessao'
import { linhaPrescrita } from './sessao'
import type { AplicacaoMetodo, Meso, Metodo } from './tipos'

export const METODOS: Metodo[] = ['Dropset', 'Biset', 'Triset', 'Superset', 'Circuito', 'Rest-pause', 'Clusterset']
const SEQUENCIA: Metodo[] = ['Biset', 'Triset', 'Superset', 'Circuito']
export const emGrupo = (m: Metodo) => SEQUENCIA.includes(m)
// Exercícios que cada método de grupo junta: Biset 2, Triset 3, Superset 4 ou mais, Circuito 2 ou mais.
export const totalCerto = (m: Metodo, total: number) => (m === 'Biset' ? total === 2 : m === 'Triset' ? total === 3 : m === 'Superset' ? total >= 4 : total >= 2)

// Um método num exercício, nas semanas em que ele está igual. `modelo` = as entradas da primeira semana
// (Dropset em várias séries = várias entradas); `parceiros` = as outras posições do grupo (Biset…).
export interface LinhaMetodo { metodo: Metodo; semanas: number[]; modelo: AplicacaoMetodo[]; parceiros: number[] }
export interface LinhaSalva extends LinhaMetodo { treino: number; pos: number }

// Texto estável da entrada para comparar semanas: sem semana, grupo e exercício; campos vazios não contam.
function assinatura(m: AplicacaoMetodo): string {
  const { semana: _s, grupo: _g, exercicio: _e, ...resto } = m
  const campos = Object.entries(resto).filter(([, v]) => v !== undefined).sort(([a], [b]) => a.localeCompare(b))
  return JSON.stringify(campos)
}

const unicos = (xs: number[]) => [...new Set(xs)].sort((a, b) => a - b)

export function linhasDoExercicio(metodos: AplicacaoMetodo[], treino: number, pos: number): LinhaMetodo[] {
  const doTreino = metodos.filter((m) => m.treino === treino)
  // Uma unidade por semana + método (+ grupo, nos de sequência).
  const unidades = new Map<string, { semana: number; metodo: Metodo; entradas: AplicacaoMetodo[]; parceiros: number[] }>()
  for (const m of doTreino) {
    if (m.exercicio !== pos) continue
    const g = emGrupo(m.metodo) ? m.grupo : undefined
    const chave = `${m.semana}|${m.metodo}|${g ?? ''}`
    if (unidades.has(chave)) continue
    const mesmo = (x: AplicacaoMetodo) => x.semana === m.semana && x.metodo === m.metodo && (!emGrupo(m.metodo) || x.grupo === g)
    const entradas = doTreino.filter((x) => mesmo(x) && x.exercicio === pos)
    const parceiros = emGrupo(m.metodo) ? unicos(doTreino.filter((x) => mesmo(x) && x.exercicio !== pos).map((x) => x.exercicio)) : []
    unidades.set(chave, { semana: m.semana, metodo: m.metodo, entradas, parceiros })
  }
  const linhas = new Map<string, LinhaMetodo>()
  for (const u of unidades.values()) {
    const chave = `${u.metodo}|${u.parceiros.join(',')}|${u.entradas.map(assinatura).sort().join('|')}`
    const l = linhas.get(chave)
    if (l) l.semanas.push(u.semana)
    else linhas.set(chave, { metodo: u.metodo, semanas: [u.semana], modelo: [...u.entradas].sort((a, b) => (a.serie ?? 0) - (b.serie ?? 0)), parceiros: u.parceiros })
  }
  return [...linhas.values()]
    .map((l) => ({ ...l, semanas: unicos(l.semanas) }))
    .sort((a, b) => a.semanas[0] - b.semanas[0] || METODOS.indexOf(a.metodo) - METODOS.indexOf(b.metodo))
}

// "Série específica" sempre com série; os outros escopos sem série; grupo é refeito na gravação.
function limpa(e: AplicacaoMetodo): AplicacaoMetodo {
  const { grupo: _g, serie, ...resto } = e
  return resto.escopo === 'Série específica' ? { ...resto, serie: serie ?? 1 } : resto
}

// Grava a linha nas semanas dela. Antes tira, em `semanas` ∪ `semanasAntes`, o que havia daquele método no
// exercício (grupo inteiro, nos de sequência, e também os grupos dos parceiros novos: um exercício fica em no
// máximo um grupo de cada método por semana). As entradas novas ficam no lugar das antigas.
export function salvarLinha(metodos: AplicacaoMetodo[], l: LinhaSalva, semanasAntes: number[] = []): AplicacaoMetodo[] {
  const { treino, pos, metodo } = l
  const mexe = new Set([...l.semanas, ...semanasAntes])
  const seq = emGrupo(metodo)
  const membros = seq ? [pos, ...l.parceiros.filter((p) => p !== pos)] : [pos]
  const doMetodo = (m: AplicacaoMetodo) => m.treino === treino && m.metodo === metodo && mexe.has(m.semana)
  const daLinha = (m: AplicacaoMetodo) => m.exercicio === pos || (l.semanas.includes(m.semana) && membros.includes(m.exercicio))
  // Dado antigo sem número de grupo não forma grupo: sai só o do exercício e dos parceiros.
  const comGrupo = (m: AplicacaoMetodo) => seq && m.grupo != null
  const gruposFora = new Set(metodos.filter((m) => doMetodo(m) && comGrupo(m) && daLinha(m)).map((m) => `${m.semana}-${m.grupo}`))
  const sai = (m: AplicacaoMetodo) => doMetodo(m) && (comGrupo(m) ? gruposFora.has(`${m.semana}-${m.grupo}`) : daLinha(m))
  const i = metodos.findIndex(sai)
  const resto = metodos.filter((m) => !sai(m))

  const novas: AplicacaoMetodo[] = []
  if (l.modelo.length) {
    for (const w of unicos(l.semanas)) {
      if (seq) {
        const grupo = Math.max(0, ...resto.filter((m) => m.treino === treino && m.metodo === metodo && m.semana === w).map((m) => m.grupo ?? 0)) + 1
        for (const p of membros) novas.push({ ...limpa(l.modelo[0]), semana: w, treino, exercicio: p, metodo, grupo })
      } else {
        const vistos = new Set<string>()
        for (const e of l.modelo.map(limpa)) {
          if (vistos.has(assinatura(e))) continue
          vistos.add(assinatura(e))
          novas.push({ ...e, semana: w, treino, exercicio: pos, metodo })
        }
      }
    }
  }
  return i < 0 ? [...resto, ...novas] : [...resto.slice(0, i), ...novas, ...resto.slice(i)]
}

export const removerLinha = (metodos: AplicacaoMetodo[], treino: number, pos: number, linha: LinhaMetodo) =>
  salvarLinha(metodos, { treino, pos, metodo: linha.metodo, semanas: [], modelo: linha.modelo, parceiros: [] }, linha.semanas)

// [1,2,3,5] de 6 → "semanas 1–3, 5"; todas → "todas as semanas".
export function semanasTexto(semanas: number[], total: number): string {
  const ws = unicos(semanas)
  if (ws.length === total && ws.every((w, k) => w === k + 1)) return 'todas as semanas'
  const faixas: string[] = []
  for (let k = 0; k < ws.length; k++) {
    let f = k
    while (f + 1 < ws.length && ws[f + 1] === ws[f] + 1) f++
    faixas.push(f > k ? `${ws[k]}–${ws[f]}` : `${ws[k]}`)
    k = f
  }
  return `${ws.length === 1 ? 'semana' : 'semanas'} ${faixas.join(', ')}`
}

// Dropset: as séries em que o drop cai ("S1, S2 e S3"); os outros: o escopo ("S2", "últimas 2 séries").
export function seriesTexto(modelo: AplicacaoMetodo[], n: number): string {
  const m = modelo[0]
  if (!m) return ''
  if (m.metodo === 'Dropset') {
    const ss = unicos(modelo.map((x) => (n > 0 ? serieDoDrop(x, n) : (x.serie ?? 1)))).map((s) => `S${s}`)
    return ss.length > 1 ? `${ss.slice(0, -1).join(', ')} e ${ss[ss.length - 1]}` : ss[0]
  }
  return m.escopo === 'Série específica' ? `S${m.serie ?? 1}` : m.escopo.toLowerCase()
}

// Séries do exercício nas semanas escolhidas: o maior número de séries preenchidas (progressão própria vale).
export const seriesDoExercicio = (meso: Meso, treino: number, pos: number, semanas: number[]) =>
  Math.max(0, ...semanas.map((w) => linhaPrescrita(meso, w, treino, pos).filter((r) => typeof r === 'number').length))
