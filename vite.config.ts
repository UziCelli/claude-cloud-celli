/// <reference types="vitest/config" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import { readFileSync } from 'node:fs';

// Mesma CSP do Hosting (firebase.json é a fonte única; lá o regex pula /__/, as páginas do próprio Firebase, como a de criar senha). Só o e2e libera os hosts do emulador.
const headers = JSON.parse(readFileSync('firebase.json', 'utf8')).hosting.headers.find((h: { headers: { key: string }[] }) => h.headers.some((x) => x.key === 'Content-Security-Policy')).headers;
const previewHeaders = Object.fromEntries(
  headers.map((h: { key: string; value: string }) => [
    h.key,
    h.key === 'Content-Security-Policy' && process.env.VITE_USE_EMULATOR
      ? h.value.replace('connect-src', 'connect-src http://127.0.0.1:* ws://127.0.0.1:*')
      : h.value,
  ]),
);

const versao = new Date().toISOString().slice(0, 16).replace('T', ' ');

export default defineConfig({
  define: { __VERSAO__: JSON.stringify(versao) },
  preview: { headers: previewHeaders },
  plugins: [
    react(),
    // versao.json: a tela de login compara com __VERSAO__ e recarrega abas antigas (src/lib/atualizar.ts).
    {
      name: 'versao',
      generateBundle() {
        this.emitFile({ type: 'asset', fileName: 'versao.json', source: JSON.stringify({ versao }) });
      },
    },
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        id: '/',
        name: 'VFITCOACH — Treino',
        short_name: 'VFITCOACH',
        lang: 'pt-BR',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        background_color: '#0A1424',
        theme_color: '#0B1E3D',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        importScripts: ['sw-push.js'], // notificação de fim do descanso (push)
        globPatterns: ['**/*.{js,css,html,svg,png,ico,json,woff2}'],
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/^\/\.well-known\//],
      },
    }),
  ],
  test: {
    environment: 'node',
    include: ['src/**/*.test.{ts,tsx}', 'push/src/**/*.test.ts'],
  },
});
