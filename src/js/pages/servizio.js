import '@/js/main.js';
import { render, renderList, fromHTML } from '@/js/templates.js';

// Vite importa i file HTML come stringhe a build time — zero fetch a runtime
import headerHTML from '@/templates/header.html?raw';
import footerHTML from '@/templates/footer.html?raw';
import breadcrumbHTML from '@/templates/breadcrumb.html?raw';
import heroHTML from '@/templates/hero.html?raw';
import serviceSectionHTML from '@/templates/service-section.html?raw';
import serviceCardHTML from '@/templates/service-card.html?raw';

// ── Parse templates ──────────────────────────────────────────────────────────
const tpl = {
  header: fromHTML(headerHTML),
  footer: fromHTML(footerHTML),
  breadcrumb: fromHTML(breadcrumbHTML),
  hero: fromHTML(heroHTML),
  serviceSection: fromHTML(serviceSectionHTML),
  serviceCard: fromHTML(serviceCardHTML),
};

// ── Dati della pagina ────────────────────────────────────────────────────────
const scuola = {
  nome: 'Liceo Scientifico Statale',
  denominazione: 'Federigo Enriques',
  citta: 'Livorno',
};

const sezioniServizi = [
  {
    titolo: 'Famiglie e studenti',
    cards: [
      {
        titolo: 'Iscrizioni online',
        descrizione: "Procedura per l'iscrizione al primo anno",
        url: '#',
      },
      { titolo: 'Pagamenti scolastici', descrizione: 'Tasse, contributi e servizi vari', url: '#' },
      {
        titolo: 'Colloqui genitori-docenti',
        descrizione: 'Prenotazione colloqui individuali',
        url: '#',
      },
      {
        titolo: 'Comunicazioni e circolari',
        descrizione: 'Avvisi e comunicazioni della scuola',
        url: '#',
      },
      {
        titolo: 'Registro elettronico',
        descrizione: 'Accesso al registro voti e presenze',
        url: '#',
      },
    ],
  },
  {
    titolo: 'Personale scolastico',
    cards: [
      { titolo: 'Gestione assenze', descrizione: 'Richiesta e documentazione assenze', url: '#' },
      {
        titolo: 'Certificati di servizio',
        descrizione: 'Richiesta certificati di servizio',
        url: '#',
      },
      { titolo: 'Modulistica interna', descrizione: 'Moduli e documenti amministrativi', url: '#' },
      { titolo: 'Supplenze', descrizione: 'Gestione delle supplenze temporanee', url: '#' },
    ],
  },
  {
    titolo: 'Percorsi di studio',
    cards: [
      {
        titolo: 'Piano di studi',
        descrizione: 'Offerta formativa e materie per indirizzo',
        url: '#',
      },
      {
        titolo: 'Orientamento',
        descrizione: 'Attività di orientamento in entrata e in uscita',
        url: '#',
      },
      {
        titolo: 'Libri di testo',
        descrizione: 'Elenco adozioni librarie per anno scolastico',
        url: '#',
      },
    ],
  },
];

// ── Render ────────────────────────────────────────────────────────────────────
document.getElementById('root-header').append(render(tpl.header, scuola));

document.getElementById('root-breadcrumb').append(render(tpl.breadcrumb, { pagina: 'Servizi' }));

document.getElementById('root-hero').append(
  render(tpl.hero, {
    titolo: 'Servizi',
    descrizione:
      'I servizi offerti dalla scuola dedicati a studenti, famiglie e personale scolastico.',
  })
);

const rootSections = document.getElementById('root-sections');
for (const sezione of sezioniServizi) {
  const sectionFrag = render(tpl.serviceSection, { titolo: sezione.titolo });
  sectionFrag.querySelector('[data-cards]').append(renderList(tpl.serviceCard, sezione.cards));
  rootSections.append(sectionFrag);
}

document.getElementById('root-footer').append(render(tpl.footer, scuola));
