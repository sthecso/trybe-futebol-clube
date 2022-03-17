import * as chai from 'chai';
import { exec } from 'shelljs';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { home } from './assets/leaderboard';

chai.use(chaiHttp);

const { expect } = chai;

describe.only('Leaderboard endpoints', () => {
  let chaiHttpResponse: Response;
  let loginToken: string;

  before(async () => {
    exec('npm run db:reset');

    chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: 'secret_admin' });

    loginToken = chaiHttpResponse.body.token
  });

  describe('When making GET request to /leaderboard/home', () => {
    it('API responds with status 200 and ordered ranking of clubs', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/home');

      const { status, body } = chaiHttpResponse;

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(home.result1);
    });

    it('After adding a new match: API responds with status 200 and ordered ranking of clubs', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matchs')
        .set('authorization', loginToken)
        .send({ homeTeam: 4, awayTeam: 9, homeTeamGoals: 2, awayTeamGoals: 1, inProgress: true });

      chaiHttpResponse = await chai
        .request(app)
        .patch(`/matchs/${chaiHttpResponse.body.id}/finish`);

      chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/home');

      const { status, body } = chaiHttpResponse;

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(home.result2);
    });
  });
});
