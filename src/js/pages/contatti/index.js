import '@/js/main';
// import '@/styles/sede-scolastica.css';
import { render, fromHTML, mount } from '@/js/utils/templates';

import headerHTML from '@/templates/layout/header.html?raw';
import footerHTML from '@/templates/layout/footer.html?raw';
import ratingHTML from '@/templates/layout/rating.html?raw';
import breadcrumbsHTML from '@/templates/layout/breadcrumb.html?raw';

import sectionList from '@/templates/components/section-list.html?raw';

import contentHeaderHTML from '@/templates/components/pagina-foglia/content-header.html?raw';
import contentBodyHTML from '@/templates/components/pagina-foglia/content-body.html?raw';

import pageInfosHTML from '@/templates/components/page-infos.html?raw';

import contentTextHTML from '@/templates/unita-organizzativa/content-text.html?raw';
import heroHTML from '@/templates/components/hero-presentation.html?raw';

import data from '@/js/pages/contatti/data.json';

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
  hero: fromHTML(heroHTML),
};

/* header */
mount('main-header', render(templates.header));
mount('breadcrumbs', render(templates.breadcrumbs, data.breadcrumbs));

mount('content-header', render(templates.contentHeader, data.contentHeader));

const hero = render(templates.hero, data.hero);
const container = document.getElementById('hero-secondario');
container?.appendChild(hero);
