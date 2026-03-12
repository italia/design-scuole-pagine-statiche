# Come si sviluppa

## Flusso consigliato

1. Crea un branch da `main`.
2. Modifica i file HTML in `src/pages/` e il JS in `src/js/pages/`.
3. Verifica in locale (`pnpm dev`, `pnpm run lint:html`, `pnpm run build`).
4. Apri Pull Request — parte automaticamente la preview del branch.
5. Fai merge su `main`.

## Aggiungere una nuova pagina

1. Crea `src/pages/nuova-pagina.html` — Vite la raccoglie automaticamente come entry point.
2. Crea `src/js/pages/nuova-pagina.js` con almeno:
   ```js
   import '../main.js';
   ```
3. Aggiungi il `<script>` nell'HTML:
   ```html
   <script type="module" src="../js/pages/nuova-pagina.js"></script>
   ```
4. Aggiungi il link in `src/index.html`.

## Regole pratiche

- una pagina per file
- JS separato per pagina
- naming chiaro dei file (`home.html`, `servizio-x.html`, ecc.)
- non modificare `dist/` a mano — è generato dal build

## Strategia di migrazione dal repo storico

- partire dalle pagine prioritarie
- creare versione HTML base
- sostituire blocchi UI con Web Components Dev Kit
- validare visivamente e con lint HTML
