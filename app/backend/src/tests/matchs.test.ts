import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { verifyToken } from '../utils/tokenHelper';
import { IClub } from '../utils/interfaces';

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
        res.body.forEach((club: IClub) => {
          expect(club).to.have.property('id');
          expect(club).to.have.property('homeTeam');
          expect(club).to.have.property('homeTeamGoals');
          expect(club).to.have.property('awayTeam');
          expect(club).to.have.property('awayTeamGoals');
          expect(club).to.have.property('inProgress');
          expect(club).to.have.property('homeClub');
          expect(club).to.have.property('awayClub');
        })
      });
  })
});