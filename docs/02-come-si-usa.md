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
pnpm run lint:html      # valida gli HTML
pnpm run lint:js        # linta il JS
pnpm run lint:css       # linta il CSS
pnpm run format:check   # controlla la formattazione con Prettier
pnpm run build          # build di produzione in dist/
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
│   ├── main.js           # import CSS/font/componenti Dev Kit
│   └── pages/
│       ├── index.js      # JS specifico per index
│       └── servizio.js   # JS specifico per servizio
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
