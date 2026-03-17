/**
 * Esporta il DOM corrente (già renderizzato) in un file HTML statico.
 * @param {string} filename Il nome del file da scaricare
 */
export function downloadStaticHTML(filename = 'pagina-statica.html') {
  // 1. Cloniamo l'intero tag <html> per non rompere la pagina che stiamo guardando
  const htmlClone = document.documentElement.cloneNode(true);

  // 2. FASE DI PULIZIA (Fondamentale!)
  // Rimuoviamo i <template> vuoti, ormai non servono più, i dati sono già nel DOM
  htmlClone.querySelectorAll('template').forEach((t) => t.remove());

  // (Opzionale) Rimuoviamo gli script di Vite o il tuo JS di rendering
  // Se non lo fai, chi apre l'HTML esportato vedrà il browser tentare di ri-eseguire il popolamento
  htmlClone.querySelectorAll('script[type="module"]').forEach((s) => s.remove());

  // 3. Ricostruiamo la stringa HTML completa aggiungendo il DOCTYPE
  const fullHTML = '<!DOCTYPE html>\n' + htmlClone.outerHTML;

  // 4. Creiamo un "file virtuale" (Blob) nel browser
  const blob = new Blob([fullHTML], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  // 5. Creiamo un link invisibile e lo "clicchiamo" programmaticamente
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();

  // 6. Puliamo la memoria
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
