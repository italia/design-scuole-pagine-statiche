import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'pages/index.html'),
        servizio: resolve(__dirname, 'pages/servizio.html')
      }
    }
  }
})
