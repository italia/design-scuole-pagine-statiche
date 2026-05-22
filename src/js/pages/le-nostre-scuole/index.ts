import '@/js/main';
// import '@/styles/sede-scolastica.css';
import { render, fromHTML, mount } from '@/js/utils/templates';

import headerHTML from '@/templates/layout/header.html?raw';
import footerHTML from '@/templates/layout/footer.html?raw';
import ratingHTML from '@/templates/layout/rating.html?raw';
import breadcrumbsHTML from '@/templates/layout/breadcrumb.html?raw';
import searchBlockHTML from '@/templates/components/search-block.html?raw';
import cardLocation from '@/templates/cards/card-location.html?raw';

import heroPresentationHTML from '@/templates/components/hero-presentation.html?raw';

import data from './data.json';

const templates = {
  header: fromHTML(headerHTML),
  breadcrumbs: fromHTML(breadcrumbsHTML),
  hero: fromHTML(heroPresentationHTML),
  searchBlock: fromHTML(searchBlockHTML),
  rating: fromHTML(ratingHTML),
  footer: fromHTML(footerHTML),
};

/* header */
mount('main-header', render(templates.header));
mount('breadcrumbs', render(templates.breadcrumbs, data.breadcrumbs));

/* hero */
mount('hero', render(templates.hero, data.hero));

templates.searchBlock.content
  .querySelector('[data-card-template]')
  ?.replaceWith(fromHTML(cardLocation).content.cloneNode(true));
const search = render(templates.searchBlock, data.search);

mount('search-block', search);

/* rating */
mount('rating', render(templates.rating));

/* footer */
mount('footer', render(templates.footer));
