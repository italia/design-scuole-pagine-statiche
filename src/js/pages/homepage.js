import '@/js/main.js';
import { render, renderList, fromHTML } from '@/js/templates.js';

import serviceSectionHTML from '@/templates/inEvidenceSection.html?raw';
import serviceCardHTML from '@/templates/cards/service-card.html?raw';
import preheaderHTML from '@/templates/preheader.html?raw';
import headerHTML from '@/templates/headerCopy.html?raw';
import heroHTML from '@/templates/hero-copy.html?raw';
import studyHTML from '@/templates/studywithus.html?raw';
import studycardsHTML from '@/templates/cards/studycards.html?raw';
import circolariEServiziHTML from '@/templates/circolarieservizi-section.html?raw';
import circolariCardsHTML from '@/templates/cards/card-editoriale.html?raw';
import strumentiHTML from '@/templates/tools.html?raw';
import strumenticardsHTML from '@/templates/cards/tools-card.html?raw';

const templates = {
  serviceSection: fromHTML(serviceSectionHTML),
  serviceCard: fromHTML(serviceCardHTML),
  header: fromHTML(headerHTML),
  hero: fromHTML(heroHTML),
  preheader: fromHTML(preheaderHTML),
  study: fromHTML(studyHTML),
  studycards: fromHTML(studycardsHTML),
  circolariEServizi: fromHTML(circolariEServiziHTML),
  circolariEServiziCards: fromHTML(circolariCardsHTML),
  strumenti: fromHTML(strumentiHTML),
  strumenticardsHTML: fromHTML(strumenticardsHTML),
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
      title: 'Uscite didattiche',
      description: "Esperienze fuori dall'aula",
      url: '#',
    },
    {
      title: 'Corsi e certificazioni',
      description: 'Attività pratiche e sperimentali',
      url: '#',
    },
    {
      title: 'Progetti di orientamento',
      description: 'Supporto alle scelte future',
      url: '#',
    },
    {
      title: 'Laboratori didattici',
      description: 'Attività pratiche e sperimentali',
      url: '#',
    },
    {
      title: 'Gare e concorsi',
      description: 'Sfide educative e creative',
      url: '#',
    },
    {
      title: 'Progetti territorio e ambiente',
      description: 'Scoperta e cura del territorio',
      url: '#',
    },
  ],
};
const circolariEServizi = {
  circolari: {
    titolo: 'Circolari',
    descrizione: 'Le ultime circolari pubblicate',
    circolariDataCards: [
      {
        title: 'titolo della 1 circolare',
        description: 'contenuto della 1 circolare',
        data: '15 novembre 2025',
      },
      {
        title: 'titolo della 2 circolare',
        description: 'contenuto della 2 circolare',
        data: '22 dicembre 2025',
      },
      {
        title: 'titolo della 3 circolare',
        description: 'contenuto della 3 circolare',
        data: '5 gennaio 2026',
      },
      {
        title: 'titolo della 4 circolare',
        description: 'contenuto della 4 circolare',
        data: '30 marzo 2026',
      },
    ],
  },
  Servizi: {
    titolo: 'Servizi',
    descrizione: 'I servizi offerti dalla nostra scuola',
    serviziDataCards: [
      {
        title: 'Mensa',
        description:
          'Servizio che garantisce pasti equilibrati e controllati agli studenti, favorendo una corretta alimentazione durate la giornata scolastica',
        data: '',
      },
      {
        title: 'Piedibus',
        description:
          'Un percorso casa-scuola a piedi, organizzato e accompagnato da volontari, per promuovere sicurezza e mobilità sostenibile',
        data: '',
      },
      {
        title: 'Scuolabus',
        description:
          'Il servizio di trasporto dedicato che accompagna gli studenti da e verso la scuola in sicurezza, secondo orari e fermate predefinite',
        data: '',
      },
      {
        title: 'Doposcuola',
        description:
          'Attività pomeridiane di supporto allo studio e socializzazione, svolte in un ambiente educativo guidato da personale qualificato.',
        data: '',
      },
    ],
  },
};

const tools = {
  titolo: 'I nostri strumenti digitali',
  cards: [{ titolo: 'Scuola in Chiaro' }, { titolo: 'UNICA' }, { titolo: 'Registro elettronico' }],
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

const studyCardsContainer = studyFragment.querySelector('[study-card]');

renderList(templates.studycards, studiaConNoi.cards);

if (studyCardsContainer) {
  const studyCardsList = renderList(templates.studycards, studiaConNoi.cards);
  studyCardsContainer.appendChild(studyCardsList);
}
const studyContainer = document.getElementById('studia-con-noi');

if (studyContainer) {
  studyContainer.appendChild(studyFragment);
}

/*render circolari e servizi */

const datiCompleti = {
  titolo: circolariEServizi.circolari.titolo,
  descrizione: circolariEServizi.circolari.descrizione,
  titoloServizi: circolariEServizi.Servizi.titolo,
  descrizioneServizi: circolariEServizi.Servizi.descrizione,
};

const fragment = render(templates.circolariEServizi, datiCompleti);

const circolariCardsContainer = fragment.querySelector('[data-tpl="circolari-data-cards"]');
if (circolariCardsContainer) {
  circolariCardsContainer.appendChild(
    renderList(templates.circolariEServiziCards, circolariEServizi.circolari.circolariDataCards)
  );
}

const serviziCardsContainer = fragment.querySelector('[data-tpl="servizi-data-cards"]');
if (serviziCardsContainer) {
  serviziCardsContainer.appendChild(
    renderList(templates.circolariEServiziCards, circolariEServizi.Servizi.serviziDataCards)
  );
}

const container = document.getElementById('circolari-e-servizi');
if (container) {
  container.appendChild(fragment);
}

/* render sezione strumenti*/
const fragmentStrumenti = render(templates.strumenti, tools);

const strumentiCardsContainer = fragmentStrumenti.querySelector('[data-tpl="data-cards"]');
if (strumentiCardsContainer) {
  strumentiCardsContainer.appendChild(renderList(templates.strumenticardsHTML, tools.cards));
}

const circolariContainer = document.getElementById('strumenti-digitali');
if (circolariContainer) {
  circolariContainer.appendChild(fragmentStrumenti);
}
