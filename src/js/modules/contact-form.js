/**
 * Kontaktformular-Logik
 * Diese JavaScript-Datei enthält die Logik für die Validierung und Verarbeitung
 * des Kontaktformulars der Feuerwehr Wasserknoden.
 */
document.addEventListener('DOMContentLoaded', function () {
    // Das Formular und Nachrichtenbereiche
    const kontaktForm = document.getElementById('kontakt-form');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');

    // Wenn kein Formular auf der Seite vorhanden ist, beenden wir hier
    if (!kontaktForm) return;

    /**
     * Prüft ein Pflichtfeld auf leeren Inhalt
     */
    function checkRequired(field) {
        if (!field.hasAttribute('required')) return { isValid: true };
        return field.value.trim() ?
            { isValid: true } :
            { isValid: false, message: 'Dieses Feld ist erforderlich' };
    }

    /**
     * Validiert eine E-Mail-Adresse
     */
    function validateEmail(field) {
        if (!field.value.trim()) return { isValid: true };

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(field.value) ?
            { isValid: true } :
            { isValid: false, message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein' };
    }

    /**
     * Validiert eine Telefonnummer
     */
    function validatePhone(field) {
        if (!field.value.trim()) return { isValid: true };

        const phonePattern = /^[0-9+\s()-]+$/;
        return phonePattern.test(field.value) ?
            { isValid: true } :
            { isValid: false, message: 'Bitte geben Sie eine gültige Telefonnummer ein' };
    }

    /**
     * Validiert eine Checkbox
     */
    function validateCheckbox(field) {
        if (field.hasAttribute('required') && !field.checked) {
            return { isValid: false, message: 'Bitte bestätigen Sie dieses Feld' };
        }
        return { isValid: true };
    }

    /**
     * Validiert ein einzelnes Formularfeld
     *
     * @param {HTMLElement} field - Das zu validierende Feld
     * @returns {boolean} True wenn das Feld gültig ist, sonst false
     */
    function validateField(field) {
        // Fehlermeldungscontainer für dieses Feld finden
        const errorElement = field.nextElementSibling;

        // Grundlegende Validierung für alle Felder
        let validation = checkRequired(field);

        // Spezifische Validierungen nach Feldtyp
        if (validation.isValid) {
            if (field.type === 'email') {
                validation = validateEmail(field);
            } else if (field.type === 'tel') {
                validation = validatePhone(field);
            } else if (field.type === 'checkbox') {
                validation = validateCheckbox(field);
            }
        }

        // Fehler anzeigen oder verstecken
        if (!validation.isValid && errorElement?.classList.contains('error-message')) {
            errorElement.textContent = validation.message;
            errorElement.classList.remove('hidden');
        } else if (errorElement?.classList.contains('error-message')) {
            errorElement.classList.add('hidden');
        }

        // Visuelles Feedback am Eingabefeld
        field.classList.toggle('border-red-500', !validation.isValid);
        field.classList.toggle('border-gray-300', validation.isValid);

        return validation.isValid;
    }

    /**
     * Validiert das gesamte Formular
     *
     * @returns {boolean} True wenn alle Felder gültig sind, sonst false
     */
    function validateForm() {
        const fields = kontaktForm.querySelectorAll('input, textarea');
        let isFormValid = true;

        fields.forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    /**
     * Sendet die Formulardaten via AJAX oder an einen externen Dienst
     *
     * @param {FormData} formData - Die zu sendenden Formulardaten
     */
    async function submitForm(formData) {
        // Hier kannst du einen externen Dienst wie Formspree oder Netlify Forms verwenden
        // Beispiel für Formspree:
        try {
            const response = await fetch('https://formspree.io/f/mvgraega', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Erfolgreich gesendet
                showFormSuccess();
            } else {
                // Fehler beim Senden
                showFormError();
            }
        } catch (error) {
            console.error('Formular-Fehler:', error);
            showFormError();
        }
    }

    /**
     * Zeigt die Erfolgsmeldung an und setzt das Formular zurück
     */
    function showFormSuccess() {
        const nameField = kontaktForm.querySelector('#name');
        formSuccess.textContent = `Vielen Dank, ${nameField.value.trim()}! Wir werden uns in Kürze bei Ihnen melden.`;
        formSuccess.classList.remove('hidden');

        // Nach 5 Sekunden die Erfolgsmeldung ausblenden
        setTimeout(() => {
            formSuccess.classList.add('hidden');
        }, 5000);
    }

    /**
     * Zeigt die Fehlermeldung an
     */
    function showFormError() {
        formError.classList.remove('hidden');
        formSuccess.classList.add('hidden');

        // Nach 5 Sekunden die Fehlermeldung ausblenden
        setTimeout(() => {
            formError.classList.add('hidden');
        }, 5000);
    }

    // Live-Validierung für alle Formularfelder
    kontaktForm.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('blur', () => {
            validateField(field);
        });

        // Für Checkboxen sofortige Validierung
        if (field.type === 'checkbox') {
            field.addEventListener('change', () => {
                validateField(field);
            });
        }
    });

    // Formular-Submit-Event
    kontaktForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Formular validieren
        if (validateForm()) {
            // Formulardaten sammeln und senden
            const formData = new FormData(kontaktForm);
            submitForm(formData);
        }
    });
});