import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { ILeaderboardTeam } from '../utils/interfaces';
import { sortLeaderboard } from '../utils/helperFunctions';

chai.use(chaiHttp);

const { expect } = chai;

const isSorted = (arr: ILeaderboardTeam[]) => {
  return arr.every((key: ILeaderboardTeam, index) => {
    return index === 0 ? true
      : key.totalPoints < arr[index - 1].totalPoints
      || key.totalVictories < arr[index - 1].totalVictories
      || key.goalsFavor < arr[index - 1].goalsFavor
      || key.goalsOwn > arr[index - 1].goalsOwn
      || true;
  });
}

describe('Tests GET /leaderboard/home', () => {
  it('Return status 200 with an array containing the teams', () => {
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
  it('Return teams sorted correctly', () => {
    return chai
      .request(app)
      .get('/leaderboard/home')
      .then((res: Response) => {
        expect(isSorted(res.body)).to.be.true;
        expect(sortLeaderboard(res.body)).to.be.equal(res.body);
      });
  })
})
describe('Tests GET /leaderboard/away', () => {
  it('Return status 200 with an array containing the teams', () => {
    return chai
      .request(app)
      .get('/leaderboard/away')
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
  it('Return teams sorted correctly', () => {
    return chai
      .request(app)
      .get('/leaderboard/away')
      .then((res: Response) => {
        expect(isSorted(res.body)).to.be.true;
        expect(sortLeaderboard(res.body)).to.be.equal(res.body);
      });
  })
})
describe('Tests GET /leaderboard/', () => {
  it('Return status 200 with an array containing the teams', () => {
    return chai
      .request(app)
      .get('/leaderboard/')
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
  it('Return teams sorted correctly', () => {
    return chai
      .request(app)
      .get('/leaderboard/')
      .then((res: Response) => {
        expect(isSorted(res.body)).to.be.true;
        expect(sortLeaderboard(res.body)).to.be.equal(res.body);
      });
  })
})

