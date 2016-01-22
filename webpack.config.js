var path = require('path');
var Webpack = require('webpack');

// Load .env values into process.env.
require('dotenv').config();

var envConfig = {
  API_KEY: JSON.stringify(process.env.API_KEY)
};

module.exports = {
    entry: path.resolve(__dirname, 'app/main.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel',
          query: {
            presets: ['react', 'es2015']
          }
        },
        // App components will be compiled with CSS modules enabled.
        {
          test: /\.s?css$/,
          include: [path.resolve(__dirname, 'app')],
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
    plugins: [
      new Webpack.DefinePlugin(envConfig)
    ],
    sassLoader: {
      includePaths: [path.resolve(__dirname, 'app')]
    }
};
