import { fromHTML } from '@/js/utils/templates';
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

export const renderCards = (listaDati: readonly Card[]): DocumentFragment => {
  const frag = document.createDocumentFragment();
  for (const card of listaDati) {
    if (!isCardType(card.type)) {
      console.warn(`Invalid card type: ${card.type}`);
      continue;
    }
    const tpl = templates[card.type].content.firstElementChild?.cloneNode(true) as
      | HTMLElement
      | undefined;
    if (!tpl) continue;
    Object.entries(card).forEach(([key, value]) => {
      const el = tpl.querySelector(`[data-tpl="${key}"]`);
      if (el) el.textContent = String(value);
    });
    frag.appendChild(tpl);
  }
  return frag;
};
