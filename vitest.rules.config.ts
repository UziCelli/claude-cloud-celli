import { defineConfig } from 'vitest/config';

// Testes das regras do Firestore: precisam do emulador (npm run test:rules).
export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node',
  },
});
