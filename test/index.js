'use strict';

const request = require('supertest');
const app     = require('../');
const assert  = require('assert');


const agent = request.agent(app);


describe('md-builder', () => {

  describe('HTML compiler', () => {
    it('should make some HTML', done => {
      agent
        .post('/html')
        .send({
          lang: 'en',
          content: '# God in his heaven, all rights with the world!'
        })
        .expect(200, '<h1>God in his heaven, all rights with the world!</h1>')
        .end(done)
      ;
    });
  });

  describe('PDF compiler', () => {
    it('should return PDF file', done => {
      agent
        .post('/pdf')
        .send({
          lang: 'en',
          content: '# God in his heaven, all rights with the world!'
        })
        .expect(200)
        .end((err, res) => {
          // TODO: stupidddd
          assert(0 === res.text.indexOf('%PDF'), 'should be PDF')
          done(err);
        })
    });
  });

})
