# Come si usa

## Prerequisiti

- Node.js 24 (gestito con `nvm`)
- pnpm 10+

## Primo avvio

```bash
nvm use
pnpm install
pnpm dev
```

Il dev server si apre su `http://localhost:5173` con la pagina indice.

## Comandi utili

```bash
pnpm run typecheck      # verifica i tipi TypeScript
pnpm run lint:js        # valida il TypeScript (src/js/**/*.ts)
pnpm run lint:ts        # valida tutti i file TypeScript (src/**/*.ts)
pnpm run lint:html      # valida gli HTML
pnpm run lint:css       # linta il CSS
pnpm run lint           # esegue tutti i linter
pnpm run format:check   # controlla la formattazione con Prettier
pnpm run build          # build di produzione in dist/
pnpm run build:ssr      # genera pagine HTML static pre-renderizzate
pnpm run preview        # anteprima del build
```

## Struttura sorgente

```
src/
├── index.html            # pagina indice con link alle pagine
├── pages/
│   ├── index.html        # pagina di test rapida
│   └── servizio.html     # esempio pagina servizio
├── js/
│   ├── main.ts           # import CSS/font/componenti Dev Kit
│   ├── types/            # definizioni di tipo TypeScript
│   ├── utils/            # utility functions (templates.ts, etc.)
│   ├── engines/          # engine specializzati (cards.ts, etc.)
│   └── pages/
│       ├── index.ts      # TypeScript specifico per index
│       ├── index.json    # dati JSON per la pagina
│       └── servizio.ts   # TypeScript specifico per servizio
└── styles/
    └── main.css          # stili del progetto
```

## Output build

```
dist/
├── index.html            # pagina indice
├── pages/                # pagine HTML con path asset corretti
└── assets/               # JS, CSS e font bundlati
```
