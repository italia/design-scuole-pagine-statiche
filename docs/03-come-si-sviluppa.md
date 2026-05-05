# Come si sviluppa

## Flusso consigliato

1. Crea un branch da `main`.
2. Modifica i file HTML in `src/pages/` e il JS in `src/js/pages/`.
3. Verifica in locale (`pnpm dev`, `pnpm run lint:html`, `pnpm run build`).
4. Apri Pull Request — parte automaticamente la preview del branch.
5. Fai merge su `main`.

## Aggiungere una nuova pagina

1. Crea `src/pages/nuova-pagina.html` — Vite la raccoglie automaticamente come entry point.
2. Crea `src/js/pages/nuova-pagina.ts` (TypeScript) con almeno:
   ```ts
   import '@/js/main';
   ```
3. Aggiungi il `<script>` nell'HTML:
   ```html
   <script type="module" src="../js/pages/nuova-pagina.ts"></script>
   ```
4. Aggiungi il link in `src/index.html`.
5. Valida i tipi prima di fare commit: `pnpm run typecheck`

## Regole pratiche

- una pagina per file HTML e un file TypeScript corrispondente
- naming chiaro dei file (`home.html`, `home.ts`, `servizio-x.html`, `servizio-x.ts`, ecc.)
- importazioni con alias `@/` per i file che vivono in `src/`
- usare type-safe rendering: evitare `any`, preferire `unknown` con type guards
- non modificare `dist/` a mano — è generato dal build
- eseguire `pnpm run lint` prima di aprire una PR

## Strategia di Rendering

Per permettere agli integratori di ricevere HTML statico già popolato ma privo di logica JS complessa, usiamo un sistema di data-binding basato su attributi data-tpl.

### Regole di popolamento (Templates)

Il motore di rendering utilizza un TreeWalker per scansionare il DOM in modo efficiente:

Testo: data-tpl="chiave" -> Inserisce il valore come textContent.

Attributi: data-tpl-[attr]="chiave" -> Inserisce il valore nell'attributo specificato.

Esempio: data-tpl-href="url" scriverà l'URL nel parametro href.

Usa questa semantica nei tuoi script per consistenza.

## Strategia di migrazione dal repo storico

- partire dalle pagine prioritarie
- creare versione HTML base
- sostituire blocchi UI con Web Components Dev Kit
- validare visivamente e con lint HTML
