const merge = require('webpack-merge')
const path = require('path')
const common = require('./webpack.common.js')
const webpack = require('webpack')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    port: 5001,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        secure: false,
      },
      '/image.jpg': {
        target: 'http://localhost:8000',
        secure: false,
      },
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
})
