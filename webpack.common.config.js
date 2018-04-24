const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: './client/index.jsx',
  devtool: 'cheap-eval-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: { extensions: ['.jsx', '.js', '.css'] },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: ['node_modules'],
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: ['node_modules'],
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/gi,
        exclude: ['node_modules'],
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
            publicPath: './'
          }
        }
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/gi,
        exclude: ['node_modules'],
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
            publicPath: './'
          }
        }
      }
    ]
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
};

module.exports = config;
