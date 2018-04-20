const isProd = require('./lib/isProd')

module.exports = () => {
  return require(`./webpack.${isProd() ? 'prod' : 'dev'}.js`)
}
