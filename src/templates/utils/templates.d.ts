/**
 * Parses a raw HTML string and returns the first <template> element.
 * The templates imported via `?raw` are build-time constants and are
 * guaranteed to contain a valid <template> element.
 */
export declare function fromHTML(html: string): HTMLTemplateElement;

/**
 * Clones the template, fills data-tpl slots, and returns a DocumentFragment.
 */
export declare function render(
  tpl: HTMLTemplateElement,
  data?: Record<string, string>
): DocumentFragment;
