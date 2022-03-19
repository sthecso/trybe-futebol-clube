import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { verifyToken } from '../utils/tokenHelper';
import { IClub, IMatch } from '../utils/interfaces';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests GET /matchs route', () => {
  it('Return status 200 with an array containing all matches', async () => {
    return chai
      .request(app)
      .get('/matchs')
      .then((res: Response) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        res.body.forEach((club: IMatch) => {
          expect(club).to.have.property('id');
          expect(club).to.have.property('homeTeam');
          expect(club).to.have.property('homeTeamGoals');
          expect(club).to.have.property('awayTeam');
          expect(club).to.have.property('awayTeamGoals');
          expect(club).to.have.property('inProgress');
          expect(club).to.have.property('homeClub');
          expect(club.homeClub).to.have.property('clubName');
          expect(club).to.have.property('awayClub');
          expect(club.awayClub).to.have.property('clubName');
        })
      });
  })
});
describe('Tests GET /matchs?inProgress route', () => {
  describe('When inProgress is true', () => {
    it('Return status 200 with an array containing all matches inProgress', async () => {
      return chai
        .request(app)
        .get('/matchs')
        .query({ inProgress: true })
        .then((res: Response) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.be.an('array');
          res.body.forEach((club: IMatch) => {
            expect(club).to.have.property('id');
            expect(club).to.have.property('homeTeam');
            expect(club).to.have.property('homeTeamGoals');
            expect(club).to.have.property('awayTeam');
            expect(club).to.have.property('awayTeamGoals');
            expect(club).to.have.property('inProgress');
            expect(club.inProgress).to.be.true;
            expect(club).to.have.property('homeClub');
            expect(club.homeClub).to.have.property('clubName');
            expect(club).to.have.property('awayClub');
            expect(club.awayClub).to.have.property('clubName');
          })
        });
    })
  })
  describe('When inProgress is false', () => {
    it('Return status 200 with an array containing all matches finalized', async () => {
      return chai
        .request(app)
        .get('/matchs')
        .query({ inProgress: false })
        .then((res: Response) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.be.an('array');
          res.body.forEach((club: IMatch) => {
            expect(club).to.have.property('id');
            expect(club).to.have.property('homeTeam');
            expect(club).to.have.property('homeTeamGoals');
            expect(club).to.have.property('awayTeam');
            expect(club).to.have.property('awayTeamGoals');
            expect(club).to.have.property('inProgress');
            expect(club.inProgress).to.be.false;
            expect(club).to.have.property('homeClub');
            expect(club.homeClub).to.have.property('clubName');
            expect(club).to.have.property('awayClub');
            expect(club.awayClub).to.have.property('clubName');
          })
        });
    })
  })
});