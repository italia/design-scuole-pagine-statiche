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

```text
src/
├── pages/
│   ├── homepage.html     # shell HTML — solo landmark + <div id="..."> placeholder
│   └── servizio.html
├── js/
│   ├── main.ts           # import CSS/font/componenti Dev Kit
│   ├── types/            # definizioni di tipo TypeScript
│   ├── utils/            # utility functions (templates.ts)
│   ├── engines/          # engine specializzati (cards.ts)
│   └── pages/
│       ├── homepage/
│       │   ├── index.ts  # mount logic per homepage
│       │   └── data.json # dati JSON della pagina
│       └── servizio/
│           └── index.ts
├── templates/
│   ├── layout/           # header, footer, hero, breadcrumb, preheader
│   ├── homepage/         # sezioni specifiche homepage
│   ├── servizio/         # sezioni specifiche servizio
│   └── cards/            # card riutilizzabili
├── public/
│   ├── icons/            # SVG e icone (copiati verbatim in dist/)
│   └── illustrations/    # SVG illustrazioni
└── styles/
    └── main.css
```

## Output build

```text
dist/
├── pages/                # HTML con path asset corretti
├── icons/                # copiati da src/public/icons/
├── illustrations/        # copiati da src/public/illustrations/
└── assets/               # JS, CSS e font bundlati da Vite
```
