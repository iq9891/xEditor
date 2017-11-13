var merge = require('webpack-merge');
var prodEnv = require('./prod.env');
var constant = require('./constant.env');
var api = '';

switch (process.env.NODE_ENV) {
  case 'testing':
    api = constant.API_TESTING;
    break;
  case 'labing':
    api = constant.API_LABING;
    break;
  case 'production':
    api = constant.API_PRODUCTION;
    break;
  default:
    api = constant.API_DEVELOPMENT;
}

module.exports = merge(prodEnv, {
  NODE_ENV: constant.NODE_ENV_DEVELOPMENT,
  API: api,
});
