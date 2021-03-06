var path = require('path');
var webpack = require('webpack');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  debug: true,
  devtool: '#cheap-module-source-map',
  entry: [
    './src/main.js'
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: ''
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js'],
    alias: {
      request: 'browser-request'
    }
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        loaders: ['babel?cacheDirectory&presets[]=es2015'], exclude: /node_modules/
      }
    ]
  }
};
