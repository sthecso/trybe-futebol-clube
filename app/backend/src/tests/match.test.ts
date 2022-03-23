import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { exec } from 'shelljs';
import * as messages from '../utils/messages';
import StatusCodes from '../utils/StatusCodes';

import {
  firstMatch,
  newMatch,
  createNewMatchResponse,
  getNewMatchResponse,
  sameTeam,
  inexistentTeam,
  newScore,
} from './expected_results/match';

chai.use(chaiHttp);

const { expect } = chai;

describe('Match', () => {
  let httpResponse: Response;
  let token: string;

  before(async () => {
    // reset database
    exec('npm run db:reset');

    // login
    httpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'user@user.com',
        password: 'secret_user',
    });

    // save token to send inside headers
    token = httpResponse.body.token;
  });

  describe('GET /matchs', () => {
    describe('When showing all matches', () => {
      it('The API responds with status 200', async () => {
        httpResponse = await chai
          .request(app)
          .get('/matchs');

        expect(httpResponse.status).to.be.equal(StatusCodes.OK);
      });

      it('The total length of matches is 48', () => {
        const { body } = httpResponse;

        expect(body).to.have.lengthOf(48);
      });
    });

    describe('When only showing matches in progress', () => {
      it('The API responds with status 200', async () => {
        httpResponse = await chai
          .request(app)
          .get('/matchs')
          .query({ inProgress: true });
  
        expect(httpResponse.status).to.be.equal(StatusCodes.OK);
      });

      it('The total length of matches is 8', () => {
        const { body } = httpResponse;

        expect(body).to.have.lengthOf(8);
      });
    });

    describe('When only showing finished matches', () => {
      it('The API responds with status 200', async () => {
        httpResponse = await chai
          .request(app)
          .get('/matchs')
          .query({ inProgress: false });

        expect(httpResponse.status).to.be.equal(StatusCodes.OK);
      });

      it('The total length of matches is 40', () => {
        const { body } = httpResponse;

        expect(body).to.have.lengthOf(40);
      });
    });
  });

  describe('GET /matchs/:id', () => {
    describe('When the match exists', () => {
      it('The API responds with status 200', async () => {
        httpResponse = await chai
          .request(app)
          .get('/matchs/1');

        expect(httpResponse.status).to.be.equal(StatusCodes.OK);
      });

      it('The API responds with the correct match', () => {
        const { body } = httpResponse;

        expect(JSON.stringify(body)).to.be
          .equal(JSON.stringify(firstMatch));
      });
    });

    describe('When match does not exist', () => {
      it('The API responds with status 404', async () => {
        httpResponse = await chai
          .request(app)
          .get('/matchs/765');

        expect(httpResponse.status).to.be
          .equal(StatusCodes.NOT_FOUND);
      });

      it('The API responds with the correct message', () => {
        const { message } = httpResponse.body;

        expect(message).to.be.equal(messages.match.notFound);
      });
    });
  });

  describe('POST /matchs', () => {
    let createdId: number = 49;

    describe('When the request is successful', () => {
      it('The API responds with status 201', async () => {
        httpResponse = await chai
          .request(app)
          .post('/matchs')
          .set('authorization', token)
          .send(newMatch);

        expect(httpResponse.status).to.be
          .equal(StatusCodes.CREATED);
      });

      it('The API responds with the new match', () => {
        const { body } = httpResponse;

        createdId = body.id;

        expect(JSON.stringify(body)).to.be
          .equal(JSON.stringify(createNewMatchResponse));
      });

      it('New match can be found in the database', async () => {
        httpResponse = await chai
          .request(app)
          .get(`/matchs/${createdId}`);

        const { body, status } = httpResponse;

        expect(status).to.be.equal(StatusCodes.OK);
        expect(JSON.stringify(body)).to.be
          .equal(JSON.stringify(getNewMatchResponse));
      });
    });

    describe('When the request token is invalid', () => {
      it('The API responds with status 401', async () => {
        httpResponse = await chai
          .request(app)
          .post('/matchs')
          .set('authorization', '@#!$*&');

        expect(httpResponse.status).to.be
          .equal(StatusCodes.UNAUTHORIZED);
      });

      it('The API responds with the correct message', () => {
        const { message } = httpResponse.body;

        expect(message).to.be.equal(messages.request.token.invalid);
      });
    });

    describe('When the request token is not found', () => {
      it('The API responds with status 401', async () => {
        httpResponse = await chai
          .request(app)
          .post('/matchs')

        expect(httpResponse.status).to.be
          .equal(StatusCodes.UNAUTHORIZED);
      });

      it('The API responds with the correct message', () => {
        const { message } = httpResponse.body;

        expect(message).to.be
          .equal(messages.request.token.notFound);
      });
    });

    describe('When homeTeam and awayTeam are the same', () => {
      it('The API responds with status 401', async () => {
        httpResponse = await chai
          .request(app)
          .post('/matchs')
          .set('authorization', token)
          .send(sameTeam);

        expect(httpResponse.status).to.be
          .equal(StatusCodes.UNAUTHORIZED);
      });

      it('The API responds with the correct message', () => {
        const { message } = httpResponse.body;

        expect(message).to.be.equal(messages.match.teams.conflict);
      });
    });

    describe('When either one of the teams are not found', () => {
      it('The API responds with status 401', async () => {
        httpResponse = await chai
          .request(app)
          .post('/matchs')
          .set('authorization', token)
          .send(inexistentTeam);

        expect(httpResponse.status).to.be
          .equal(StatusCodes.UNAUTHORIZED);
      });

      it('The API responds with the correct message', () => {
        const { message } = httpResponse.body;

        expect(message).to.be.equal(messages.match.teams.notFound);
      });
    });
  });

  describe('PATCH /matchs/:id/finish', () => {
    describe('When the request is successful', () => {
      it('The API responds with status 200', async () => {
        httpResponse = await chai
          .request(app)
          .patch('/matchs/41/finish')

        expect(httpResponse.status).to.be.equal(StatusCodes.OK);
      });

      it('The API responds with the correct message', () => {
        const { message } = httpResponse.body;

        expect(message).to.be.equal(messages.match.finished);
      });

      it('The match is updated', async () => {
        httpResponse = await chai
          .request(app)
          .get('/matchs/41');

        const { status, body } = httpResponse;

        expect(status).to.be.equal(StatusCodes.OK);
        expect(body.inProgress).to.be.equal(false);
      });
    });

    describe('When match does not exist', () => {
      it('The API responds with status 404', async () => {
        httpResponse = await chai
          .request(app)
          .patch('/matchs/800/finish');

        const { status } = httpResponse;

        expect(status).to.be
          .equal(StatusCodes.NOT_FOUND);
      });

      it('The API responds with the correct message', () => {
        const { message } = httpResponse.body;

        expect(message).to.be
          .equal(messages.match.notFound);
      });
    });

    describe('When match is already finished', () => {
      it('The API responds with status 400', async () => {
        httpResponse = await chai
          .request(app)
          .patch('/matchs/1/finish');

        const { status } = httpResponse;

        expect(status).to.be
          .equal(StatusCodes.BAD_REQUEST);
      });

      it('The API responds with the correct message', () => {
        const { message } = httpResponse.body;

        expect(message).to.be
          .equal(messages.match.patchFail);
      });
    });
  });

  describe('PATCH /matchs/:id', () => {
    describe('When the request is successful', () => {
      it('The API responds with status 200', async () => {
        httpResponse = await chai
          .request(app)
          .patch('/matchs/42')
          .send(newScore);

        expect(httpResponse.status).to.be.equal(StatusCodes.OK);
      });

      it('The API responds with the correct message', () => {
        const { message } = httpResponse.body;

        expect(message).to.be.equal(messages.match.updated);
      });

      it('The match is updated', async () => {
        httpResponse = await chai
          .request(app)
          .get('/matchs/42');

        const { status, body } = httpResponse;

        expect(status).to.be.equal(StatusCodes.OK);
        expect(body.homeTeamGoals).to.be.equal(4);
        expect(body.awayTeamGoals).to.be.equal(5);
      });
    });

    describe('When match does not exist', () => {
      it('The API responds with status 404', async () => {
        httpResponse = await chai
          .request(app)
          .patch('/matchs/800')
          .send(newScore);

        const { status } = httpResponse;

        expect(status).to.be
          .equal(StatusCodes.NOT_FOUND);
      });

      it('The API responds with the correct message', () => {
        const { message } = httpResponse.body;

        expect(message).to.be
          .equal(messages.match.notFound);
      });
    });

    describe('When match is already finished', () => {
      it('The API responds with status 400', async () => {
        httpResponse = await chai
          .request(app)
          .patch('/matchs/1')
          .send(newScore);

        const { status } = httpResponse;

        expect(status).to.be
          .equal(StatusCodes.BAD_REQUEST);
      });

      it('The API responds with the correct message', () => {
        const { message } = httpResponse.body;

        expect(message).to.be
          .equal(messages.match.patchFail);
      });
    });
  });
});
