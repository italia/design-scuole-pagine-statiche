import '@/js/main';
import { render, fromHTML } from '@/js/utils/templates';
import { renderCards } from '../engines/cards';

import serviceSectionHTML from '@/templates/inEvidenceSection.html?raw';
import preheaderHTML from '@/templates/preheader.html?raw';
import headerHTML from '@/templates/header.html?raw';
import heroHTML from '@/templates/hero-secondario.html?raw';
import strumentiHTML from '@/templates/tools.html?raw';
import finanziamentiHTML from '@/templates/finanziamenti.html?raw';
import footerHTML from '@/templates/footer.html?raw';
import ratingHTML from '@/templates/rating.html?raw';
import cardLuogoHTML from '@/templates/cards/card-luogo.html?raw';

import data from '@/js/pages/organizzazione.json';

const templates = {
  serviceSection: fromHTML(serviceSectionHTML),
  header: fromHTML(headerHTML),
  hero: fromHTML(heroHTML),
  preheader: fromHTML(preheaderHTML),
  strumenti: fromHTML(strumentiHTML),
  finanziamenti: fromHTML(finanziamentiHTML),
  footer: fromHTML(footerHTML),
  rating: fromHTML(ratingHTML),
  luogo: fromHTML(cardLuogoHTML),
};

/* render header */
const headerFragment = render(templates.header, data.mainHeader.scuola);

const mainHeaderContainer = document.getElementById('main-header');
if (mainHeaderContainer) {
  mainHeaderContainer.appendChild(headerFragment);
}

/* render hero */
const heroFragment = render(templates.hero, data.hero.info);

const mainHeroContainer = document.getElementById('hero');
if (mainHeroContainer) {
  mainHeroContainer.appendChild(heroFragment);
}

/*render dirigenza*/
const fragmentDirigenza = render(templates.serviceSection, data.dirigenza);

const dirigenzaCardsContainer = fragmentDirigenza.querySelector('[data-cards]');
if (dirigenzaCardsContainer) {
  dirigenzaCardsContainer.appendChild(renderCards(data.dirigenza.cards));
}

const circolariContainer = document.getElementById('dirigenza');
if (circolariContainer) {
  circolariContainer.appendChild(fragmentDirigenza);
}

/*render funzioni strumentali*/
const fragmentFunzioni = render(templates.serviceSection, data.funzioni);

const funzioniCardsContainer = fragmentFunzioni.querySelector('[data-cards]');
if (funzioniCardsContainer) {
  funzioniCardsContainer.appendChild(renderCards(data.funzioni.cards));
}

const funzioniContainer = document.getElementById('funzioni-strumentali');
if (funzioniContainer) {
  funzioniContainer.appendChild(fragmentFunzioni);
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

/*render persone*/
const fragmentPersone = render(templates.serviceSection, data.personale);

const PersoneCardsContainer = fragmentPersone.querySelector('[data-cards]');
if (PersoneCardsContainer) {
  PersoneCardsContainer.appendChild(renderCards(data.personale.cards));
}

const PersoneContainer = document.getElementById('persone');
if (PersoneContainer) {
  PersoneContainer.appendChild(fragmentPersone);
}
