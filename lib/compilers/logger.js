'use strict';

/**
 * Dependencies
 */
const Debug = require('debug');


/**
 * Wrapper to debug compiler's data
 * @param {str} name Name of compiler
 * @param {obj} data Diven data
 */
module.exports = (name, data, theme) => {
  const debug = Debug('md-builder:'+name);
  debug('html parser has got data to parse');
  debug('lang: %s', data.lang);
  debug('content: %o', data.content);
  debug('theme: %s', theme);
}
