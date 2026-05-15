import '@/js/main';
import '@/styles/homepage.css';
import { render, renderList, fromHTML, mount } from '@/js/utils/templates';
import { renderCards } from '@/js/engines/cards';

import preheaderHTML from '@/templates/layout/preheader.html?raw';
import headerHTML from '@/templates/layout/header.html?raw';
import heroHTML from '@/templates/layout/hero.html?raw';
import footerHTML from '@/templates/layout/footer.html?raw';

import inEvidenzaHTML from '@/templates/homepage/in-evidenza.html?raw';
import carouselHTML from '@/templates/homepage/carousel.html?raw';
import carouselSlideHTML from '@/templates/cards/carousel-slide.html?raw';
import studiaConNoiHTML from '@/templates/homepage/studia-con-noi.html?raw';
import circolariServiziHTML from '@/templates/homepage/circolari-servizi.html?raw';
import toolsHTML from '@/templates/homepage/tools.html?raw';
import finanziamentiHTML from '@/templates/homepage/finanziamenti.html?raw';
import trasparenzaHTML from '@/templates/homepage/trasparenza.html?raw';
import personaleHTML from '@/templates/homepage/personale.html?raw';
import ratingHTML from '@/templates/homepage/rating.html?raw';

import data from './data.json';

const templates = {
  preheader: fromHTML(preheaderHTML),
  header: fromHTML(headerHTML),
  hero: fromHTML(heroHTML),
  inEvidenza: fromHTML(inEvidenzaHTML),
  carousel: fromHTML(carouselHTML),
  carouselSlide: fromHTML(carouselSlideHTML),
  studiaConNoi: fromHTML(studiaConNoiHTML),
  circolariServizi: fromHTML(circolariServiziHTML),
  tools: fromHTML(toolsHTML),
  finanziamenti: fromHTML(finanziamentiHTML),
  trasparenza: fromHTML(trasparenzaHTML),
  personale: fromHTML(personaleHTML),
  rating: fromHTML(ratingHTML),
  footer: fromHTML(footerHTML),
};

/* preheader */
// mount('site-preheader', render(templates.preheader, data.preHeader));

/* header */
mount('main-header', render(templates.header, { ...data.preHeader, ...data.mainHeader }));

/* hero */
mount('hero', render(templates.hero, data.hero));

/* in evidenza */
const inEvidenzaFrag = render(templates.inEvidenza, { titolo: data.sezioniServizi.titolo });
inEvidenzaFrag.querySelector('[data-cards]')?.appendChild(renderCards(data.sezioniServizi.cards));
mount('in-evidenza', inEvidenzaFrag);

/* carousel */
const carouselFrag = render(templates.carousel, { titolo: data.carousel.titolo });
carouselFrag
  .querySelector('[data-cards]')
  ?.appendChild(renderList(templates.carouselSlide, data.carousel.slides));
mount('carousel', carouselFrag);

/* studia con noi */
const studiaConNoiFrag = render(templates.studiaConNoi, data.studiaConNoi);
studiaConNoiFrag.querySelector('[data-cards]')?.appendChild(renderCards(data.studiaConNoi.cards));
mount('studia-con-noi', studiaConNoiFrag);

/* circolari e servizi */
const circolariServiziFrag = render(templates.circolariServizi);
circolariServiziFrag
  .querySelector('[data-cards="circolari"]')
  ?.appendChild(renderCards(data.circolariEServizi.circolari.circolariDataCards));
circolariServiziFrag
  .querySelector('[data-cards="servizi"]')
  ?.appendChild(renderCards(data.circolariEServizi.servizi.serviziDataCards));
mount('circolari-e-servizi', circolariServiziFrag);

/* strumenti digitali */
const toolsFrag = render(templates.tools, data.tools);
toolsFrag.querySelector('[data-cards]')?.appendChild(renderCards(data.tools.cards));
mount('strumenti-digitali', toolsFrag);

/* finanziamenti */
const finanziamentiFrag = render(templates.finanziamenti, data.finanziamenti);
finanziamentiFrag.querySelector('[data-cards]')?.appendChild(renderCards(data.finanziamenti.cards));
mount('finanziamenti', finanziamentiFrag);

/* trasparenza */
const trasparenzaFrag = render(templates.trasparenza, data.trasparenza);
trasparenzaFrag.querySelector('[data-cards]')?.appendChild(renderCards(data.trasparenza.cards));
mount('trasparenza', trasparenzaFrag);

/* area personale */
mount('personale-scolastico', render(templates.personale, data.areaPersonale));

/* rating */
mount('rating', render(templates.rating));

/* footer */
mount('footer', render(templates.footer, data.footerSection));
