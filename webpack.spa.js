var webpack = require('webpack');
var webpackBase = require('./webpack.base.js');
var extend = require('lodash').extend;
var path = require('path');
var envConfig = require('./env.js');

module.exports = extend(webpackBase, {
  entry: path.resolve(__dirname, 'src/spa/app.js'),
  output: {
      path: path.resolve(__dirname, 'dist', 'spa'),
      filename: 'app.js',
  },
  plugins: [
    new webpack.DefinePlugin(envConfig)
  ]
});
