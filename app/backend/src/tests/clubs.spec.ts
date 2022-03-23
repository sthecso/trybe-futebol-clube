import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('checking the post method of the /club route', () => {
  describe('cheking a club route on success', () => {
    let chaiHttpResponse: Response;
    let club = [
      {
        id: 2,
        clubName: 'Bahia'
      },
      {
        id: 3,
        clubName: 'Botafogo'
      },
    ]

    it('Verify status is 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/clubs').send(club)
        .then((response) => {
          expect(response.status).to.be.equal(200);
        }) as Response
    })

    it('Verify if return an array', async () => {
      chaiHttpResponse = await chai.request(app).get('/clubs').send(club)
        .then((response) => {
          expect(response.body).to.be.an('array');
        }) as Response
    })

    it('Verify if return the clubName is string', async () => {
      chaiHttpResponse = await chai.request(app).get('/clubs').send(club)
        .then((response) => {
          expect(response.body[1].clubName).to.be.an('string');
        }) as Response
    })
  })

  describe('cheking a club/:id route on success', () => {
    let chaiHttpResponse: Response;
    let club = {
      id: 2,
      clubName: 'Bahia'
    }

    it('Verify status is 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/clubs/1').send(club)
        .then((response) => {
          expect(response.status).to.be.equal(200);
        }) as Response
    })

    it('Verify if return an object', async () => {
      chaiHttpResponse = await chai.request(app).get('/clubs/2').send(club)
        .then((response) => {
          expect(response.body).to.be.an('object');
        }) as Response
    })

    it('Verify if return the clubName is string', async () => {
      chaiHttpResponse = await chai.request(app).get('/clubs/2').send(club)
        .then((response) => {
          expect(response.body.clubName).to.be.an('string');
        }) as Response
    })
  })
});