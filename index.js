'use strict';

/**
 * Dependencies
 */
const express    = require('express');
const bodyParser = require('body-parser');
const compilers  = require('./lib/compilers');
const debug      = require('debug')('md-builder:app');

debug('App has registred compilers for %o', Object.keys(compilers));

const app = module.exports = express()
  .use(bodyParser.json())
  .post('/:format', (req, res) => {
    debug('params: %o', req.params);
    debug('body: %o', req.body);
    const format = req.params.format;
    const parserFn = compilers[format.toLowerCase()];
    if (!parserFn) return res.sendStatus(404);
    debug('parser for %s has been found', format);
    const data = parserFn({
      content: req.body.content,
      lang: req.body.lang || 'en'
    }, (err, content) => {
      debug('Markdown has been compiled to %s: %o', format, content);
      res.send(content);
    });
  })
  .listen(8000, () => console.log('App listen 8000 port'))
;
