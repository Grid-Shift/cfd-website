const webpack = require('webpack')

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
          presets: ['env'],
          cacheDirectory: true
        }
      }
    ]
  }
}
