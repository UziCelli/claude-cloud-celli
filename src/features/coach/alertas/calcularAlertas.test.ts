import { describe, expect, it } from 'vitest'
import type { Meso } from '../../../engine'
import type { Usuario } from '../../../lib/acesso'
import { diaSP } from '../../../lib/acesso'
import { chaveAlerta } from '../../../lib/alertas'
import { mesoParaDoc } from '../../../lib/conversores'
import { calcularAlertas, chavesAtuais, type Reg } from './calcularAlertas'

const agora = new Date('2026-10-07T15:00:00Z')
const DIA = 86400_000
const ts = (ms: number) => ({ toMillis: () => ms }) as never
const ha = (dias: number) => agora.getTime() - dias * DIA

const linha = [8, 8, 8, null, null, null]
const meso: Meso = {
  frequencia: 2,
  semanas: 4,
  inicio: '2026-10-05',
  pausaS: 60,
  tempoLimiteMin: 1, // tudo passa do limite: 2 alertas "acima" (treinos 1 e 2)
  divisao: [[{ slotId: 'a', nome: 'Supino' }, { slotId: 'b', nome: 'Remada' }], [{ slotId: 'c', nome: 'Rosca' }]],
  progressao: { principais: [linha, linha, linha, linha], auxiliares: [linha, linha, linha, linha] },
  metodos: [],
}
const alunos = [{ id: 'ana', papel: 'aluno', nome: 'Ana', email: '', status: 'ativo' }] as (Usuario & { id: string })[]
const mesos = [{ id: 'm1', alunoId: 'ana', nome: 'Meso 1', ...mesoParaDoc(meso) }]
const registros: Reg[] = [
  // 6 séries feitas, 4 abaixo
  {
    alunoId: 'ana', mesoId: 'm1', semana: 1, treino: 1, realizado: true, realizadoEm: ts(ha(1)), inicioEm: ts(ha(1) - 120 * 60_000),
    cargas: { a: { s1: 50, s2: 50, s3: 50 }, b: { s1: 40, s2: 40, s3: 40 } },
    reps: { a: { s1: 6, s2: 6, s3: 6 }, b: { s1: 6, s2: 8, s3: 8 } },
  } as Reg,
]

describe('calcularAlertas com arquivados', () => {
  const base = calcularAlertas(alunos, mesos, registros, agora)

  it('sem arquivados: tudo visível, cada item com a chave', () => {
    expect(base.abaixo.map((x) => x.chave)).toEqual([chaveAlerta.abaixo('m1', diaSP(ha(1)))])
    expect(base.demorados.map((x) => x.chave)).toEqual(['demorado_m1_1_1'])
    expect(base.acima).toHaveLength(2)
    expect(base.acima[0].chave).toBe(chaveAlerta.acima('m1', base.acima[0].a, 1))
    expect(base.total).toBe(4)
    expect(base.arquivados).toEqual({ abaixo: [], acima: [], demorados: [] })
  })

  it('arquivado some dos visíveis e do total, e vai para arquivados', () => {
    const ocultos = new Set([base.abaixo[0].chave, base.acima[1].chave, 'demorado_m1_9_9'])
    const r = calcularAlertas(alunos, mesos, registros, agora, ocultos)
    expect(r.abaixo).toEqual([])
    expect(r.acima.map((x) => x.chave)).toEqual([base.acima[0].chave])
    expect(r.demorados).toHaveLength(1)
    expect(r.total).toBe(2)
    expect(r.arquivados.abaixo.map((x) => x.chave)).toEqual([base.abaixo[0].chave])
    expect(r.arquivados.acima.map((x) => x.chave)).toEqual([base.acima[1].chave])
    expect(r.arquivados.demorados).toEqual([])
  })

  it('situação nova (outro dia com reps abaixo) gera chave nova: o alerta volta', () => {
    const ocultos = new Set([base.abaixo[0].chave])
    const novo = { ...registros[0], semana: 1, treino: 2, realizadoEm: ts(ha(0)), cargas: { c: { s1: 30, s2: 30, s3: 30 } }, reps: { c: { s1: 5, s2: 5, s3: 5 } } } as Reg
    const r = calcularAlertas(alunos, mesos, [...registros, novo], agora, ocultos)
    expect(r.abaixo).toHaveLength(1)
    expect(r.abaixo[0].chave).not.toBe(base.abaixo[0].chave)
  })

  it('chavesAtuais junta visíveis e arquivados', () => {
    const r = calcularAlertas(alunos, mesos, registros, agora, new Set([base.abaixo[0].chave]))
    expect(chavesAtuais(r)).toEqual(new Set([...base.abaixo, ...base.acima, ...base.demorados].map((x) => x.chave)))
  })
})
