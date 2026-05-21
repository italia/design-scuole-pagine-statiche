import '@/js/main';
// import '@/styles/sede-scolastica.css';
import { render, fromHTML, mount } from '@/js/utils/templates';

import { renderCards } from '@/js/engines/cards';
import headerHTML from '@/templates/layout/header.html?raw';
import footerHTML from '@/templates/layout/footer.html?raw';
import ratingHTML from '@/templates/layout/rating.html?raw';
import breadcrumbsHTML from '@/templates/layout/breadcrumb.html?raw';

import sectionList from '@/templates/components/section-list.html?raw';

import contentHeaderHTML from '@/templates/components/pagina-foglia/content-header.html?raw';
import contentBodyHTML from '@/templates/components/pagina-foglia/content-body.html?raw';

import data from './data.json';

const templates = {
  header: fromHTML(headerHTML),
  breadcrumbs: fromHTML(breadcrumbsHTML),
  contentHeader: fromHTML(contentHeaderHTML),
  contentBody: fromHTML(contentBodyHTML),
  sectionList: fromHTML(sectionList),
  rating: fromHTML(ratingHTML),
  footer: fromHTML(footerHTML),
};

/* header */
mount('main-header', render(templates.header));
mount('breadcrumbs', render(templates.breadcrumbs, data.breadcrumbs));

mount('content-header', render(templates.contentHeader, data.contentHeader));

const contentBody = render(templates.contentBody, data.contentBody);

contentBody
  .querySelector('#cosa-fa')
  ?.replaceWith(render(templates.sectionList, data.contentBody.cosaFa));

const doveSiTrova = render(templates.sectionList, data.contentBody.doveSiTrova);
doveSiTrova
  .querySelector('[data-cards]')
  ?.appendChild(renderCards(data.contentBody.doveSiTrova.items));
contentBody.querySelector('#dove-si-trova')?.replaceWith(doveSiTrova);

// contentBody.querySelector('#orari-di-apertura')?.appendChild(document.createTextNode(data.orariDiApertura));
// contentBody.querySelector('#contatti')?.appendChild(document.createTextNode(data.contatti));
// contentBody.querySelector('#dipende-da')?.appendChild(document.createTextNode(data.dipendeDa));
// contentBody.querySelector('#responsabile')?.appendChild(document.createTextNode(data.responsabile));
// contentBody.querySelector('#personale')?.appendChild(document.createTextNode(data.personale));
// contentBody.querySelector('#ulteriori-informazioni')?.appendChild(document.createTextNode(data.ulterioriInformazioni));
mount('content-body', contentBody);

// // /* article */
// mount('la-nostra-scuola', render(templates.article, data.laNostraScuola));

// /* carousel */
// mount('carousel', render(templates.carousel, data.carousel));

// mount('indirizzi-studio', render(templates.indirizziStudio));

// /*luoghi*/
// const luoghi = render(templates.sectionList, data.luoghi);
// luoghi.querySelector('[data-cards]')?.appendChild(renderCards(data.luoghi.items));
// mount('luoghi', luoghi);

// /*dove siamo*/
// const doveSiamo = render(templates.sectionList, data.doveSiamo);
// doveSiamo.querySelector('[data-cards]')?.appendChild(renderCards(data.doveSiamo.items));
// mount('dove-siamo', doveSiamo);

// const orari = render(templates.orari, data.orari);
// orari.querySelector('[data-cards]')?.appendChild(renderCards(data.orari.items));
// mount('orari', orari);

// mount('calendario', render(templates.calendario));
// mount('chiusure', render(templates.chiusure));

// /* servizi */
// const servizi = render(templates.sectionList, data.servizi);
// servizi.querySelector('[data-cards]')?.appendChild(renderCards(data.servizi.items));
// mount('servizi', servizi);

// /* novità */
// const novita = render(templates.sectionList, data.novita);
// novita.querySelector('[data-cards]')?.appendChild(renderCards(data.novita.items));
// mount('novita', novita);

// /* documenti */
// const documenti = render(templates.sectionList, data.documenti);
// documenti.querySelector('[data-cards]')?.appendChild(renderCards(data.documenti.items));
// mount('documenti', documenti);

// /* progetti */
// const progetti = render(templates.sectionList, data.progetti);
// progetti.querySelector('[data-cards]')?.appendChild(renderCards(data.progetti.items));
// mount('progetti', progetti);

/* rating */
mount('rating', render(templates.rating));

/* footer */
mount('footer', render(templates.footer));
