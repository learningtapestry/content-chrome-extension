var path = require('path');
var envConfig = require('./env.js');
var spawn = require('child_process').spawn;
var webpack = require('webpack');
var extend = require('lodash').extend;

var appConfig = {
  entry: {
    'search-app': [path.resolve(__dirname, 'src', 'search-app', 'index.js')],
    app: path.resolve(__dirname, 'src', 'chrome', 'scripts', 'app.js'),
    app_iframe: path.resolve(__dirname, 'src', 'chrome', 'scripts', 'app_iframe.js')
  },
  output: {
    path: path.resolve(__dirname, 'src', 'chrome', 'scripts.dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        },
        exclude: /node_modules/
      },
      // App components will be compiled with CSS modules enabled.
      {
        test: /\.s?css$/,
        include: [path.resolve(__dirname, 'src', 'search-app')],
        loaders: ['style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'sass']
      },
      // Node modules will be compiled with global CSS, because they are
      // usually meant to be applied globally.
      {
        test: /\.s?css$/,
        include: [path.resolve(__dirname, 'node_modules')],
        loaders: ['style', 'css', 'sass']
      },
      // URL loader for font and image assets.
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        loader: 'url-loader?limit=100000&name=[name].[ext]'
      }
    ]
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, 'src', 'search-app')
    ]
  },
  plugins: [
    new webpack.DefinePlugin(envConfig),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'search-app',
      minChunks: Infinity
    })
  ],
  resolve: {
    root: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'src', 'search-app')
    ]
  }
};

var scriptConfig = {
  entry: {
    background: path.resolve(__dirname, 'src', 'chrome', 'scripts', 'background.js'),
    classroom: path.resolve(__dirname, 'src', 'chrome', 'scripts', 'classroom.js')
  },
  output: {
    path: path.resolve(__dirname, 'src', 'chrome', 'scripts.dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new webpack.DefinePlugin(envConfig)]
};

function MochaPlugin(options) {}
MochaPlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', function() {
    spawn('./node_modules/.bin/mocha', ['./dist/test.bundle.js'], {stdio: 'inherit'});
  });
};

var testConfig = extend({}, appConfig, {
  entry: path.resolve(__dirname, 'test/all.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'test.bundle.js',
  },
  target: 'node',
  plugins: [
    new webpack.DefinePlugin(envConfig),
    new MochaPlugin()
  ]
});

module.exports = [appConfig, scriptConfig, testConfig];
