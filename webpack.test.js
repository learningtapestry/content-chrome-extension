var webpack = require('webpack');
var webpackBase = require('./webpack.base.js');
var extend = require('lodash').extend;
var path = require('path');
var envConfig = require('./env.js');
var spawn = require('child_process').spawn;

function MochaPlugin(options) {}
MochaPlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', function() {
    spawn('./node_modules/.bin/mocha', ['./dist/test.bundle.js'], {stdio: 'inherit'});
  });
};

module.exports = extend({}, webpackBase, {
  entry: path.resolve(__dirname, 'test/all.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'test.bundle.js',
  },
  resolve: {
    root: [path.resolve(__dirname, 'src')]
  },
  plugins: [
    new webpack.DefinePlugin(envConfig),
    new MochaPlugin()
  ],
  target: 'node'
});
