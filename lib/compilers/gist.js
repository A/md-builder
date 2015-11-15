'use strict';

/**
 * Dependencies
 */
const toHTML       = require('commonmark-helpers').html;
const debug        = require('./logger');
const htmlCompiler = require('./html');
const Gist         = require('../models/gist');


// TODO: typography
// TODO: layouts support

/**
 * Markdown to HTML compiler
 * @param {obj} data { lang: str, content: markdown}
 * @param {fn} cb Optional callback for case of async
 */
module.exports = (data, cb) => {
  debug('gist-compiler', data);
  const markdown = data.content;
  const lang = data.lang;
  htmlCompiler(data, (err, compiled) => {
    const gist = new Gist({
      content: compiled.content,
      markdown: data.content,
      lang: data.lang
    });
    gist.save().then((gist) => {
      if (err) return cb(err);
      cb(null, { gist_id: gist._id });
    });
  });
};
