import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { exec } from 'shelljs';
// import * as messages from '../utils/messages';
import StatusCodes from '../utils/StatusCodes';

import {
  firstStat,
  secondStat,
  thirdStat,
} from './expected_results/leaderboard';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard', () => {
  let httpResponse: Response;

  before(() => {
    exec('npm run db:reset');
  });

  describe('GET /leaderboard/home', () => {
    describe('When the request is successful', () => {
      it('The API responds with status 200', async () => {
        httpResponse = await chai
          .request(app)
          .get('/leaderboard/home')

        expect(httpResponse.status).to.be.equal(StatusCodes.OK);
      });

      it('The response body contains the correct first member', async () => {
        const { body } = httpResponse;

        expect(JSON.stringify(body[0])).to.be
          .equal(JSON.stringify(firstStat));
      });

      it('The response body contains the correct second member', async () => {
        const { body } = httpResponse;

        expect(JSON.stringify(body[1])).to.be
          .equal(JSON.stringify(secondStat));
      });

      it('The response body contains the correct third member', async () => {
        const { body } = httpResponse;

        expect(JSON.stringify(body[2])).to.be
          .equal(JSON.stringify(thirdStat));
      });
    });
  });
});
