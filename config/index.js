var path = require("path");
var webpack = require("webpack");

var config = {
  TEST_TEXT: "123"
};

module.exports = function(env) {
  env = env || "dev";
  return require("./env." + env + ".js")(env, config);
};
