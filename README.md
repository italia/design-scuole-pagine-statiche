# Modelli Scuole New

Repository base per rifare i template dei Scuole in **HTML semplice + Vite**, integrando i Web Components di **Dev Kit Italia**.

## Avvio rapido

```bash
npm install
npm run dev
# Modelli Comuni New

Repository base per rifare i template dei Comuni in HTML semplice + Vite, integrando i Web Components di Dev Kit Italia.

## Avvio rapido

```bash
nvm use
pnpm install
pnpm dev
```

Il server apre automaticamente `pages/index.html`.

## Build

```bash
pnpm build
```

L'output statico è nella cartella `dist/`.

## Script compatibilità CI Scuole

```bash
pnpm run documentation-deploy-to-gh-pages
pnpm run release:zip
```

## Struttura filesystem

- `pages/`: pagine HTML statiche
- `js/main.js`: import globali del Dev Kit
- `js/pages/`: JS per-pagina
- `docs/`: documentazione operativa

## Documentazione

La documentazione operativa è in `docs/`.
