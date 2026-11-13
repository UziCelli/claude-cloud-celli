// Carga por lado (2 halteres / máquina articulada). Funções puras. Plano: docs/plano-lados-isometria.md.
// Convenção: cargas.<slot>.sN = TOTAL (esq + dir + pc); lados.<slot>.sN = kg do lado ESQUERDO.
// Célula com `lados` = formato novo. Célula sem `lados` num slot de 2 lados = antiga (só lida, nunca reescrita).
import catalogo from '../data/exercicios.json'
import type { Slot } from '../engine'
import { norm } from './busca'

const padrao = new Map(catalogo.flatMap((g) => g.exercicios.map((e) => [norm(e.nome), e.doisLados === true] as const)))

// Padrão do catálogo (pelo nome); exercício fora do catálogo = comum.
export const doisLadosPadrao = (nome: string) => padrao.get(norm(nome.trim())) ?? false

// O ajuste do meso (slot.doisLados) vence o catálogo.
export const doisLados = (slot: Pick<Slot, 'nome' | 'doisLados'>) => slot.doisLados ?? doisLadosPadrao(slot.nome)

const arred = (x: number) => Math.round(x * 100) / 100

export const totalLados = (esq: number, dir: number, pc = 0) => arred(esq + dir + pc)

export interface CelulaLados {
  esq: number | null
  dir: number | null
  antigo: number | null // formato antigo: o número inteiro anotado (sem o corpo); esq/dir ficam null
}

// `total` = carga da célula (já normalizada); `esq` = lados.<slot>.sN; `pc` = peso do corpo do registro.
export function lerCelula(total: number | null | undefined, esq: number | null | undefined, pc = 0): CelulaLados {
  if (total == null) return { esq: null, dir: null, antigo: null }
  // esq > total - pc: versão antiga do app editou só o total; a divisão não vale mais, vira antiga (o total segue certo).
  if (esq == null || esq > arred(total - pc)) return { esq: null, dir: null, antigo: Math.max(0, arred(total - pc)) }
  return { esq, dir: Math.max(0, arred(total - pc - esq)), antigo: null }
}

export const ladosDiferentes = (cels: CelulaLados[]) => cels.some((c) => c.esq != null && c.esq !== c.dir)
