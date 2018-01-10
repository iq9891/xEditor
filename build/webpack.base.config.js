/**
 * 公共配置
 */
var path = require('path');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // 加载器
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory', exclude: resolve('node_modules')
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        exclude: resolve('node_modules'),
        options: {
          cache: true,
          fix: true,
          formatter: require('eslint-friendly-formatter')
        }
      },
      { test: /\.html$/, loader: 'html-loader' },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader', options: {
              sourceMap: true,
              // modules: true,
              // localIdentName: '[local]_[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'build/postcss.config.js'  // 这个得在项目根目录创建此文件
              }
            }
          },
          {
            loader: 'sass-loader', options: { sourceMap: true }
          }
        ]
      }
    ]
  },
};
