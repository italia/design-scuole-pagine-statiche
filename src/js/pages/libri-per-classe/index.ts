import '@/js/main';
import { render, fromHTML, mount } from '@/js/utils/templates';

import headerHTML from '@/templates/layout/header.html?raw';
import footerHTML from '@/templates/layout/footer.html?raw';
import ratingHTML from '@/templates/layout/rating.html?raw';
import breadcrumbsHTML from '@/templates/layout/breadcrumb.html?raw';
import heroHTML from '@/templates/components/hero-presentation.html?raw';
import serviceSectionHTML from '@/templates/servizio/service-section.html?raw';
import contentUlterioriInformazioniHTML from '@/templates/components/pagina-foglia/content-ulteriori-informazioni.html?raw';
import accordionHTML from '@/templates/components/pagina-foglia/accordion.html?raw';

import data from '@/js/pages/libri-per-classe/data.json';

const templates = {
  header: fromHTML(headerHTML),
  breadcrumbs: fromHTML(breadcrumbsHTML),
  serviceSection: fromHTML(serviceSectionHTML),
  contentUlterioriInformazioni: fromHTML(contentUlterioriInformazioniHTML),
  rating: fromHTML(ratingHTML),
  footer: fromHTML(footerHTML),
  hero: fromHTML(heroHTML),
  accordion: fromHTML(accordionHTML),
};

/* Layout base */
mount('main-header', render(templates.header));
mount('breadcrumbs', render(templates.breadcrumbs, data.breadcrumbs));

/* Hero */
const hero = render(templates.hero, data.hero);
document.getElementById('hero-presentation')?.appendChild(hero);

/* Render sezione principale */
const section = render(templates.serviceSection, data.contentBody.elenco);
document.getElementById('content-body')?.appendChild(section);

/*render accordion*/

const accordion = render(templates.accordion, data.scuole);
document.getElementById('accordion')?.appendChild(accordion);

/* render informazioni */
const info = render(templates.contentUlterioriInformazioni, data.info);
document.getElementById('informazioni')?.appendChild(info);

/* Rating & Footer */
mount('rating', render(templates.rating));
mount('footer', render(templates.footer));
