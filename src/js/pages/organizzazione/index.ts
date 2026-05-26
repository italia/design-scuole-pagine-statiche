import '@/js/main';
// import '@/styles/la-storia-della-scuola.css';
import { render, fromHTML, mount } from '@/js/utils/templates';

import headerHTML from '@/templates/layout/header.html?raw';
import footerHTML from '@/templates/layout/footer.html?raw';
import ratingHTML from '@/templates/layout/rating.html?raw';
import breadcrumbsHTML from '@/templates/layout/breadcrumb.html?raw';

import heroPresentationHTML from '@/templates/components/hero-presentation.html?raw';
import sectionList from '@/templates/components/section-list.html?raw';

import pageInfosHTML from '@/templates/components/page-infos.html?raw';

import data from './data.json';
import { renderCards } from '@/js/engines/cards';

const templates = {
  header: fromHTML(headerHTML),
  breadcrumbs: fromHTML(breadcrumbsHTML),
  pageHeader: fromHTML(heroPresentationHTML),
  sectionList: fromHTML(sectionList),
  pageInfos: fromHTML(pageInfosHTML),
  rating: fromHTML(ratingHTML),
  footer: fromHTML(footerHTML),
};

/* header */
mount('main-header', render(templates.header));
mount('breadcrumbs', render(templates.breadcrumbs, data.breadcrumbs));

/* hero */
mount('pageHeader', render(templates.pageHeader, data.pageHeader));

const dirigenza = render(templates.sectionList, data.dirigenza);
mount('dirigenza', dirigenza, [
  {
    selector: '[data-cards]',
    content: renderCards(data.dirigenza.items),
  },
]);

const organi = render(templates.sectionList, data.organi);
mount('organi', organi, [
  {
    selector: '[data-cards]',
    content: renderCards(data.organi.items),
  },
]);

const funzioni = render(templates.sectionList, data.funzioni);
mount('funzioni', funzioni, [
  {
    selector: '[data-cards]',
    content: renderCards(data.funzioni.items),
  },
]);

const persone = render(templates.sectionList, data.persone);
mount('persone', persone, [
  {
    selector: '[data-cards]',
    content: renderCards(data.persone.items),
  },
]);

const finanziamenti = render(templates.sectionList, data.finanziamenti);
mount('finanziamenti', finanziamenti, [
  {
    selector: '[data-cards]',
    content: renderCards(data.finanziamenti.items),
  },
]);

mount('page-infos', render(templates.pageInfos, data));

/* rating */
mount('rating', render(templates.rating));

/* footer */
mount('footer', render(templates.footer));
