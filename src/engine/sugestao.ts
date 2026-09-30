import catalogo from '../data/exercicios.json'
import { prescreverSessao } from './sessao'
import type { Meso } from './tipos'

export type Equipamento = 'duasPolias' | 'polia' | 'halter' | 'barra' | 'maquina' | 'pesoCorporal'

export interface PropostaMetodo {
  treino: number
  semana: number
  posicoes: number[] // posições 1–10, em ordem
  metodo: 'Biset' | 'Triset'
  tempoAntes: number // min, com as propostas anteriores da lista já aplicadas
  tempoDepois: number
}

const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
const grupoDe = new Map(catalogo.flatMap((g) => g.exercicios.map((e) => [norm(e.nome), g.grupo] as const)))

export function classificarEquipamento(nome: string): Equipamento {
  const n = norm(nome)
  const tem = (...palavras: string[]) => palavras.some((p) => n.includes(p))
  if (tem('crossover') || (tem('crucifixo', 'voador') && tem('polia', 'cabo'))) return 'duasPolias'
  if (tem('polia', 'cabo', 'pulley', 'corda', 'puxada')) return 'polia'
  if (tem('halter')) return 'halter'
  if (tem('barra fixa', 'barra paralela')) return 'pesoCorporal'
  if (tem('barra')) return 'barra'
  if (tem('cadeira', 'maquina', 'leg press', 'smith', 'hack', 'peck deck', 'articulad', 'pendulo', 'flexora', 'extensora'))
    return 'maquina'
  return 'pesoCorporal'
}

const ANTAGONISTAS = [
  ['Bíceps', 'Tríceps'],
  ['Peitorais', 'Dorsais'],
  ['Quadríceps e Glúteos', 'Posterior de Coxa'],
]

interface Candidato {
  pos: number
  grupo: string
  equip: Equipamento
}

// Quanto menor, melhor o par: 0 antagonistas · 1 polia+halter · 2 polia+polia · 3 o resto.
function pontos(a: Candidato, b: Candidato): number {
  if (ANTAGONISTAS.some(([x, y]) => (a.grupo === x && b.grupo === y) || (a.grupo === y && b.grupo === x))) return 0
  if ((a.equip === 'polia' && b.equip === 'halter') || (a.equip === 'halter' && b.equip === 'polia')) return 1
  return a.equip === 'polia' && b.equip === 'polia' ? 2 : 3
}

// Linhas de Biset/Triset ("Todas as séries") nas semanas dadas, num grupo de método livre em todas elas.
export function aplicarSugestao(
  meso: Meso,
  { treino, posicoes, metodo }: Pick<PropostaMetodo, 'treino' | 'posicoes' | 'metodo'>,
  semanas: number[],
): Meso {
  const usados = new Set(meso.metodos.filter((m) => m.treino === treino && semanas.includes(m.semana)).map((m) => m.grupo))
  let grupo = 1
  while (usados.has(grupo)) grupo++
  const novas = semanas.flatMap((semana) =>
    posicoes.map((exercicio) => ({
      ativo: true,
      semana,
      treino,
      exercicio,
      metodo,
      escopo: 'Todas as séries' as const,
      pausaInternaS: 15,
      blocos: 1,
      grupo,
    })),
  )
  return { ...meso, metodos: [...meso.metodos, ...novas] }
}

type Plano = { posicoes: number[]; metodo: 'Biset' | 'Triset' }

// Propõe bisets (e, se não bastarem, trisets) para a sessão caber em `limiteMin`. Vazio se já cabe.
export function sugerirMetodos(
  meso: Meso,
  semana: number,
  treino: number,
  limiteMin: number,
  { incluirPrincipais = false }: { incluirPrincipais?: boolean } = {},
): PropostaMetodo[] {
  const sessao = prescreverSessao(meso, semana, treino)
  if (!sessao || sessao.tempoMin <= limiteMin) return []

  const emMetodo = new Set(meso.metodos.filter((m) => m.ativo && m.semana === semana && m.treino === treino).map((m) => m.exercicio))
  const candidatos = sessao.exercicios.flatMap((e): Candidato[] => {
    const grupo = grupoDe.get(norm(e.slot.nome))
    const equip = classificarEquipamento(e.slot.nome)
    const entra = grupo && equip !== 'duasPolias' && e.n > 0 && !emMetodo.has(e.pos) && (incluirPrincipais || e.pos > 2)
    return entra ? [{ pos: e.pos, grupo, equip }] : []
  })

  const aplicar = (planos: Plano[]) => planos.reduce((m, p) => aplicarSugestao(m, { treino, ...p }, [semana]), meso)
  const tempoCom = (planos: Plano[]) => prescreverSessao(aplicar(planos), semana, treino)!.tempoMin

  // 1) bisets, do melhor par para o pior (empate: ordem de posição, pois o sort é estável)
  const pares = candidatos
    .flatMap((a, i) => candidatos.slice(i + 1).filter((b) => b.grupo !== a.grupo).map((b) => ({ a, b, p: pontos(a, b) })))
    .sort((x, y) => x.p - y.p)
  const planos: Plano[] = []
  const usados = new Set<number>()
  let tempo = sessao.tempoMin
  for (const { a, b } of pares) {
    if (tempo <= limiteMin) break
    if (usados.has(a.pos) || usados.has(b.pos)) continue
    usados.add(a.pos).add(b.pos)
    planos.push({ posicoes: [a.pos, b.pos], metodo: 'Biset' })
    tempo = tempoCom(planos)
  }

  // 2) só se ainda passar: um exercício que sobrou (grupo novo para o par) vira o 3º do biset → triset
  for (const [i, plano] of planos.entries()) {
    if (tempo <= limiteMin) break
    const dupla = candidatos.filter((c) => plano.posicoes.includes(c.pos))
    const nota = (c: Candidato) => dupla.reduce((s, d) => s + pontos(d, c), 0)
    const terceiro = candidatos
      .filter((c) => !usados.has(c.pos) && dupla.every((d) => d.grupo !== c.grupo))
      .sort((x, y) => nota(x) - nota(y))[0]
    if (!terceiro) continue
    usados.add(terceiro.pos)
    planos[i] = { posicoes: [...plano.posicoes, terceiro.pos].sort((x, y) => x - y), metodo: 'Triset' }
    tempo = tempoCom(planos)
  }

  // tempos encadeados: cada proposta parte do tempo que as anteriores deixaram
  return planos.map((p, i) => ({
    treino,
    semana,
    ...p,
    tempoAntes: i === 0 ? sessao.tempoMin : tempoCom(planos.slice(0, i)),
    tempoDepois: tempoCom(planos.slice(0, i + 1)),
  }))
}
