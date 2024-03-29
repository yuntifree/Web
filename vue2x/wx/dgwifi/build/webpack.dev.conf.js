var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env,
      '__DEV__': true
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      chunks: ['app'],
    }),
    new HtmlWebpackPlugin({
      filename: 'map.html',
      template: 'map.html',
      inject: true,
      chunks: ['jmap'],
    }),
    new HtmlWebpackPlugin({
      filename: 'error.html',
      template: 'error.html',
      inject: true,
      chunks: ['error'],
    }),
    new HtmlWebpackPlugin({
      filename: 'welfare.html',
      template: 'welfare.html',
      inject: true,
      chunks: ['welfare'],
    }),
    new HtmlWebpackPlugin({
      filename: 'service.html',
      template: 'service.html',
      inject: true,
      chunks: ['service'],
    })
  ]
})
