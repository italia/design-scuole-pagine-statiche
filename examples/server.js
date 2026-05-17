import express from 'express';
import { createServer } from 'vite';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseHTML, DOMParser, NodeFilter } from 'linkedom';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const examplesDir = __dirname;

/**
 * Rendering SSR per la cartella examples
 */
async function renderPage(filename, viteInstance) {
  const htmlFilePath = path.join(examplesDir, filename);

  // 1. Lettura e trasformazione Vite (per risolvere i path relativi verso ../src)
  let rawHtml = await fs.readFile(htmlFilePath, 'utf-8');
  rawHtml = await viteInstance.transformIndexHtml(`/examples/${filename}`, rawHtml);

  // 2. DOM Virtuale
  const { document, DocumentFragment } = parseHTML(rawHtml);

  // Ambiente globale per lo script starwars.js
  global.document = document;
  global.DocumentFragment = DocumentFragment;
  global.DOMParser = DOMParser;
  global.NodeFilter = NodeFilter;
  delete global.__SERIALIZED_STATE__;

  // 3. Esecuzione forzata di starwars.js (lo script che sta nella stessa cartella)
  const scriptPath = path.join(examplesDir, 'starwars.js');

  viteInstance.moduleGraph.invalidateAll();
  const pageModule = await viteInstance.ssrLoadModule(scriptPath);

  // Aspettiamo il fetch dei dati (Hydration State)
  if (pageModule?.ready) await pageModule.ready;

  const head = document.querySelector('head');

  // 4. Iniezione dello Stato (se popolato dallo script)
  if (head && global.__SERIALIZED_STATE__) {
    head.insertAdjacentHTML(
      'beforeend',
      `<script id="__SSR_STATE__" type="application/json">${JSON.stringify(
        global.__SERIALIZED_STATE__
      )}</script>`
    );
  }

  // 5. Cleanup (Template e data-tpl)
  document.querySelectorAll('template').forEach((t) => t.remove());

  const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_ELEMENT);
  let el;
  while ((el = walker.nextNode())) {
    const attrs = el.attributes;
    for (let i = attrs.length - 1; i >= 0; i--) {
      if (attrs[i].name.startsWith('data-tpl')) el.removeAttribute(attrs[i].name);
    }
  }

  // 6. Iniezione Asset Dev Kit (CDNs e Prefetch)
  if (head) {
    head.insertAdjacentHTML(
      'beforeend',
      `
      <link rel="preconnect" href="https://unpkg.com">
      <link rel="dns-prefetch" href="https://unpkg.com">
      <link rel="preload" href="https://unpkg.com/@italia/dev-kit-italia/dist/styles.css" as="style">
      <link rel="stylesheet" href="https://unpkg.com/@italia/dev-kit-italia/dist/fonts.css" />
      <link rel="stylesheet" href="https://unpkg.com/@italia/dev-kit-italia/dist/styles.css" />
      <script type="module" src="https://unpkg.com/@italia/dev-kit-italia/dist/elements.js"></script>
    `
    );
  }

  return document.toString();
}

async function startServer() {
  const app = express();

  const vite = await createServer({
    root,
    configFile: path.resolve(root, 'vite.config.js'),
    server: { middlewareMode: true, hmr: false },
    appType: 'custom',
    plugins: [
      {
        name: 'erase-devkit-in-ssr',
        transform(code) {
          if (code.includes('@italia/dev-kit-italia')) {
            return code.replace(
              /import\s+(['"]@italia\/dev-kit-italia.*?['"]|.*?from\s+['"]@italia\/dev-kit-italia.*?['"]);?/g,
              ''
            );
          }
        },
      },
    ],
  });

  app.use(vite.middlewares);
  // FIX: Espone i file JS/CSS della cartella examples al browser
  app.use(express.static(examplesDir));

  // Risponde solo a /example servendo starwars.html
  app.get('/example', async (req, res) => {
    try {
      const html = await renderPage('starwars.html', vite);
      res.set('Cache-Control', 'no-store'); // Per il test non vogliamo cache
      res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      res.status(500).send(e.message);
    }
  });

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Esempio Star Wars pronto su http://localhost:${PORT}/example`);
  });
}

startServer();
