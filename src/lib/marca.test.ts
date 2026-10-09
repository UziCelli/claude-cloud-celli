import { readdirSync, readFileSync } from 'node:fs'
import { expect, test } from 'vitest'
import vfit from '../../marcas/vfit/marca.json'
import gislane from '../../marcas/gislane/marca.json'

// O tsc só confere @marca contra a vfit: todo campo lido de marca.json precisa existir nas duas marcas.
const chaves = (o: object): string[] =>
  Object.entries(o)
    .flatMap(([k, v]) => (v && typeof v === 'object' ? chaves(v).map((c) => `${k}.${c}`) : [k]))
    .sort()

// `pix` é opcional: marca sem ele não mostra a interface do Pix.
const semPix = (o: object) => chaves(o).filter((c) => !c.startsWith('pix.'))
test('as marcas têm os mesmos campos', () => {
  expect(semPix(gislane)).toEqual(semPix(vfit))
})

// O cartão do story (canvas) lê `cores` do marca.json: têm que bater com o tema.css.
const VARS = { s950: 'slate-950', s800: 'slate-800', s300: 'slate-300', m300: 'marca-300', m400: 'marca-400', m500: 'marca-500', m600: 'marca-600', m700: 'marca-700', m900: 'marca-900' }
test.each([['vfit', vfit], ['gislane', gislane]])('cores de %s batem com o tema.css', (id, m) => {
  const css = readFileSync(`marcas/${id}/tema.css`, 'utf8')
  for (const [k, v] of Object.entries(VARS)) {
    const hex = css.match(new RegExp(`--color-${v}:\\s*(#[0-9a-fA-F]+)`))?.[1].toLowerCase()
    expect(m.cores[k as keyof typeof VARS].toLowerCase(), k).toBe(hex)
  }
})

// Guarda: identidade de uma marca fixa no código quebra a outra marca.
const PROIBIDOS = ['vfitcoach', 'victor celli', '177235', '#0a1424', '#3f72a6', '#0b1e3d', '#5c93cc', '#7faedd', '#2c5c8f']
const arquivos = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = `${dir}/${e.name}`
    return e.isDirectory() ? arquivos(p) : /\.(ts|tsx)$/.test(e.name) && !/\.test\./.test(e.name) ? [p] : []
  })

test('src não tem identidade de marca fixa', () => {
  const achados = arquivos('src').flatMap((f) => {
    const t = readFileSync(f, 'utf8').toLowerCase()
    return PROIBIDOS.filter((x) => t.includes(x)).map((x) => `${f}: "${x}"`)
  })
  expect(achados, 'Leia de @marca/marca.json (nome, responsável, cores), não fixe no código').toEqual([])
})
