'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {

    entry: './src/main.js',

    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: '/public/',
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: [ /\.vert$/, /\.frag$/ ],
                use: 'raw-loader'
            }
        ],

        loaders: [
            {test: /\.js$/, exclude:/node_modules/ , loader: 'babel-loader'}
        ]
    },

    watch: true,

    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },

    plugins: [
        new webpack.DefinePlugin({
            'CANVAS_RENDERER': JSON.stringify(true),
            'WEBGL_RENDERER': JSON.stringify(true)
        })
    ],

    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        port: 9000
    }

};
