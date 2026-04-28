import '@/js/main';
import { render, fromHTML } from '@/js/utils/templates';

import serviceSectionHTML from '@/templates/inEvidenceSection.html?raw';
import preheaderHTML from '@/templates/preheader.html?raw';
import headerHTML from '@/templates/header.html?raw';
import heroHTML from '@/templates/hero-secondario.html?raw';
import strumentiHTML from '@/templates/tools.html?raw';
import finanziamentiHTML from '@/templates/finanziamenti.html?raw';
import footerHTML from '@/templates/footer.html?raw';
import ratingHTML from '@/templates/rating.html?raw';

import data from '@/js/pages/organizzazione.json';

const templates = {
  serviceSection: fromHTML(serviceSectionHTML),
  header: fromHTML(headerHTML),
  hero: fromHTML(heroHTML),
  preheader: fromHTML(preheaderHTML),
  strumenti: fromHTML(strumentiHTML),
  finanziamenti: fromHTML(finanziamentiHTML),
  footer: fromHTML(footerHTML),
  rating: fromHTML(ratingHTML),
};

/* render header */
const headerFragment = render(templates.header, data.mainHeader.scuola);

const mainHeaderContainer = document.getElementById('main-header');
if (mainHeaderContainer) {
  mainHeaderContainer.appendChild(headerFragment);
}

/* render hero */
const heroFragment = render(templates.hero, data.hero.info);

const mainHeroContainer = document.getElementById('hero');
if (mainHeroContainer) {
  mainHeroContainer.appendChild(heroFragment);
}

/*render dirigenza*/
