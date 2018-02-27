const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.config');
require('dotenv').config();

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false,
      },
      minimize: true,
      sourceMap: true
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      }
    }),
    new webpack.EnvironmentPlugin({
      SECRET: JSON.stringify(process.env.SECRET),
      PRODUCTION_DB: JSON.stringify(process.env.PRODUCTION_DB)
    }),
  ],
});
