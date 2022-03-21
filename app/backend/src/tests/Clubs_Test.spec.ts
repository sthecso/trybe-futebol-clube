import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

const ROUTE_CLUBS = '/clubs';
const ROUTE_CLUBS_ID = '/clubs/1';

describe('Clubs Test', () => {
  describe('When request is ok', () => {
    let chaiHttpResponse: Response;
    it('Return status code 200', async () => {
      chaiHttpResponse = await chai.request(app).get(ROUTE_CLUBS)
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });

  describe('When Request with id', () => {
    let chaiHttpResponse: Response;
    it('Return status code 200', async () => {
      chaiHttpResponse = await chai.request(app).get(ROUTE_CLUBS_ID)
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });
});
