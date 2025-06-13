import dotenv from 'dotenv';

dotenv.config();

export default function(eleventyConfig) {
    // reCAPTCHA-Key global verfügbar machen
    eleventyConfig.addGlobalData('env', {
        recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY || "FALLBACK_KEY_FUR_ENTWICKLUNG"
    });

    // BrowserSync-Konfig (für Live-Reload)
    eleventyConfig.setBrowserSyncConfig({
        https: {
            key: "localhost-key.pem",
            cert: "localhost.pem"
        }
    });

    // Statische Dateien kopieren
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");

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