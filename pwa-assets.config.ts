import { defineConfig, minimal2023Preset } from '@vite-pwa/assets-generator/config'

const fundo = { resizeOptions: { background: '#0B1E3D' } }

export default defineConfig({
  preset: {
    ...minimal2023Preset,
    maskable: { ...minimal2023Preset.maskable, ...fundo },
    apple: { ...minimal2023Preset.apple, ...fundo },
  },
  images: ['public/icon.svg'],
})
