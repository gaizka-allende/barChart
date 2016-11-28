var path = require('path');
var webpack = require('webpack');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin()
  ],
  module: {
    loaders: [
        {
            test: /\.js$/,
              //loaders: ['react-hot', 'babel'],
              loaders: ['babel'],
              include: path.join(__dirname, 'src')
        },
        {
            test: /\.css$/,
            loader: "style!css"
        },
        {
          test: /\.(png|jpg)$/,
          loader: 'url-loader'
        }

  ]
  }
};
