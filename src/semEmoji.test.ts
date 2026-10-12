import { describe, expect, it } from 'vitest'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'

const RAIZ = resolve(__dirname)
const PROIBIDO = /[\p{Extended_Pictographic}ⓘ↻▾▸️]/u

function arquivos(dir: string): string[] {
  return readdirSync(dir).flatMap((nome) => {
    const caminho = join(dir, nome)
    if (statSync(caminho).isDirectory()) {
      return nome === 'prototipo' ? [] : arquivos(caminho)
    }
    if (/\.test\.tsx?$/.test(nome)) return []
    return /\.(ts|tsx|css|json)$/.test(nome) ? [caminho] : []
  })
}

describe('sem emoji no código', () => {
  it('nenhum arquivo de src/ usa emoji ou símbolo de teclado (use src/icones.tsx)', () => {
    const achados: string[] = []
    for (const arq of arquivos(RAIZ)) {
      readFileSync(arq, 'utf8').split('\n').forEach((linha, i) => {
        if (PROIBIDO.test(linha)) {
          achados.push(`${relative(RAIZ, arq)}:${i + 1}: ${linha.trim()}`)
        }
      })
    }
    expect(achados, `Emoji encontrado:\n${achados.join('\n')}`).toEqual([])
  })
})
