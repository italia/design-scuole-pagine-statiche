# Cosa si usa

## Obiettivo

Setup semplice e adatto a profili junior per creare pagine statiche del modello Scuole.

## Stack

- HTML statico (una pagina = un file `.html` in `src/pages/`)
- TypeScript (`src/js/main.ts` + `src/js/pages/*`) — type-safe dalla compilazione
- CSS in `src/styles/`
- Vite come dev server e build tool multipagina
- Dev Kit Italia (`@italia/dev-kit-italia`) per i Web Components
- GitHub Actions per CI e deploy su Pages
- ESLint + Prettier per code quality

## Perché questa scelta

- niente Handlebars/webpack da imparare
- avvio rapido locale
- output finale statico e pubblicabile facilmente su GitHub Pages
