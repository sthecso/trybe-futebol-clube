/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable func-names */
/* eslint-disable mocha/no-mocha-arrows */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable max-lines-per-function */
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matchs', () => {
  describe('/GET Matchs', () => {
    it('o status é 200', async function () {
      const result = await chai.request(app)
        .get('/matchs');
      expect(result.status).to.be.equals(200);
    });

    it('deveria retornar uma lista de matchs', async function () {
      const result = await chai.request(app)
        .get('/matchs');
      expect(result.status).to.be.equals(200);
      expect(Array.isArray(result.body)).to.be.equal(true);
    });
  });

  describe('/POST Matchs', () => {
    it('deveria impedir adicionar partida com times iguais', async function () {
      const homeTeam = 1;
      const awayTeam = 1;

      const sameTeamError = 'It is not possible to create a match with two equal teams';

      const result = await chai.request(app)
        .post('/matchs')
        .set('content-type', 'application/json')
        .send({ homeTeam, awayTeam });
      expect(result.status).to.be.equals(401);
      expect(result.body).to.haveOwnProperty('message');
      expect(result.body.message).to.be.equals(sameTeamError);
    });

    it('deveria impedir adicionar partida com times não cadastrados', async function () {
      const homeTeam = 9999;
      const awayTeam = 8888;

      const teamNotFoundError = 'There is no team with such id!';

      const result = await chai.request(app)
        .post('/matchs')
        .set('content-type', 'application/json')
        .send({ homeTeam, awayTeam });
      expect(result.status).to.be.equals(401);
      expect(result.body).to.haveOwnProperty('message');
      expect(result.body.message).to.be.equals(teamNotFoundError);
    });

    it('deve ser possível adicionar uma partida nova com status inProgress', async function () {
      const newMatch = {
        homeTeam: 1,
        awayTeam: 2,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
        inProgress: true,
      };

      const result = await chai.request(app)
        .post('/matchs')
        .set('content-type', 'application/json')
        .send(newMatch);

      expect(result.status).to.be.equals(201);
      expect(result.body).to.haveOwnProperty('id');
    });
  });

  describe('/PATCH Matchs/:id/finish', () => {
    it('deveria permitir alterar o status inProgress da partida para false', async function () {
      const newMatch = {
        homeTeam: 1,
        awayTeam: 2,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
        inProgress: true,
      };

      const message = 'Finished match';

      const result = await chai.request(app)
        .post('/matchs')
        .set('content-type', 'application/json')
        .send(newMatch);

      expect(result.status).to.be.equals(201);
      expect(result.body).to.haveOwnProperty('id');

      const matchId = result.body.id;
      const matchFinished = await chai.request(app)
        .patch(`/matchs/${matchId}/finish`);
      expect(matchFinished.status).to.be.equals(200);
      expect(matchFinished.body).to.haveOwnProperty('message');
      expect(matchFinished.body.message).to.be.equals(message);
    });
  });

  describe('/PATCH Matchs/:id', () => {
    it('deveria permitir alterar uma partida', async function () {
      const placar = {
        homeTeamGoals: 3,
        awayTeamGoals: 1,
      };
      const matchId = 1;
      const result = await chai.request(app)
        .patch(`/matchs/${matchId}`)
        .set('content-type', 'application/json')
        .send(placar);
      expect(result.status).to.be.equals(204);
    });
  });
});
