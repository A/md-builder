'use strict';

/**
 * Dependencies
 */
const debug = require('debug')('md-builder:compilers');


/**
 * Expose compilers
 */
exports.get  = getCompiler;
exports.html = require('./html');
exports.pdf  = require('./pdf');
exports.gist = require('./gist');
exports.epub = require('./epub');
exports.mobi = require('./mobi');


/**
 * Returns compiler by format name
 * @param {str} format Format to compile
 * @returns {fn}
 */
function getCompiler(format) {
  format = format.toLowerCase();
  const compiler = exports[format];
  if (compiler) {
    debug('compiler for %s has been found', format);
    return compiler;
  } else {
    debug('compiler for %s not found', format);
    return null;
  }
}
