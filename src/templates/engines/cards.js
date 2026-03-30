import { fromHTML } from '@/templates/utils/templates.js';
import cardInlineMiniHTML from '@/templates/cards/card-inline-mini.html?raw';
import cardInformativaHTML from '@/templates/cards/card-info.html?raw';
import cardEditorialeHTML from '@/templates/cards/card-editoriale.html?raw';
import data from '@/data.json';

const templateMini = fromHTML(cardInlineMiniHTML);
const templateEdit = fromHTML(cardEditorialeHTML);
const templateInfo = fromHTML(cardInformativaHTML);

// Funzione per le card editoriali
export function cardEditoriale(listaDati) {
  // crea un contenitore
  const contenitore = document.createDocumentFragment();
  //Per ogni oggetto nell'array listaDati, viene creata una card.
  listaDati.forEach((dato) => {
    //clona il template copiando anche tutti i figli interni
    const nuovaCard = templateEdit.content.firstElementChild.cloneNode(true);
    //popola i dati
    if (dato.title) nuovaCard.querySelector('[data-tpl="title"]').textContent = data.title;
    if (dato.text) nuovaCard.querySelector('[data-tpl="text"]').textContent = data.text;
    if (dato.category) nuovaCard.querySelector('[data-tpl="category"]').textContent = data.category;
    if (dato.date) nuovaCard.querySelector('[data-tpl="date"]').textContent = data.date;
    //aggiunge al contenitore
    contenitore.appendChild(nuovaCard);
  });
  return contenitore;
}

/*funzione per le cardInLine*/
export function cardInline(listaDati) {
  const contenitore = document.createDocumentFragment();

  listaDati.forEach((dato) => {
    const nuovaCard = templateMini.content.firstElementChild.cloneNode(true);
    if (dato.title) nuovaCard.querySelector('[data-tpl="title"]').textContent = dato.title;
    if (dato.text) nuovaCard.querySelector('[data-tpl="text"]').textContent = dato.text;
    if (dato.category) nuovaCard.querySelector('[data-tpl="category"]').textContent = dato.category;
    if (dato.date) nuovaCard.querySelector('[data-tpl="date"]').textContent = dato.date;
    contenitore.appendChild(nuovaCard);
  });

  return contenitore;
}

// Funzione per le card informative
export function cardInfo(listaDati) {
  const contenitore = document.createDocumentFragment();

  listaDati.forEach((dato) => {
    const nuovaCard = templateInfo.content.firstElementChild.cloneNode(true);

    if (dato.title) nuovaCard.querySelector('[data-tpl="title"]').textContent = dato.title;
    if (dato.text) nuovaCard.querySelector('[data-tpl="text"]').textContent = dato.text;

    contenitore.appendChild(nuovaCard);
  });

  return contenitore;
}
