import { fromHTML, render } from '@/js/utils/templates';
import type { Card, CardType } from '@/js/types/data';
import { isCardType } from '@/js/types/data';
import cardInlineMiniHTML from '@/templates/cards/card-inline-mini.html?raw';
import cardInformativaHTML from '@/templates/cards/card-info.html?raw';
import bannerHTML from '@/templates/cards/card-banner-inline-mini.html?raw';
import luogoHTML from '@/templates/cards/card-luogo.html?raw';
import locationMiniHTML from '@/templates/cards/card-luogo-mini.html?raw';
import personaHTML from '@/templates/cards/card-persona.html?raw';

const templates: Record<CardType, HTMLTemplateElement> = {
  inlineMini: fromHTML(cardInlineMiniHTML),
  informativa: fromHTML(cardInformativaHTML),
  banner: fromHTML(bannerHTML),
  location: fromHTML(luogoHTML),
  locationMini: fromHTML(locationMiniHTML),
  persona: fromHTML(personaHTML),
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
    const rendered = render(templates[card.type], cardToRenderData(card));
    frag.appendChild(rendered);
  }
  return frag;
};
