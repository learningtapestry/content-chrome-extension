var Webpack = require('webpack');
var webpackBase = require('./webpack.base.js');
var extend = require('util')._extend;
var path = require('path');

var envConfig = extend(require('./env.js'), {
  APP_CONTEXT: JSON.stringify('chrome')
});

module.exports = extend(webpackBase, {
  entry: {
    app: path.resolve(__dirname, 'src', 'chrome', 'scripts', 'app.js'),
    background: path.resolve(__dirname, 'src', 'chrome', 'scripts', 'background.js'),
    classroom: path.resolve(__dirname, 'src', 'chrome', 'scripts', 'classroom.js')
  },
  output: {
    path: path.resolve(__dirname, 'src', 'chrome', 'scripts.dist'),
    filename: '[name].js'
  },
  plugins: [
    new Webpack.DefinePlugin(envConfig)
  ]
});
