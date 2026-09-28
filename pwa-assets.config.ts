import { defineConfig } from '@vite-pwa/assets-generator/config'
import { minimal2023Preset } from '@vite-pwa/assets-generator/presets'

export default defineConfig({
  preset: minimal2023Preset,
  images: ['public/icon.svg'],
})
