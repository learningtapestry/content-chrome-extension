var Webpack = require('webpack');
var webpackBase = require('./webpack.base.js');
var extend = require('util')._extend;
var path = require('path');

var envConfig = extend(require('./env.js'), {
  APP_CONTEXT: JSON.stringify('spa')
});

module.exports = extend(webpackBase, {
  entry: path.resolve(__dirname, 'src/spa/app.js'),
  output: {
      path: path.resolve(__dirname, 'dist', 'spa'),
      filename: 'app.js',
  },
  plugins: [
    new Webpack.DefinePlugin(envConfig)
  ]
});
