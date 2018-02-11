var webpackMerge = require("webpack-merge");

var config = {
  JS_PATH: "/bundle.js",
  DEV: false,
  SERVER_HOST_RFD: 'ams-apidemo.wuliusys.com',
  SERVER_PORT_RFD: 443,
  SERVER_HOST_RFD: 'ams-apidemo.wuliusys.com',
  SERVER_PORT_HY: 443
}

module.exports = function(env, defaultConfig) {
  return webpackMerge(defaultConfig, config);
};
