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
   * Render gist form on homepage
   */
  .get('/', (req, res) => res.redirect('/gist'))

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

  /**
   * Update gist
   */
  .post('/gist/:id?', (req, res) => {
    const id = req.params.id;
    const data = {
      content: req.body.content,
      lang: req.body.lang,
      title: req.body.title
    };
    if (id) {
      Gist.update({ _id: id}, {
        $set: data
      }, (err, gist) => {
        if (err) return console.error(err);
        res.redirect('back');
      })
    } else {
      new Gist(data)
        .save(err => console.error(err))
        .then(gist => res.redirect('/gist/' + gist._id))
      ;
    }
  })

  /**
   * _Create_ book in the given format and response w/ it
   */
  .get('/:format/:id?', (req, res) => {
    const format = req.params.format;
    const id = req.params.id;
    if (!id) return res.sendStatus(501); // TODO: Implement API
    const compiler = compilers.get(format);
    if (!compiler) return res.sendStatus(404);
    Gist
      .findById(id, (err, gist) => {
        compiler({
          title: gist.title,
          content: gist.content,
          lang: gist.lang
        }, (err, data) => {
          if (data.gist_id) return res.send({ url: `${fullHost(req)}/gist/${data.gist_id}` })
          debug('Markdown has been compiled: %o', data.content);
          res.set('Content-Type', mime.lookup(format) || 'text/html');
          data.pipe ? data.pipe(res) : res.send(data.content);
        });
      })
    ;
  })

  // #<{(|*
  //  * Compile posted data to the given format
  //  |)}>#
  // .post('/:format', (req, res) => {
  //   const format = req.params.format;
  //   const compiler = compilers.get(format);
  //   if (!compiler) return res.sendStatus(404);
  //   compiler(req.body, (err, data) => {
  //     if (data.gist_id) return res.send({ url: `${fullHost(req)}/gist/${data.gist_id}` })
  //     debug('Markdown has been compiled: %o', data.content);
  //     res.set('Content-Type', mime.lookup(format) || 'text/html');
  //     data.pipe ? data.pipe(res) : res.send(data.content);
  //   });
  // })

  .listen(8000, () => console.log('App listen 8000 port'))
;


/**
 * Return full url
 */
const fullHost = req => req.protocol + '://' + req.get('host');
