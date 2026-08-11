import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative paths keep the portfolio working on GitHub Pages, custom domains,
  // and preview links without requiring a repository-name-specific URL.
  base: './',
})
