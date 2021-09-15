
// var webpack = require('webpack');
require('webpack')
var path = require('path');

module.exports = {
    entry: './dist/content.js',
    output: {
        filename: 'dist.min.js',
        path: path.resolve(__dirname, './dist')
    }
}
