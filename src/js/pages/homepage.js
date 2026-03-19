import '@/js/main.js';
import { render, renderList, fromHTML } from '@/js/templates.js';

import serviceSectionHTML from '@/templates/inEvidenceSection.html?raw';
import cardInlineMini from '@/templates/cards/card-inline-mini.html?raw';
import cardInformativa from '@/templates/cards/card-info.html?raw';
import cardEditoriale from '@/templates/cards/card-editoriale.html?raw';
import preheaderHTML from '@/templates/preheader.html?raw';
import headerHTML from '@/templates/headerCopy.html?raw';
import heroHTML from '@/templates/hero-copy.html?raw';
import studyHTML from '@/templates/studywithus.html?raw';
import circolariEServiziHTML from '@/templates/circolarieservizi-section.html?raw';
import strumentiHTML from '@/templates/tools.html?raw';
import finanziamentiHTML from '@/templates/finanziamenti.html?raw';
import pubblicitaHTML from '@/templates/pubblicitasection.html?raw';
import personaleHTML from '@/templates/personale.html?raw';
import carouselHTML from '@/templates/carousel.html?raw';
import footerHTML from '@/templates/footer.html?raw';
import ratingHTML from '@/templates/rating.html?raw';

const templates = {
  serviceSection: fromHTML(serviceSectionHTML),
  inlineMini: fromHTML(cardInlineMini),
  cardinfo: fromHTML(cardInformativa),
  cardEdit: fromHTML(cardEditoriale),
  header: fromHTML(headerHTML),
  hero: fromHTML(heroHTML),
  preheader: fromHTML(preheaderHTML),
  study: fromHTML(studyHTML),
  circolariEServizi: fromHTML(circolariEServiziHTML),
  strumenti: fromHTML(strumentiHTML),
  finanziamenti: fromHTML(finanziamentiHTML),
  pubblicita: fromHTML(pubblicitaHTML),
  personale: fromHTML(personaleHTML),
  carousel: fromHTML(carouselHTML),
  footer: fromHTML(footerHTML),
  rating: fromHTML(ratingHTML),
};

const preHeader = {
  ministero: "Ministero dell'Istruzione e del Merito",
  areariservata: "Accedi all'area riservata",
};

/*
const carouselSection = {
	title: "Un'anteprima dell'istituto"
}*/

const sezioniServizi = {
  titolo: 'In evidenza',
  cards: [
    {
      title: 'Open day nella sede centrale',
      text: '',
      category: 'Categoria',
      url: '#',
      date: '18 marzo 2026',
    },
    {
      title: 'Spettacolo finale per il corso di teatro per le primarie',
      text: 'Questo è un testo breve che riassume il contenuto della pagina di destinazione in massimo tre o quattro righe, senza troncamento.',
      category: 'Categoria',
      url: '#',
      date: '18 marzo 2026',
    },
    {
      title: 'Orientamento per le classi di terza media',
      text: 'Questo è un testo breve che riassume il contenuto della pagina di destinazione in massimo tre o quattro righe, senza troncamento.',
      category: 'Categoria',
      url: '#',
      date: '18 marzo 2026',
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
      text: "Esperienze fuori dall'aula",
      url: '#',
    },
    {
      title: 'Corsi e certificazioni',
      text: 'Attività pratiche e sperimentali',
      url: '#',
    },
    {
      title: 'Progetti di orientamento',
      text: 'Supporto alle scelte future',
      url: '#',
    },
    {
      title: 'Laboratori didattici',
      text: 'Attività pratiche e sperimentali',
      url: '#',
    },
    {
      title: 'Gare e concorsi',
      text: 'Sfide educative e creative',
      url: '#',
    },
    {
      title: 'Progetti territorio e ambiente',
      text: 'Scoperta e cura del territorio',
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
        text: 'contenuto della 1 circolare',
        date: '15 novembre 2025',
      },
      {
        title: 'titolo della 2 circolare',
        text: 'contenuto della 2 circolare',
        date: '22 dicembre 2025',
      },
      {
        title: 'titolo della 3 circolare',
        text: 'contenuto della 3 circolare',
        date: '5 gennaio 2026',
      },
      {
        title: 'titolo della 4 circolare',
        text: 'contenuto della 4 circolare',
        date: '30 marzo 2026',
      },
    ],
  },
  Servizi: {
    titolo: 'Servizi',
    descrizione: 'I servizi offerti dalla nostra scuola',
    serviziDataCards: [
      {
        title: 'Mensa',
        text: 'Servizio che garantisce pasti equilibrati e controllati agli studenti, favorendo una corretta alimentazione durate la giornata scolastica',
        date: '',
      },
      {
        title: 'Piedibus',
        text: 'Un percorso casa-scuola a piedi, organizzato e accompagnato da volontari, per promuovere sicurezza e mobilità sostenibile',
        date: '',
      },
      {
        title: 'Scuolabus',
        text: 'Il servizio di trasporto dedicato che accompagna gli studenti da e verso la scuola in sicurezza, secondo orari e fermate predefinite',
        date: '',
      },
      {
        title: 'Doposcuola',
        text: 'Attività pomeridiane di supporto allo studio e socializzazione, svolte in un ambiente educativo guidato da personale qualificato.',
        date: '',
      },
    ],
  },
};

