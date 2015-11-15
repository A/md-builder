'use strict';

/**
 * Dependencies
 */
const toHTML       = require('commonmark-helpers').html;
const debug        = require('./logger');
const htmlCompiler = require('./html');
const jade         = require('jade');
const generator    = require('epub-generator');

/**
 * Markdown to Epub compiler
 * @param {obj} data { lang: str, content: markdown}
 * @param {fn} cb Optional callback for case of async
 */
module.exports = (data, cb) => {
  debug('gist-compiler', data);
  const markdown = data.content;
  const lang = data.lang;
  htmlCompiler(data, (err, compiled) => {
    const html = jade.compileFile('./views/gist.jade')(compiled);
    return generator({title: 'Hello World' })
      .add(html)
      .end()
    ;
  });
};

