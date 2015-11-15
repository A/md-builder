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
   * Render gist by id
   */
  .get('/gist/:id?', (req, res) => {
    const id = req.params.id;
    if (!id) return res.render('form');
    Gist
      .findById(id, (err, gist) => {
        res.render('form', gist.toJSON());
      })
    ;
  })

  .post('/gist/:id?', (req, res) => {
    const id      = req.params.id;
    const gist = id
      ? Gist.findById(id)
      : new Gist()
    ;
    gist.content = req.body.content;
    gist.title   = req.body.title;
    gist.lang    = req.body.lang;
    console.log(gist);
    gist
      .save(err => console.error(err))
      .then(gist => res.redirect('/gist/' + gist._id))
    ;
  })

  /**
   * Compile posted data to the given format
   */
  .post('/:format', (req, res) => {
    const format = req.params.format;
    const compiler = compilers.get(format);
    if (!compiler) return res.sendStatus(404);
    compiler(req.body, (err, data) => {
      if (data.gist_id) return res.send({ url: `${fullHost(req)}/gist/${data.gist_id}` })
      debug('Markdown has been compiled: %o', data.content);
      res.set('Content-Type', mime.lookup(format) || 'text/html');
      data.pipe ? data.pipe(res) : res.send(data.content);
    });
  })

  .listen(8000, () => console.log('App listen 8000 port'))
;


/**
 * Return full
 */
const fullHost = req => req.protocol + '://' + req.get('host');
