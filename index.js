'use strict';

/**
 * Dependencies
 */
const express    = require('express');
const bodyParser = require('body-parser');
const logger     = require('morgan');
const debug      = require('debug')('md-builder:app');
const compilers  = require('./lib/compilers');
const mime       = require('mime-types');
const mongoose   = require('mongoose');
const Gist       = require('./lib/models/gist');


mongoose.connect('mongodb://localhost/test', (err) => {

});


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

  /**
   * Render homepage
   */
  .get('/', (req, res) => res.render('index'))

  /**
   * Compile posted data to the given format
   */
  .post('/:format', (req, res) => {
    const format = req.params.format;
    const compiler = compilers.get(format);
    if (!compiler) return res.sendStatus(404);
    compiler(req.body, (err, data) => {
      if (data.gist_id) return res.redirect('/gist/' + data.gist_id);
      debug('Markdown has been compiled: %o', data.content);
      res.set('Content-Type', mime.lookup(format) || 'text/html');
      res.send(data.content);
    });
  })

  /**
   * Render gist by id
   */
  .get('/gist/:id', (req, res) => {
    Gist
      .findById(req.params.id, (err, gist) => {
        res.render('gist', gist.toJSON());
      })
    ;
  })

  .listen(8000, () => console.log('App listen 8000 port'))
;
