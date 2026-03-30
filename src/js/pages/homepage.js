import '@/js/main.js';
import { render, fromHTML } from '@/templates/utils/templates.js';
import { cardEditoriale, cardInline, cardInfo } from '@/templates/engines/cards.js';

import serviceSectionHTML from '@/templates/inEvidenceSection.html?raw';
import preheaderHTML from '@/templates/preheader.html?raw';
import headerHTML from '@/templates/headerCopy.html?raw';
import heroHTML from '@/templates/hero-copy.html?raw';
import studyHTML from '@/templates/studywithus.html?raw';
import circolariEServiziHTML from '@/templates/circolarieservizi-section.html?raw';
import strumentiHTML from '@/templates/tools.html?raw';
import finanziamentiHTML from '@/templates/finanziamenti.html?raw';
import pubblicitaHTML from '@/templates/pubblicitasection.html?raw';
import personaleHTML from '@/templates/personale.html?raw';
import footerHTML from '@/templates/footer.html?raw';
import ratingHTML from '@/templates/rating.html?raw';

import data from '@/data.json';

const templates = {
  serviceSection: fromHTML(serviceSectionHTML),
  header: fromHTML(headerHTML),
  hero: fromHTML(heroHTML),
  preheader: fromHTML(preheaderHTML),
  study: fromHTML(studyHTML),
  circolariEServizi: fromHTML(circolariEServiziHTML),
  strumenti: fromHTML(strumentiHTML),
  finanziamenti: fromHTML(finanziamentiHTML),
  pubblicita: fromHTML(pubblicitaHTML),
  personale: fromHTML(personaleHTML),
  footer: fromHTML(footerHTML),
  rating: fromHTML(ratingHTML),
};

/* rendering */

/* render in evidenza */
const risultato = render(templates.serviceSection, { titolo: data.sezioniServizi.titolo });

const cardsContainer = risultato.querySelector('[data-cards]');

const prova = cardsContainer.appendChild(cardInline(data.sezioniServizi.cards));

console.log(prova);
const mainContainer = document.getElementById('in-evidenza');
if (mainContainer) {
  mainContainer.appendChild(risultato);
}
console.log(cardsContainer);

/* render header */
const headerFragment = render(templates.header, data.mainHeader.scuola);

const mainHeaderContainer = document.getElementById('main-header');
if (mainHeaderContainer) {
  mainHeaderContainer.appendChild(headerFragment);
}

/* render hero */
const heroFragment = render(templates.hero, data.hero.scuola);

const mainHeroContainer = document.getElementById('hero');
if (mainHeroContainer) {
  mainHeroContainer.appendChild(heroFragment);
}

/* render pre-header */
const preheaderFragment = render(templates.preheader, data.preHeader);

const preHeaderContainer = document.getElementById('site-preheader');
if (preHeaderContainer) {
  preHeaderContainer.appendChild(preheaderFragment);
}

/* render studia con noi */
const datiBase = {
  titoloSezione: data.studiaConNoi.titoloSezione,
  ...data.studiaConNoi.percorsiDiStudio,
  ...data.studiaConNoi.tipiScuole,
  ...data.studiaConNoi.progettiIstituto,
};

const studyFragment = render(templates.study, datiBase);

const studyCardsContainer = studyFragment.querySelector('[study-card]');
if (studyCardsContainer) {
  studyCardsContainer.appendChild(cardInfo(data.studiaConNoi.cards));
}

document.getElementById('studia-con-noi').appendChild(studyFragment);

/* render circolari e servizi */
const datiCompleti = {
  titolo: data.circolariEServizi.circolari.titolo,
  descrizione: data.circolariEServizi.circolari.descrizione,
  titoloServizi: data.circolariEServizi.servizi.titolo,
  descrizioneServizi: data.circolariEServizi.servizi.descrizione,
};

const fragment = render(templates.circolariEServizi, datiCompleti);

const circolariCardsContainer = fragment.querySelector('[data-tpl="circolari-data-cards"]');
if (circolariCardsContainer) {
  circolariCardsContainer.appendChild(
    cardInfo(data.circolariEServizi.circolari.circolariDataCards)
  );
}

const serviziCardsContainer = fragment.querySelector('[data-tpl="servizi-data-cards"]');
if (serviziCardsContainer) {
  serviziCardsContainer.appendChild(cardInfo(data.circolariEServizi.servizi.serviziDataCards));
}

const container = document.getElementById('circolari-e-servizi');
if (container) {
  container.appendChild(fragment);
}

/* render strumenti digitali */
const fragmentStrumenti = render(templates.strumenti, data.tools);

const strumentiCardsContainer = fragmentStrumenti.querySelector('[data-tpl="data-cards"]');
if (strumentiCardsContainer) {
  strumentiCardsContainer.appendChild(cardInline(data.tools.cards));
}

const circolariContainer = document.getElementById('strumenti-digitali');
if (circolariContainer) {
  circolariContainer.appendChild(fragmentStrumenti);
}

/* render finanziamenti */
const fragmentFinan = render(templates.finanziamenti, data.fin);

const finanCardsContainer = fragmentFinan.querySelector('[data-tpl="data-cards"]');
if (finanCardsContainer) {
  finanCardsContainer.appendChild(cardEditoriale(data.fin.cards));
}

const finanContainer = document.getElementById('finanziamenti');
if (finanContainer) {
  finanContainer.appendChild(fragmentFinan);
}

/* render pubblicità legale */
const fragmentpub = render(templates.pubblicita, data.pub);

const pubCardsContainer = fragmentpub.firstElementChild.querySelector('[data-tpl="data-cards"]');
if (pubCardsContainer) {
  pubCardsContainer.appendChild(cardInline(data.pub.cards));
}

const pubContainer = document.getElementById('trasparenza');
if (pubContainer) {
  pubContainer.appendChild(fragmentpub);
}

/* render area personale */
const personaleFragment = render(templates.personale, data.areaPersonale);

const personaleContainer = document.getElementById('personale-scolastico');
if (personaleContainer) {
  personaleContainer.appendChild(personaleFragment);
}

/* render footer */
const footerFragment = render(templates.footer, data.footerSection);

const footerContainer = document.getElementById('footer');
if (footerContainer) {
  footerContainer.appendChild(footerFragment);
}

/* render rating */
const ratingFragment = render(templates.rating);

const ratingContainer = document.getElementById('rating');
if (ratingContainer) {
  ratingContainer.appendChild(ratingFragment);
}
