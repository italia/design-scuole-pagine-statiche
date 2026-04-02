import { fromHTML } from '@/js/utils/templates';
import type { Card } from '@/js/types/data';
import cardInlineMiniHTML from '@/templates/cards/card-inline-mini.html?raw';
import cardInformativaHTML from '@/templates/cards/card-info.html?raw';
import cardEditorialeHTML from '@/templates/cards/card-editoriale.html?raw';

type CardType = 'editorialeStandard' | 'inlineMini' | 'informativa';

const templates = {
  editorialeStandard: fromHTML(cardEditorialeHTML),
  inlineMini: fromHTML(cardInlineMiniHTML),
  informativa: fromHTML(cardInformativaHTML),
};

export function renderCards(listaDati: readonly Card[]): DocumentFragment {
  const contenitore = document.createDocumentFragment();
  /*cicla gli elementi dell'array*/
  for (const dato of listaDati) {
    //prende il template giusto in base a dato.type
    const type = dato.type as CardType;
    const template = templates[type];
    if (!template) {
      console.warn(`Unknown card type: ${type}`);
      continue;
    }
    /*genera la card*/
    const firstChild = template.content.firstElementChild;
    if (!firstChild) continue;
    const nuovaCard = firstChild.cloneNode(true) as HTMLElement;
    /*per ogni chiave dell'array delle proprietà*/
    for (const key of Object.keys(dato)) {
      /*cerca il data-tpl*/
      const el = nuovaCard.querySelector(`[data-tpl="${key}"]`);
      /*se l'elemento esiste imposta il testo con il valore del json*/
      if (el) el.textContent = String(dato[key]);
    }

    contenitore.appendChild(nuovaCard);
  }

  return contenitore;
}
