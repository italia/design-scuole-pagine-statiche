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
// import carouselSlideHTML from '@/templates/cards/carousel-slide.html?raw';
// import studiaConNoiHTML from '@/templates/homepage/studia-con-noi.html?raw';
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
  // carouselSlide: fromHTML(carouselSlideHTML),
  // studiaConNoi: fromHTML(studiaConNoiHTML),
  // circolariServizi: fromHTML(circolariServiziHTML),
  // tools: fromHTML(toolsHTML),
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

// /* studia con noi */
// const studiaConNoiFrag = render(templates.studiaConNoi, data.studiaConNoi);
// studiaConNoiFrag.querySelector('[data-cards]')?.appendChild(renderCards(data.studiaConNoi.cards));
// mount('studia-con-noi', studiaConNoiFrag);

// /* circolari e servizi */
// const circolariServiziFrag = render(templates.circolariServizi);
// circolariServiziFrag
//   .querySelector('[data-cards="circolari"]')
//   ?.appendChild(renderCards(data.circolariEServizi.circolari.circolariDataCards));
// circolariServiziFrag
//   .querySelector('[data-cards="servizi"]')
//   ?.appendChild(renderCards(data.circolariEServizi.servizi.serviziDataCards));
// mount('circolari-e-servizi', circolariServiziFrag);

// /* strumenti digitali */
// const toolsFrag = render(templates.tools, data.tools);
// toolsFrag.querySelector('[data-cards]')?.appendChild(renderCards(data.tools.cards));
// mount('strumenti-digitali', toolsFrag);

// /* finanziamenti */
// const finanziamentiFrag = render(templates.finanziamenti, data.finanziamenti);
// finanziamentiFrag.querySelector('[data-cards]')?.appendChild(renderCards(data.finanziamenti.cards));
// mount('finanziamenti', finanziamentiFrag);

// /* trasparenza */
// const trasparenzaFrag = render(templates.trasparenza, data.trasparenza);
// trasparenzaFrag.querySelector('[data-cards]')?.appendChild(renderCards(data.trasparenza.cards));
// mount('trasparenza', trasparenzaFrag);

// /* area personale */
// mount('personale-scolastico', render(templates.personale, data.areaPersonale));

/* rating */
mount('rating', render(templates.rating));

/* footer */
mount('footer', render(templates.footer));
