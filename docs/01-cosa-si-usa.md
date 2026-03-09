# Cosa si usa

## Obiettivo

Usare un setup semplice e adatto a profili junior per creare pagine statiche del modello Comuni.

## Stack

- HTML statico (una pagina = un file `.html` in `pages/`)
- JavaScript separato (`js/main.js` + `js/pages/*`)
- Vite come dev server e build tool multipagina
- Dev Kit Italia (`@italia/dev-kit-italia`) per i Web Components
- GitHub Actions per CI e deploy su Pages

## Perché questa scelta

- niente Handlebars/webpack da imparare
- avvio rapido locale
- output finale statico e pubblicabile facilmente
