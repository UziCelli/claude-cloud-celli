import { describe, expect, it } from 'vitest'
import { Timestamp } from 'firebase/firestore'
import { ALERTA_DOR, dicaDaDor, lerDor, validarDor } from './dor'

describe('dicaDaDor (faixas do Victor: 0–3 / 4–5 / 6+)', () => {
  it('faixas certas, sem nunca chamar a dor de aceitável ou normal', () => {
    for (const i of [0, 3]) expect(dicaDaDor(i).nivel).toBe('seguir')
    for (const i of [4, 5]) expect(dicaDaDor(i).nivel).toBe('reduzir')
    for (const i of [6, 10]) expect(dicaDaDor(i).nivel).toBe('parar')
    for (let i = 0; i <= 10; i++) expect(dicaDaDor(i).texto).not.toMatch(/aceit|normal/i)
  })
  it('o alerta de perigo e o "coach vai ver" (sem prometer aviso no celular) valem para todas', () => {
    expect(ALERTA_DOR).toMatch(/médico ou fisioterapeuta/)
    for (const i of [0, 5, 10]) expect(dicaDaDor(i).coach).toMatch(/vai ver/)
  })
})

describe('validarDor', () => {
  const base = { exercicio: 'Agachamento Livre Barra', articulacao: 'joelho', tipo: 'dor', intensidade: 4, momento: 'durante', texto: '' } as const
  it('aceita o relato completo e exige texto em "Outro"', () => {
    expect(validarDor(base)).toBeNull()
    expect(validarDor({ ...base, articulacao: 'outro' })).toMatch(/onde/)
    expect(validarDor({ ...base, articulacao: 'outro', texto: 'Canela' })).toBeNull()
  })
  it('nega intensidade fora de 0–10 e texto longo', () => {
    expect(validarDor({ ...base, intensidade: 11 })).not.toBeNull()
    expect(validarDor({ ...base, intensidade: 2.5 })).not.toBeNull()
    expect(validarDor({ ...base, texto: 'x'.repeat(301) })).not.toBeNull()
  })
})

describe('lerDor (leitura desconfiada)', () => {
  const doc = { alunoId: 'ana', exercicio: 'Leg Press 45', articulacao: 'joelho', tipo: 'dor', intensidade: 7, momento: 'fim', em: Timestamp.now() }
  it('lê o válido, com e sem resposta', () => {
    expect(lerDor('d', doc)?.intensidade).toBe(7)
    expect(lerDor('d', { ...doc, resposta: 'Reduza', respondidoEm: Timestamp.now(), vistoEm: Timestamp.now() })?.resposta).toBe('Reduza')
    expect(lerDor('d', { ...doc, em: null })?.em).toBeNull() // ainda sem hora do servidor (offline)
  })
  it('descarta o que não confere', () => {
    for (const ruim of [{ intensidade: 12 }, { articulacao: 'nariz' }, { tipo: 'x' }, { momento: 'x' }, { alunoId: 5 }, { exercicio: '' }])
      expect(lerDor('d', { ...doc, ...ruim })).toBeNull()
    expect(lerDor('d', null)).toBeNull()
  })
})
