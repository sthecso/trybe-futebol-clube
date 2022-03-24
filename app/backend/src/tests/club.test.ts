import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { exec } from 'shelljs';
import * as messages from '../utils/messages';
import StatusCodes from '../utils/StatusCodes';

import allClubs from './expected_results/club';

chai.use(chaiHttp);

const { expect } = chai;

describe.skip('Club', () => {
  let httpResponse: Response;

  before(() => {
    exec('npm run db:reset');
  });

  describe('GET /clubs', () => {
    describe('When the request is successful', () => {
      it('The API responds with status 200', async () => {
        httpResponse = await chai
          .request(app)
          .get('/clubs')

        expect(httpResponse.status).to.be.equal(StatusCodes.OK);
      });

      it('The response body contains all clubs', async () => {
        const { body } = httpResponse;

        expect(body).to.be.deep.equal(allClubs);
      });
    });
  });

  describe('GET /clubs/:id', () => {
    describe('When the request is successful', () => {
      it('The API responds with status 200', async () => {
        httpResponse = await chai
          .request(app)
          .get('/clubs/1');

        expect(httpResponse.status).to.be.equal(StatusCodes.OK);
      });

      it('The API responds with the correct club', async () => {
        const { body } = httpResponse;

        expect(body).to.be.deep.equal(allClubs[0]);
      });
    });

    describe('When the requested club does not exist', () => {
      it('The API responds with status 404', async () => {
        httpResponse = await chai
          .request(app)
          .get('/clubs/71');

        expect(httpResponse.status).to.be
          .equal(StatusCodes.NOT_FOUND);
      });

      it('The API responds with the correct message', async () => {
        const { message } = httpResponse.body;

        expect(message).to.be.equal(messages.club.notFound);
      });
    });
  });
});
