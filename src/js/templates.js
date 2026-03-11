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
 *   data-tpl="chiave"       → el.textContent = data[chiave]
 *   data-tpl-href="chiave"  → el.href        = data[chiave]
 *
 * @param {HTMLTemplateElement} tpl
 * @param {Record<string, string>} data
 * @returns {DocumentFragment}
 */
export function render(tpl, data = {}) {
  const clone = tpl.content.cloneNode(true);

  for (const el of clone.querySelectorAll('[data-tpl]')) {
    const val = data[el.dataset.tpl];
    if (val !== undefined) el.textContent = val;
  }

  for (const el of clone.querySelectorAll('[data-tpl-href]')) {
    const val = data[el.dataset.tplHref];
    if (val !== undefined) el.setAttribute('href', val);
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
