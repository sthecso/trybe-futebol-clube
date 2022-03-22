import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Clubs', () => {
  describe('GET /clubs', () => {
    let chaiHttpResponse: Response;
  
    it('tests if /clubs is GET with status 200 returns all clubs', async () => {
      const clubs = [
        {
          "id": 1,
          "clubName": "Avaí/Kindermann"
        },
        {
          "id": 2,
          "clubName": "Bahia"
        },
        {
          "id": 3,
          "clubName": "Botafogo"
        },
      ]
      
      chaiHttpResponse = await chai
         .request(app)
         .get('/clubs')
         .send(clubs)

        const { body } = chaiHttpResponse;
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(body).to.be.an('array');
      expect(body).to.be.equal(clubs);
    });
    it('tests if /clubs/:id is GET with status 200 returns one club', async () => {
      const club = {
        "id": 1,
        "clubName": "Avaí/Kindermann"
      }
      
      chaiHttpResponse = await chai
         .request(app)
         .get('/clubs/1')
         .send(club)

        const { body } = chaiHttpResponse;
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(body).to.be.an('object');
      expect(body).to.be.equal(club);
    });
  });
});
