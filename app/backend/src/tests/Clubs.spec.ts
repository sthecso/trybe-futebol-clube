import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

const dataMockTeams = [
  { id: 1, clubName: 'Avaí/Kindermann' },
  { id: 2, clubName: 'Bahia' },
  { id: 3, clubName: 'Botafogo' },
  { id: 4, clubName: 'Corinthians' },
  { id: 5, clubName: 'Cruzeiro' },
  { id: 6, clubName: 'Ferroviária' },
  { id: 7, clubName: 'Flamengo' },
  { id: 8, clubName: 'Grêmio' },
  { id: 9, clubName: 'Internacional' },
  { id: 10, clubName: 'Minas Brasília' },
  { id: 11, clubName: 'Napoli-SC' },
  { id: 12, clubName: 'Palmeiras' },
  { id: 13, clubName: 'Real Brasília' },
  { id: 14, clubName: 'Santos' },
  { id: 15, clubName: 'São José-SP' },
  { id: 16, clubName: 'São Paulo' },
];

const ROUTE_CLUBS = '/clubs';
const ROUTE_CLUBS_ID = '/clubs/1';

/* eslint-disable */
describe('Clubs Test', () => {
  describe('When the request is ok', () => {
    let chaiHttpResponse: Response;
    it('Return status code 200', async () => {
      chaiHttpResponse = await chai.request(app).get(ROUTE_CLUBS)
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
    it('Return check data teams', async () => {
      const response: Response = await chai
        .request(app).get(ROUTE_CLUBS).set('content-type', 'application/json');
      expect((response.body)).to.deep.equals(dataMockTeams);
      expect(response.status).to.equals(200);
    });
  });

  describe('When Request with id', () => {
    let chaiHttpResponse: Response;
    it('Return status code 200', async () => {
      chaiHttpResponse = await chai.request(app).get(ROUTE_CLUBS_ID)
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
    it('Return team with specified id', async () => {
      const id = 4;
      const response: Response = await chai
        .request(app).get(`${ROUTE_CLUBS}/${id}`).set('content-type', 'application/json');
      expect((response.body)).to.deep.equals({ id: 4, clubName: 'Corinthians' });
      expect(response.status).to.equals(200);
    });
  });
});
