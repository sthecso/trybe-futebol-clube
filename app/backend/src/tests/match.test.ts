import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { exec } from 'shelljs';

import { app } from '../app';

import matchs from './dbMock/matchs';

import { Response } from 'superagent';
import Match from '../database/models/Match';

chai.use(chaiHttp);

const { expect } = chai;

describe('Request Get Match',() => {
  let matchResponse: Response;

  before(() => {
    exec('npm run db:reset');
  });

  it('On / returns all matchs', async () => {
    matchResponse = await chai.request(app)
    .get('/matchs');

    const { status, body } = matchResponse;

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(matchs);
  });

  it('On /matchs?inProgress=true returns all inProgress matchs', async () => {
    matchResponse = await chai.request(app)
    .get('/matchs/?inProgress=true');

    const { status, body } = matchResponse;
    const filteredMatchs = matchs.filter((match) => match.inProgress);
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(filteredMatchs);
  });

  it('On /?inProgress=false returns all not inProgress matchs', async () => {
    matchResponse = await chai.request(app)
    .get('/matchs/?inProgress=false');

    const { status, body } = matchResponse;
    const filteredMatchs = matchs.filter((match) => !match.inProgress);
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(filteredMatchs);
  });

});

describe('Request Post Match',() => {
  let matchResponse: Response;
  let loginResponse: Response;
  let token: string;
  let lastId: number;

  before(async () => {
    exec('npm run db:reset');
    loginResponse = await chai.request(app)
    .post('/login')
    .send({
      email: 'admin@admin.com',
      password: 'secret_admin'
    });
    token = loginResponse.body.token;
    lastId = matchs[matchs.length - 1].id;
  });

  it('On / with correct correct Body and correct Token', async () => {
    matchResponse = await chai.request(app)
    .post('/matchs')
    .set('authorization', token)
    .send({
        "homeTeam": 16,
        "awayTeam": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
        "inProgress": true
      });
    const { status, body } = matchResponse;
    expect(status).to.be.equal(201);
    expect(body).to.be.deep.equal({
      "id": lastId + 1,
      "homeTeam": 16,
      "homeTeamGoals": 2,
      "awayTeam": 8,
      "awayTeamGoals": 2,
      "inProgress": true,
    });
  });

  it('On / with correct Body and Missing Token', async () => {
    matchResponse = await chai.request(app)
    .post('/matchs')
    .send({
        "homeTeam": 16,
        "awayTeam": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
        "inProgress": true
      });
    const { status, body: { error } } = matchResponse;
    expect(status).to.be.equal(401);
    expect(error).to.be.equal('Token not found');
  });

  it('On / with correct Body and invalid Token', async () => {
    matchResponse = await chai.request(app)
    .post('/matchs')
    .set('authorization', 'invalidToken')
    .send({
        "homeTeam": 16,
        "awayTeam": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
        "inProgress": true
      });
    const { status, body: { error } } = matchResponse;
    expect(status).to.be.equal(401);
    expect(error).to.be.equal('Invalid token');
  });

  it('On / with incorrect Body and correct Token', async () => {
    matchResponse = await chai.request(app)
    .post('/matchs')
    .set('authorization', token)
    .send({
        "homeTeam": 16,
        "awayTeam": 8,
      });
    const { status, body: { message } } = matchResponse;
    expect(status).to.be.equal(401);
    expect(message).to.be.equal('All fields must be filled');
  })
});

describe('Request PATCH matchs', () => {
  let patchResponse: Response;
  let matchResponse: Response;
  let loginResponse: Response;
  let token: string;
  let initialMatchs: Match[] = [];

  before(async () => {
    exec('npm run db:reset');
    loginResponse = await chai.request(app)
    .post('/login')
    .send({
      email: 'admin@admin.com',
      password: 'secret_admin'
    });
    token = loginResponse.body.token;
    matchResponse = await chai.request(app)
    .get('/matchs');
    const { body } = matchResponse;
    if (!body) {
      initialMatchs = []
    } else {
      initialMatchs = body;
    }
  });

  it('On /:id/finish returns OK and checks if match is Finished', async () => {
    matchResponse = await chai.request(app)
    .post('/matchs')
    .set('authorization', token)
    .send({
      "homeTeam": 16,
      "awayTeam": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
      "inProgress": true
    });
    const { body: { id }} = matchResponse;
    patchResponse = await chai.request(app)
    .patch(`/matchs/${id}/finish`)
    .set('authorization', token);
    matchResponse = await chai.request(app)
    .get('/matchs');
    const { body: afterFinishMatchs } = matchResponse;
    const finishedMatch = afterFinishMatchs.find((match: Match) => match.id === id);
    const { status, body: { message } } = patchResponse;
    
    expect(status).to.be.equal(200);
    expect(message).to.be.equal('Match finished');
    expect(finishedMatch.inProgress).to.be.false;

  })
  
})
