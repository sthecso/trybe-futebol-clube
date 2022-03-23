/* eslint-disable max-lines-per-function */
/* eslint-disable no-unused-vars */
/* eslint-disable mocha/no-identical-title */
/* eslint-disable max-lines */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable max-len */
/* eslint-disable mocha/no-mocha-arrows */
/* eslint-disable import/extensions */
// import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Response } from 'superagent';

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

// eslint-disable-next-line max-lines-per-function
describe('/leaderboard', () => {
  // eslint-disable-next-line max-lines-per-function
  describe('GET  /leaderboard route', () => {
    it('GET /leaderboard/home', async () => {
      const response: Response = await chai
        .request(app)
        .get('/leaderboard/home')
        .set('content-type', 'application/json');
      expect(response.status).to.equals(200);
      expect((response.body)).to.be.an('array');
    });
  });
});