const tools = {
  titolo: 'I nostri strumenti digitali',
  cards: [
    { title: 'Scuola in Chiaro', text: '', category: '' },
    { title: 'UNICA', text: '', category: '' },
    { title: 'Registro elettronico', text: '', category: '' },
  ],
};

const fin = {
  titolo: 'I nostri finanziamenti',
  cards: [
    {
      title: 'PNRR Futura',
      text: 'Programma del PNRR per innovazione e digitalizzazione della scuola',
      category: '',
      date: '',
    },
    {
      title: 'PON - Ricerca e innovazione 2014-2020',
      text: 'Fondi europei per progetti di ricerca e sviluppo nelle scuole',
      category: '',
      date: '',
    },
    {
      title: 'PON inclusione',
      text: "Programma europeo per il sostegno e l'inclusione sociale",
      category: '',
      date: '',
    },
  ],
};

const pub = {
  titolo: 'Pubblicità legale e trasparenza',
  cards: [
    {
      title: 'Albo online',
      text: 'Spazio in cui la scuola pubblica atti ufficiali, comunicazioni e documenti amministrativi con valore legale e sempre aggiornati',
      category: "Vai all'Albo online",
    },
    {
      title: 'Amministrazione Trasparente',
      text: "Portale dedicato alla pubblicazione di dati, documenti e informazioni sull'organizzazione e sull'attività dell'istituto, nel rispetto degli obblighi di trasparenza",
      category: 'Vai alla sezione',
    },
  ],
};

const areaPersonale = {
  title: 'Per il personale scolastico',
  subtitle: "Accedi all'area riservata al personale scolastico",
  button: "Accedi all'area personale",
};

const footerSection = {
  name: 'F. Hernandez',
  denominazione: 'Istituto comprensivo F. Hernandez',
  citta: 'Livorno',
};
/*render */

const risultato = render(templates.serviceSection, { titolo: sezioniServizi.titolo });

const cardsContainer = risultato.querySelector('[data-cards]');

const cardsListFragment = renderList(templates.inlineMini, sezioniServizi.cards);

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

renderList(templates.cardinfo, studiaConNoi.cards);

if (studyCardsContainer) {
  const studyCardsList = renderList(templates.cardinfo, studiaConNoi.cards);
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
    renderList(templates.cardinfo, circolariEServizi.circolari.circolariDataCards)
  );
}

const serviziCardsContainer = fragment.querySelector('[data-tpl="servizi-data-cards"]');
if (serviziCardsContainer) {
  serviziCardsContainer.appendChild(
    renderList(templates.cardinfo, circolariEServizi.Servizi.serviziDataCards)
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
  strumentiCardsContainer.appendChild(renderList(templates.inlineMini, tools.cards));
}

const circolariContainer = document.getElementById('strumenti-digitali');
if (circolariContainer) {
  circolariContainer.appendChild(fragmentStrumenti);
}

/* render sezione finanziamenti*/
const fragmentFinan = render(templates.finanziamenti, fin);

const finanCardsContainer = fragmentFinan.querySelector('[data-tpl="data-cards"]');

if (finanCardsContainer) {
  finanCardsContainer.appendChild(renderList(templates.cardEdit, fin.cards));
}

const finanContainer = document.getElementById('finanziamenti');
if (finanContainer) {
  finanContainer.appendChild(fragmentFinan);
}

/*render pubblicità legale*/
const fragmentpub = render(templates.pubblicita, pub);

const pubCardsContainer = fragmentpub.firstElementChild.querySelector('[data-tpl="data-cards"]');

if (pubCardsContainer) {
  pubCardsContainer.appendChild(renderList(templates.inlineMini, pub.cards));
}

const pubContainer = document.getElementById('trasparenza');
if (pubContainer) {
  pubContainer.appendChild(fragmentpub);
}

/*render area personale*/
const personaleFragment = render(templates.personale, areaPersonale);

const personaleContainer = document.getElementById('personale-scolastico');

if (personaleContainer) {
  personaleContainer.appendChild(personaleFragment);
}

/*render carousel
const carouselFragment = render(templates.carousel, carouselSection);

const carouselContainer = document.getElementById('carousel');

if (carouselContainer) {
  carouselContainer.appendChild(carouselFragment);
}
  */

/*render footer*/
const footerFragment = render(templates.footer, footerSection);

const footerContainer = document.getElementById('footer');

if (footerContainer) {
  footerContainer.appendChild(footerFragment);
}

/*render rating*/
const ratingFragment = render(templates.rating);

const ratingContainer = document.getElementById('rating');

if (ratingContainer) {
  ratingContainer.appendChild(ratingFragment);
}
