import * as chai from 'chai';

import chaiHttp = require('chai-http');

import * as shell from 'shelljs';

import { app } from '../app';

import {
  leaderboardsHome,
  leaderboardsAway,
  leaderboards,
} from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

let chaiHttpResponse;

describe('GET \'/leaderboard/home\'', () => {
  before(() => {
    shell.exec('npm run db:reset');
  });

  it('on success', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/home')
      .set('content-type', 'application/json');

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(200);
    expect(response).to.be.eql(leaderboardsHome);
  });
});

describe('GET \'/leaderboard/away\'', () => {
  it('on success', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/away')
      .set('content-type', 'application/json');

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(200);
    expect(response).to.be.eql(leaderboardsAway);
  });
});

describe('GET \'/leaderboard\'', () => {
  it('on success', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard')
      .set('content-type', 'application/json');

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(200);
    expect(response).to.be.eql(leaderboards);
  });
});
