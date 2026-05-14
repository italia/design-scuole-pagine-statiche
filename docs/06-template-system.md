# Sistema di template

Ogni elemento riutilizzabile di una pagina (header, footer, card, sezioni) è definito
come un elemento [`<template>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)
in un file HTML separato nella cartella `src/templates/`.

Non si usa nessuna libreria di templating esterna: è HTML e JavaScript standard,
bundlato da Vite.

## Struttura

```text
src/
├── templates/
│   ├── layout/               # header, footer, hero, breadcrumb, preheader
│   ├── homepage/             # sezioni specifiche della homepage
│   ├── servizio/             # sezioni specifiche della pagina servizio
│   └── cards/                # card riutilizzabili (una per CardType)
└── js/
    ├── utils/
    │   └── templates.ts      # fromHTML, render, renderList
    ├── engines/
    │   └── cards.ts          # renderCards + cardToRenderData (adapter)
    └── types/
        └── data.ts           # CardType, isCardType, TemplateData
```

## Come funziona un template

Ogni file in `src/templates/` contiene un unico elemento `<template>`.
Vite lo importa come stringa (`?raw`) a build time — zero fetch a runtime.

### Slot di testo — `data-tpl`

```html
<!-- src/templates/hero.html -->
<template>
  <section class="hero">
    <h1 data-tpl="titolo"></h1>
    <p data-tpl="descrizione"></p>
  </section>
</template>
```

```js
render(tpl.hero, {
  titolo: 'Servizi',
  descrizione: 'I servizi della scuola.',
});
```

### Slot attributi — `data-tpl-href`

```html
<!-- src/templates/service-card.html -->
<template>
  <article class="service-card">
    <a data-tpl-href="url">
      <strong data-tpl="titolo"></strong>
      <p data-tpl="descrizione"></p>
    </a>
  </article>
</template>
```

### Liste — `renderList`

```ts
const cards: readonly unknown[] = [
  { titolo: 'Iscrizioni', descrizione: '...', url: '#' },
  { titolo: 'Pagamenti', descrizione: '...', url: '#' },
];

// riempie il container con una card per ogni elemento dell'array
contenitore.append(renderList(tpl.serviceCard, cards));
```

### Slot condizionali — `data-tpl-if` / `data-tpl-if-not`

Usa questi attributi per includere o escludere un elemento (e il suo intero sotto-albero)
in base a un valore nei dati.

| Attributo               | Comportamento                                                                         |
| ----------------------- | ------------------------------------------------------------------------------------- |
| `data-tpl-if="key"`     | Elemento rimosso se `data[key]` è **falsy** (`undefined`, `null`, `false`, `0`, `""`) |
| `data-tpl-if-not="key"` | Elemento rimosso se `data[key]` è **truthy**                                          |

```html
<template>
  <div class="card">
    <p data-tpl="titolo"></p>
    <!-- mostrato solo se data.badge è truthy -->
    <span data-tpl-if="badge" data-tpl="badge" class="badge"></span>
    <!-- mostrato solo se data.badge è falsy -->
    <span data-tpl-if-not="badge" class="no-badge">Nessun badge</span>
  </div>
</template>
```

I due attributi vengono rimossi dal DOM dopo la valutazione (come tutti gli altri `data-tpl*`).
Possono coesistere con altri slot sullo stesso elemento (es. `data-tpl-if` + `data-tpl-href`):
se la condizione è falsa l'elemento viene rimosso prima che gli altri slot vengano elaborati.

### Template con container per lista — `data-cards`

Il template `service-section.html` contiene un `<div data-cards>` che serve
come punto di iniezione per le card. Il TypeScript lo trova e ci inietta la lista:

```ts
const sectionFrag = render(tpl.serviceSection, { titolo: sezione.titolo });
const cardsContainer = sectionFrag.querySelector('[data-cards]');
if (cardsContainer) {
  cardsContainer.append(renderList(tpl.serviceCard, sezione.cards));
}
rootSections.append(sectionFrag);
```

## Aggiungere una nuova pagina con template

1. Crea `src/pages/mia-pagina.html` (shell minimale — solo `<div id="root-*">`).
2. Crea `src/js/pages/mia-pagina.ts` (TypeScript).
3. Importa i template e le utility type-safe:
   ```ts
   import { render, renderList, fromHTML } from '@/js/utils/templates';
   import heroHTML from '@/templates/hero.html?raw';
   const tpl = { hero: fromHTML(heroHTML) };
   ```
4. Definisci i dati (utilizzando `Record<string, unknown>` per i dati dinamici) e chiama `render()` / `renderList()`.
5. Aggiungi il link in `src/index.html`.
6. Esegui `pnpm run typecheck` prima di fare commit.

## Aggiungere un nuovo template

1. Crea `src/templates/mio-template.html`:
   ```html
   <template>
     <div class="mio-componente">
       <h3 data-tpl="titolo"></h3>
       <a data-tpl-href="url" data-tpl="etichetta"></a>
     </div>
   </template>
   ```
2. Importalo nel TypeScript della pagina:
   ```ts
   import mioHTML from '@/templates/mio-template.html?raw';
   const tpl = { mio: fromHTML(mioHTML) };
   ```
3. Usalo con type-safe data:
   ```ts
   const data: Record<string, unknown> = {
     titolo: '...',
     url: '#',
     etichetta: '...',
   };
   render(tpl.mio, data);
   ```

## API dell'helper (`src/js/utils/templates.ts`)

| Funzione                 | Parametri                                        | Restituisce           | Descrizione                                            |
| ------------------------ | ------------------------------------------------ | --------------------- | ------------------------------------------------------ |
| `fromHTML(html)`         | `string`                                         | `HTMLTemplateElement` | Parsa una stringa `?raw` e restituisce il `<template>` |
| `render(tpl, data)`      | `HTMLTemplateElement`, `Record<string, unknown>` | `DocumentFragment`    | Clona il template e riempie gli slot con type safety   |
| `renderList(tpl, items)` | `HTMLTemplateElement`, `readonly unknown[]`      | `DocumentFragment`    | Chiama `render` per ogni elemento dell'array           |

### Slot supportati da `render()`

| Attributo               | Effetto                                                          |
| ----------------------- | ---------------------------------------------------------------- |
| `data-tpl="key"`        | Imposta il testo dell'elemento (preserva gli elementi figli)     |
| `data-tpl-[attr]="key"` | Imposta l'attributo `attr` (es. `data-tpl-href`, `data-tpl-src`) |
| `data-tpl-if="key"`     | Rimuove l'elemento se `data[key]` è falsy                        |
| `data-tpl-if-not="key"` | Rimuove l'elemento se `data[key]` è truthy                       |

## Note importanti

- `render()` rimuove tutti gli attributi `data-tpl*` dopo averli riempiti — non appaiono nel DOM finale.
- `mount(id, frag)` chiama `element.replaceWith(frag)`: il `<div id="...">` placeholder sparisce.
- Per aggiungere nuovi template e pagine vedi `docs/08-llm-figma-porting.md`.
