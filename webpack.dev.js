const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')

module.exports = merge(commonConfig, {

  mode: 'development',

  output: {
    filename: '[name].js',
    chunkFilename: '[id].js',
    publicPath: '/'
  },

  devtool: 'cheap-module-eval-source-map',

  devServer: {
    port: 9000,
    historyApiFallback: true,
    hot: true,
    inline: true,
    contentBase: path.join(__dirname, 'docs'),
    disableHostCheck: true,
    index: 'index.html',
    // publicPath: '/little-goal/',
    watchOptions: {
      aggregateTimeout: 1000
    }
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
})
