import chai from 'chai';
import { exec } from 'shelljs';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { allMatches, finishedMatches, inProgressMatches, invalidNewMatch, validNewMatch } from './assets/matches';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches endpoints', () => {
  let chaiHttpResponse: Response;
  let loginToken: string;

  before(async () => {
    exec('npm run db:reset');

    chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: 'secret_admin' });

    loginToken = chaiHttpResponse.body.token
  });

  describe('When making GET request to /matches with', () => {
    it('no filter: API responds with status 200 and list of all matches and relevant data', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matches');

      const { status, body } = chaiHttpResponse;

      expect(status).to.be.equal(200);
      expect(body.length).to.be.equal(48);
      expect(body).to.deep.include.members(allMatches); // ft. Murilo
    });

    it('inProgress true: API responds with status 200 and list of matches in progress and relevant data', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matches')
        .query({ inProgress: true });
  
      const { status, body } = chaiHttpResponse;
  
      expect(status).to.be.equal(200);
      expect(body.length).to.be.equal(8);
      expect(body).to.deep.include.members(inProgressMatches); // ft. Murilo
    });

    it('inProgress false: API responds with status 200 and list of finished matches and relevant data', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matches')
        .query({ inProgress: false });
  
      const { status, body } = chaiHttpResponse;
  
      expect(status).to.be.equal(200);
      expect(body.length).to.be.equal(40);
      expect(body).to.deep.include.members(finishedMatches); // ft. Murilo
    });
  });

  describe('When making GET request to /matches/:id', () => {
    it('And match exists: API responds with status 200 and match data based on id', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matches/1');

      const { status, body } = chaiHttpResponse;

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(allMatches[0]);
    });

    it('And match does not exists: API responds with status 400 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matches/447');

      const { status, body } = chaiHttpResponse;

      expect(status).to.be.equal(404);
      expect(body.message).to.be.equal('Match not found');
    });
  });

  describe('When saving a new match with a POST request to /matches', () => {
    let newMatchId: number;

    it('API responds with status 201 and new entry data', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', loginToken)
        .send(validNewMatch);

        const { status, body } = chaiHttpResponse;

        expect(status).to.be.equal(201);
        expect(body).to.haveOwnProperty('id');
        newMatchId = body.id;
        delete body.id;
        expect(body).to.be.deep.equal(validNewMatch);
    });

    it('API saves new match in the database', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get(`/matches/${newMatchId}`);

      const { status, body } = chaiHttpResponse;

      expect(status).to.be.equal(200);
      expect(body.id).to.be.equal(newMatchId);
      delete body.id; delete body.homeClub; delete body.awayClub;
      expect(body).to.be.deep.equal(validNewMatch);
    });
  });

  describe('When failing to save a new match with a POST request to /matches because', () => {
    it('token is invalid: API responds with status 401 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', 'big mac');
  
      const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(message).to.be.equal('Invalid token');
    });
  
    it('token is not provided: API responds with status 401 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches');
  
      const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(message).to.be.equal('Token not found');
    });

    it('home team is not provided: API responds with status 400 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', loginToken)
        .send(invalidNewMatch.noHT);
  
      const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(message).to.be.equal('Home Team must be provided');
    });

    it('home team is not a number: API responds with status 422 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', loginToken)
        .send(invalidNewMatch.stringHT);
  
      const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(422);
      expect(message).to.be.equal('Home Team must be a positive integer');
    });

    it('home team is negative: API responds with status 422 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', loginToken)
        .send(invalidNewMatch.negativeHT);
  
      const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(422);
      expect(message).to.be.equal('Home Team must be a positive integer');
    });

    it('away team is not provided: API responds with status 400 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', loginToken)
        .send(invalidNewMatch.noAT);
  
      const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(message).to.be.equal('Away Team must be provided');
    });

    it('away team is not a number: API responds with status 422 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', loginToken)
        .send(invalidNewMatch.stringAT);
  
      const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(422);
      expect(message).to.be.equal('Away Team must be a positive integer');
    });

    it('away team is negative: API responds with status 422 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', loginToken)
        .send(invalidNewMatch.negativeAT);
  
      const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(422);
      expect(message).to.be.equal('Away Team must be a positive integer');
    });

    it('home team goals is not provided: API responds with status 400 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', loginToken)
        .send(invalidNewMatch.noHTG);
  
      const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(message).to.be.equal('Home Team Goals must be provided');
    });

    it('home team goals is not a number: API responds with status 422 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', loginToken)
        .send(invalidNewMatch.stringHTG);
  
      const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(422);
      expect(message).to.be.equal('Home Team Goals must be an integer');
    });

    it('home team goals is negative: API responds with status 422 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', loginToken)
        .send(invalidNewMatch.negativeHTG);
  
      const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(422);
      expect(message).to.be.equal('Home Team Goals can not be negative');
    });

    it('away team goals is not provided: API responds with status 400 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', loginToken)
        .send(invalidNewMatch.noATG);
  
      const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(message).to.be.equal('Away Team Goals must be provided');
    });

    it('away team goals is not a number: API responds with status 422 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', loginToken)
        .send(invalidNewMatch.stringATG);
  
      const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(422);
      expect(message).to.be.equal('Away Team Goals must be an integer');
    });

    it('away team goals is negative: API responds with status 422 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', loginToken)
        .send(invalidNewMatch.negativeATG);
  
      const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(422);
      expect(message).to.be.equal('Away Team Goals can not be negative');
    });

    it('in progress is not provided: API responds with status 400 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', loginToken)
        .send(invalidNewMatch.noIP);
  
      const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(message).to.be.equal('In Progress must be provided as true');
    });

    it('in progress is not a boolean: API responds with status 422 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', loginToken)
        .send(invalidNewMatch.stringIP);
  
      const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(422);
      expect(message).to.be.equal('In Progress must be provided as true');
    });

    it('in progress is false: API responds with status 422 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', loginToken)
        .send(invalidNewMatch.falseIP);
  
      const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(422);
      expect(message).to.be.equal('In Progress must be provided as true');
    });

    it('teams are the same: API responds with status 409 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', loginToken)
        .send(invalidNewMatch.sameTeam);
  
      const { message } = chaiHttpResponse.body;

      expect(chaiHttpResponse.status).to.be.equal(409);
      expect(message).to.be.equal('It is not possible to create a match with two equal teams');
    });

    it('team does not exist in database: API responds with status 422 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', loginToken)
        .send(invalidNewMatch.unknownTeam);
  
      const { message } = chaiHttpResponse.body;

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(message).to.be.equal('There is no team with such id!');
    });
  });

  describe('When finishing a match with a PATCH request to /matches/:id/finish', () => {
    it('API responds with status 200 and finished game message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/41/finish');

        const { status, body } = chaiHttpResponse;

        expect(status).to.be.equal(200);
        expect(body.message).to.be.equal('Finished match');
    });

    it('API updates the match in the database', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matches/41');

      const { status, body } = chaiHttpResponse;

      expect(status).to.be.equal(200);
      expect(body.inProgress).to.be.equal(false);
    });
  });

  describe('When fail to finish a match with a PATCH request to /matches/:id/finish because', () => {
    it('match is already over: API responds with status 422 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1/finish');

        const { status, body } = chaiHttpResponse;

        expect(status).to.be.equal(422);
        expect(body.message).to.be.equal('Match already over or does not exist');
    });

    it('match does not exist: API responds with status 422 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/447/finish');

        const { status, body } = chaiHttpResponse;

        expect(status).to.be.equal(422);
        expect(body.message).to.be.equal('Match already over or does not exist');
    });
  });

  describe('When updating a match score with a PATCH request to /matches/:id', () => {
    it('API responds with status 200 and updated score message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/42')
        .send({ homeTeamGoals: 3, awayTeamGoals: 1});

        const { status, body } = chaiHttpResponse;

        expect(status).to.be.equal(200);
        expect(body.message).to.be.equal('Match score updated');
    });

    it('API updates the match in the database', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matches/42');

      const { status, body } = chaiHttpResponse;

      expect(status).to.be.equal(200);
      expect(body.homeTeamGoals).to.be.equal(3);
      expect(body.awayTeamGoals).to.be.equal(1);
    });
  });

  describe('When fail to update a match score with a PATCH request to /matches/:id because', () => {
    it('match is already over: API responds with status 422 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1')
        .send({ homeTeamGoals: 3, awayTeamGoals: 1});;

        const { status, body } = chaiHttpResponse;

        expect(status).to.be.equal(422);
        expect(body.message).to.be.equal('Match already over or does not exist');
    });

    it('match does not exist: API responds with status 422 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/447')
        .send({ homeTeamGoals: 3, awayTeamGoals: 1});;

        const { status, body } = chaiHttpResponse;

        expect(status).to.be.equal(422);
        expect(body.message).to.be.equal('Match already over or does not exist');
    });
  });
});
