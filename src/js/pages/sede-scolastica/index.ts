import '@/js/main';
// import '@/styles/sede-scolastica.css';
import { render, fromHTML, mount } from '@/js/utils/templates';

import { renderCards } from '@/js/engines/cards';

import headerHTML from '@/templates/layout/header.html?raw';
import footerHTML from '@/templates/layout/footer.html?raw';
import ratingHTML from '@/templates/layout/rating.html?raw';
import breadcrumbsHTML from '@/templates/layout/breadcrumb.html?raw';

import sectionList from '@/templates/components/section-list.html?raw';

import heroPresentationHTML from '@/templates/components/hero-presentation.html?raw';
import article from '@/templates/components/article.html?raw';
import carouselHTML from '@/templates/components/carousel.html?raw';
import indirizziStudioHTML from '@/templates/sede-scolastica/indirizzi-studio.html?raw';
import orariHTML from '@/templates/sede-scolastica/orari.html?raw';
import calendarioHTML from '@/templates/sede-scolastica/calendario.html?raw';
import chiusureHTML from '@/templates/sede-scolastica/chiusure.html?raw';

import data from './data.json';

const templates = {
  header: fromHTML(headerHTML),
  breadcrumbs: fromHTML(breadcrumbsHTML),
  hero: fromHTML(heroPresentationHTML),
  article: fromHTML(article),
  carousel: fromHTML(carouselHTML),
  indirizziStudio: fromHTML(indirizziStudioHTML),
  orari: fromHTML(orariHTML),
  calendario: fromHTML(calendarioHTML),
  chiusure: fromHTML(chiusureHTML),
  sectionList: fromHTML(sectionList),
  rating: fromHTML(ratingHTML),
  footer: fromHTML(footerHTML),
};

/* header */
mount('main-header', render(templates.header));
mount('breadcrumbs', render(templates.breadcrumbs, data.breadcrumbs));

// /* hero */
mount('hero', render(templates.hero, data.hero));

// /* article */
mount('la-nostra-scuola', render(templates.article, data.laNostraScuola));

/* carousel */
mount('carousel', render(templates.carousel, data.carousel));

mount('indirizzi-studio', render(templates.indirizziStudio));

/*luoghi*/
const luoghi = render(templates.sectionList, data.luoghi);
mount('luoghi', luoghi, [
  {
    selector: '[data-cards]',
    content: renderCards(data.luoghi.items),
  },
]);

/*dove siamo*/
const doveSiamo = render(templates.sectionList, data.doveSiamo);
mount('dove-siamo', doveSiamo, [
  {
    selector: '[data-cards]',
    content: renderCards(data.doveSiamo.items),
  },
]);

const orari = render(templates.orari, data.orari);
mount('orari', orari, [
  {
    selector: '[data-cards]',
    content: renderCards(data.orari.items),
  },
]);

mount('calendario', render(templates.calendario));
mount('chiusure', render(templates.chiusure));

/* servizi */
const servizi = render(templates.sectionList, data.servizi);
mount('servizi', servizi, [
  {
    selector: '[data-cards]',
    content: renderCards(data.servizi.items),
  },
]);

/* novità */
const novita = render(templates.sectionList, data.novita);
mount('novita', novita, [
  {
    selector: '[data-cards]',
    content: renderCards(data.novita.items),
  },
]);

/* documenti */
const documenti = render(templates.sectionList, data.documenti);
mount('documenti', documenti, [
  {
    selector: '[data-cards]',
    content: renderCards(data.documenti.items),
  },
]);

/* progetti */
const progetti = render(templates.sectionList, data.progetti);
mount('progetti', progetti, [
  {
    selector: '[data-cards]',
    content: renderCards(data.progetti.items),
  },
]);

/* rating */
mount('rating', render(templates.rating));

/* footer */
mount('footer', render(templates.footer));
