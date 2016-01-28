var path = require('path');

module.exports = {
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
          include: [path.resolve(__dirname, 'src', 'app')],
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
        path.resolve(__dirname, 'src', 'app')
      ]
    }
};
