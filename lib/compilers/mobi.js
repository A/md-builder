'use strict';

/**
 * Dependencies
 */
const debug        = require('./logger');
const epubCompiler = require('./epub');
const path         = require('path');
const spawn        = require('child_process').spawn;


/**
 * Markdown to Mobi compiler
 * @param {obj} data { lang: str, content: markdown}
 * @param {fn} cb Optional callback for case of async
 */
module.exports = (data, cb) => {
  debug('mobi-compiler', data);
  epubCompiler(data, (err, compiled) => {
    let file = path.basename(compiled.redirect);
    console.log(file);
    const book = path.resolve(`./public/files/${file}`);
    spawn('kindlegen', [book])
      .on('close', code => {
        console.error(code);
        // TODO: WTF? Ignore warnings
        if (code > 1) return cb(new Error('mobi convertation failed with ' + code));
        var out = path.basename(file, '.epub');
        cb(null, {
          redirect: `/files/${out}.mobi`
        });
      })
      .on('data', data => console.log(data))
    ;
  });
};

