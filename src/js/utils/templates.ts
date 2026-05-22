/**
 * Parses a raw HTML string and returns the first <template> element.
 */
export function fromHTML(html: string): HTMLTemplateElement {
  return new DOMParser().parseFromString(html, 'text/html').querySelector('template')!;
}

/**
 * Evaluates a condition expression safely without eval().
 * Supports: "field != null", "count > 0", "status == 'active'"
 * Operators: !=, !==, ==, ===, >, <, >=, <=
 */
function evaluateCondition(expression: string, data: Record<string, unknown>): boolean {
  const match = expression.match(/^(\w+)\s*(!=|!==|==|===|>=|<=|>|<)\s*(.+)$/);
  if (!match || match.length < 4) return false;

  const fieldName = match[1]!;
  const operator = match[2]!;
  const valueStr = match[3]!;
  const fieldValue = data[fieldName];

  // Parse the test value
  let testValue: unknown;
  if (valueStr === 'null') testValue = null;
  else if (valueStr === 'undefined') testValue = undefined;
  else if (valueStr === 'true') testValue = true;
  else if (valueStr === 'false') testValue = false;
  else if (/^\d+(\.\d+)?$/.test(valueStr)) testValue = Number(valueStr);
  else if (/^['"].*['"]$/.test(valueStr)) testValue = valueStr.slice(1, -1);
  else testValue = valueStr;

  // Evaluate
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const compare = (a: any, b: any, op: string): boolean => {
    switch (op) {
      case '!=':
        return a != b;
      case '!==':
        return a !== b;
      case '==':
        return a == b;
      case '===':
        return a === b;
      case '>':
        return a > b;
      case '<':
        return a < b;
      case '>=':
        return a >= b;
      case '<=':
        return a <= b;
      default:
        return false;
    }
  };

  return compare(fieldValue, testValue, operator);
}

/**
 * Clones the template, fills data-tpl slots, and returns a DocumentFragment.
 *
 * Supported slots:
 * data-tpl="key"          → el.textContent = data[key]
 * data-tpl-html="key"     → el.innerHTML = data[key]
 * data-tpl-[attr]="key"   → el.setAttribute(attr, data[key])
 * data-tpl-if="key"       → el (and its subtree) removed when data[key] is falsy
 * data-tpl-if-not="key"   → el (and its subtree) removed when data[key] is truthy
 * data-tpl-condition="expr" → el removed when condition is false (e.g., "image != null")
 * data-tpl-each="key"     → el cloned for each item in data[key] array, item becomes root context
 */
export function render(
  tpl: HTMLTemplateElement,
  data: Record<string, unknown> = {}
): DocumentFragment {
  const clone = tpl.content.cloneNode(true) as DocumentFragment;

  // Pre-pass: resolve conditional visibility before data binding.
  // querySelectorAll returns a document-order snapshot (Array.from freezes it),
  // so a parent removal implicitly removes its children before we reach them.
  for (const el of Array.from(clone.querySelectorAll<Element>('[data-tpl-if]'))) {
    const key = el.getAttribute('data-tpl-if')!;
    if (!data[key]) el.remove();
    else el.removeAttribute('data-tpl-if');
  }
  for (const el of Array.from(clone.querySelectorAll<Element>('[data-tpl-if-not]'))) {
    const key = el.getAttribute('data-tpl-if-not')!;
    if (data[key]) el.remove();
    else el.removeAttribute('data-tpl-if-not');
  }
  for (const el of Array.from(clone.querySelectorAll<Element>('[data-tpl-condition]'))) {
    const expr = el.getAttribute('data-tpl-condition')!;
    if (!evaluateCondition(expr, data)) el.remove();
    else el.removeAttribute('data-tpl-condition');
  }

  // Use TreeWalker: the fastest way to scan the DOM.
  // Filter only ELEMENT_NODE types, the actual tags.
  const walker = document.createTreeWalker(clone, NodeFilter.SHOW_ELEMENT);

  let el: Element | null;
  while ((el = walker.nextNode() as Element | null)) {
    const attrs = el.attributes;
    const tplAttrs: string[] = [];

    for (let i = 0; i < attrs.length; i++) {
      const attr = attrs[i];
      if (!attr) continue;
      const { name, value: dataKey } = attr;

      if (!name.startsWith('data-tpl')) continue;
      tplAttrs.push(name);

      const val = data[dataKey];
      if (val === undefined || val === null) continue;

      if (name === 'data-tpl') {
        // Remove text nodes only — preserve child elements (e.g. <it-icon>)
        for (const child of Array.from(el.childNodes)) {
          // TEXT_NODE value for node eval, this is a browser only value mapped as 3 on Node interface
          if (child.nodeType === 3) child.remove();
        }
        el.insertBefore(document.createTextNode(String(val)), el.firstChild);
      } else {
        // "data-tpl-href" -> slice(9) -> "href"
        el.setAttribute(name.slice(9), String(val));
      }
    }

    // Strip all data-tpl* attrs so they don't appear in the final DOM
    for (const name of tplAttrs) el.removeAttribute(name);
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

/**
 * Mounts the given DocumentFragment into the DOM element with the specified ID, replacing its content.
 */
export function mount(id: string, frag: DocumentFragment): void {
  document.getElementById(id)?.replaceWith(frag);
}
