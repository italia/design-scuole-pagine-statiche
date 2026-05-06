# Come si sviluppa

## Flusso consigliato

1. Crea un branch da `main`.
2. Modifica i file HTML in `src/pages/` e il JS in `src/js/pages/`.
3. Verifica in locale (`pnpm dev`, `pnpm run lint:html`, `pnpm run build`).
4. Apri Pull Request — parte automaticamente la preview del branch.
5. Fai merge su `main`.

## Aggiungere una nuova pagina

1. Crea `src/pages/nuova-pagina.html` — shell minimale con landmark e placeholder `<div id="...">`.
2. Crea la cartella `src/js/pages/nuova-pagina/` con `index.ts` e `data.json`.
3. `index.ts` inizia sempre con:

   ```ts
   import '@/js/main';
   import { render, renderList, fromHTML } from '@/js/utils/templates';
   ```

4. Aggiungi il `<script>` nell'HTML:

   ```html
   <script type="module" src="../js/pages/nuova-pagina/index.ts"></script>
   ```

5. Aggiungi il link in `src/index.html`.
6. Valida i tipi prima di fare commit: `pnpm run typecheck`

## Regole pratiche

- una pagina per file HTML e un file TypeScript corrispondente
- naming chiaro dei file (`home.html`, `home.ts`, `servizio-x.html`, `servizio-x.ts`, ecc.)
- importazioni con alias `@/` per i file che vivono in `src/`
- usare type-safe rendering: evitare `any`, preferire `unknown` con type guards
- non modificare `dist/` a mano — è generato dal build
- eseguire `pnpm run lint` prima di aprire una PR

## Strategia di migrazione dal repo storico

- partire dalle pagine prioritarie
- creare versione HTML base
- sostituire blocchi UI con Web Components Dev Kit
- validare visivamente e con lint HTML
