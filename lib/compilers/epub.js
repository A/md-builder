'use strict';

/**
 * Dependencies
 */
const toHTML       = require('commonmark-helpers').html;
const debug        = require('./logger');
const htmlCompiler = require('./html');
const jade         = require('jade');
const spawn        = require('child_process').spawn;
const path         = require('path');
const epubsh       = path.resolve('./shell/epub.sh');


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
    let epub = '';
    const book = path.resolve(`./public/files/${data.id}.epub`);
    const html = jade.compileFile('./views/gist.jade')(compiled);
    const cmd = spawn(epubsh, [html, book]);
    cmd.on('close', (code) => {
      if (code !== 0) return cb(new Error('epub.sh exit status ' + code));
      cb(null, { redirect: `/files/${data.id}.epub` });
    });
  });
};

