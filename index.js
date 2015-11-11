'use strict';

/**
 * Dependencies
 */
const express    = require('express');
const bodyParser = require('body-parser');
const logger     = require('morgan');
const debug      = require('debug')('md-builder:app');
const compilers  = require('./lib/compilers');


const app = module.exports = express()

  // Config
  .set('views', './views')
  .set('view engine', 'jade')

  // Middlewares
  .use(logger('dev'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded())
  .use(express.static('./public'))
  .use((req, res, next) => {
      debug('params: %o', req.params);
      debug('body: %o', req.body);
      next();
  })

  .get('/', (req, res) => res.render('index'))

  .post('/:format', (req, res) => {
    const compiler = compilers.get(req.params.format);
    if (!compiler) return res.sendStatus(404);
    compiler({
      content: req.body.content,
      lang: req.body.lang
    }, (err, data) => {
      debug('Markdown has been compiled: %o', data.content);
      res.set('Content-Type', data.mimetype || 'text/html');
      res.send(data.content);
    });
  })

  .listen(8000, () => console.log('App listen 8000 port'))
;
