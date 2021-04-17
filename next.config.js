const path = require('path')
const webpack = require('webpack')

module.exports = {
  webpack(config, options) {
    const envObj = require(path.join(__dirname, 'env.js'))

    const env = Object.keys(envObj).reduce((acc, name) => {
      acc[`process.env.${name}`] = JSON.stringify(envObj[name])
      return acc
    }, {})

    config.plugins.push(new webpack.DefinePlugin(env))

    return config
  },
}