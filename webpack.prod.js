var path = require('path');
var webpack = require('webpack');

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname),
    filename: 'index.js',
    libraryTarget: 'commonjs'
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
