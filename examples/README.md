# Vanilla SSR & Hydration Engine: Technical Documentation

## 1. Overview

L'architettura proposta implementa un sistema di **Isomorphic Rendering** (o Universal JavaScript) applicato a componenti Vanilla Web Components.

Il sistema garantisce che il contenuto critico sia presente nell'HTML iniziale (Server-Side Rendering) e che il client possa "idratare" i componenti esistenti senza duplicare le chiamate di rete o causare sfarfallii del layout (Layout Shift).

Questo esempio utilizza Vite ed Express.js, fai riferimento alle relative documentazioni per ulteriori informazioni.

---

## 2. Flusso di Esecuzione (Lifecycle)

### Phase A: Server-Side Rendering (Node.js)

Il file `server.js` funge da orchestratore utilizzando **Vite** come middleware di trasformazione e **Linkedom** come DOM parser leggero.

1. **DOM Virtualizzazione**: L'HTML statico viene caricato in un'istanza di `linkedom`.
2. **Esecuzione Isomorfica**: Viene invocato `ssrLoadModule` sul file `starwars.js`. Lo script rileva l'ambiente Node e popola il DOM virtuale.
3. **State Serialization**: I dati ottenuti dalle API esterne vengono serializzati in un tag `<script id="__SSR_STATE__" type="application/json">`.
4. **DOM Cleanup**: Un `TreeWalker` scansiona l'albero per rimuovere i tag `<template>` e gli attributi di binding `data-tpl-*` per inviare al browser un HTML pulito.

### Phase B: Client-Side Hydration (Browser)

Al caricamento della pagina, il browser riceve l'HTML completo e avvia lo script `starwars.js`.

1. **State Recovery**: Lo script verifica la presenza del tag `__SSR_STATE__`. Se presente, i dati vengono caricati dalla memoria locale, eliminando la necessità di un `fetch` di rete.
2. **Hydration Check**: Lo script controlla se il contenitore target possiede già dei nodi figli (generati dal server). In caso positivo, il rendering DOM viene saltato per prevenire il "double render flash".
3. **Event Binding**: Gli event listener vengono collegati agli elementi già presenti nel DOM (Web Components).

---

## 3. Strategia Anti-FOUC e Resilienza

Per prevenire il **Flash of Unstyled Content (FOUC)** e garantire la visibilità dei dati anche in assenza di JavaScript, il kit espone stili del tipo:

```css
it-card:not(:defined) {
  display: block;
  min-height: 100px;
  opacity: 0.8;
}
```

Questa regola assicura che:

- **Senza JS**: Il contenuto testuale SSR sia leggibile.
- **Con JS**: Al momento della definizione del Web Component, lo stile decade automaticamente lasciando spazio al design finale del kit.

---

## 4. Specifiche dei File

### `server.js` (The Engine)

Gestisce il ciclo di vita della richiesta, la sandbox globale per il DOM virtuale e l'iniezione degli asset critici (CSS/JS del Dev-Kit) nell'header.

### `starwars.js` (The Logic)

Contiene la logica di business. Utilizza il pattern `export const ready = init()` per permettere al server di attendere la risoluzione delle promesse asincrone prima della serializzazione finale dell'HTML.
Utilizza l'engine `templates.js` definito in `src/js/templates.js` per renderizzare i template HTML.

### `starwars.html` (The Template)

Definisce la struttura semantica della pagina e i punti di innesto per i dati dinamici e i dettagli "live" gestiti tramite lo stato idratato.

---

## 5. Performance Metrics

L'adozione di questo pattern permette di ottenere:

- **TTFB (Time To First Byte)**: Ottimizzato tramite caching degli asset trasformati da Vite.
- **FCP (First Contentful Paint)**: Coincidente con il caricamento dell'HTML.
- **TBT (Total Blocking Time)**: Ridotto al minimo grazie all'assenza di framework di rendering lato client.
