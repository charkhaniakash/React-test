import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: true,
    // JSON reporter outputs test results to a file (replaces --json flag)
    reporters: ['default', 'json'],
    outputFile: {
      json: './test-results.json',
    },
    // Ensure Vitest exits cleanly after tests (replaces --forceExit flag)
    teardownTimeout: 5000,
    pool: 'forks',
  },
})
