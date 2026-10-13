// Port de tools/planilha_para_meso.py: aba de mesociclo da planilha -> Meso do motor + cargas já registradas.
import type { AplicacaoMetodo, Escopo, Meso, Metodo, Slot } from '../engine'
import type { Valor } from './xlsx'

export interface RegistroImportado {
  semana: number
  treino: number
  realizado: boolean
  cargas: Record<string, Record<string, number>> // slotId -> { s1: kg }
}
export interface Importado {
  meso: Meso
  registros: RegistroImportado[] // só treinos realizados
  deFora: number // treinos "Não realizado" com carga (ficam de fora: carga costuma ser copiada)
}

const METODO_COLS = ['id', 'ativo', 'semana', 'treino', 'exercicio', 'nomeExercicio', 'metodo', 'escopo', 'serie', 'grupo',
  'reducaoCarga', 'pausaInternaS', 'blocos', 'repsPorBloco', 'adicional', 'etapas',
  'cargaEtapa1', 'cargaEtapa2', 'cargaEtapa3', 'repsPadrao', 'repsEtapa1', 'repsEtapa2', 'repsEtapa3']

const num = (v: Valor | undefined): number | null => (typeof v === 'number' ? v : null)
const texto = (v: Valor | undefined) => (typeof v === 'string' ? v.trim() : '')
const ok = (v: number | null): v is number => v !== null && v !== 0 // "truthy" do Python: 0 = vazio

function colNum(letras: string) {
  return [...letras].reduce((n, ch) => n * 26 + ch.charCodeAt(0) - 64, 0)
}
function colNome(n: number) {
  let s = ''
  for (; n > 0; n = Math.floor((n - 1) / 26)) s = String.fromCharCode(65 + ((n - 1) % 26)) + s
  return s
}
// round() do Python arredonda .5 para o par
function arredondar(x: number) {
  const f = Math.floor(x)
  const d = x - f
  return d < 0.5 ? f : d > 0.5 ? f + 1 : f % 2 === 0 ? f : f + 1
}

function dataSerial(n: number): string | null {
  if (!(n >= 1 && n < 2958466)) return null
  return new Date(Date.UTC(1899, 11, 30) + Math.floor(n) * 86400000).toISOString().slice(0, 10)
}

