import '@/js/main';
import { render, fromHTML } from '@/js/utils/templates';
import { renderCards } from '@/js/engines/cards';

import serviceSectionHTML from '@/templates/inEvidenceSection.html?raw';
import preheaderHTML from '@/templates/preheader.html?raw';
import headerHTML from '@/templates/header.html?raw';
import heroHTML from '@/templates/hero.html?raw';
import studyHTML from '@/templates/studywithus.html?raw';
import circolariEServiziHTML from '@/templates/circolarieservizi-section.html?raw';
import strumentiHTML from '@/templates/tools.html?raw';
import finanziamentiHTML from '@/templates/finanziamenti.html?raw';
import pubblicitaHTML from '@/templates/pubblicitasection.html?raw';
import personaleHTML from '@/templates/personale.html?raw';
import footerHTML from '@/templates/footer.html?raw';
import ratingHTML from '@/templates/rating.html?raw';
import carouselHTML from '@/templates/carousel.html?raw';

import data from '@/js/pages/homepage.json';

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
  carousel: fromHTML(carouselHTML),
};

/* rendering */

/*render carousel*/
const carouselFragment = render(templates.carousel, data.carousel);

const carouselContainer = document.getElementById('carousel');
if (carouselContainer) {
  carouselContainer.appendChild(carouselFragment);
}
/* render in evidenza */
const risultato = render(templates.serviceSection, { titolo: data.sezioniServizi.titolo });

const cardsContainer = risultato.querySelector('[data-cards]');

cardsContainer?.appendChild(renderCards(data.sezioniServizi.cards));

const mainContainer = document.getElementById('in-evidenza');
if (mainContainer) {
  mainContainer.appendChild(risultato);
}

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
  studyCardsContainer.appendChild(renderCards(data.studiaConNoi.cards));
}

const studyContainer = document.getElementById('studia-con-noi');
if (studyContainer) {
  studyContainer.appendChild(studyFragment);
}

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
    renderCards(data.circolariEServizi.circolari.circolariDataCards)
  );
}

const serviziCardsContainer = fragment.querySelector('[data-tpl="servizi-data-cards"]');
if (serviziCardsContainer) {
  serviziCardsContainer.appendChild(renderCards(data.circolariEServizi.servizi.serviziDataCards));
}

const container = document.getElementById('circolari-e-servizi');
if (container) {
  container.appendChild(fragment);
}

/* render strumenti digitali */
const fragmentStrumenti = render(templates.strumenti, data.tools);

const strumentiCardsContainer = fragmentStrumenti.querySelector('[data-tpl="data-cards"]');
if (strumentiCardsContainer) {
  strumentiCardsContainer.appendChild(renderCards(data.tools.cards));
}

const circolariContainer = document.getElementById('strumenti-digitali');
if (circolariContainer) {
  circolariContainer.appendChild(fragmentStrumenti);
}

/* render finanziamenti */
const fragmentFinan = render(templates.finanziamenti, data.fin);

const finanCardsContainer = fragmentFinan.querySelector('[data-tpl="data-cards"]');
if (finanCardsContainer) {
  finanCardsContainer.appendChild(renderCards(data.fin.cards));
}

const finanContainer = document.getElementById('finanziamenti');
if (finanContainer) {
  finanContainer.appendChild(fragmentFinan);
}

/* render pubblicità legale */
const fragmentpub = render(templates.pubblicita, data.pub);

const pubCardsContainer = fragmentpub.firstElementChild?.querySelector('[data-tpl="data-cards"]');
if (pubCardsContainer) {
  pubCardsContainer.appendChild(renderCards(data.pub.cards));
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
