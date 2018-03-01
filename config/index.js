// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var buildEnv = require('./prod.env');
var pkg = require('../package.json');
var env = 'pro';

if (process.env.NODE_ENV === 'testing') {
  buildEnv = require('./test.env');
  env = 'test';
} else if (process.env.NODE_ENV === 'labing') {
  buildEnv = require('./lab.env');
  env = 'lab';
} else if (process.env.NODE_ENV === 'development') {
  buildEnv = require('./dev.env');
  env = 'dev';
}

module.exports = {
  build: {
    // dist: 'dist/'+env+'/'+pkg.version, // 打包生成文件夹
    dist: 'dist', // 测试生成文件夹
    env: buildEnv,
    index: path.resolve(__dirname, '../dist/index.html'),
  },
  dev: {
    dist: 'dist', // 测试生成文件夹
    env: require('./dev.env'),
    port: 7702,
    autoOpenBrowser: true,
  }
}
