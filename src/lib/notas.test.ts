import { describe, expect, it } from 'vitest'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { textoNota } from './notas'

describe('anotações recebidas do banco', () => {
  it('ignora objetos e outros valores que quebrariam a tela do coach', () => {
    for (const valor of [{ inesperado: true }, ['texto'], null, undefined, 1, true]) {
      expect(textoNota(valor)).toBe('')
      expect(() => renderToString(createElement('p', null, textoNota(valor)))).not.toThrow()
    }
  })
  it('mantém texto válido e limita ao tamanho do editor', () => {
    expect(textoNota('Banco 3')).toBe('Banco 3')
    expect(textoNota('x'.repeat(10000))).toHaveLength(300)
  })
})
