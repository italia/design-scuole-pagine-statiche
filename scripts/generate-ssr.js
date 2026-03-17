import { createServer } from 'vite';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseHTML, DOMParser } from 'linkedom';
import fg from 'fast-glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../src');
const outDir = path.resolve(__dirname, '../statics');

async function generate() {
  console.log('Avvio generazione SSR...');

  const vite = await createServer({
    configFile: path.resolve(__dirname, '../vite.config.js'),
    server: {
      middlewareMode: true,
      hmr: false,
    },
    appType: 'custom',
    plugins: [
      {
        name: 'erase-devkit-in-ssr',
        transform(code, id) {
          if (code.includes('@italia/dev-kit-italia')) {
            let cleanCode = code.replace(/import\s+['"]@italia\/dev-kit-italia.*?['"];?/g, '');
            cleanCode = cleanCode.replace(
              /import\s+.*?from\s+['"]@italia\/dev-kit-italia.*?['"];?/g,
              ''
            );
            return cleanCode;
          }
        },
      },
    ],
  });

  await fs.rm(outDir, { recursive: true, force: true });
  await fs.mkdir(outDir, { recursive: true });

  const pages = fg.sync('pages/*.html', { cwd: root });

  for (const page of pages) {
    const pageName = path.basename(page, '.html');
    const htmlPath = path.resolve(root, page);

    let rawHtml = await fs.readFile(htmlPath, 'utf-8');

    rawHtml = await vite.transformIndexHtml(`/${page}`, rawHtml);

    const { document, DocumentFragment } = parseHTML(rawHtml);
    global.document = document;
    global.DocumentFragment = DocumentFragment;
    global.DOMParser = DOMParser;

    try {
      const scriptTags = Array.from(document.querySelectorAll('script[type="module"]'));
      const mainScript = scriptTags.find(
        (s) => s.getAttribute('src') && !s.getAttribute('src').includes('@vite/client')
      );

      if (mainScript) {
        const src = mainScript.getAttribute('src');
        const absoluteScriptPath = path.resolve(path.dirname(htmlPath), src);

        await vite.ssrLoadModule(absoluteScriptPath);
      }

      // --- FASE DI PULIZIA DOM ---

      // 1. Rimuoviamo i tag <template>
      document.querySelectorAll('template').forEach((t) => t.remove());

      // 2. Sterminiamo tutti gli attributi che iniziano per "data-tpl"
      document.querySelectorAll('*').forEach((el) => {
        if (!el.attributes) return;

        // Cicliamo al contrario per evitare problemi mentre rimuoviamo gli attributi
        for (let i = el.attributes.length - 1; i >= 0; i--) {
          const attrName = el.attributes[i].name;
          if (attrName.startsWith('data-tpl')) {
            el.removeAttribute(attrName);
          }
        }
      });

      // ----------------------------

      await fs.writeFile(path.resolve(outDir, `${pageName}.html`), document.toString());
      console.log(`✅ Renderizzato: ${pageName}.html`);
    } catch (e) {
      console.error(`❌ Errore durante il render di ${pageName}:`, e.message);
    }
  }

  setTimeout(async () => {
    await vite.close();
    console.log('🎉 Generazione SSR completata nella cartella /dist-ssr');
  }, 500);
}

generate();
