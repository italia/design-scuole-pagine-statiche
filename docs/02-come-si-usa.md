# Come si usa

## Prerequisiti

- Node.js 24 (gestito con `nvm`)
- pnpm 10+

## Comandi principali

```bash
nvm use
pnpm install
pnpm dev
```

Comandi utili:

```bash
pnpm run lint:html
pnpm run build
pnpm run preview
```

## Struttura minima

- `pages/index.html`: pagina di test rapida
- `pages/servizio.html`: esempio pagina servizio
- `js/main.js`: import di CSS/font/componenti del Dev Kit
- `js/pages/*.js`: JavaScript specifico per pagina
