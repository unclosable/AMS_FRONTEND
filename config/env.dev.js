var webpackMerge = require("webpack-merge");

var config = {
  JS_PATH: "/bundle.js",
  DEV: true,
  SERVER_HOST: '127.0.0.1',
  SERVER_PORT: 10002
}

module.exports = function(env, defaultConfig) {
  return webpackMerge(defaultConfig, config);
};
