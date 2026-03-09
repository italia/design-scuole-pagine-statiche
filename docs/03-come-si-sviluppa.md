# Come si sviluppa

## Flusso consigliato

1. Crea un branch da `main`.
2. Modifica i file HTML in `pages/` e il JS in `js/pages/`.
3. Verifica in locale (`pnpm dev`, `pnpm run lint:html`, `pnpm run build`).
4. Apri Pull Request.

## Regole pratiche per mantenere semplicità

- una pagina per file
- niente templating lato build
- JS separato per pagina
- naming chiaro dei file (`home.html`, `servizio-x.html`, ecc.)

## Strategia di migrazione

- partire da pagine prioritarie
- creare versione HTML base
- sostituire blocchi UI con Web Components Dev Kit
- validare visualmente e con lint HTML
