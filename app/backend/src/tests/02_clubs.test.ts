import chai from 'chai';
import { exec } from 'shelljs';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { clubsList } from './assets/clubs';

chai.use(chaiHttp);

const { expect } = chai;

describe('Clubs endpoints', () => {
  let chaiHttpResponse: Response;

  before(() => {
    exec('npm run db:reset');
  });

  describe('When making GET request to /clubs', () => {
    it('API responds with status 200 and list of all clubs', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/clubs');

      const { status, body } = chaiHttpResponse;
  
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(clubsList)
    });
  });

  describe('When making GET request to /clubs/:id', () => {
    it('and club exists: API responds with status 200 and corresponding club data based on id', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/clubs/5');

      const { status, body } = chaiHttpResponse;
  
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(clubsList[4]);
    });

    it('and club does not exist: API responds with status 404 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/clubs/447');

      const { status, body } = chaiHttpResponse;
  
      expect(status).to.be.equal(404);
      expect(body.message).to.be.equal('Club not found');
    });
  })
});
