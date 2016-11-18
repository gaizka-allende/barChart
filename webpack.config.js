var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
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
    new webpack.HotModuleReplacementPlugin()
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
