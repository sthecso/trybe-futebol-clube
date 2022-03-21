import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { ILeaderboardTeam } from '../utils/interfaces';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests GET /leaderboard/home', () => {
  it('Return status 200 with an array containing the teams in order', () => {
    return chai
      .request(app)
      .get('/leaderboard/home')
      .then((res: Response) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        res.body.forEach((team: ILeaderboardTeam) => {
          expect(team).to.have.property('name');
          expect(team).to.have.property('totalPoints');
          expect(team).to.have.property('totalGames');
          expect(team).to.have.property('totalVictories');
          expect(team).to.have.property('totalDraws');
          expect(team).to.have.property('totalLosses');
          expect(team).to.have.property('goalsFavor');
          expect(team).to.have.property('goalsOwn');
          expect(team).to.have.property('goalsBalance');
          expect(team).to.have.property('efficiency');
        })
      });
  })
})

