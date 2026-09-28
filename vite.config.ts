/// <reference types="vitest/config" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Força — Treino',
        short_name: 'Força',
        lang: 'pt-BR',
        display: 'standalone',
        start_url: '/',
        background_color: '#0b0b0f',
        theme_color: '#0b0b0f',
        icons: [
          {
            src: '/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,json}'],
      },
    }),
  ],
  test: {
    environment: 'node',
  },
});
