'use strict'

/* -----------------------------------------------------------------------------
 * dependencies
 * -------------------------------------------------------------------------- */

// 3rd party
const _ = require('lodash')
const VirtualModulePlugin = require('virtual-module-webpack-plugin')

/* -----------------------------------------------------------------------------
 * middleware
 * -------------------------------------------------------------------------- */

const requireOptions = function (options, ...args) {
  args.forEach((arg) => {
    if (!options[arg]) { throw new Error(`"options.${arg}" is required.`) }
  })
}

module.exports = (neutrino, options) => {
  requireOptions(options, 'filename', 'name', 'value')

  let value = options.value
  if (_.isObject(value)) {
    value = JSON.stringify(value)
  }

  neutrino.config.plugin(`globalvar-${options.filename}`)
    .use(VirtualModulePlugin, [{
      moduleName: options.filename,
      contents: `/* eslint-disable */\n${options.name} = ${value}`
    }])
}
