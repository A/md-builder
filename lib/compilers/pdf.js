'use strict';

/**
 * Dependencies
 */
const debug = require('debug')('md-builder:pdf-compiler');
const toPDF = require('markdown-pdf');
const Readable = require('stream').Readable


/**
 * Markdown to PDF compiler
 * @param {obj} data { lang: str, content: markdown}
 * @param {fn} cb callback to handle a buffer w/ PDF content
 */
module.exports = (data, cb) => {
  debug('pdf parser has got data to parse');
  debug('lang: %s', data.lang);
  debug('content: %o', data.content);
   toPDF()
    .from.string(data.content)
    .to.buffer(null, (err, buffer) => cb(null, buffer))
  ;
}
