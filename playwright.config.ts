import { defineConfig, devices } from '@playwright/test'

// MARCA=gislane roda o e2e no app da Gislane (mesmo código, outro --mode).
const marca = process.env.MARCA && process.env.MARCA !== 'vfit' ? ` --mode ${process.env.MARCA}` : ''

export default defineConfig({
  testDir: './e2e',
  timeout: 60_000,
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:5173',
    locale: 'pt-BR',
    viewport: { width: 1280, height: 800 },
    trace: 'retain-on-failure',
    launchOptions: {
      executablePath: process.env.PW_CHROMIUM || undefined,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: `npx vite build${marca} && npx vite preview --host 127.0.0.1 --port 5173 --strictPort`,
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: !process.env.CI,
    env: { VITE_USE_EMULATOR: '1' },
  },
})
