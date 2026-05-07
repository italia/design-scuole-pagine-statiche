# Modelli scuole

Italian school statics website templates. Vite + TypeScript + Bootstrap Italia + `@italia/dev-kit-italia` web components. No framework. Output is static HTML generated via `pnpm build:ssr`.

## START HERE

```bash
pnpm run lint          # must be clean before you touch anything
grep -r "data-tpl" src/templates/   # refresh pattern memory
```

Deep docs: `docs/02-come-si-usa.md`, `docs/03-come-si-sviluppa.md`, `docs/06-template-system.md`.

## File locations — where things live

| What                       | Where                                        |
| -------------------------- | -------------------------------------------- |
| Page shell HTML            | `src/pages/<page>.html`                      |
| Page logic + data          | `src/js/pages/<page>/index.ts` + `data.json` |
| Layout templates           | `src/templates/layout/`                      |
| Page-section templates     | `src/templates/<page>/`                      |
| Card templates             | `src/templates/cards/`                       |
| Static assets (icons, SVG) | `src/public/` → copied verbatim to `dist/`   |
| Card types registry        | `src/js/types/data.ts`                       |
| Card render engine         | `src/js/engines/cards.ts`                    |

---

## Template attribute rules — never violate

| Goal             | Use                                                                                          | Never use                                   |
| ---------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------- |
| Inject text      | `data-tpl="key"`                                                                             | `{{ }}`, hardcoded school-specific text     |
| Inject attribute | `data-tpl-href="key"`, `data-tpl-src="key"`, `data-tpl-alt="key"`, `data-tpl-datetime="key"` | `href="#"` as only binding, hardcoded attrs |
| Card slot        | `data-cards` / `data-cards="name"`                                                           | `data-tpl="data-cards"`, `data-slot`        |
| Styles           | `<style>` block inside `<template>`                                                          | `style=""` inline, `main.css`               |

`render()` **strips all `data-tpl*` attrs** after filling — they never reach the final DOM. Always keep a fallback value (`href="#"`, `alt=""`) alongside a `data-tpl-*` so elements degrade gracefully when data is absent.

`data-tpl` on an element with child elements sets **text only** — child elements are preserved.

## Page shell rules

```html
<body>
  <div id="site-preheader"></div>
  <header id="main-header" class="bg-white"></header>
  <!-- persistent landmark -->
  <main id="main-content">
    <div id="hero"></div>
    <!-- placeholder: replaced by mount() -->
    <div id="my-section"></div>
  </main>
  <div id="footer"></div>
  <script type="module" src="../js/pages/<page>/index.ts"></script>
</body>
```

## Mount pattern (all other sections)

```ts
const myFrag = render(templates.mySection, data.mySection);
myFrag.querySelector('[data-cards]')?.appendChild(renderCards(data.mySection.cards));
mount('my-section', myFrag); // replaceWith — div#my-section is gone after this
```

## Adding a new card type

1. `src/templates/cards/card-<name>.html`
2. Add `'<name>'` to `CARD_TYPES` in `src/js/types/data.ts`
3. Import + register in `src/js/engines/cards.ts` → `templates` map
4. All card-specific data transformation → `cardToRenderData()` in `cards.ts`, nowhere else

**Reuse this pattern when you need to create another web-component rendering engine.**

## Before every commit

```bash
pnpm run lint && pnpm run build
```

Build output check (`statics/pages/<page>.html`): no `data-tpl*` attrs, no `style=""`, no nested landmarks, all sections populated with JSON data.
