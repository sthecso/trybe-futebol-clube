import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Clubs Test', () => {
  describe('When request is ok', () => {
    let chaiHttpResponse: Response;
    it('Return status code 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/clubs')
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });

  describe('When Request with id', () => {
    let chaiHttpResponse: Response;
    it('Return status code 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/clubs/1')
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });
});
