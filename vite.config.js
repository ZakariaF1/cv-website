import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Keep deferred route chunks off the critical path (no modulepreload).
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
