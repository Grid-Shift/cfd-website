const webpack = require('webpack')
const babiliPlugin = require('babili-webpack-plugin')

module.exports = {
  entry: {
    app: './assets/scripts/app.js'
  },
  output: {
    path: __dirname + '/.tmp_assets/assets/scripts',
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    ]
  },
  plugins: [
    new babiliPlugin({
      removeConsole: true,
      removeDebugger: true,
      simplifyComparisons: false
    })
  ]
}
