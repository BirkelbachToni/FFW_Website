// Umgebungsvariablen einbinden
require('dotenv').config();

module.exports = function(eleventyConfig) {
    // reCAPTCHA-Key global verfügbar machen
    eleventyConfig.addGlobalData('env', {
        recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY || "FALLBACK_KEY_FUR_ENTWICKLUNG"
    });
    export default function (eleventyConfig) {
        // BrowserSync-Konfig (für Live-Reload)
        eleventyConfig.setBrowserSyncConfig({
            https: {
                key: "localhost-key.pem",
                cert: "localhost.pem"
            }
        });

        // Filter/Shortcodes hinzufügen
        eleventyConfig.addFilter('myFilter', (value) => {
            return value.toUpperCase();
        });

        // Rückgabe der Konfiguration
        return {
            dir: {
                input: "src",
                output: "dist",
                includes: "_includes"
            },
            templateFormats: ["njk", "md", "html"],
            markdownTemplateEngine: "njk"
        };
    }
}