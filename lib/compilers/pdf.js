'use strict';

/**
 * Dependencies
 */
const debug    = require('./logger');
const toPDF    = require('markdown-pdf');
const Readable = require('stream').Readable
const fs       = require('fs');


const mimetype = 'application/pdf';

/**
 * Markdown to PDF compiler
 * @param {obj} data { lang: str, content: markdown}
 * @param {fn} cb callback to handle a buffer w/ PDF content
 */
module.exports = (data, cb) => {
  debug('pdf-compiler', data);
  toPDF()
    .from.string(data.content)
    .to.buffer(null, (err, buffer) => cb(null, { content: buffer, mimetype }))
  ;
}
