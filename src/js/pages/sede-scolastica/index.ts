import '@/js/main';
// import '@/styles/sede-scolastica.css';
import { render, fromHTML, mount } from '@/js/utils/templates';

// import { renderCards } from '@/js/engines/cards';

import headerHTML from '@/templates/layout/header.html?raw';
import footerHTML from '@/templates/layout/footer.html?raw';
import ratingHTML from '@/templates/layout/rating.html?raw';
import breadcrumbsHTML from '@/templates/layout/breadcrumb.html?raw';

import heroPresentationHTML from '@/templates/components/hero-presentation.html?raw';
import article from '@/templates/components/article.html?raw';
import carouselHTML from '@/templates/components/carousel.html?raw';
import indirizziStudioHTML from '@/templates/sede-scolastica/indirizzi-studio.html?raw';
import luoghiHTML from '@/templates/sede-scolastica/luoghi.html?raw';
import doveSiamoHTML from '@/templates/sede-scolastica/dove-siamo.html?raw';

// import circolariServiziHTML from '@/templates/homepage/circolari-servizi.html?raw';
// import toolsHTML from '@/templates/homepage/tools.html?raw';
// import finanziamentiHTML from '@/templates/homepage/finanziamenti.html?raw';
// import trasparenzaHTML from '@/templates/homepage/trasparenza.html?raw';
// import personaleHTML from '@/templates/homepage/personale.html?raw';

import data from './data.json';

const templates = {
  header: fromHTML(headerHTML),
  breadcrumbs: fromHTML(breadcrumbsHTML),
  hero: fromHTML(heroPresentationHTML),
  article: fromHTML(article),
  carousel: fromHTML(carouselHTML),
  indirizziStudio: fromHTML(indirizziStudioHTML),
  luoghi: fromHTML(luoghiHTML),
  doveSiamo: fromHTML(doveSiamoHTML),
  // finanziamenti: fromHTML(finanziamentiHTML),
  // trasparenza: fromHTML(trasparenzaHTML),
  // personale: fromHTML(personaleHTML),
  rating: fromHTML(ratingHTML),
  footer: fromHTML(footerHTML),
};

/* header */
mount('main-header', render(templates.header));
mount('breadcrumbs', render(templates.breadcrumbs, data.breadcrumbs));

// /* hero */
mount('hero', render(templates.hero, data.hero));

// /* article */
mount('la-nostra-scuola', render(templates.article, data.laNostraScuola));

/* carousel */
mount('carousel', render(templates.carousel, data.carousel));

mount('indirizzi-studio', render(templates.indirizziStudio));

mount('luoghi', render(templates.luoghi, data.luoghi));

mount('dove-siamo', render(templates.doveSiamo, data.doveSiamo));

/* rating */
mount('rating', render(templates.rating));

/* footer */
mount('footer', render(templates.footer));
