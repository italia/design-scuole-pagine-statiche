import '@/js/main';
import '@/styles/homepage.css';
import { render, fromHTML, mount } from '@/js/utils/templates';
import { renderCards } from '@/js/engines/cards';

import headerHTML from '@/templates/layout/header.html?raw';
import footerHTML from '@/templates/layout/footer.html?raw';
import ratingHTML from '@/templates/layout/rating.html?raw';

import heroPresentationHTML from '@/templates/components/hero-presentation.html?raw';
import carouselHTML from '@/templates/components/carousel.html?raw';
import studiaConNoiHTML from '@/templates/homepage/studia-con-noi.html?raw';
import circolariServiziHTML from '@/templates/homepage/circolari-servizi.html?raw';
import toolsHTML from '@/templates/homepage/tools.html?raw';

import sectionList from '@/templates/components/section-list.html?raw';
import personaleHTML from '@/templates/homepage/personale.html?raw';

import data from './data.json';

const templates = {
  header: fromHTML(headerHTML),
  hero: fromHTML(heroPresentationHTML),
  carousel: fromHTML(carouselHTML),
  studiaConNoi: fromHTML(studiaConNoiHTML),
  circolariServizi: fromHTML(circolariServiziHTML),
  tools: fromHTML(toolsHTML),
  sectionList: fromHTML(sectionList),
  personale: fromHTML(personaleHTML),
  rating: fromHTML(ratingHTML),
  footer: fromHTML(footerHTML),
};

/* header */
mount('main-header', render(templates.header));

/* hero */
mount('hero', render(templates.hero, data.hero));

const inEvidenza = render(templates.sectionList, data.inEvidenza);
mount('in-evidenza', inEvidenza, [
  {
    selector: '[data-cards]',
    content: renderCards(data.inEvidenza.items),
  },
]);

/* carousel */
mount('carousel', render(templates.carousel, data.carousel));

/* studia con noi */
const studia = render(templates.studiaConNoi, data.studiaConNoi);
mount('studia-con-noi', studia, [
  {
    selector: '[data-cards]',
    content: renderCards(data.studiaConNoi.cards),
  },
]);

const circolariServizi = render(templates.circolariServizi);
mount('circolari-e-servizi', circolariServizi, [
  {
    selector: '[data-cards="circolari"]',
    content: renderCards(data.circolariEServizi.circolari.circolariDataCards),
  },
  {
    selector: '[data-cards="servizi"]',
    content: renderCards(data.circolariEServizi.servizi.serviziDataCards),
  },
]);

/* strumenti digitali */
const tools = render(templates.tools, data.tools);
mount('strumenti-digitali', tools, [
  {
    selector: '[data-cards]',
    content: renderCards(data.tools.cards),
  },
]);

/* finanziamenti */
const finanziamenti = render(templates.sectionList, data.finanziamenti);
mount('finanziamenti', finanziamenti, [
  {
    selector: '[data-cards]',
    content: renderCards(data.finanziamenti.items),
  },
]);

const trasparenza = render(templates.sectionList, data.trasparenza);
mount('trasparenza', trasparenza, [
  {
    selector: '[data-cards]',
    content: renderCards(data.trasparenza.items),
  },
]);

/* area personale */
mount('personale-scolastico', render(templates.personale, data.areaPersonale));

/* rating */
mount('rating', render(templates.rating));

/* footer */
mount('footer', render(templates.footer));
