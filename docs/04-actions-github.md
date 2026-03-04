# Actions GitHub

## Chi builda

Build e deploy vengono eseguiti da **GitHub Actions** su runner hosted `ubuntu-latest`.
In pratica, è GitHub (non una persona) che esegue i job quando parte un trigger.

## Workflow presenti

### 1) CI (`.github/workflows/ci.yml`)

Eseguito su `push` e `pull_request`.

Fa:

- setup Node da `.nvmrc` (Node 24)
- setup unificato tramite action locale `.github/actions/node_env_setup`
- install dipendenze (`pnpm install --frozen-lockfile`)
- lint HTML (`pnpm run lint:html`)
- build (`pnpm run build`)

### 2) Deploy Pages (`.github/workflows/pages.yml`)

Eseguito su push su branch `main`.

Fa:

- build progetto
- upload artifact statico (`dist`)
- deploy automatico su GitHub Pages

### 3) Generate new release (`.github/workflows/publish-release.yml`)

Compatibile con il flusso del repository `design-scuole-pagine-statiche`.

Fa:

- trigger su tag `v*`
- build del progetto
- generazione zip release (`dist/zip/*.zip`)
- pubblicazione GitHub Release
- pubblicazione documentazione su branch `gh-pages`

Nota: il trigger è impostato a `v2*` per allineamento al repo scuole.

### 4) Update documentation (`.github/workflows/update_docs.yml`)

Compatibile con il flusso del repository `design-scuole-pagine-statiche`.

Fa:

- trigger manuale (`workflow_dispatch`)
- build + deploy documentazione su `gh-pages`

## Modernizzazione e uniformità

Rispetto al flusso storico scuole, qui sono stati aggiunti:

- action composita riusabile per setup ambiente (`.github/actions/node_env_setup`)
- `permissions` espliciti per principio di minimo privilegio
- `concurrency` per evitare esecuzioni duplicate
- runtime aggiornato (`Node 24` + `pnpm`)

## Risultato

Il repo supporta sia il flusso CI moderno sia i workflow legacy-compatibili del repo scuole per agevolare un merge futuro plug-and-play.
