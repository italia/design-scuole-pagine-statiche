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
import contentUlterioriInformazioniHTML from '@/templates/components/pagina-foglia/content-ulteriori-informazioni.html?raw';
import pageInfosHTML from '@/templates/components/page-infos.html?raw';

import contentTextHTML from '@/templates/unita-organizzativa/content-text.html?raw';

import data from './data.json';

const templates = {
  header: fromHTML(headerHTML),
  breadcrumbs: fromHTML(breadcrumbsHTML),
  contentHeader: fromHTML(contentHeaderHTML),
  contentBody: fromHTML(contentBodyHTML),
  sectionList: fromHTML(sectionList),
  contentUlterioriInformazioni: fromHTML(contentUlterioriInformazioniHTML),
  pageInfos: fromHTML(pageInfosHTML),
  contentText: fromHTML(contentTextHTML),
  rating: fromHTML(ratingHTML),
  footer: fromHTML(footerHTML),
};

/* header */
mount('main-header', render(templates.header));
mount('breadcrumbs', render(templates.breadcrumbs, data.breadcrumbs));

mount('content-header', render(templates.contentHeader, data.contentHeader));

templates.contentBody.content
  .querySelector('[data-content-text]')
  ?.replaceWith(fromHTML(contentTextHTML).content.cloneNode(true));

const contentBody = render(templates.contentBody, data.contentBody);

contentBody
  .querySelector('#cosa-fa')
  ?.replaceWith(render(templates.sectionList, data.contentBody.cosaFa));

const doveSiTrova = render(templates.sectionList, data.contentBody.doveSiTrova);
doveSiTrova
  .querySelector('[data-cards]')
  ?.appendChild(renderCards(data.contentBody.doveSiTrova.items));
contentBody.querySelector('#dove-si-trova')?.replaceWith(doveSiTrova);

contentBody
  .querySelector('#orari-di-apertura')
  ?.replaceWith(render(templates.sectionList, data.contentBody.orari));

const contatti = render(templates.sectionList, data.contentBody.contatti);
contatti.querySelector('[data-cards]')?.appendChild(renderCards(data.contentBody.contatti.items));
contentBody.querySelector('#contatti')?.replaceWith(contatti);

const dipendeDa = render(templates.sectionList, data.contentBody.dipendeDa);
dipendeDa.querySelector('[data-cards]')?.appendChild(renderCards(data.contentBody.dipendeDa.items));
contentBody.querySelector('#dipende-da')?.replaceWith(dipendeDa);

const responsabile = render(templates.sectionList, data.contentBody.responsabile);
responsabile
  .querySelector('[data-cards]')
  ?.appendChild(renderCards(data.contentBody.responsabile.items));
contentBody.querySelector('#responsabile')?.replaceWith(responsabile);

const personale = render(templates.sectionList, data.contentBody.personale);
personale.querySelector('[data-cards]')?.appendChild(renderCards(data.contentBody.personale.items));
contentBody.querySelector('#personale')?.replaceWith(personale);

contentBody
  .querySelector('#ulteriori-informazioni')
  ?.replaceWith(
    render(templates.contentUlterioriInformazioni, data.contentBody.ulterioriInformazioni)
  );

mount('content-body', contentBody);

/* rating */
mount('rating', render(templates.rating));

/* footer */
mount('footer', render(templates.footer));
