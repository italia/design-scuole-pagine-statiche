import { fromHTML, renderList } from '@/js/templates.js';
import cardInlineMiniHTML from '@/templates/cards/card-inline-mini.html?raw';
import cardInformativaHTML from '@/templates/cards/card-info.html?raw';
import cardEditorialeHTML from '@/templates/cards/card-editoriale.html?raw';

const templates = {
  editoriale: fromHTML(cardEditorialeHTML),
  inlineMini: fromHTML(cardInlineMiniHTML),
  info: fromHTML(cardInformativaHTML),
};

export function cardEditoriale(dati) {
  return renderList(templates.editoriale, dati);
}

export function cardInline(dati) {
  return renderList(templates.inlineMini, dati);
}

export function cardInfo(dati) {
  return renderList(templates.info, dati);
}
