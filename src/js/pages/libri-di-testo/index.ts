import '@/js/main';
// import '@/styles/sede-scolastica.css';
import { render, fromHTML, mount } from '@/js/utils/templates';

import headerHTML from '@/templates/layout/header.html?raw';
import footerHTML from '@/templates/layout/footer.html?raw';
import ratingHTML from '@/templates/layout/rating.html?raw';
import breadcrumbsHTML from '@/templates/layout/breadcrumb.html?raw';
import heroHTML from '@/templates/components/hero-presentation.html?raw';
import sectionList from '@/templates/components/section-list.html?raw';

import contentBodyHTML from '@/templates/components/pagina-foglia/content-body.html?raw';
import contentUlterioriInformazioniHTML from '@/templates/components/pagina-foglia/content-ulteriori-informazioni.html?raw';

import data from '@/js/pages/libri-di-testo/data.json';

const templates = {
  header: fromHTML(headerHTML),
  breadcrumbs: fromHTML(breadcrumbsHTML),
  contentBody: fromHTML(contentBodyHTML),
  sectionList: fromHTML(sectionList),
  contentUlterioriInformazioni: fromHTML(contentUlterioriInformazioniHTML),
  rating: fromHTML(ratingHTML),
  footer: fromHTML(footerHTML),
  hero: fromHTML(heroHTML),
};

/* header */
mount('main-header', render(templates.header));
mount('breadcrumbs', render(templates.breadcrumbs, data.breadcrumbs));

const hero = render(templates.hero, data.hero);
const container = document.getElementById('hero-presentation');
container?.appendChild(hero);
