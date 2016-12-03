var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  devtool: 'source-map',
  entry: './js/src/main.js',
  output: { path: __dirname, filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-2', 'react']
        }
      }
    ]
  },
};