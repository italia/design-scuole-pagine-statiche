# Sistema di template

Ogni elemento riutilizzabile di una pagina (header, footer, card, sezioni) è definito
come un elemento [`<template>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)
in un file HTML separato nella cartella `src/templates/`.

Non si usa nessuna libreria di templating esterna: è HTML e JavaScript standard,
bundlato da Vite.

## Struttura

```
src/
├── templates/
│   ├── header.html           # header del sito
│   ├── footer.html           # footer del sito
│   ├── breadcrumb.html       # navigazione breadcrumb
│   ├── hero.html             # sezione hero con titolo e descrizione
│   ├── service-section.html  # sezione con griglia di card
│   └── service-card.html     # singola card di servizio
└── js/
    └── templates.js          # helper: fromHTML, render, renderList
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

```js
const cards = [
  { titolo: 'Iscrizioni', descrizione: '...', url: '#' },
  { titolo: 'Pagamenti', descrizione: '...', url: '#' },
];

// riempie il container con una card per ogni elemento dell'array
contenitore.append(renderList(tpl.serviceCard, cards));
```

### Template con container per lista — `data-cards`

Il template `service-section.html` contiene un `<div data-cards>` che serve
come punto di iniezione per le card. Il JS lo trova e ci inietta la lista:

```js
const sectionFrag = render(tpl.serviceSection, { titolo: sezione.titolo });
sectionFrag.querySelector('[data-cards]').append(renderList(tpl.serviceCard, sezione.cards));
rootSections.append(sectionFrag);
```

## Aggiungere una nuova pagina con template

1. Crea `src/pages/mia-pagina.html` (shell minimale — solo `<div id="root-*">`).
2. Crea `src/js/pages/mia-pagina.js`.
3. Importa i template che ti servono:
   ```js
   import { render, renderList, fromHTML } from '../templates.js';
   import heroHTML from '@/templates/hero.html?raw';
   const tpl = { hero: fromHTML(heroHTML) };
   ```
4. Definisci i dati e chiama `render()` / `renderList()`.
5. Aggiungi il link in `src/index.html`.

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
2. Importalo nel JS della pagina:
   ```js
   import mioHTML from '@/templates/mio-template.html?raw';
   const tpl = { mio: fromHTML(mioHTML) };
   ```
3. Usalo con `render(tpl.mio, { titolo: '...', url: '#', etichetta: '...' })`.

## API dell'helper (`src/js/templates.js`)

| Funzione                 | Parametri                         | Restituisce           | Descrizione                                            |
| ------------------------ | --------------------------------- | --------------------- | ------------------------------------------------------ |
| `fromHTML(html)`         | `string`                          | `HTMLTemplateElement` | Parsa una stringa `?raw` e restituisce il `<template>` |
| `render(tpl, data)`      | `HTMLTemplateElement`, `object`   | `DocumentFragment`    | Clona il template e riempie gli slot                   |
| `renderList(tpl, items)` | `HTMLTemplateElement`, `object[]` | `DocumentFragment`    | Chiama `render` per ogni elemento dell'array           |

## Riferimento — pagina esempio

Vedi `src/pages/servizio.html` + `src/js/pages/servizio.js` per un esempio
completo con header, footer, breadcrumb, hero e tre sezioni di card.
