import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePrerenderPlugin({
      renderTarget: '#root',
      prerenderScript: path.join(rootDir, 'src/prerender.jsx'),
    }),
  ],
  build: {
    // Keep async chunks off the critical path if any appear (no modulepreload).
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
