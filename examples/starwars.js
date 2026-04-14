import { renderList, fromHTML } from '../src/js/templates.js';

const cardTplRaw = `
  <template>
    <it-card style="cursor:pointer" class="mb-3 shadow-sm">
      <span slot="title" data-tpl="titolo"></span>
      <p slot="text" data-tpl="descrizione"></p>
    </it-card>
  </template>
`;

const tpl = { card: fromHTML(cardTplRaw) };

function escapeHTML(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function init() {
  const listContainer = document.getElementById('starwars-list');
  const detailsContainer = document.getElementById('character-details');
  if (!listContainer) return;

  let characters = [];
  const stateTag = document.getElementById('__SSR_STATE__');

  // --- 1. RECUPERO DATI (Hydration State) ---
  console.log('🚀 [Hydration] Inizio recupero dati...', stateTag);
  if (stateTag) {
    characters = JSON.parse(stateTag.textContent)?.characters || [];
    console.log('🚀 [Hydration] Dati caricati dallo stato iniettato.');
  } else {
    const response = await fetch('https://swapi.dev/api/people/');
    const data = await response.json();
    characters = data.results.slice(0, 6).map((p) => ({
      titolo: p.name,
      descrizione: `Peso: ${p.mass}kg`,
      extra: `Capelli: ${p.hair_color}, Occhi: ${p.eye_color}, Anno: ${p.birth_year}`,
    }));
    if (typeof global !== 'undefined') global.__SERIALIZED_STATE__ = { characters };
  }

  // --- 2. RENDERING LISTA ---
  // Controlliamo se ci sono già delle card. Se il server ha fatto SSR, ci sono.
  const hasCards = listContainer.querySelector('it-card');

  if (!hasCards && characters.length > 0) {
    listContainer.innerHTML = ''; // Pulizia di sicurezza solo se vuoto o sporco
    listContainer.append(renderList(tpl.card, characters));
    console.log('🎨 [Client] Render effettuato (Fallback).');
  }

  // --- 3. L'ESPERIMENTO: INTERAZIONE CON LO STATO ---
  if (typeof window !== 'undefined' && detailsContainer) {
    // Usiamo la delega degli eventi sul container per essere sicuri di beccare le card
    listContainer.addEventListener('click', (e) => {
      const card = e.target.closest('it-card');
      if (!card) return;

      // Troviamo l'indice della card cliccata rispetto alle altre
      const allCards = Array.from(listContainer.querySelectorAll('it-card'));
      const index = allCards.indexOf(card);
      const data = characters[index];

      if (data) {
        detailsContainer.innerHTML = `
          <div class="alert alert-success shadow-sm border-2">
            <h4 class="h5 mb-2">${escapeHTML(data.titolo)}</h4>
            <ul class="list-unstyled mb-0 small">
              <li><strong>Info:</strong> ${escapeHTML(data.extra || 'Dati da SSR')}</li>
              <li><strong>Descrizione:</strong> ${escapeHTML(data.descrizione)}</li>
            </ul>
            <hr>
            <p class="mb-0 text-muted" style="font-size: 0.75rem;">
              ⚡ Recuperato istantaneamente da <code>__SSR_STATE__</code>
            </p>
          </div>
        `;
      }
    });
  }
}

export const ready = init();
