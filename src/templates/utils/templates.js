/**
 * Parsa una stringa HTML (import ?raw) e restituisce il primo <template>.
 * @param {string} html
 * @returns {HTMLTemplateElement}
 */
export function fromHTML(html) {
  return new DOMParser().parseFromString(html, 'text/html').querySelector('template');
}
/**
 * Clona il template e riempie gli slot dati, restituisce un DocumentFragment.
 *
 * Slot supportati:
 * data-tpl="chiave"          → el.textContent = data[chiave]
 * data-tpl-[attr]="chiave"   → el.setAttribute(attr, data[chiave])
 *
 * @param {HTMLTemplateElement} tpl
 * @param {Record<string, string>} data
 * @returns {DocumentFragment}
 */
export function render(tpl, data = {}) {
  const clone = tpl.content.cloneNode(true);

  // Usiamo TreeWalker: il modo più veloce in assoluto per scansionare il DOM.
  // Filtriamo solo i nodi di tipo ELEMENT_NODE, i tag veri e propri.
  const walker = document.createTreeWalker(clone, NodeFilter.SHOW_ELEMENT);

  let el;
  while ((el = walker.nextNode())) {
    const attrs = el.attributes;

    for (let i = 0; i < attrs.length; i++) {
      const { name, value: dataKey } = attrs[i];

      if (!name.startsWith('data-tpl')) continue;

      const val = data[dataKey];
      if (val === undefined) continue;

      if (name === 'data-tpl') {
        el.textContent = val;
      } else {
        // "data-tpl-href" -> slice(9) -> "href"
        el.setAttribute(name.slice(9), val);
      }
    }
  }

  return clone;
}

/**
 * Chiama render() per ogni elemento dell'array e restituisce un DocumentFragment.
 * Utile per rendere liste di card, voci di menu, ecc.
 *
 * @param {HTMLTemplateElement} tpl
 * @param {Record<string, string>[]} items
 * @returns {DocumentFragment}
 */
export function renderList(tpl, items) {
  const frag = document.createDocumentFragment();
  for (const item of items) frag.append(render(tpl, item));
  return frag;
}
