var webpackMerge = require("webpack-merge");

var config = {
  JS_PATH: "/build/bundle.js",
  DEV: false,
  SERVER_HOST_RFD: 'ams-api.wltest.com',
  SERVER_PORT_RFD: 80,
  SERVER_HOST_HY: 'ams-api.wltest.com',
  SERVER_PORT_HY: 80
}

module.exports = function(env, defaultConfig) {
  return webpackMerge(defaultConfig, config);
};
