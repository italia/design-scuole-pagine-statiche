import '@/js/main';
import { render, fromHTML } from '@/js/utils/templates';
import { renderCards } from '../engines/cards';

import serviceSectionHTML from '@/templates/homepage/in-evidenza.html?raw';
import heroHTML from '@/templates/hero-secondario.html?raw';
import strumentiHTML from '@/templates/homepage/tools.html?raw';
import finanziamentiHTML from '@/templates/homepage/finanziamenti.html?raw';
import footerHTML from '@/templates/layout/footer.html?raw';
import ratingHTML from '@/templates/homepage/rating.html?raw';
import cardLuogoHTML from '@/templates/cards/card-luogo.html?raw';
import breadcrumbHTML from '@/templates/layout/breadcrumb.html?raw';
import headerHTML from '@/templates/layout/header.html?raw';

import data from '@/js/pages/organizzazione.json';

const templates = {
  serviceSection: fromHTML(serviceSectionHTML),
  hero: fromHTML(heroHTML),
  strumenti: fromHTML(strumentiHTML),
  finanziamenti: fromHTML(finanziamentiHTML),
  footer: fromHTML(footerHTML),
  rating: fromHTML(ratingHTML),
  luogo: fromHTML(cardLuogoHTML),
  breadcrumb: fromHTML(breadcrumbHTML),
  header: fromHTML(headerHTML),
};

/*render header */
const headerFragment = render(templates.header, data);

const headerContainer = document.getElementById('header');
if (headerContainer) {
  headerContainer.appendChild(headerFragment);
}
/*render breadcrumb */
const breadFragment = render(templates.breadcrumb, data);

const breadContainer = document.getElementById('breadcrumb');
if (breadContainer) {
  breadContainer.appendChild(breadFragment);
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
