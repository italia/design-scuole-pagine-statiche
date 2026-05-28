import '@/js/main';
import '@/styles/istituto.css';
import { render, fromHTML, mount } from '@/js/utils/templates';
import { renderCards } from '@/js/engines/cards';

import headerHTML from '@/templates/layout/header.html?raw';
import footerHTML from '@/templates/layout/footer.html?raw';
import ratingHTML from '@/templates/layout/rating.html?raw';
import breadcrumbHTML from '@/templates/layout/breadcrumb.html?raw';

import heroPresentationHTML from '@/templates/components/hero-presentation.html?raw';
import sectionList from '@/templates/components/section-list.html?raw';
import callToActionHTML from '@/templates/components/call-to-action.html?raw';

import numeriIstitutoHTML from '@/templates/istituto/numeri-istituto.html?raw';
import organizzazioneHTML from '@/templates/istituto/organizzazione.html?raw';
import contattiSezioneHTML from '@/templates/istituto/contatti-sezione.html?raw';

import data from './data.json';

const templates = {
  header: fromHTML(headerHTML),
  breadcrumb: fromHTML(breadcrumbHTML),
  hero: fromHTML(heroPresentationHTML),
  footer: fromHTML(footerHTML),
  rating: fromHTML(ratingHTML),
  numeriIstituto: fromHTML(numeriIstitutoHTML),
  callToAction: fromHTML(callToActionHTML),
  organizzazione: fromHTML(organizzazioneHTML),
  contattiSezione: fromHTML(contattiSezioneHTML),
  sectionList: fromHTML(sectionList),
};

/* header */
mount('main-header', render(templates.header));

/* breadcrumb */
mount('breadcrumb', render(templates.breadcrumb, data.breadcrumb));

/* hero */
mount('hero', render(templates.hero, data.hero));

/* numeri istituto */
mount('numeri-istituto', render(templates.numeriIstituto));

/* le nostre scuole */
const nostreScuoleFrag = render(templates.sectionList, data.nostreScuole);
mount('nostre-scuole', nostreScuoleFrag, [
  {
    selector: '[data-cards]',
    content: renderCards(data.nostreScuole.items),
  },
]);

/* offerta formativa */
mount('offerta-formativa', render(templates.callToAction, data.offertaFormativa));

/* organizzazione */
const organizzazioneFrag = render(templates.organizzazione, data.organizzazione);
mount('organizzazione', organizzazioneFrag, [
  {
    selector: '[data-cards]',
    content: renderCards(data.organizzazione.cards),
  },
]);

/* contatti */
const contattiFrag = render(templates.contattiSezione, data.contattiSezione);
mount('contatti-sezione', contattiFrag, [
  {
    selector: '[data-cards]',
    content: renderCards(data.contattiSezione.cards),
  },
]);

/* storia */
mount('storia', render(templates.callToAction, data.storia));

/* documenti */
const documenti = render(templates.sectionList, data.documenti);
mount('documenti', documenti, [
  {
    selector: '[data-cards]',
    content: renderCards(data.documenti.items),
  },
]);

/* finanziamenti */
const finanziamenti = render(templates.sectionList, data.finanziamenti);
mount('finanziamenti', finanziamenti, [
  {
    selector: '[data-cards]',
    content: renderCards(data.finanziamenti.items),
  },
]);

/* rating */
mount('rating', render(templates.rating));

/* footer */
mount('footer', render(templates.footer));
