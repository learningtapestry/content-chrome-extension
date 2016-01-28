var Webpack = require('webpack');
var webpackBase = require('./webpack.base.js');
var extend = require('lodash').extend;
var path = require('path');

var envConfig = require('./env.js');

module.exports = extend({}, webpackBase, {
  resolve: {
    root: [path.resolve(__dirname, 'src')]
  },
  plugins: [new Webpack.DefinePlugin(envConfig)]
});
