# CI & GitHub Pages — Quick Setup for this repo

This repo (fork) uses GitHub Actions to build and publish previews and the main site.

Essentials
- Repo that should run Actions: `RedTurtle/design-scuole-pagine-statiche` (workflows guard on repository name).
- Previews: pushed branches run `preview-deploy.yml` and publish to `gh-pages/previews/<branch>/`.
- Production: `deploy-gh-pages.yml` publishes `dist/` to GitHub Pages when `main` is pushed.
- Cleanup: `cleanup-previews.yml` removes `previews/<branch>/` from `gh-pages` when the PR is merged.

What to enable in GitHub settings
1. Settings → Actions
   - Ensure Actions are enabled for your fork (Allow all actions or allow local only).
2. Settings → Pages
   - Source: use GitHub Actions (the workflows publish to `gh-pages` branch).

How previews work (PR workflow)
- When you push a branch to the fork, the `preview-deploy.yml` workflow runs (only in `RedTurtle/...`).
- It builds the site (`pnpm build`) and publishes `dist/` under `gh-pages/previews/<branch>/`.
- The workflow comments the PR with the preview URL — paste it in the upstream PR description if needed.
- When the PR is merged, `cleanup-previews.yml` removes that preview directory.

Local testing
```bash
pnpm install
pnpm build
pnpm preview
# open http://localhost:5173/index.html
```

Security notes
- All workflows are guarded to run only if `github.repository == 'RedTurtle/design-scuole-pagine-statiche'`.
- We do not push changes to the upstream `italia/...` repository.
- Secrets are not exposed to upstream PRs; workflows run in the context of the fork.

If you want changes to the trigger rules (e.g. restrict which branch prefixes create previews), tell me and I'll update `preview-deploy.yml` accordingly.
