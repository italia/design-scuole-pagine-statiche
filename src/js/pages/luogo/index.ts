import '@/js/main';
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
import carouselHTML from '@/templates/components/carousel.html?raw';
import contentTextHTML from '@/templates/luogo/content-text.html?raw';

import data from './data.json';

const templates = {
  header: fromHTML(headerHTML),
  breadcrumbs: fromHTML(breadcrumbsHTML),
  carousel: fromHTML(carouselHTML),
  contentHeader: fromHTML(contentHeaderHTML),
  contentBody: fromHTML(contentBodyHTML),
  sectionList: fromHTML(sectionList),
  contentText: fromHTML(contentTextHTML),
  pageInfos: fromHTML(pageInfosHTML),
  rating: fromHTML(ratingHTML),
  footer: fromHTML(footerHTML),
};

mount('main-header', render(templates.header));
mount('breadcrumbs', render(templates.breadcrumbs, data.breadcrumbs));
mount('content-header', render(templates.contentHeader, data.contentHeader));

templates.contentBody.content
  .querySelector('[data-content-text]')
  ?.replaceWith(fromHTML(contentTextHTML).content.cloneNode(true));

const contentBody = render(templates.contentBody, data.contentBody);

/*descrizione*/
const descrizione = render(templates.sectionList, data.contentBody.descrizione);
const carousel = document.createElement('div');
carousel.setAttribute('class', 'px-5');
carousel.appendChild(render(templates.carousel, data.contentBody.carousel));
descrizione.querySelector('section:first-of-type')?.appendChild(carousel);

/*servizi*/
const servizi = render(templates.sectionList, data.contentBody.servizi);
servizi.querySelector('[data-cards]')?.appendChild(renderCards(data.contentBody.servizi.items));

/*dove si trova */
const doveSiTrova = render(templates.sectionList, data.contentBody.doveSiTrova);
doveSiTrova
  .querySelector('[data-cards]')
  ?.appendChild(renderCards(data.contentBody.doveSiTrova.items));

const parteDi = render(templates.sectionList, data.contentBody.doveSiTrova.parteDi);
parteDi
  .querySelector('[data-cards]')
  ?.appendChild(renderCards(data.contentBody.doveSiTrova.parteDi.items));

parteDi.querySelector('section.section')?.classList.add('pt-0');

doveSiTrova.appendChild(parteDi);

/*orari*/
contentBody
  .querySelector('#orari')
  ?.replaceWith(render(templates.sectionList, data.contentBody.orari));

/*contatti */
const contatti = render(templates.sectionList, data.contentBody.contatti);
contatti.querySelector('[data-cards]')?.appendChild(renderCards(data.contentBody.contatti.items));

/*ultime notizie */
const ultimeNotizie = render(templates.sectionList, data.contentBody.ultimeNotizie);
ultimeNotizie
  .querySelector('[data-cards]')
  ?.appendChild(renderCards(data.contentBody.ultimeNotizie.items));

mount('content-body', contentBody, [
  {
    selector: '#descrizione',
    content: descrizione,
    mode: 'replace',
  },
  {
    selector: '#servizi',
    content: servizi,
    mode: 'replace',
  },
  {
    selector: '#dove-si-trova',
    content: doveSiTrova,
    mode: 'replace',
  },
  {
    selector: '#orari',
    content: render(templates.sectionList, data.contentBody.orari),
    mode: 'replace',
  },
  {
    selector: '#contatti',
    content: contatti,
    mode: 'replace',
  },
  {
    selector: '#ulteriori-informazioni',
    content: render(templates.sectionList, data.contentBody.ulterioriInformazioni),
    mode: 'replace',
  },
  {
    selector: '#ultime-notizie',
    content: ultimeNotizie,
    mode: 'replace',
  },
  {
    selector: '#page-infos',
    content: render(templates.pageInfos, data.contentBody.pageInfos),
    mode: 'replace',
  },
]);
mount('rating', render(templates.rating));
mount('footer', render(templates.footer));
