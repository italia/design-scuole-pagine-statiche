import { createServer } from 'vite';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// https://github.com/WebReflection/linkedom instead of JSDom for speed and zero dependencies (no native modules, no compilation)
import { parseHTML, DOMParser } from 'linkedom';
import fg from 'fast-glob';
import * as prettier from 'prettier';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../src');
const outDir = path.resolve(__dirname, '../statics');

async function generate() {
  console.log('Avvio generazione SSR...');

  const vite = await createServer({
    configFile: path.resolve(__dirname, '../vite.config.js'),
    base: '/', // Forza la base a root per l'output SSR
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

  const pages = fg.sync('**/*.html', {
    cwd: root,
    ignore: ['templates/**'], // <--- Questo dice a glob di saltare i frammenti
  });

  for (const page of pages) {
    // -----------------------------
    // CREATE FS PATHS
    //
    // Page will be something like "index.html" or "pages/servizio.html" or "pages/scuola/contatti.html"
    // 1. Define source and destination paths
    //    The destination will maintain the same structure under /statics (e.g., /statics/pages/servizio.html)
    // ------------------------------
    const htmlPath = path.resolve(root, page);
    const destPath = path.resolve(outDir, page); // Manterrà la stessa struttura in /statics
    const destDir = path.dirname(destPath);

    // 2. Create destination directory if it doesn't exist (e.g., /statics/pages/scuola/)
    await fs.mkdir(destDir, { recursive: true });

    let rawHtml = await fs.readFile(htmlPath, 'utf-8');

    rawHtml = await vite.transformIndexHtml(`/${page}`, rawHtml);

    // 3. Inject the HTML into a virtual DOM using linkedom and make it available globally for the page's script to manipulate during SSR rendering
    const { document, DocumentFragment } = parseHTML(rawHtml);
    global.document = document;
    global.DocumentFragment = DocumentFragment;
    global.DOMParser = DOMParser;

    try {
      // ----------------------------
      // SSR RENDERING
      //
      // Execute the page's main script to populate the DOM
      // using the same Vite server instance to ensure imports work correctly.
      //  We remove dev-kit-italia in the Vite plugin to avoid issues with SSR since it adds Shadow DOM and web components that may not be compatible with SSR.
      //  Refer to lit EXPERIMENTAL SSR support for more details: https://lit.dev/docs/ssr/overview/.
      //
      //  The page's script should be written in a way that it can run in SSR (e.g., no direct access to window, no side effects on import, etc.)
      //  This step is crucial: it allows us to leverage the same rendering logic we use for client-side hydration, ensuring consistency between SSR and CSR.
      //  If the page's script is not SSR-compatible, you may need to refactor it to separate the rendering logic from browser-specific code.
      //  For example, you can export a function that takes the document as an argument and populates it, and then call that function here after loading the module.
      // ----------------------------
      const scriptTags = Array.from(document.querySelectorAll('script[type="module"]'));
      const mainScript = scriptTags.find(
        (s) => s.getAttribute('src') && !s.getAttribute('src').includes('@vite/client')
      );

      if (mainScript) {
        const src = mainScript.getAttribute('src');
        const absoluteScriptPath = path.resolve(path.dirname(htmlPath), src);

        await vite.ssrLoadModule(absoluteScriptPath);
      }

      // ----------------------------
      //   Cleaning up the DOM for static export
      //   (removing templates, scripts, styles, data attributes)
      //
      //   We get here with all templates applied Server Side,
      //   so all web-components tags are rendered as regular HTML, and all data-tpl
      //   attributes are replaced with actual content.
      // ----------------------------

      // 1. Remove all <template> tags
      document.querySelectorAll('template').forEach((t) => t.remove());

      // 2. Remove all attributes that start with "data-tpl"
      //   Our convention for templates is to use things like data-tpl="key" and data-tpl-href="key" to mark where dynamic content should go.
      //   After SSR, these attributes have done their job and we can safely remove them to clean up the HTML.
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

      // 3. Remove all <script type="module"> and <link rel="stylesheet"> tags
      document.querySelectorAll('script[type="module"]').forEach((s) => s.remove());
      document.querySelectorAll('link[rel="stylesheet"]').forEach((l) => l.remove());

      // 4. Remove all href/src attributes that point to JS/CSS/HTML files (since those assets won't be needed in the static export)
      document.querySelectorAll('a[href], link[href], script[src]').forEach((el) => {
        ['href', 'src'].forEach((attr) => {
          const val = el.getAttribute(attr);
          if (val && (val.endsWith('.js') || val.endsWith('.css') || val.endsWith('.html'))) {
            el.setAttribute(attr, '#');
          }
        });
      });

      // ----------------------------
      //   Format and write output
      // ----------------------------

      const unformattedHtml = document.toString();

      // Use prettier to format the HTML output for better readability.
      const formattedHtml = await prettier.format(unformattedHtml, {
        parser: 'html',
        printWidth: 120,
        tabWidth: 2,
        useTabs: false,
        singleAttributePerLine: false,
      });

      await fs.writeFile(destPath, formattedHtml);
      console.log(`✅ Renderizzato in struttura: ${page}`);
    } catch (e) {
      console.error(`❌ Errore durante il render su ${page}:`, e.message);
    }
  }

  setTimeout(async () => {
    await vite.close();
    console.log('🎉 Generazione SSR completata nella cartella /dist-ssr');
  }, 500);
}

generate();
