module.exports = {
  presets: [
    ['@babel/preset-env', {
      modules: false,
      targets: {
        browsers: ['iOS 12']
      }
    }],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    'react-hot-loader/babel'
  ]
}
