/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable max-len */
/* eslint-disable mocha/no-mocha-arrows */
/* eslint-disable import/extensions */
// import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Response } from 'superagent';

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

const teamsData = [
  {
    id: 1,
    clubName: 'Avaí/Kindermann',
  },
  {
    id: 2,
    clubName: 'Bahia',
  },
  {
    id: 3,
    clubName: 'Botafogo',
  },
  {
    id: 4,
    clubName: 'Corinthians',
  },
  {
    id: 5,
    clubName: 'Cruzeiro',
  },
  {
    id: 6,
    clubName: 'Ferroviária',
  },
  {
    id: 7,
    clubName: 'Flamengo',
  },
  {
    id: 8,
    clubName: 'Grêmio',
  },
  {
    id: 9,
    clubName: 'Internacional',
  },
  {
    id: 10,
    clubName: 'Minas Brasília',
  },
  {
    id: 11,
    clubName: 'Napoli-SC',
  },
  {
    id: 12,
    clubName: 'Palmeiras',
  },
  {
    id: 13,
    clubName: 'Real Brasília',
  },
  {
    id: 14,
    clubName: 'Santos',
  },
  {
    id: 15,
    clubName: 'São José-SP',
  },
  {
    id: 16,
    clubName: 'São Paulo',
  },
];

// eslint-disable-next-line max-lines-per-function
describe('/clubs', () => {
  // eslint-disable-next-line max-lines-per-function
  describe('GET route', () => {
    it('GET /clubs', async () => {
      const response: Response = await chai
        .request(app)
        .get('/clubs')
        .set('content-type', 'application/json');
      expect((response.body)).to.deep.equals(teamsData);
      expect(response.status).to.equals(200);
    });
    it('GET clubs/:id', async () => {
      const id = 2;

      const response: Response = await chai
        .request(app)
        .get(`/clubs/${id}`)
        .set('content-type', 'application/json');
      expect((response.body)).to.deep.equals({
        id: 2,
        clubName: 'Bahia',
      });
      expect(response.status).to.equals(200);
    });
  });
});
