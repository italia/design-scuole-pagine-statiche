# Actions GitHub

## Chi builda

Build e deploy vengono eseguiti da **GitHub Actions** su runner `ubuntu-latest`.
È GitHub (non una persona) che esegue i job quando parte un trigger.

## Workflow presenti

### 1) Lint (`.github/workflows/lint.yml`)

Eseguito su ogni **pull request**.

Fa:

- format check con Prettier
- lint HTML (`pnpm run lint:html`)
- lint JS (`pnpm run lint:js`)
- lint CSS (`pnpm run lint:css`)

### 2) Deploy Pages (`.github/workflows/pages.yml`)

Eseguito **manualmente** da GitHub (`workflow_dispatch`).

Fa:

- build del progetto
- upload artifact statico (`dist/`)
- deploy su GitHub Pages (environment `github-pages`)

### 3) Preview (`.github/workflows/preview.yml`)

Eseguito su ogni **pull request** (open, sync, close).

Fa:

- **deploy**: build + push di `dist/` in `previews/<branch>/` sulla branch `gh-pages`
- **commento PR**: posta o aggiorna un commento con l'URL della preview
- **cleanup**: alla chiusura della PR rimuove la cartella preview da `gh-pages`

### 4) CodeQL

Gestito dal **default setup** di GitHub (Settings → Code security → Code scanning).
Nessun file di workflow nel repo — gira automaticamente su push/PR su `main` e con schedule settimanale.

### 5) Generate release (`.github/workflows/publish-release.yml`)

Eseguito su tag `v2*`.

Fa:

- build e zip del progetto
- pubblicazione GitHub Release con allegato zip

## Note

- Il **deploy su Pages è manuale**: si lancia a mano da GitHub Actions quando si vuole pubblicare.
- Le **preview dei branch** sono automatiche su ogni PR e si trovano a `https://<org>.github.io/<repo>/previews/<branch>/`.
- La branch `gh-pages` viene gestita dai workflow — non modificarla a mano.
