import '../main.js';
import { render, renderList, fromHTML } from '../templates.js';

import serviceSectionHTML from '../../templates/inEvidenceSection.html?raw';
import serviceCardHTML from '../../templates/inEvidenceCard.html?raw';

const templates = {
  serviceSection: fromHTML(serviceSectionHTML),
  serviceCard: fromHTML(serviceCardHTML),
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

/*render */
document.getElementById('in-evidenza');
const risultato = render(templates.serviceSection, { titolo: sezioniServizi.titolo });

const cardsContainer = risultato.querySelector('[data-cards]');

const cardsListFragment = renderList(templates.serviceCard, sezioniServizi.cards);

cardsContainer.appendChild(cardsListFragment);

const mainContainer = document.getElementById('in-evidenza');
if (mainContainer) {
  mainContainer.appendChild(risultato);
}