export function planilhaParaMeso(celulas: Map<string, Valor>, novoId: () => string = () => crypto.randomUUID()): Importado {
  const ref = (r: number, k: number | string) => `${typeof k === 'number' ? colNome(k) : k}${r}`
  const c = (r: number, k: number | string) => celulas.get(ref(r, k))
  let maxCol = 0
  let maxRow = 0
  for (const k of celulas.keys()) {
    const m = /^([A-Z]+)(\d+)$/.exec(k)
    if (m) {
      maxCol = Math.max(maxCol, colNum(m[1]))
      maxRow = Math.max(maxRow, Number(m[2]))
    }
  }
  const T = colNum('T')

  // Config: rótulo "Semana [n]" ou "Número de semanas" (sem acento/maiúsculas/espaços extras) em AY3 (abas antigas)
  // ou BN5 (novas); valores na coluna ao lado.
  const rotulo = (v: Valor | undefined) => texto(v).normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/\s+/g, ' ')
  let cr = 3
  let cc = colNum('AY')
  busca: for (let r = 1; r <= 10; r++)
    for (let k = 1; k <= maxCol; k++)
      if (['semana [n]', 'numero de semanas'].includes(rotulo(c(r, k)))) {
        cr = r
        cc = k
        break busca
      }
  const nSemanas = num(c(cr, cc + 1))
  if (nSemanas === null) throw new Error('Esta aba não tem a Configuração do Meso (número de semanas). Use uma aba do modelo atual.')
  const semanas = Math.trunc(nSemanas)
  const serial = num(c(cr + 1, cc + 1))
  const inicio = serial === null ? null : dataSerial(serial)
  if (inicio === null) throw new Error(`A data inicial (${ref(cr + 1, cc + 1)}) não é uma data.`)
  const nFreq = num(c(cr + 2, cc + 1))
  if (nFreq === null) throw new Error(`A frequência semanal (${ref(cr + 2, cc + 1)}) não é um número.`)
  const frequencia = Math.trunc(nFreq)
  if (semanas < 1 || semanas > 52) throw new Error(`Número de semanas fora do esperado (${semanas}).`)
  if (frequencia < 1 || frequencia > 7) throw new Error(`Treinos por semana fora do esperado (${frequencia}).`)
  const pausa = Math.trunc(num(c(33, 'Z')) || 120)

  // Divisão: T4:Y13 (coluna = treino, linha = posição).
  const divisao: Slot[][] = []
  for (let t = 0; t < frequencia; t++) {
    const slots: Slot[] = []
    for (let p = 0; p < 10; p++) {
      const nome = texto(c(4 + p, T + t))
      if (!nome) break
      slots.push({ slotId: novoId(), nome })
    }
    divisao.push(slots)
  }

  const linha = (r: number) => Array.from({ length: 6 }, (_, s) => num(c(r, T + s))).map((v) => (v !== null ? Math.trunc(v) : null))
  const progressao = {
    principais: Array.from({ length: semanas }, (_, w) => linha(18 + w)),
    auxiliares: Array.from({ length: semanas }, (_, w) => linha(33 + w)),
  }

  // Métodos: tabela 7 linhas abaixo do rótulo. Linhas repetidas (mesmo conteúdo) entram uma vez.
  const metodos: AplicacaoMetodo[] = []
  const vistos = new Set<string>()
  for (let r = cr + 7; r < cr + 107; r++) {
    const m: Record<string, Valor | undefined> = {}
    METODO_COLS.forEach((nome, i) => (m[nome] = c(r, cc + i)))
    const semana = num(m.semana)
    const treino = num(m.treino)
    const exercicio = num(m.exercicio)
    if (!texto(m.metodo) || !ok(semana) || !ok(treino) || !ok(exercicio)) continue
    if (treino > frequencia) continue
    const ap: AplicacaoMetodo = {
      ativo: texto(m.ativo).toUpperCase() === 'SIM', semana: Math.trunc(semana), treino: Math.trunc(treino),
      exercicio: Math.trunc(exercicio), metodo: texto(m.metodo) as Metodo, escopo: texto(m.escopo) as Escopo,
    }
    for (const k of ['serie', 'grupo', 'pausaInternaS', 'blocos', 'repsPorBloco', 'adicional', 'etapas', 'repsPadrao'] as const) {
      const v = num(m[k])
      if (ok(v)) ap[k] = v
    }
    const red = num(m.reducaoCarga)
    if (ok(red)) ap.reducaoCarga = arredondar(red * 100) // planilha: fração (0,2); app: % (20)
    for (const k of ['cargaEtapa', 'repsEtapa'] as const) {
      const vals = [1, 2, 3].map((i) => num(m[`${k}${i}`]))
      if (vals.some(ok)) ap[k] = vals
    }
    const chave = JSON.stringify(ap)
    if (!vistos.has(chave)) {
      vistos.add(chave)
      metodos.push(ap)
    }
  }

  // Semanas: blocos de 1 + 13·n linhas (acha pela 2ª linha "Semana" em B); treinos: blocos de 13 ("Realizado" em C).
  let achado = 81
  for (let r = 3; r <= maxRow; r++)
    if (texto(c(r, 'B')) === 'Semana') {
      achado = r
      break
    }
  const bloco = achado - 2
  const trocas: Record<string, Slot> = {}
  const registros: RegistroImportado[] = []
  let deFora = 0
  for (let w = 1; w <= semanas; w++)
    for (let t = 1; t <= frequencia; t++) {
      const topo = 3 + bloco * (w - 1) + 13 * (t - 1)
      if (!['Realizado', 'Não realizado'].includes(texto(c(topo, 'C'))))
        throw new Error(`Layout inesperado na semana ${w}, treino ${t} (linha ${topo}).`)
      const cargas: Record<string, Record<string, number>> = {}
      divisao[t - 1].forEach((base, i) => {
        const p = i + 1
        let slot = base
        const nome = texto(c(topo + 1 + p, 'C'))
        if (nome && nome !== slot.nome) trocas[`${w}-${t}-${p}`] = slot = { slotId: novoId(), nome }
        const kg: Record<string, number> = {}
        for (let s = 0; s < 6; s++) {
          const v = num(c(topo + 1 + p, colNum('J') + s))
          if (ok(v)) kg[`s${s + 1}`] = v // 0 = vazio
        }
        if (Object.keys(kg).length) cargas[slot.slotId] = kg
      })
      const realizado = c(topo, 'B') === true
      if (realizado) registros.push({ semana: w, treino: t, realizado, cargas })
      else if (Object.keys(cargas).length) deFora++
    }

  return { meso: { frequencia, semanas, inicio, pausaS: pausa, divisao, trocas, progressao, metodos }, registros, deFora }
}

export function abaSugerida(abas: string[]): string | undefined {
  return abas.filter((a) => /^M\s*\(?\s*\d+\s*\)?$/i.test(a.trim())).pop()
}
