import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { exec } from 'shelljs';

import { app } from '../app';

import matchs from './dbMock/matchs';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Request Get Match',() => {
  let matchResponse: Response;

  before(() => {
    exec('npm run db:reset');
  });

  it('On /matchs returns all matchs', async () => {
    matchResponse = await chai.request(app)
    .get('/matchs');

    const { status, body } = matchResponse;

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(matchs);
  });

  it('On /matchs?inProgress=true returns all inProgress matchs', async () => {
    matchResponse = await chai.request(app)
    .get('/matchs?inProgress=true');

    const { status, body } = matchResponse;
    const filteredMatchs = matchs.filter((match) => match.inProgress);
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(filteredMatchs);
  });

  it('On /matchs?inProgress=false returns all not inProgress matchs', async () => {
    matchResponse = await chai.request(app)
    .get('/matchs?inProgress=false');

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

  it('On /matchs with correct Body and Token', async () => {
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
});
