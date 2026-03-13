import '../main.js';
import { render, renderList, fromHTML } from '../templates.js';

import serviceSectionHTML from '../../templates/inEvidenceSection.html?raw';
import serviceCardHTML from '../../templates/inEvidenceCard.html?raw';
import headerHTML from '../../templates/headerCopy.html?raw';

const templates = {
  serviceSection: fromHTML(serviceSectionHTML),
  serviceCard: fromHTML(serviceCardHTML),
  header: fromHTML(headerHTML),
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
    nome: 'Liceo C. Lorenzini',
    denominazione: '',
    citta: 'Pescia (PT)',
  },
};
/*render */

document.getElementById('main-header');

document.getElementById('in-evidenza');

const risultato = render(templates.serviceSection, { titolo: sezioniServizi.titolo });

const header = render(templates.header, { nome: mainHeader.scuola.nome });

const cardsContainer = risultato.querySelector('[data-cards]');

const headerContainer = header.querySelector('[school-name]');

const cardsListFragment = renderList(templates.serviceCard, sezioniServizi.cards);

/*documentFragment [#text, header, #text] */
const headerFragment = render(templates.header, mainHeader.scuola);

cardsContainer.appendChild(cardsListFragment);

/* prova è documentFragment []*/
headerContainer.appendChild(headerFragment);

const mainContainer = document.getElementById('in-evidenza');

const mainHeaderContainer = document.getElementById('main-header');

if (mainContainer) {
  mainContainer.appendChild(risultato);
}

if (mainHeaderContainer) {
  mainHeaderContainer.appendChild(header);
}
