import '../main.js';
import { render, renderList, fromHTML } from '../templates.js';

import serviceSectionHTML from '../../templates/inEvidenceSection.html?raw';
import serviceCardHTML from '../../templates/inEvidenceCard.html?raw';
import preheaderHTML from '../../templates/preheader.html?raw';
import headerHTML from '../../templates/headerCopy.html?raw';
import heroHTML from '../../templates/hero-copy.html?raw';
import studyHTML from '../../templates/studywithus.html?raw';
import studycardsHTML from '../../templates/studycards.html?raw';

const templates = {
  serviceSection: fromHTML(serviceSectionHTML),
  serviceCard: fromHTML(serviceCardHTML),
  header: fromHTML(headerHTML),
  hero: fromHTML(heroHTML),
  preheader: fromHTML(preheaderHTML),
  study: fromHTML(studyHTML),
  studycards: fromHTML(studycardsHTML),
};

const preHeader = {
  ministero: "Ministero dell'Istruzione e del Merito",
  areariservata: "Accedi all'area riservata",
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
    denominazione: 'Istituto comprensivo',
    nome: 'Federico Hernandez',
    citta: 'Livorno',
    descrizione: ' "Lo scopo della scuola è quello di trasformare gli specchi in finestre" ',
  },
};

const studiaConNoi = {
  titoloSezione: 'Studia con noi',
  percorsiDiStudio: {
    titlePercorsi: 'I nostri percorsi di studio',
    description1Percorsi:
      "L'istituto offre diversi percorsi di studio pensati per accompagnare ogni studente nella propria crescita educativa",
    description2Percorsi:
      'Ogni indirizzo propone attività, metodologie e opportunità formative specifiche, così da rispondere ai diversi interessi, attitudini e obiettivi personali',
    testoLink1Percorsi: 'Esplora le nostre offerte formative',
    testoLink2Percorsi: 'Consulta il Piano di Offerta Formativa (PTOF)',
  },
  tipiScuole: {
    infanzia: "Scuola dell'infanzia",
    descrizioneTipo1: 'Percorsi attivi: tempo ridotto, tempo pieno',
    elementari: 'Scuola primaria',
    descrizioneTipo2: 'Percorsi attivi: tempo normale, tempo pieno',
    medie: 'Scuola secondaria di primo grado',
  },
  progettiIstituto: {
    titleProgetti: "I progetti dell'istituto",
    description1Progetti:
      "L'istituto promuove ogni anno un ampio programma di progetti e attività pensati per arricchire il percorso formativo degli studenti",
    description2Progetti:
      'Esperienze didattiche, laboratoriali e culturali si integrano alla vita scolastica per favorire partecipazione, crescita personale, inclusione e scoperta del territorio',
    testolinkProgetti: 'Vai a tutti i progetti',
  },
  cards: [
    {
      cardTitle: 'Uscite didattiche',
      cardDescription: "Esperienze fuori dall'aula",
      url: '#',
    },
    {
      cardTitle: 'Corsi e certificazioni',
      cardDescription: 'Attività pratiche e sperimentali',
      url: '#',
    },
    {
      cardTitle: 'Progetti di orientamento',
      cardDescription: 'Supporto alle scelte future',
      url: '#',
    },
    {
      cardTitle: 'Laboratori didattici',
      cardDescription: 'Attività pratiche e sperimentali',
      url: '#',
    },
    {
      cardTitle: 'Gare e concorsi',
      cardDescription: 'Sfide educative e creative',
      url: '#',
    },
    {
      cardTitle: 'Progetti territorio e ambiente',
      cardDescription: 'Scoperta e cura del territorio',
      url: '#',
    },
  ],
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

/*render pre-header*/
const preheaderFragment = render(templates.preheader, preHeader);

const preHeaderContainer = document.getElementById('site-preheader');

if (preHeaderContainer) {
  preHeaderContainer.appendChild(preheaderFragment);
}

/*render studia-con-noi */

const datiBase = {
  titoloSezione: studiaConNoi.titoloSezione,
  ...studiaConNoi.percorsiDiStudio,
  ...studiaConNoi.tipiScuole,
  ...studiaConNoi.progettiIstituto,
};

const studyFragment = render(templates.study, datiBase);

const studyContainer = document.getElementById('studia-con-noi');
if (studyContainer) {
  studyContainer.appendChild(studyFragment);
}

/* render study cards */

const studyCardsContainer = document.querySelector('[study-card]');

renderList(templates.studycards, studiaConNoi.cards);

if (studyCardsContainer) {
  const studyCardsList = renderList(templates.studycards, studiaConNoi.cards);
  studyCardsContainer.appendChild(studyCardsList);
}
