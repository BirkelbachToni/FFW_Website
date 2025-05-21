const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/js/main.js', // Haupt-JS-Datei
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/js'),
        publicPath: '/js/'
    },
    mode: 'production', // Für Entwicklung auf 'development' wechseln
    module: {
        rules: [
            // CSS & Tailwind
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                config: path.resolve(__dirname, 'postcss.config.js')
                            }
                        }
                    }
                ]
            },
            // JavaScript (Babel für Kompatibilität)
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '../css/styles.css' // Output in /dist/css/
        })
    ]
};