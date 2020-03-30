const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const commonConfig = require('./webpack.common.config');

module.exports = webpackMerge(commonConfig, {
  plugins: [
    new webpack.EnvironmentPlugin({
      LOG_LEVEL: 'debug',
      NODE_ENV: 'development',
      COOKIE_EXP_IN_DAYS: 0,
    }),
  ],

  devServer: {
    disableHostCheck: false,
    compress: true,
    contentBase: ['./'],
    watchContentBase: true,
    publicPath: '/',
    https: false,
    overlay: false,
    stats: {
      colors: true
    },
    port: '4321'
  },
});
