import '@/js/main';
// import '@/styles/sede-scolastica.css';
import { render, fromHTML, mount } from '@/js/utils/templates';

import headerHTML from '@/templates/layout/header.html?raw';
import footerHTML from '@/templates/layout/footer.html?raw';
import ratingHTML from '@/templates/layout/rating.html?raw';
import breadcrumbsHTML from '@/templates/layout/breadcrumb.html?raw';
import heroHTML from '@/templates/components/hero-presentation.html?raw';
import sectionListHTML from '@/templates/components/section-list.html?raw';
import selectHTML from '@/templates/components/pagina-foglia/select.html?raw';
import serviceSectionHTML from '@/templates/servizio/service-section.html?raw';

import contentBodyHTML from '@/templates/components/pagina-foglia/content-body.html?raw';
import contentUlterioriInformazioniHTML from '@/templates/components/pagina-foglia/content-ulteriori-informazioni.html?raw';

import data from '@/js/pages/libri-di-testo/data.json';

const templates = {
  header: fromHTML(headerHTML),
  breadcrumbs: fromHTML(breadcrumbsHTML),
  contentBody: fromHTML(contentBodyHTML),
  sectionList: fromHTML(sectionListHTML),
  serviceSection: fromHTML(serviceSectionHTML),
  contentUlterioriInformazioni: fromHTML(contentUlterioriInformazioniHTML),
  rating: fromHTML(ratingHTML),
  footer: fromHTML(footerHTML),
  hero: fromHTML(heroHTML),
  select: fromHTML(selectHTML),
};

/* header */
mount('main-header', render(templates.header));
mount('breadcrumbs', render(templates.breadcrumbs, data.breadcrumbs));

/* hero */
const hero = render(templates.hero, data.hero);
const container = document.getElementById('hero-presentation');
container?.appendChild(hero);

const select = render(templates.select);
const selectContainer = document.getElementById('select');
selectContainer?.appendChild(select);
