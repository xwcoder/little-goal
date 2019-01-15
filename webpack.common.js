const path = require('path')

module.exports = {

  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.ts', '.tsx']
  },

  entry: {
    index: './src/index',
    // sw: './src/sw'
  },

  output: {
    filename: '[name].js',
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

  optimization: {
    // minimize: false,
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
