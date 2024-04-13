// Generated using webpack-cli https://github.com/webpack/webpack-cli

import { resolve as _resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { GenerateSW } from 'workbox-webpack-plugin';

const isProduction = process.env.NODE_ENV == 'production';


const config = {
    entry: './src/index.jsx',
    output: {
        path: _resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        // fallback: {
        //     "os": require.resolve("os-browserify/browser"),
        //     "path": require.resolve("path-browserify"),
        //     "crypto":require.resolve("crypto-browserify"),
        // },
        extensions: ['.js', '.jsx'],
        
        alias: {
              os: "os-browserify/browser",
              path: "path-browserify",
              crypto: "crypto-browserify",
        },
    }
};


export default () => {
    if (isProduction) {
        config.mode = 'production';
        
        config.plugins.push(new GenerateSW());
        
    } else {
        config.mode = 'development';
    }
    return config;
};

