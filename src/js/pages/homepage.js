import '../main.js';
import { render, renderList, fromHTML } from '../templates.js';

import serviceSectionHTML from '../../templates/inEvidenceSection.html?raw';
import serviceCardHTML from '../../templates/inEvidenceCard.html?raw';
import headerHTML from '../../templates/headerCopy.html?raw';
import heroHTML from '../../templates/hero-copy.html?raw';

const templates = {
  serviceSection: fromHTML(serviceSectionHTML),
  serviceCard: fromHTML(serviceCardHTML),
  header: fromHTML(headerHTML),
  hero: fromHTML(heroHTML),
};

const sezioniServizi = {
  titolo: 'In evidenza',
  cards: [
    {
      titolo: 'Open day nella sede centrale',
      descrizione: '',
      url: '#',
    },
    {
      titolo: 'Spettacolo finale per il corso di teatro per le primarie',
      descrizione:
        'Questo è un testo breve che riassume il contenuto della pagina di destinazione in massimo tre o quattro righe, senza troncamento.',
      url: '#',
    },
    {
      titolo: 'Orientamento per le classi di terza media',
      descrizione:
        'Questo è un testo breve che riassume il contenuto della pagina di destinazione in massimo tre o quattro righe, senza troncamento.',
      url: '#',
    },
  ],
};

const mainHeader = {
  scuola: {
    nome: 'Liceo Scientifico Statale',
    denominazione: 'Federico Hernandez',
    citta: 'Livorno',
  },
};

const Hero = {
  scuola: {
    denominazione: "Istituto comprensivo",
    nome:"Federico Hernandez",
    citta: "Livorno", 
    descrizione: "Lo scopo della scuola è quello di trasformare gli specchi in finestre",
  },
};

/*render */

const risultato = render(templates.serviceSection, { titolo: sezioniServizi.titolo });

const cardsContainer = risultato.querySelector('[data-cards]');

const cardsListFragment = renderList(templates.serviceCard, sezioniServizi.cards);

cardsContainer.appendChild(cardsListFragment);

const mainContainer = document.getElementById('in-evidenza');

if (mainContainer) {
  mainContainer.appendChild(risultato);
}

/*render header */
const headerFragment = render(templates.header, mainHeader.scuola);

const mainHeaderContainer = document.getElementById('main-header');

if (mainHeaderContainer) {
  mainHeaderContainer.appendChild(headerFragment);
}

/*render hero*/
const heroFragment = render(templates.hero, Hero.scuola);

const mainHeroContainer = document.getElementById('hero');

if (mainHeroContainer) {
  mainHeroContainer.appendChild(heroFragment);
}
