import { resolve, basename } from 'node:path';
import { defineConfig } from 'vite';
import fg from 'fast-glob';

const root = resolve(__dirname, 'src');
const pages = fg.sync('pages/*.html', { cwd: root });
const input = {
  // root redirect (key must not clash with page names)
  root: resolve(root, 'index.html'),
  // one entry per page
  ...Object.fromEntries(pages.map((p) => [basename(p, '.html'), resolve(root, p)])),
};

export default defineConfig({
  root,
  base: '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: { input },
  },
});
