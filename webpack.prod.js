const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')

module.exports = merge(commonConfig, {

  mode: 'production',

  output: {
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[id].[chunkhash:8].js'
  },

  plugins: [
    new webpack.HashedModuleIdsPlugin()
  ]
})
