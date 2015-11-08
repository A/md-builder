'use strict';

const request = require('supertest');
const app = require('../');


const agent = request.agent(app);


describe('md-builder', () => {

  it('should work', done => {
    agent
      .post('/html')
      .send({
        lang: 'en',
        content: '# God in his heaven, all rights with the world!'
      })
      .expect(200, {
        data: '<h1>God in his heaven, all rights with the world!</h1>'
      })
      .end(done())
    ;
  });

})
