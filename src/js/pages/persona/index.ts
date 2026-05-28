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

import pageInfosHTML from '@/templates/components/page-infos.html?raw';

import contentTextHTML from '@/templates/persona/content-text.html?raw';
import contatti from '@/templates/persona/contatti.html?raw';

import data from './data.json';

const templates = {
  header: fromHTML(headerHTML),
  breadcrumbs: fromHTML(breadcrumbsHTML),
  contentHeader: fromHTML(contentHeaderHTML),
  contentBody: fromHTML(contentBodyHTML),
  sectionList: fromHTML(sectionList),
  pageInfos: fromHTML(pageInfosHTML),
  contentText: fromHTML(contentTextHTML),
  rating: fromHTML(ratingHTML),
  footer: fromHTML(footerHTML),
  contatti: fromHTML(contatti),
};

/* header */
mount('main-header', render(templates.header));
mount('breadcrumbs', render(templates.breadcrumbs, data.breadcrumbs));

mount('content-header', render(templates.contentHeader, data.contentHeader));

templates.contentBody.content
  .querySelector('[data-content-text]')
  ?.replaceWith(fromHTML(contentTextHTML).content.cloneNode(true));

const contentBody = render(templates.contentBody, data.contentBody);

const doveLavora = render(templates.sectionList, data.contentBody.doveLavora);
doveLavora
  .querySelector('[data-cards]')
  ?.appendChild(renderCards(data.contentBody.doveLavora.items));

const strutture = render(templates.sectionList, data.contentBody.strutture);
strutture.querySelector('[data-cards]')?.appendChild(renderCards(data.contentBody.strutture.items));

const documenti = render(templates.sectionList, data.contentBody.documenti);
documenti.querySelector('[data-cards]')?.appendChild(renderCards(data.contentBody.documenti.items));

mount('content-body', contentBody, [
  {
    selector: '#biografia',
    content: render(templates.sectionList, data.contentBody.biografia),
    mode: 'replace',
  },
  {
    selector: '#dove-lavora',
    content: doveLavora,
    mode: 'replace',
  },
  {
    selector: '#strutture',
    content: strutture,
    mode: 'replace',
  },

  {
    selector: '#documenti',
    content: documenti,
    mode: 'replace',
  },

  {
    selector: '#contatti',
    content: render(templates.contatti),
    mode: 'replace',
  },
  {
    selector: '#page-infos',
    content: render(templates.pageInfos, data.contentBody.pageInfos),
    mode: 'replace',
  },
]);

/* rating */
mount('rating', render(templates.rating));

/* footer */
mount('footer', render(templates.footer));
