const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')

module.exports = merge(commonConfig, {

  mode: 'development',

  devtool: 'eval-source-map',

  devServer: {
    port: 9000,
    historyApiFallback: true,
    hot: true,
    inline: true,
    disableHostCheck: true,
    index: 'index.html',
    // publicPath: '/bundle/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
})