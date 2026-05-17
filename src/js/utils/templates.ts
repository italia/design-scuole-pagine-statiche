/**
 * Parses a raw HTML string and returns the first <template> element.
 */
export function fromHTML(html: string): HTMLTemplateElement {
  return new DOMParser().parseFromString(html, 'text/html').querySelector('template')!;
}

/**
 * Clones the template, fills data-tpl slots, and returns a DocumentFragment.
 *
 * Supported slots:
 * data-tpl="key"          → el.textContent = data[key]
 * data-tpl-[attr]="key"   → el.setAttribute(attr, data[key])
 */
export function render(
  tpl: HTMLTemplateElement,
  data: Record<string, unknown> = {}
): DocumentFragment {
  const clone = tpl.content.cloneNode(true) as DocumentFragment;

  // Use TreeWalker: the fastest way to scan the DOM.
  // Filter only ELEMENT_NODE types, the actual tags.
  const walker = document.createTreeWalker(clone, NodeFilter.SHOW_ELEMENT);

  let el: Element | null;
  while ((el = walker.nextNode() as Element | null)) {
    const attrs = el.attributes;

    for (let i = 0; i < attrs.length; i++) {
      const attr = attrs[i];
      if (!attr) continue;
      const { name, value: dataKey } = attr;

      if (!name.startsWith('data-tpl')) continue;

      const val = data[dataKey];
      if (val === undefined || val === null) continue;

      if (name === 'data-tpl') {
        el.textContent = String(val);
      } else {
        // "data-tpl-href" -> slice(9) -> "href"
        el.setAttribute(name.slice(9), String(val));
      }
    }
  }

  return clone;
}

/**
 * Calls render() for each item in the array and returns a DocumentFragment.
 * Useful for rendering lists of cards, menu items, etc.
 */
export function renderList(tpl: HTMLTemplateElement, items: readonly unknown[]): DocumentFragment {
  const frag = document.createDocumentFragment();
  for (const item of items) {
    if (item !== null && typeof item === 'object') {
      frag.append(render(tpl, item as Record<string, unknown>));
    }
  }
  return frag;
}
