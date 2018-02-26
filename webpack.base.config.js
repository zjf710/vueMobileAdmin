/**
 * Created by jason on 17/10/9.
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const vuxLoader = require('vux-loader');

const webpackConfig = env => ({
  // 入口
  entry: {
    bundle: `${__dirname}/src/index.js`
  },
  output: {
    path: `${__dirname}/build`, // 打包后的文件存放的地方
    filename: '[name]_[hash].js' // 打包后输出文件的文件名
  },
  devServer: {
    contentBase: './src', // 本地服务器所加载的页面所在的目录
    historyApiFallback: false, // 不跳转
    inline: true // 实时刷新
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.scss'],
    alias: {
      'app.config': `${__dirname}/src/configs/${env}.config.js`,
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader'
        }
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8]].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract([
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
          'sass-loader',
          'postcss-loader'
        ])
      }
    ]
  }
});

module.exports = env => (
  vuxLoader.merge(webpackConfig(env), {
    options: {},
    plugins: [
      'vux-ui',
      'duplicate-style'
    ]
  })
);
