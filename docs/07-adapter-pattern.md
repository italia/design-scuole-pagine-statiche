# Pattern Adapter: Architettura del Rendering delle Card

## La Versione Semplice

Immagina un **cameriere in un ristorante**.

Il cliente dice: "Voglio la pasta al ragù, ma senza cipolla, con aglio extra, e la salsa in un piattino separato."

Il cameriere non va da sua mamma a cucinare. Invece:

1. Ascolta l'ordine completo (la `card` con tutti i dati)
2. Lo traduce in istruzioni che la cucina capisce e sa processare (transforma in formato per `render()`)
3. Lo passa al cuoco (chiama `render()`)

Il cuoco non conosce le preferenze personali di quel cliente. Riceve semplicemente: "Pasta al ragù, no cipolla, aglio extra, salsa a parte" e sa che cosa fare.

Nel nostro codice è lo stesso:

- `render()` = il cuoco (motore di template generico, non sa nulla di card)
- `card` = l'ordine del cliente completo (ha tutti i dati, ma "lordi")
- `cardToRenderData()` = il cameriere (traduce in formato che il cuoco capisce)

## Perché L'Abbiamo Fatto

**Prima:** `renderCards()` chiamava `render()` direttamente con i dati della card. Sembrava funzionare fino a quando...

Il product owner dice: _"Voglio che le card mostrino altre cose" o "nascondi quel campo" o "formatta le date diversamente"_?

Dovevi cambiare DUE posti:

1. La logica di rendering della card
2. Forse anche la funzione base `render()`

**Dopo:** Abbiamo UN solo posto dove cambiare: `cardToRenderData()`.

La funzione `render()` rimane **intoccata e stabile**. Non sa delle card, non le riguarda. Compila solo gli slot del template.

## Il Codice

```typescript
// 1. Motore di template generico (vive in templates.ts)
export function render(tpl: HTMLTemplateElement, data: Record<string, unknown>): DocumentFragment {
  // Riempie qualsiasi template con qualsiasi dato
  // Non sa nulla di card, utenti, prodotti, ecc.
}

// 2. Adattatore specifico per card (vive in cards.ts)
const cardToRenderData = (card: Card): Record<string, unknown> => card;

// 3. Il renderer di card usa l'adattatore
export const renderCards = (listaDati: readonly Card[]): DocumentFragment => {
  for (const card of listaDati) {
    frag.appendChild(render(templates[card.type], cardToRenderData(card)));
  }
  return frag;
};
```

## Esempio Reale: Aggiungere Funzionalità

**Scenario:** Il product dice "Nascondi il campo `type` quando renderizzi le card, è tecnico."

**Vecchio modo (se il codice fosse strettamente accoppiato):**

- Edita `render()` per sapere di "nascondere type per card"
- Adesso `render()` ha logica di card baked in
- La prossima cosa, ha bisogno di logica utente, poi logica prodotto...
- Alla fine `render()` è un casino di casi speciali

**Il Nostro Modo:**

```typescript
const cardToRenderData = (card: Card): Record<string, unknown> => {
  const { type, ...filtered } = card; // Rimuovi type
  return filtered;
};
```

Fatto. Un file, intenzione chiara, nessun effetto collaterale.

## Punti Chiave

1. **Separazione dei compiti** — ogni funzione fa UNA cosa:

   - `render()` renderizza template
   - `cardToRenderData()` prepara i dati della card
   - `renderCards()` orchestra entrambe

2. **Facile da testare** — puoi testare ogni parte separatamente:

   - `render()` compila gli slot correttamente? (sì, è generico)
   - `cardToRenderData()` trasforma correttamente? (mock card e controlla output)
   - `renderCards()` gestisce i tipi non validi? (sì, valida prima)

3. **Facile da estendere** — il prossimo requisito arriva:
   - Nuova regola di rendering per card? Aggiorna `cardToRenderData()`
   - Nuovo tipo di template? Aggiungi a `templates`
   - Nuova validazione? Aggiorna `isCardType()`
   - Cambia rendering di base? Aggiorna `render()`
   - Ogni cambio è **isolato** e **sicuro**

## Quando NON Usare

Se il rendering della card è veramente identico al rendering generico (nessuna differenza), puoi saltare l'adattatore. Ma non appena le regole divergono—trasformazioni dati diverse, gestione speciale, campi condizionali—l'adattatore vale la pena.

L'abbiamo aggiunto **prima** che la complessità colpisse, così quando succederà, siamo pronti.
