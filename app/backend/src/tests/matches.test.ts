/* eslint-disable max-lines-per-function */
/* eslint-disable no-unused-vars */
/* eslint-disable mocha/no-identical-title */
/* eslint-disable max-lines */
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

const allMatches = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeClub: { clubName: 'São Paulo' },
    awayClub: { clubName: 'Grêmio' },
  },
  {
    id: 2,
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: false,
    homeClub: { clubName: 'Internacional' },
    awayClub: { clubName: 'Santos' },
  },
  {
    id: 3,
    homeTeam: 4,
    homeTeamGoals: 3,
    awayTeam: 11,
    awayTeamGoals: 0,
    inProgress: false,
    homeClub: { clubName: 'Corinthians' },
    awayClub: { clubName: 'Napoli-SC' },
  },
  {
    id: 4,
    homeTeam: 3,
    homeTeamGoals: 0,
    awayTeam: 2,
    awayTeamGoals: 0,
    inProgress: false,
    homeClub: { clubName: 'Botafogo' },
    awayClub: { clubName: 'Bahia' },
  },
  {
    id: 5,
    homeTeam: 7,
    homeTeamGoals: 1,
    awayTeam: 10,
    awayTeamGoals: 1,
    inProgress: false,
    homeClub: { clubName: 'Flamengo' },
    awayClub: { clubName: 'Minas Brasília' },
  },
  {
    id: 6,
    homeTeam: 5,
    homeTeamGoals: 1,
    awayTeam: 13,
    awayTeamGoals: 1,
    inProgress: false,
    homeClub: { clubName: 'Cruzeiro' },
    awayClub: { clubName: 'Real Brasília' },
  },
  {
    id: 7,
    homeTeam: 12,
    homeTeamGoals: 2,
    awayTeam: 6,
    awayTeamGoals: 2,
    inProgress: false,
    homeClub: { clubName: 'Palmeiras' },
    awayClub: { clubName: 'Ferroviária' },
  },
  {
    id: 8,
    homeTeam: 15,
    homeTeamGoals: 0,
    awayTeam: 1,
    awayTeamGoals: 1,
    inProgress: false,
    homeClub: { clubName: 'São José-SP' },
    awayClub: { clubName: 'Avaí/Kindermann' },
  },
  {
    id: 9,
    homeTeam: 1,
    homeTeamGoals: 0,
    awayTeam: 12,
    awayTeamGoals: 3,
    inProgress: false,
    homeClub: { clubName: 'Avaí/Kindermann' },
    awayClub: { clubName: 'Palmeiras' },
  },
  {
    id: 10,
    homeTeam: 2,
    homeTeamGoals: 0,
    awayTeam: 9,
    awayTeamGoals: 2,
    inProgress: false,
    homeClub: { clubName: 'Bahia' },
    awayClub: { clubName: 'Internacional' },
  },
  {
    id: 11,
    homeTeam: 13,
    homeTeamGoals: 1,
    awayTeam: 3,
    awayTeamGoals: 0,
    inProgress: false,
    homeClub: { clubName: 'Real Brasília' },
    awayClub: { clubName: 'Botafogo' },
  },
  {
    id: 12,
    homeTeam: 6,
    homeTeamGoals: 0,
    awayTeam: 4,
    awayTeamGoals: 1,
    inProgress: false,
    homeClub: { clubName: 'Ferroviária' },
    awayClub: { clubName: 'Corinthians' },
  },
  {
    id: 13,
    homeTeam: 8,
    homeTeamGoals: 2,
    awayTeam: 5,
    awayTeamGoals: 1,
    inProgress: false,
    homeClub: { clubName: 'Grêmio' },
    awayClub: { clubName: 'Cruzeiro' },
  },
  {
    id: 14,
    homeTeam: 14,
    homeTeamGoals: 2,
    awayTeam: 16,
    awayTeamGoals: 1,
    inProgress: false,
    homeClub: { clubName: 'Santos' },
    awayClub: { clubName: 'São Paulo' },
  },
  {
    id: 15,
    homeTeam: 10,
    homeTeamGoals: 0,
    awayTeam: 15,
    awayTeamGoals: 1,
    inProgress: false,
    homeClub: { clubName: 'Minas Brasília' },
    awayClub: { clubName: 'São José-SP' },
  },
  {
    id: 16,
    homeTeam: 11,
    homeTeamGoals: 0,
    awayTeam: 7,
    awayTeamGoals: 0,
    inProgress: false,
    homeClub: { clubName: 'Napoli-SC' },
    awayClub: { clubName: 'Flamengo' },
  },
  {
    id: 17,
    homeTeam: 1,
    homeTeamGoals: 2,
    awayTeam: 8,
    awayTeamGoals: 3,
    inProgress: false,
    homeClub: { clubName: 'Avaí/Kindermann' },
    awayClub: { clubName: 'Grêmio' },
  },
  {
    id: 18,
    homeTeam: 12,
    homeTeamGoals: 4,
    awayTeam: 5,
    awayTeamGoals: 2,
    inProgress: false,
    homeClub: { clubName: 'Palmeiras' },
    awayClub: { clubName: 'Cruzeiro' },
  },
  {
    id: 19,
    homeTeam: 11,
    homeTeamGoals: 2,
    awayTeam: 2,
    awayTeamGoals: 2,
    inProgress: false,
    homeClub: { clubName: 'Napoli-SC' },
    awayClub: { clubName: 'Bahia' },
  },
  {
    id: 20,
    homeTeam: 7,
    homeTeamGoals: 0,
    awayTeam: 9,
    awayTeamGoals: 1,
    inProgress: false,
    homeClub: { clubName: 'Flamengo' },
    awayClub: { clubName: 'Internacional' },
  },
  {
    id: 21,
    homeTeam: 6,
    homeTeamGoals: 3,
    awayTeam: 13,
    awayTeamGoals: 1,
    inProgress: false,
    homeClub: { clubName: 'Ferroviária' },
    awayClub: { clubName: 'Real Brasília' },
  },
  {
    id: 22,
    homeTeam: 4,
    homeTeamGoals: 3,
    awayTeam: 3,
    awayTeamGoals: 1,
    inProgress: false,
    homeClub: { clubName: 'Corinthians' },
    awayClub: { clubName: 'Botafogo' },
  },
  {
    id: 23,
    homeTeam: 15,
    homeTeamGoals: 2,
    awayTeam: 16,
    awayTeamGoals: 3,
    inProgress: false,
    homeClub: { clubName: 'São José-SP' },
    awayClub: { clubName: 'São Paulo' },
  },
  {
    id: 24,
    homeTeam: 10,
    homeTeamGoals: 2,
    // eslint-disable-next-line max-lines
    awayTeam: 14,
    awayTeamGoals: 2,
    inProgress: false,
    homeClub: { clubName: 'Minas Brasília' },
    awayClub: { clubName: 'Santos' },
  },
  {
    id: 25,
    homeTeam: 2,
    homeTeamGoals: 0,
    awayTeam: 6,
    awayTeamGoals: 1,
    inProgress: false,
    homeClub: { clubName: 'Bahia' },
    awayClub: { clubName: 'Ferroviária' },
  },
  {
    id: 26,
    homeTeam: 13,
    homeTeamGoals: 1,
    awayTeam: 1,
    awayTeamGoals: 0,
    inProgress: false,
    homeClub: { clubName: 'Real Brasília' },
    awayClub: { clubName: 'Avaí/Kindermann' },
  },
  {
    id: 27,
    homeTeam: 5,
    homeTeamGoals: 1,
    awayTeam: 15,
    awayTeamGoals: 2,
    inProgress: false,
    homeClub: { clubName: 'Cruzeiro' },
    awayClub: { clubName: 'São José-SP' },
  },
  {
    id: 28,
    homeTeam: 16,
    homeTeamGoals: 3,
    awayTeam: 7,
    awayTeamGoals: 0,
    inProgress: false,
    homeClub: { clubName: 'São Paulo' },
    awayClub: { clubName: 'Flamengo' },
  },
  {
    id: 29,
    homeTeam: 9,
    homeTeamGoals: 0,
    awayTeam: 4,
    awayTeamGoals: 4,
    inProgress: false,
    homeClub: { clubName: 'Internacional' },
    awayClub: { clubName: 'Corinthians' },
  },
  {
    id: 30,
    homeTeam: 3,
    homeTeamGoals: 0,
    awayTeam: 12,
    awayTeamGoals: 4,
    inProgress: false,
    homeClub: { clubName: 'Botafogo' },
    awayClub: { clubName: 'Palmeiras' },
  },
  {
    id: 31,
    homeTeam: 8,
    homeTeamGoals: 2,
    awayTeam: 10,
    awayTeamGoals: 0,
    inProgress: false,
    homeClub: { clubName: 'Grêmio' },
    awayClub: { clubName: 'Minas Brasília' },
  },
  {
    id: 32,
    homeTeam: 14,
    homeTeamGoals: 5,
    awayTeam: 11,
    awayTeamGoals: 1,
    inProgress: false,
    homeClub: { clubName: 'Santos' },
    awayClub: { clubName: 'Napoli-SC' },
  },
  {
    id: 33,
    homeTeam: 1,
    homeTeamGoals: 1,
    awayTeam: 16,
    awayTeamGoals: 1,
    inProgress: false,
    homeClub: { clubName: 'Avaí/Kindermann' },
    awayClub: { clubName: 'São Paulo' },
  },
  {
    id: 34,
    homeTeam: 9,
    homeTeamGoals: 3,
    awayTeam: 6,
    awayTeamGoals: 1,
    inProgress: false,
    homeClub: { clubName: 'Internacional' },
    awayClub: { clubName: 'Ferroviária' },
  },
  {
    id: 35,
    homeTeam: 10,
    homeTeamGoals: 1,
    awayTeam: 5,
    awayTeamGoals: 3,
    inProgress: false,
    homeClub: { clubName: 'Minas Brasília' },
    awayClub: { clubName: 'Cruzeiro' },
  },
  {
    id: 36,
    homeTeam: 2,
    homeTeamGoals: 0,
    awayTeam: 7,
    awayTeamGoals: 1,
    inProgress: false,
    homeClub: { clubName: 'Bahia' },
    awayClub: { clubName: 'Flamengo' },
  },
  {
    id: 37,
    homeTeam: 15,
    homeTeamGoals: 0,
    awayTeam: 13,
    awayTeamGoals: 1,
    inProgress: false,
    homeClub: { clubName: 'São José-SP' },
    awayClub: { clubName: 'Real Brasília' },
  },
  {
    id: 38,
    homeTeam: 14,
    homeTeamGoals: 2,
    awayTeam: 4,
    awayTeamGoals: 1,
    inProgress: false,
    homeClub: { clubName: 'Santos' },
    awayClub: { clubName: 'Corinthians' },
  },
  {
    id: 39,
    homeTeam: 3,
    homeTeamGoals: 2,
    awayTeam: 11,
    awayTeamGoals: 0,
    inProgress: false,
    homeClub: { clubName: 'Botafogo' },
    awayClub: { clubName: 'Napoli-SC' },
  },
  {
    id: 40,
    homeTeam: 12,
    homeTeamGoals: 4,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeClub: { clubName: 'Palmeiras' },
    awayClub: { clubName: 'Grêmio' },
  },
  {
    id: 41,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeClub: { clubName: 'São Paulo' },
    awayClub: { clubName: 'Internacional' },
  },
  {
    id: 42,
    homeTeam: 6,
    homeTeamGoals: 1,
    awayTeam: 1,
    awayTeamGoals: 0,
    inProgress: true,
    homeClub: { clubName: 'Ferroviária' },
    awayClub: { clubName: 'Avaí/Kindermann' },
  },
  {
    id: 43,
    homeTeam: 11,
    homeTeamGoals: 0,
    awayTeam: 10,
    awayTeamGoals: 0,
    inProgress: true,
    homeClub: { clubName: 'Napoli-SC' },
    awayClub: { clubName: 'Minas Brasília' },
  },
  {
    id: 44,
    homeTeam: 7,
    homeTeamGoals: 2,
    awayTeam: 15,
    awayTeamGoals: 2,
    inProgress: true,
    homeClub: { clubName: 'Flamengo' },
    awayClub: { clubName: 'São José-SP' },
  },
  {
    id: 45,
    homeTeam: 5,
    homeTeamGoals: 1,
    awayTeam: 3,
    awayTeamGoals: 1,
    inProgress: true,
    homeClub: { clubName: 'Cruzeiro' },
    awayClub: { clubName: 'Botafogo' },
  },
  {
    id: 46,
    homeTeam: 4,
    homeTeamGoals: 1,
    awayTeam: 12,
    awayTeamGoals: 1,
    inProgress: true,
    homeClub: { clubName: 'Corinthians' },
    awayClub: { clubName: 'Palmeiras' },
  },
  {
    id: 47,
    homeTeam: 8,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 2,
    inProgress: true,
    homeClub: { clubName: 'Grêmio' },
    awayClub: { clubName: 'Santos' },
  },
  {
    id: 48,
    homeTeam: 13,
    homeTeamGoals: 1,
    awayTeam: 2,
    awayTeamGoals: 1,
    inProgress: true,
    homeClub: { clubName: 'Real Brasília' },
    awayClub: { clubName: 'Bahia' },
  },
];

