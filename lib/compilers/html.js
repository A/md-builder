'use strict';

/**
 * Dependencies
 */
const toHTML = require('commonmark-helpers').html;
const debug  = require('./logger');
const trim   = require('trim');
const jade   = require('jade');


// TODO: typography
// TODO: layouts support

/**
 * Markdown to HTML compiler
 * @param {obj} data { lang: str, content: markdown}
 * @param {fn} cb Optional callback for case of async
 */
module.exports = (data, cb) => {
  debug('html-compiler', data);
  const content = jade.compileFile('./views/gist.jade')({
    content: trim(toHTML(data.content)),
    title: data.title
  });
  return cb
    ? cb(null, { content })
    : parsed
  ;
};
