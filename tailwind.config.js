module.exports = {
    content: [
        './src/**/*.{html,js,njk}',
        './dist/**/*.js' // Wichtig für CSP-Hashes
    ],
    theme: {
        extend: {
            colors: {
                'fw-red': {
                    DEFAULT: '#B22222', // Standardrot für Feuerwehren
                    '50': '#FEE7E7',
                    '100': '#FBCFCF',
                    '200': '#F79999',
                    '300': '#F26363',
                    '400': '#EE2D2D',
                    '500': '#B22222', // Hauptfarbe
                    '600': '#8E1B1B',
                    '700': '#6A1414',
                    '800': '#460D0D',
                    '900': '#220707',
                },
            }
        }
    },
};