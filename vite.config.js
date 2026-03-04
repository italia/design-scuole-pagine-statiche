import { resolve, basename } from 'node:path'
import { defineConfig } from 'vite'
import fg from 'fast-glob'

// Collect all HTML files under `pages/` and use them as rollup inputs
const pages = fg.sync('pages/*.html')
const input = Object.fromEntries(
  pages.map(p => [basename(p, '.html'), resolve(__dirname, p)])
)

export default defineConfig({
  build: {
    rollupOptions: {
      input
    }
  }
})
