import * as chai from 'chai';

import chaiHttp = require('chai-http');

import { app } from '../app';

import {
  leaderboardsNotInProgress,
} from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

let chaiHttpResponse;

describe('GET \'/leaderboard/home\'', () => {
  it('on success', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/home')
      .set('content-type', 'application/json');

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(200);
    expect(response).to.be.eql(leaderboardsNotInProgress);
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
    expect(response).to.be.eql(leaderboardsNotInProgress);
  });
});
