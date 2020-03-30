const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const commonConfig = require('./webpack.common.config');

module.exports = webpackMerge(commonConfig, {
  plugins: [
    new webpack.EnvironmentPlugin({
      LOG_LEVEL: 'info',
      NODE_ENV: 'production',
      COOKIE_EXP_IN_DAYS: 1,
    }),
  ],
});
