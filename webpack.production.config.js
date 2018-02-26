/**
 * Created by jason on 17/10/9.
 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new HtmlWebpackPlugin({
      template: `${__dirname}/index.html` // new 一个这个插件的实例，并传入相关的参数
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('style_[hash].css', { allChunks: true })
  ]
};
