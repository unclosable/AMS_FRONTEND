const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const configFunc = require('./config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtraBabelPlugins = require('babel-plugin-import');
const CleanWebpackPlugin = require('clean-webpack-plugin'); //installed via npm
const config = configFunc(process.env.NODE_ENV);

const entry = ("webpack/hot/only-dev-server", __dirname + "/index.js")

const plugins = config.DEV
  ? []
  : [new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    })];

const sourceMapSet = config.DEV
  ? "#eval-source-map"
  : "";
const outputFilename = config.DEV
  ? 'bundle.js'
  : "build/bundle-[hash:8].js"
module.exports = {
  devtool: sourceMapSet,
  entry: entry, //已多次提及的唯一入口文件
  output: {
    path: __dirname + "/build", //打包后的文件存放的地方
    filename: outputFilename, //打包后输出文件的文件名
  },
  module: {
    loaders: [
      {
        //js+jsx
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: [
            'react', 'es2015'
          ],
          plugins: [
            [
              "import", {
                "libraryName": "antd",
                "style": true
              }
            ]
          ]
        }
      }, {
        //less
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      }, {
        test: /\.svg$/,
        loader: 'url-loader?limit=8192!svgo-loader'
      }, {
        //css
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html', template: 'index0.html',
      //favicon: resolveApp('scorpio-face.ico'),
      inject: true
    }),
    new webpack.ProvidePlugin({React: "react", react_dom: "react-dom"}),
    new webpack.DefinePlugin({config: JSON.stringify(config)}),
    new ExtractTextPlugin("styles.css"),
    ...plugins
  ],
  devServer: {
    host: '0.0.0.0',
    port: 4000,
    contentBase: "/", //本地服务器所加载的页面所在的目录
    historyApiFallback: true, //不跳转
    // colors: true,
    inline: true, //实时刷新
    hot: true
  }
}
