const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')

module.exports = merge(commonConfig, {

  mode: 'development',

  output: {
    filename: '[name].js',
    chunkFilename: '[id].js'
  },

  devtool: 'cheap-module-eval-source-map',

  devServer: {
    port: 9000,
    historyApiFallback: true,
    hot: true,
    inline: true,
    contentBase: path.join(__dirname, 'dist'),
    disableHostCheck: true,
    index: 'index.html',
    // publicPath: '/',
    watchOptions: {
      aggregateTimeout: 1000
    }
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
})
