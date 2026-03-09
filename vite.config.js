import { resolve, basename } from 'node:path';
import { defineConfig } from 'vite';
import fg from 'fast-glob';

// base: './' makes every asset reference relative so the build works
// whether served at / or at /repo/previews/branch/.
const pages = fg.sync('pages/*.html');
const input = Object.fromEntries(pages.map((p) => [basename(p, '.html'), resolve(__dirname, p)]));

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: { input },
  },
});
