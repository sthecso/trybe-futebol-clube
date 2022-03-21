import chai from 'chai';
import { exec } from 'shelljs';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { home, away, overall } from './assets/leaderboard';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard endpoints', () => {
  let chaiHttpResponse: Response;
  let loginToken: string;

  before(async () => {
    chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: 'secret_admin' });

    loginToken = chaiHttpResponse.body.token
  });

  
  describe('When making GET request to /leaderboard/home', () => {
    before(() => {
      exec('npm run db:reset');
    });

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
        .post('/matches')
        .set('authorization', loginToken)
        .send({ homeTeam: 4, awayTeam: 9, homeTeamGoals: 2, awayTeamGoals: 1, inProgress: true });

      chaiHttpResponse = await chai
        .request(app)
        .patch(`/matches/${chaiHttpResponse.body.id}/finish`);

      chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/home');

      const { status, body } = chaiHttpResponse;

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(home.result2);
    });
  });

  describe('When making GET request to /leaderboard/away', () => {
    before(() => {
      exec('npm run db:reset');
    });

    it('API responds with status 200 and ordered ranking of clubs', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/away');

      const { status, body } = chaiHttpResponse;

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(away.result1);
    });

    it('After adding a new match: API responds with status 200 and ordered ranking of clubs', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', loginToken)
        .send({ homeTeam: 4, awayTeam: 9, homeTeamGoals: 2, awayTeamGoals: 1, inProgress: true });

      chaiHttpResponse = await chai
        .request(app)
        .patch(`/matches/${chaiHttpResponse.body.id}/finish`);

      chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/away');

      const { status, body } = chaiHttpResponse;

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(away.result2);
    });
  });

  describe('When making GET request to /leaderboard', () => {
    before(() => {
      exec('npm run db:reset');
    });

    it('API responds with status 200 and ordered ranking of clubs', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard');

      const { status, body } = chaiHttpResponse;

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(overall.result1);
    });

    it('After adding a new match: API responds with status 200 and ordered ranking of clubs', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', loginToken)
        .send({ homeTeam: 7, awayTeam: 11, homeTeamGoals: 3, awayTeamGoals: 0, inProgress: true });

      chaiHttpResponse = await chai
        .request(app)
        .patch(`/matches/${chaiHttpResponse.body.id}/finish`);

      chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard');

      const { status, body } = chaiHttpResponse;

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(overall.result2);
    });
  });
});