const newId = allMatches.length + 1;

// eslint-disable-next-line max-lines-per-function
describe('/clubs', () => {
  // eslint-disable-next-line max-lines-per-function
  describe('GET  /clubs route', () => {
    it('GET /matchs', async () => {
      const response: Response = await chai
        .request(app)
        .get('/matchs')
        .set('content-type', 'application/json');
      expect((response.body)).to.deep.equals(allMatches);
      expect(response.status).to.equals(200);
    });
    it('GET /matchs?inProgress=true', async () => {
      const response: Response = await chai
        .request(app)
        .get('/matchs?inProgress=true')
        .set('content-type', 'application/json');
      expect((response.body)).to.deep.equals(allMatches.filter((el) => el.inProgress));
      expect(response.status).to.equals(200);
    });
    it('GET /matchs?inProgress=false', async () => {
      const response: Response = await chai
        .request(app)
        .get('/matchs?inProgress=false')
        .set('content-type', 'application/json');
      expect((response.body)).to.deep.equals(allMatches.filter((el) => !el.inProgress));
      expect(response.status).to.equals(200);
    });
  });
  // eslint-disable-next-line max-lines-per-function
  describe('POST  /matchs route', () => {
    const newMatch = {
      id: newId,
      homeTeam: 16, // O valor deve ser o id do time
      awayTeam: 8, // O valor deve ser o id do time
      homeTeamGoals: 2,
      awayTeamGoals: 2,
      inProgress: true, // a partida deve ser criada como em progresso
    };
    it('POST  one match', async () => {
      const firstResponse = await chai
        .request(app)
        .post('/matchs')
        .set('content-type', 'application/json')
        .send(newMatch);
      // const secondResponse: Response = await chai
      //   .request(app)
      //   .get('/matchs')
      //   .set('content-type', 'application/json');
      expect(firstResponse.status).to.equals(201);
      expect((firstResponse.body)).to.deep.equals(newMatch);
    });
  });
  describe('PATCH  /matchs route', () => {
    it('/matchs/:id/finish', async () => {
      const id = 43;
      const response = await chai
        .request(app)
        .patch(`/matchs/${id}/finish`)
        .set('content-type', 'application/json');
      expect(response.status).to.equals(200);
    });
  });
  describe('POST  /matchs route', () => {
    it('/matchs', async () => {
      const newMatch = {
        homeTeam: 1,
        homeTeamGoals: 2,
        awayTeam: 1,
        awayTeamGoals: 2,
        inProgress: true,
      };
      const response = await chai
        .request(app)
        .post('/matchs')
        .set('content-type', 'application/json')
        .send(newMatch);
      expect(response.status).to.equals(401);
      expect(response.body.message).to.equals('It is not possible to create a match with two equal teams');
    });
    it('/matchs', async () => {
      const newMatch = {
        homeTeam: 88888,
        homeTeamGoals: 2,
        awayTeam: 1,
        awayTeamGoals: 2,
        inProgress: true,
      };
      const response = await chai
        .request(app)
        .post('/matchs')
        .set('content-type', 'application/json')
        .send(newMatch);
      expect(response.status).to.equals(401);
      expect(response.body.message).to.equals('There is no team with such id');
    });
  });
});
