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
          formatter: require('eslint-friendly-formatter')
        }
      },
      { test: /\.html$/, loader: 'html-loader' }
    ]
  },
};
