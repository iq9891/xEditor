var merge = require('webpack-merge')
var devEnv = require('./dev.env')
var constant = require('./constant.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API: constant.API_TESTING,
})
