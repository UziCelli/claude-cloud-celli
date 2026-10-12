import { describe, expect, it } from 'vitest'
import { abrirPlanilha } from './xlsx'
import { criarXlsx, criarXlsxBruto } from './__fixtures__/xlsxFalso'

describe('xlsx', () => {
  it('lê texto, número e boolean por aba', async () => {
    const p = await abrirPlanilha(await criarXlsx({ A: { A1: 'Oi', B1: 2.5, C1: true, D1: false }, B: { A1: 'x' } }))
    expect(p.abas).toEqual(['A', 'B'])
    const c = await p.ler('A')
    expect(c.get('A1')).toBe('Oi')
    expect(c.get('B1')).toBe(2.5)
    expect(c.get('C1')).toBe(true)
    expect(c.get('D1')).toBe(false)
    expect((await p.ler('B')).get('A1')).toBe('x')
  })

  it('entende todos os tipos de célula e entidades', async () => {
    const sheet =
      '<sheetData><row r="1">' +
      '<c r="A1" t="s"><v>0</v></c><c r="B1" t="s"><v>1</v></c>' +
      '<c r="C1" t="str"><f>x</f><v>a &amp; b</v></c>' +
      '<c r="D1" t="inlineStr"><is><t>em &lt;linha&gt;</t></is></c>' +
      '<c r="E1" t="b"><v>1</v></c><c r="F1" t="b"><v>0</v></c>' +
      '<c r="G1" t="e"><v>#DIV/0!</v></c>' +
      '<c r="H1"><v>1.5E-1</v></c><c r="I1" s="3"/>' +
      '<c r="J1" t="str"><v>&quot;&apos;&#65;&#x42;</v></c></row></sheetData>'
    const sst = '<sst><si><t>Ab</t></si><si><r><t>Rich </t></r><r><rPr/><t>text</t></r></si></sst>'
    const c = await (await abrirPlanilha(await criarXlsxBruto({ 'M & 1': sheet }, sst))).ler('M & 1')
    expect(c.get('A1')).toBe('Ab')
    expect(c.get('B1')).toBe('Rich text')
    expect(c.get('C1')).toBe('a & b')
    expect(c.get('D1')).toBe('em <linha>')
    expect(c.get('E1')).toBe(true)
    expect(c.get('F1')).toBe(false)
    expect(c.get('G1')).toBeNull()
    expect(c.get('H1')).toBe(0.15)
    expect(c.has('I1')).toBe(false)
    expect(c.get('J1')).toBe('"\'AB')
  })

  it('nome de aba com entidade e aba inexistente', async () => {
    const p = await abrirPlanilha(await criarXlsx({ 'A&B': { A1: 1 } }))
    expect(p.abas).toEqual(['A&B'])
    await expect(p.ler('Z')).rejects.toThrow('não encontrada')
  })

  it('rejeita arquivo que não é xlsx', async () => {
    const msg = 'Este arquivo não é uma planilha do Excel (.xlsx).'
    await expect(abrirPlanilha(new TextEncoder().encode('isto é texto, não zip'))).rejects.toThrow(msg)
    await expect(abrirPlanilha(new Uint8Array(0))).rejects.toThrow(msg)
  })
})
