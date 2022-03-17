import * as chai from 'chai';

import chaiHttp = require('chai-http');

import * as shell from 'shelljs';

import { app } from '../app';

import {
  allMatchesMock,
  matchesInProgress,
  matchesNotInProgress,
} from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

let chaiHttpResponse;

describe('GET \'/matchs\'', () => {
  it('with an invalid \'inProgress\' query string', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matchs?inProgress=thisIsBoolean')
      .set('content-type', 'application/json');

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(400);
    expect(response).to.have.own.property('message');
    expect(response.message).to.be.eql('\'inProgress\' must have \'true\' or \'false\'');
  });

  it('with \'inProgress\' query string equal to \'false\'', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matchs?inProgress=false')
      .set('content-type', 'application/json');

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(200);
    expect(response).to.be.eql(matchesNotInProgress);
  });

  it('with \'inProgress\' query string equal to \'true\'', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matchs?inProgress=true')
      .set('content-type', 'application/json');

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(200);
    expect(response).to.be.eql(matchesInProgress);
  });

  it('on success without \'inProgress\' query string', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matchs')
      .set('content-type', 'application/json');

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(200);
    expect(response).to.be.eql(allMatchesMock);
  });
});

describe('POST \'/matchs\'', () => {
  const mockSuccessBodyRequest = {
    homeTeam: 16,
    awayTeam: 8,
    homeTeamGoals: 2,
    awayTeamGoals: 2,
    inProgress: true
  };

  const mockSuccessBodyResponse = {
    id: 1,
    ...mockSuccessBodyRequest,
  };

  after(() => {
    shell.exec('npx sequelize-cli db:drop && npx sequelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all');
  });

  it('with an invalid \'homeTeam\'', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matchs')
      .set('content-type', 'application/json')
      .send({
        ...mockSuccessBodyRequest,
        homeTeam: 'ThisIsANumber',
      });

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(400);
    expect(response).to.have.own.property('message');
    expect(response.message).to.be.eql('\'homeTeam\', \'awayTeam\', \'homeTeamGoals\' and \'awayTeamGoals\' must be a number');
  });

  it('with an invalid \'awayTeam\'', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matchs')
      .set('content-type', 'application/json')
      .send({
        ...mockSuccessBodyRequest,
        awayTeam: 'ThisIsANumber',
      });

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(400);
    expect(response).to.have.own.property('message');
    expect(response.message).to.be.eql('\'homeTeam\', \'awayTeam\', \'homeTeamGoals\' and \'awayTeamGoals\' must be a number');
  });

  it('with an invalid \'homeTeamGoals\'', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matchs')
      .set('content-type', 'application/json')
      .send({
        ...mockSuccessBodyRequest,
        homeTeamGoals: 'ThisIsANumber',
      });

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(400);
    expect(response).to.have.own.property('message');
    expect(response.message).to.be.eql('\'homeTeam\', \'awayTeam\', \'homeTeamGoals\' and \'awayTeamGoals\' must be a number');
  });

  it('with an invalid \'awayTeamGoals\'', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matchs')
      .set('content-type', 'application/json')
      .send({
        ...mockSuccessBodyRequest,
        awayTeamGoals: 'ThisIsANumber',
      });

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(400);
    expect(response).to.have.own.property('message');
    expect(response.message).to.be.eql('\'homeTeam\', \'awayTeam\', \'homeTeamGoals\' and \'awayTeamGoals\' must be a number');
  });

  it('with an invalid \'inProgress\'', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matchs')
      .set('content-type', 'application/json')
      .send({
        ...mockSuccessBodyRequest,
        inProgress: 'ThisIsABoolean',
      });

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(400);
    expect(response).to.have.own.property('message');
    expect(response.message).to.be.eql('\'inProgress\' must be \'true\' or \'false\'');
  });

  it('no team was found that has the id equal to \'homeTeam\'', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matchs')
      .set('content-type', 'application/json')
      .send({
        ...mockSuccessBodyRequest,
        homeTeam: 999,
      });

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(401);
    expect(response).to.have.own.property('message');
    expect(response.message).to.be.eql('There is no team with such id!');
  });

  it('no team was found that has the id equal to \'awayTeam\'', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matchs')
      .set('content-type', 'application/json')
      .send({
        ...mockSuccessBodyRequest,
        awayTeam: 999,
      });

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(401);
    expect(response).to.have.own.property('message');
    expect(response.message).to.be.eql('There is no team with such id!');
  });

  it('with \'homeTeam\' equal to \'awayTeam\'', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matchs')
      .set('content-type', 'application/json')
      .send({
        ...mockSuccessBodyRequest,
        awayTeam: 999,
      });

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(401);
    expect(response).to.have.own.property('message');
    expect(response.message).to.be.eql('It is not possible to create a match with two equal teams');
  });

  it('on success', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matchs')
      .set('content-type', 'application/json')
      .send(mockSuccessBodyRequest);

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(201);
    expect(response).to.be.eql(mockSuccessBodyResponse);
  });
});
