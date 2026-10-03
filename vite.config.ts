/// <reference types="vitest/config" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, sep } from 'node:path';
import type { Plugin } from 'vite';

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

const TIPOS: Record<string, string> = { '.png': 'image/png', '.ico': 'image/x-icon', '.svg': 'image/svg+xml', '.json': 'application/json' };
const arquivos = (dir: string, base = ''): string[] =>
  readdirSync(dir).flatMap((n) => (statSync(join(dir, n)).isDirectory() ? arquivos(join(dir, n), `${base}${n}/`) : [`${base}${n}`]));

// Ícones, favicon e assetlinks são da marca (marcas/<id>/public); o resto de public/ é comum.
// Dev: serve direto. Build: emite no bundle, assim entram no precache do service worker.
const publicDaMarca = (dir: string): Plugin => ({
  name: 'public-da-marca',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const f = join(dir, decodeURIComponent((req.url ?? '').split('?')[0]));
      if (!f.startsWith(dir + sep) ||!existsSync(f) || !statSync(f).isFile()) return next();
      res.setHeader('Content-Type', TIPOS[f.slice(f.lastIndexOf('.'))] ?? 'application/octet-stream');
      res.end(readFileSync(f));
    });
  },
  generateBundle() {
    for (const n of arquivos(dir)) this.emitFile({ type: 'asset', fileName: n, source: readFileSync(join(dir, n)) });
  },
});

// Marca = --mode (se existir marcas/<mode>); sem ele, vfit. `npm run build` e `npm run dev` continuam VFITCOACH.
export default defineConfig(({ mode, command }) => {
// Dev (serve) usa SEMPRE os emuladores, mesmo com .env.gislane/.env.production presentes. Build não é afetado.
if (command === 'serve') process.env.VITE_USE_EMULATOR = '1';
const id = existsSync(`marcas/${mode}`) ? mode : 'vfit';
const marca = JSON.parse(readFileSync(`marcas/${id}/marca.json`, 'utf8'));
return {
  define: { __VERSAO__: JSON.stringify(versao) },
  resolve: { alias: { '@marca': resolve(`marcas/${id}`) } },
  preview: { headers: previewHeaders },
  plugins: [
    react(),
    publicDaMarca(resolve(`marcas/${id}/public`)),
    // index.html: %MARCA_X% vem do marca.json.
    {
      name: 'html-da-marca',
      transformIndexHtml: (html) =>
        html
          .replaceAll('%MARCA_TITULO%', marca.titulo)
          .replaceAll('%MARCA_NOME_CURTO%', marca.nomeCurto)
          .replaceAll('%MARCA_THEME%', marca.themeColor),
    },
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
        name: marca.titulo,
        short_name: marca.nomeCurto,
        lang: 'pt-BR',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        background_color: marca.backgroundColor,
        theme_color: marca.themeColor,
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
};
});
