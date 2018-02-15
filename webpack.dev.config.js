const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


const config = {
  entry: './client/index.jsx',
  devtool: 'cheap-eval-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: { extensions: ['.jsx', '.js', '.css'] },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: ['node_modules'],
        use: 'babel-loader'
      },
      {
        test: /\.js/
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './client/index.html',
      title: 'Simple Chat Application'
    })
  ]
};

module.exports = config;
