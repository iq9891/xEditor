var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
const WebpackBar = require('webpackbar')

var webpackBaseConfig = require('./webpack.base.config.js');
var pkg = require('../package.json');

var isPro = process.env.NODE_ENV === 'production';
var isDev = process.env.NODE_ENV === 'development';
var dist = 'dist'; // 生成的文件夹目录是可以配的，根据环境的不同生成的文件夹不同

var entry = {
  main: ['./src/xeditor/index.js']
};

var plugins = [
  new WebpackBar({
    name: 'Client',
    color: '#41b883',
    compiledIn: false
  }),
];

// 注入内容
var oTime = new Date();
var oAllTime = oTime.getFullYear() + '-' + (oTime.getMonth()+1) + '-' + oTime.getDate() + ' ' + oTime.getHours() + ':' + oTime.getMinutes() + ':' + oTime.getSeconds();
plugins.push(new webpack.BannerPlugin('@ license 李梦龙\n@ version '+ pkg.version +'\n@ time '+ oAllTime));

if (isDev) {
  plugins.push(new webpack.HotModuleReplacementPlugin());

  var HtmlWebpackPlugin = require('html-webpack-plugin')
  plugins.push(new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.html',
    inject: 'head',
    hash: true,
    cache: true,
  }));
  // 插入热重载
  Object.keys(entry).forEach(function (name) {
    entry[name] = ['./build/dev-client'].concat(entry[name]);
  });
}

// 如果生产清除目录从心开始
if (isPro) {
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  plugins.push(new CleanWebpackPlugin([dist], {
    root: path.resolve(__dirname, '../'),
    verbose: true,
  }));
}

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(webpackBaseConfig, {
  entry: entry,
  devServer: {
    contentBase: [
      dist
    ],
    inline: true
  },
  output: {
    path: path.resolve(__dirname, '../'+dist),
    publicPath: '/'+ dist +'/',
    filename: pkg.name + (isPro ? '.min' : '') +'.js',
    // library: pkg.name,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  stats: 'errors-only', // 只有报错会提示
  mode: isPro ? 'production' : 'development',
  resolve: {
    alias: {
      '@': resolve('src'),
      'assets': resolve('src/assets'),
    }
  },
  plugins,
});
