'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {

    entry: './src/main.js',

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {test: /\.js$/, exclude:/node_modules/ , loader: 'babel-loader'}
        ]
    },

    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        port: 9000
    }

};
