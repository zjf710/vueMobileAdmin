/* eslint global-require: "off" */
/* eslint import/no-dynamic-require: "off" */
const merge = require('webpack-merge');

module.exports = (env) => {
  const baseConfig = require('./webpack.base.config')(env);

  const webpackConfig = require(`./webpack.${env}.config`);

  return merge(baseConfig, webpackConfig);
};
