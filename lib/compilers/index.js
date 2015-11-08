'use strict';

/**
 * Dependencies
 */
const debug = require('debug')('md-builder:formats');
const html  = require('commonmark-helpers').html;
const trim  = require('trim');

// TODO: typography
// TODO: layouts support


/**
 * Expose compilers
 */
const compilers = module.exports = {};


compilers.html = (data, cb) => {
  debug('html parser has got data to parse');
  debug('lang: %s', data.lang);
  debug('content: %o', data.content);
  const parsed = trim(html(data.content));
  return cb
    ? cb(null, parsed)
    : parsed
  ;
};
