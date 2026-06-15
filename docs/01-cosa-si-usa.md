# Cosa si usa

## Obiettivo

Setup semplice e adatto a profili junior per creare pagine statiche del modello Scuole.

## Stack

- HTML statico (una pagina = un file `.html` in `src/pages/`)
- JavaScript separato (`src/js/main.js` + `src/js/pages/*`)
- CSS in `src/styles/`
- Vite come dev server e build tool multipagina
- Dev Kit Italia (`@italia/dev-kit-italia`) per i Web Components
- GitHub Actions per CI e deploy su Pages

## Perché questa scelta

- niente Handlebars/webpack da imparare
- avvio rapido locale
- output finale statico e pubblicabile facilmente su GitHub Pages
