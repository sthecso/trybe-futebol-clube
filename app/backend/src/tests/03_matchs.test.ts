import * as chai from 'chai';
import { exec } from 'shelljs';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { allMatchs, finishedMatchs, inProgressMatchs } from './assets/matchs';

chai.use(chaiHttp);

const { expect } = chai;

describe('Clubs endpoints', () => {
  let chaiHttpResponse: Response;

  before(() => {
    exec('npm run db:reset');
  });

  describe('When making GET request to /matchs with no filters applied', () => {
    it('API responds with status 200 and list of all matches and relevant data', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matchs');

      const { status, body } = chaiHttpResponse;

      expect(status).to.be.equal(200);
      expect(body.length).to.be.equal(48);
      expect(body).to.deep.include.members(allMatchs); // ft. Murilo
    });
  });

  describe('When making GET request to /matchs filtering for matchs in progress', () => {
    it('API responds with status 200 and list of matchs in progress and relevant data', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matchs')
        .query({ inProgress: true });

      const { status, body } = chaiHttpResponse;
  
      expect(status).to.be.equal(200);
      expect(body.length).to.be.equal(8);
      expect(body).to.deep.include.members(inProgressMatchs); // ft. Murilo
    });
  });

  describe('When making GET request to /matchs filtering for finished matchs', () => {
    it('API responds with status 200 and list of finished matchs and relevant data', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matchs')
        .query({ inProgress: false });

      const { status, body } = chaiHttpResponse;
  
      expect(status).to.be.equal(200);
      expect(body.length).to.be.equal(40);
      expect(body).to.deep.include.members(finishedMatchs); // ft. Murilo
    });
  });
});
