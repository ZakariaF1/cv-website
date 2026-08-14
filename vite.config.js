import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Lazy section chunks must not be modulepreloaded, or PageSpeed still
    // downloads them during the initial unused-JavaScript audit.
    modulePreload: false,
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    reporters: ['verbose', 'github-actions', 'junit'],
    outputFile: {
      junit: './test-results.xml',
    },
  },
})
