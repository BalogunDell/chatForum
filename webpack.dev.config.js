const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const mergeWebpack = require('webpack-merge');
const common = require('./webpack.common.config')


const config = mergeWebpack(common, {
  devtool: 'cheap-eval-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './client/index.html',
      title: 'Simple Chat Application'
    }),
    new webpack.ProvidePlugin({
      $: 'Juery',
      jQuery: 'jquery',
      'window.$': '$',
      'window.jQuery': 'jquery'
    })
  ]
});

module.exports = config;
