const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')

module.exports = {

  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.ts', '.tsx']
  },

  entry: {
    index: './src/index'
  },

  output: {
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: 'babel-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.ejs'
    }),
    new AssetsPlugin({
      filename: './dist/assets.js',
      processOutput: (assets) => {
        const list = Object.values(assets).map((item) => item.js).filter((item) => !!item)
        return `var assets = ${JSON.stringify(list)}`
      }
    })
  ],

  optimization: {
    minimize: process.env.NODE_ENV === 'development' ? false : true,
    runtimeChunk: {
      name: 'manifest'
    },
    namedChunks: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/
        }
      }
    }
  }
}
