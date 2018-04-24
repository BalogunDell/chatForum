const mergeWebpack = require('webpack-merge');
const common = require('./webpack.common.config');


const config = mergeWebpack(common, {
  devtool: 'cheap-eval-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true
  }
});

module.exports = config;
