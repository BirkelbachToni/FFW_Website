/**
 * Filterlogik für Einsatzberichte
 * Diese JavaScript-Datei bietet eine clientseitige Filterung und Sortierung
 * für Einsatzberichte der Feuerwehr Wasserknoden.
 */
document.addEventListener('DOMContentLoaded', function () {
    // DOM-Elemente für Filter und Anzeige
    const yearSelect = document.getElementById('year');
    const categorySelect = document.getElementById('category');
    const searchInput = document.getElementById('search');
    const filterButton = document.getElementById('filter-button');
    const sortSelect = document.getElementById('sort');
    const einsatzCount = document.getElementById('einsatz-count');
    const einsatzListe = document.getElementById('einsatz-liste');

    // Beispieldaten für Einsätze
    // In der Produktionsversion sollten diese durch echte Daten ersetzt werden
    const einsaetze = [
        {
            id: 'sturmschaeden-2023-07-02',
            title: 'Sturmschäden beseitigt',
            category: 'hilfe',
            date: '2023-07-02',
            year: '2023',
            description: 'Nach dem gestrigen Unwetter wurden mehrere umgestürzte Bäume...',
            duration: '3 Stunden',
            members: '12',
            image: '/assets/images/einsatz1.jpg',
        },
        // Weitere Einsätze...
    ];

    // Speichert die aktuell gefilterten Ergebnisse, anfangs alle Einsätze
    let filteredResults = einsaetze;

    /**
     * Debounce-Funktion zur Verzögerung häufiger Aufrufe
     * Verhindert zu viele Filteraufrufe während der Benutzereingabe
     *
     * @param {Function} func - Die auszuführende Funktion
     * @param {number} delay - Verzögerung in Millisekunden
     * @returns {Function} Die verzögerte Funktion
     */
    function debounce(func, delay) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    /**
     * Filtert Einsätze basierend auf den ausgewählten Kriterien
     * Verwendet einen einzelnen reduce-Durchlauf für optimale Performance
     */
    function filterEinsaetze() {
        const year = yearSelect.value;
        const category = categorySelect.value;
        const searchTerm = searchInput.value.toLowerCase();

        // Alle Filter in einem reduce-Durchlauf anwenden
        filteredResults = einsaetze.reduce((acc, einsatz) => {
            // Jahr filtern
            if (year !== 'all' && einsatz.year !== year) return acc;

            // Kategorie filtern
            if (category !== 'all' && einsatz.category !== category) return acc;

            // Suchbegriff filtern (Titel und Beschreibung durchsuchen)
            if (
                searchTerm &&
                !einsatz.title.toLowerCase().includes(searchTerm) &&
                !einsatz.description.toLowerCase().includes(searchTerm)
            ) {
                return acc;
            }

            // Einsatz erfüllt alle Filterkriterien
            acc.push(einsatz);
            return acc;
        }, []);

        // Ergebnisse sortieren und anzeigen
        sortEinsaetze();
        renderResults(filteredResults);
    }

    /**
     * Sortiert die gefilterten Einsätze nach Datum
     * Nutzt den ausgewählten Sortiermodus (neuste/älteste zuerst)
     */
    function sortEinsaetze() {
        const sortMethod = sortSelect.value;
        filteredResults.sort((a, b) => {
            // Datum-Strings in Date-Objekte konvertieren
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);

            // Absteigend oder aufsteigend sortieren je nach Auswahl
            return sortMethod === 'date-desc' ? dateB - dateA : dateA - dateB;
        });
    }

    /**
     * Rendert die Ergebnisliste in der UI mit verbessertem Feedback
     *
     * @param {Array} results - Liste der gefilterten Einsätze
     */
    function renderResults(results) {
        // Anzahl der gefundenen Einsätze anzeigen
        einsatzCount.textContent = results.length;

        // HTML-Inhalte generieren
        einsatzListe.innerHTML = results.length
            ? results
                .map(
                    (einsatz) => `
          <div class="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div class="md:flex">
              <div class="md:w-1/4 bg-gray-200">
                <img src="${einsatz.image}" alt="${einsatz.title}" class="w-full h-full object-cover md:h-48">
              </div>
              <div class="p-6 md:w-3/4">
                <div class="flex flex-wrap justify-between mb-2">
                  <span class="inline-block bg-fw-red-100 text-fw-red-800 px-2 py-1 text-xs font-semibold rounded-md">
                    ${getCategoryName(einsatz.category)}
                  </span>
                  <span class="text-gray-500 text-sm">${einsatz.date}</span>
                </div>
                <h3 class="text-xl font-bold mb-2">${einsatz.title}</h3>
                <p class="text-gray-600 mb-4">${einsatz.description}</p>
                <div class="flex items-center text-sm text-gray-500">
                  <span>Einsatzdauer: ${einsatz.duration}</span>
                  <span class="ml-4">${einsatz.members} Einsatzkräfte</span>
                </div>
                <a href="/einsaetze/${einsatz.id}" class="inline-block mt-4 text-fw-red-500 font-medium hover:text-fw-red-700">
                  Weiterlesen →
                </a>
              </div>
            </div>
          </div>
        `
                )
                .join('')
            : `<div class="text-center py-8">
             <img src="/assets/images/icons/no-results.svg" alt="Keine Ergebnisse" class="mx-auto mb-4" style="max-width: 150px;">
             <p class="text-gray-500">Keine Einsätze gefunden. Bitte ändere deine Filterkriterien.</p>
           </div>`;
    }

    /**
     * Übersetzt Kategorie-Codes in lesbare deutsche Bezeichnungen
     *
     * @param {string} categoryId - Code der Einsatzkategorie
     * @returns {string} Lesbare Bezeichnung der Kategorie
     */
    function getCategoryName(categoryId) {
        const categories = {
            brand: 'Brandbekämpfung',
            hilfe: 'Technische Hilfeleistung',
            wasser: 'Wasserschaden',
            unwetter: 'Unwetterschaden',
            sonstige: 'Sonstige Einsätze',
        };
        return categories[categoryId] || categoryId;
    }

    // Event-Listener für Benutzeraktionen
    filterButton.addEventListener('click', filterEinsaetze);
    sortSelect.addEventListener('change', sortEinsaetze);

    // Echtzeitfilterung bei Eingabe mit Verzögerung (300ms)
    searchInput.addEventListener('input', debounce(filterEinsaetze, 300));

    // Initial alle Einsätze anzeigen
    filterEinsaetze();
});