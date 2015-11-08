'use strict';

/**
 * Dependencies
 */
const debug  = require('debug')('md-builder:html-compiler');
const toHTML = require('commonmark-helpers').html;
const trim  = require('trim');


// TODO: typography
// TODO: layouts support

/**
 * Markdown to HTML compiler
 * @param {obj} data { lang: str, content: markdown}
 * @param {fn} cb Optional callback for case of async
 */
module.exports = (data, cb) => {
  debug('html parser has got data to parse');
  debug('lang: %s', data.lang);
  debug('content: %o', data.content);
  const parsed = trim(toHTML(data.content));
  return cb
    ? cb(null, parsed)
    : parsed
  ;
};
