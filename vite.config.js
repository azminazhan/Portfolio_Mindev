import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = fileURLToPath(new URL('.', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative paths keep the portfolio working on GitHub Pages, custom domains,
  // and preview links without requiring a repository-name-specific URL.
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(projectRoot, 'index.html'),
        admin: resolve(projectRoot, 'admin/index.html'),
      },
    },
  },
})
