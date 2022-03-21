import sinon from 'sinon';
import chai from 'chai';
import jwt from 'jsonwebtoken';
import { exec } from 'shelljs';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Error handler middleware', () => {
  let chaiHttpResponse: Response;
  let token: string;

  before(async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });

    token = chaiHttpResponse.body;

    sinon.stub(console, 'log').returns();
  });

  after(() => {
    (console.log as sinon.SinonStub).restore();
  })

  describe('When an unexpected error is thrown', () => {
    before(() => {
      const error = new Error('fake error');
      sinon.stub(jwt, 'verify').throws(error);
    });

    after(() => {
      (jwt.verify as sinon.SinonStub).restore();
    });

    it('API responds with status 500 and a generic message', async () => {    
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', token);
  
        const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(message).to.be.equal('Something went wrong here, please try again later');
    });
  });

  describe('When an error is thrown due to a JSON syntax error in the request body', () => {
    before(() => {
      const error = new SyntaxError('Unexpected string in JSON');
      sinon.stub(jwt, 'verify').throws(error);
    });

    after(() => {
      (jwt.verify as sinon.SinonStub).restore();
    });

    it('API responds with status 400 and a specific message', async () => {    
      chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', token);

      const { message } = chaiHttpResponse.body;

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(message).to.be.equal('Invalid body syntax');
    });
  });
});

