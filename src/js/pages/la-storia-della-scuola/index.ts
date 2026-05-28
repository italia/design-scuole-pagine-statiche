import '@/js/main';
import '@/styles/la-storia-della-scuola.css';
import { render, fromHTML, mount } from '@/js/utils/templates';

import headerHTML from '@/templates/layout/header.html?raw';
import footerHTML from '@/templates/layout/footer.html?raw';
import ratingHTML from '@/templates/layout/rating.html?raw';
import breadcrumbsHTML from '@/templates/layout/breadcrumb.html?raw';

import heroPresentationHTML from '@/templates/components/hero-presentation.html?raw';

import heroTextHTML from '@/templates/la-storia-della-scuola/hero-text-image.html?raw';
import pageInfosHTML from '@/templates/components/page-infos.html?raw';

import data from './data.json';

const templates = {
  header: fromHTML(headerHTML),
  breadcrumbs: fromHTML(breadcrumbsHTML),
  pageHeader: fromHTML(heroPresentationHTML),
  hero: fromHTML(heroTextHTML),
  pageInfos: fromHTML(pageInfosHTML),
  rating: fromHTML(ratingHTML),
  footer: fromHTML(footerHTML),
};

/* header */
mount('main-header', render(templates.header));
mount('breadcrumbs', render(templates.breadcrumbs, data.breadcrumbs));

/* hero */
mount('pageHeader', render(templates.pageHeader, data.pageHeader));

/* hero */
mount('y1978', render(templates.hero, data.hero1978));
mount('y1999', render(templates.hero, data.hero1999));
mount('y2014', render(templates.hero, data.hero2014));
mount('y2022', render(templates.hero, data.hero2022));

mount('page-infos', render(templates.pageInfos, data));

/* rating */
mount('rating', render(templates.rating));

/* footer */
mount('footer', render(templates.footer));
