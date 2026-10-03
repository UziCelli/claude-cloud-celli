import { expect, test } from 'vitest'
import vfit from '../../marcas/vfit/marca.json'
import gislane from '../../marcas/gislane/marca.json'

// O tsc só confere @marca contra a vfit: todo campo lido de marca.json precisa existir nas duas marcas.
const chaves = (o: object): string[] =>
  Object.entries(o)
    .flatMap(([k, v]) => (v && typeof v === 'object' ? chaves(v).map((c) => `${k}.${c}`) : [k]))
    .sort()

test('as marcas têm os mesmos campos', () => {
  expect(chaves(gislane)).toEqual(chaves(vfit))
})
