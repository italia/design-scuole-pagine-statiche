import { fromHTML, render } from '@/js/utils/templates';
import type { Card, CardType } from '@/js/types/data';
import { isCardType } from '@/js/types/data';
import cardInlineMiniHTML from '@/templates/cards/card-inline-mini.html?raw';
import cardInformativaHTML from '@/templates/cards/card-info.html?raw';
import cardEditorialeHTML from '@/templates/cards/card-editoriale.html?raw';

const templates: Record<CardType, HTMLTemplateElement> = {
  editorialeStandard: fromHTML(cardEditorialeHTML),
  inlineMini: fromHTML(cardInlineMiniHTML),
  informativa: fromHTML(cardInformativaHTML),
};

/**
 * Transforms card data for rendering.
 * Centralized here so card-specific logic doesn't leak into base render().
 */
const cardToRenderData = (card: Card): Record<string, unknown> => card;

export const renderCards = (listaDati: readonly Card[]): DocumentFragment => {
  const frag = document.createDocumentFragment();
  for (const card of listaDati) {
    if (!isCardType(card.type)) {
      console.warn(`Invalid card type: ${card.type}`);
      continue;
    }
    frag.appendChild(render(templates[card.type], cardToRenderData(card)));
  }
  return frag;
};
