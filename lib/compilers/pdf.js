'use strict';

/**
 * Dependencies
 */
const debug    = require('./logger');
const toPDF    = require('markdown-pdf');
const Readable = require('stream').Readable
const fs       = require('fs');
const path     = require('path');


/**
 * Markdown to PDF compiler
 * @param {obj} data { lang: str, content: markdown}
 * @param {fn} cb callback to handle a buffer w/ PDF content
 */
module.exports = (data, cb) => {
  const opts = {
    paperBorder: '0cm'
  };
  const theme = data.theme
  if (theme) opts.cssPath = getThemeCss(theme);
  debug('pdf-compiler', data, opts.cssPath);
  toPDF(opts)
    .from.string(data.content)
    .to.buffer(null, (err, buffer) => cb(null, { content: buffer }))
  ;
}

/**
 * Returns path to theme's css file
 * @param {str} theme Name of theme
 * @returns {str}
 */
const getThemeCss = theme => path.join(__dirname, `../../themes/${theme}.css`);
