'use strict';

/**
 * Dependencies
 */
const toHTML = require('commonmark-helpers').html;
const debug = require('./logger');
const trim  = require('trim');


// TODO: typography
// TODO: layouts support

/**
 * Markdown to HTML compiler
 * @param {obj} data { lang: str, content: markdown}
 * @param {fn} cb Optional callback for case of async
 */
module.exports = (data, cb) => {
  debug('markdown-compiler', data);
  const content = trim(toHTML(data.content));
  return cb
    ? cb(null, { content })
    : parsed
  ;
};
