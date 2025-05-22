export default function(eleventyConfig) {
    // BrowserSync-Konfig (für Live-Reload)
    eleventyConfig.setBrowserSyncConfig({
        https: true,
        ghostMode: false
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