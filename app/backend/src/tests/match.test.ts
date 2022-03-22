import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches', () => {
  describe('GET /matchs', () => {
    let chaiHttpResponse: Response;
  
    it('tests if /matchs is GET with status 200 returns all matches', async () => {
      const matches = [
        {
          "id": 1,
          "homeTeam": 16,
          "homeTeamGoals": 1,
          "awayTeam": 8,
          "awayTeamGoals": 1,
          "inProgress": false,
          "homeClub": {
            "clubName": "São Paulo"
          },
          "awayClub": {
            "clubName": "Grêmio"
          }
        },
        {
          "id": 41,
          "homeTeam": 16,
          "homeTeamGoals": 2,
          "awayTeam": 9,
          "awayTeamGoals": 0,
          "inProgress": true,
          "homeClub": {
            "clubName": "São Paulo"
          },
          "awayClub": {
            "clubName": "Internacional"
          }
        }
      ]
      
      chaiHttpResponse = await chai
         .request(app)
         .get('/clubs')
         .send(matches)

        const { body } = chaiHttpResponse;
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(body).to.be.an('array');
      expect(body).to.be.equal(matches);
    });
  });
});
