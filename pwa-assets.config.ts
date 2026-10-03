import { defineConfig, minimal2023Preset } from '@vite-pwa/assets-generator/config'
import { readFileSync } from 'node:fs'

// Marca pelo ambiente (MARCA=gislane npm run icones:gislane); sem ele, vfit. Os PNGs saem ao lado do icon.svg da marca.
const id = process.env.MARCA ?? 'vfit'
const fundo = { resizeOptions: { background: JSON.parse(readFileSync(`marcas/${id}/marca.json`, 'utf8')).iconeFundo } }

export default defineConfig({
  preset: {
    ...minimal2023Preset,
    maskable: { ...minimal2023Preset.maskable, ...fundo },
    apple: { ...minimal2023Preset.apple, ...fundo },
  },
  images: [`marcas/${id}/public/icon.svg`],
})
