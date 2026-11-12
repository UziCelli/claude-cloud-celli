import { describe, expect, it } from 'vitest'
import { ALERTA_GERAL, METODOS_FISIO } from '../data/fisio'
import { lerOrientacao, metodoLiberavel, validarOrientacao, type OrientacaoForm } from './fisio'

const form = (m = 'M04'): OrientacaoForm => ({ metodoId: m, condicao: 'Queixa informada pelo aluno', recado: 'Fazer somente com supervisão.', contextoLiberacao: false, liberacao: null, alertasRevisados: true })
const liberacao = { profissional: 'Fisioterapeuta de exemplo', registro: 'CREFITO exemplo', data: '2026-11-10' }
const hoje = '2026-11-12'

describe('orientações Físio', () => {
  it('todos os 25 têm sinais de perigo (próprios ou gerais) e podem ser enviados; método desconhecido não', () => {
    expect(METODOS_FISIO.filter((m) => !metodoLiberavel(m.id))).toEqual([])
    expect(METODOS_FISIO.filter((m) => m.alertaGeral).map((m) => m.id)).toEqual(['M08', 'M09', 'M15', 'M16', 'M17', 'M19', 'M20', 'M22', 'M23', 'M24'])
    for (const m of METODOS_FISIO.filter((m) => m.alertaGeral)) expect(m.encaminharSe).toEqual(ALERTA_GERAL)
    expect(metodoLiberavel('M99')).toBe(false)
  })
  it('requer revisão de alertas e condição informada, sem deduzir diagnóstico', () => {
    expect(validarOrientacao(form(), hoje)).toBeNull()
    expect(validarOrientacao({ ...form(), alertasRevisados: false }, hoje)).toMatch(/alerta/)
    expect(validarOrientacao({ ...form(), condicao: '   ' }, hoje)).toMatch(/condição/)
    expect(validarOrientacao({ ...form(), recado: 'a'.repeat(2001) }, hoje)).not.toBeNull()
  })
  it('métodos com condição de liberação e contextos globais exigem registro profissional', () => {
    for (const m of METODOS_FISIO.filter((m) => metodoLiberavel(m.id) && m.liberacao)) {
      expect(validarOrientacao(form(m.id), hoje), m.id).toMatch(/liberação/)
      expect(validarOrientacao({ ...form(m.id), liberacao }, hoje), m.id).toBeNull()
    }
    expect(validarOrientacao({ ...form(), contextoLiberacao: true }, hoje)).toMatch(/liberação/)
    expect(validarOrientacao({ ...form(), contextoLiberacao: true, liberacao }, hoje)).toBeNull()
  })
  it('não aceita liberação sem identificação, registro, com data inexistente ou futura', () => {
    for (const l of [{ ...liberacao, profissional: '' }, { ...liberacao, registro: ' ' }, { ...liberacao, data: '2026-02-30' }, { ...liberacao, data: '2026-11-13' }]) {
      expect(validarOrientacao({ ...form('M07'), liberacao: l }, hoje)).not.toBeNull()
    }
  })
  it('leitura rejeita conteúdo inválido e não transforma sinal corrompido em ausência de sinal', () => {
    const doc = { ...form(), alunoId: 'ana', recolhida: false, sinalRelatado: false, em: null }
    expect(lerOrientacao('id', doc)?.metodoId).toBe('M04')
    for (const d of [null, {}, { ...doc, metodoId: 'M99' }, { ...doc, sinalRelatado: 'false' }, { ...doc, recolhida: null }, { ...doc, alunoId: 7 }, { ...doc, liberacao: { profissional: 5 } }]) {
      expect(lerOrientacao('id', d)).toBeNull()
    }
    expect(lerOrientacao('id', { ...doc, sinalRelatado: true })?.sinalRelatado).toBe(true)
  })
})
