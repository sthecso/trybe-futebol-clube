import * as chai from 'chai';

import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

let chaiHttpResponse;

const leaderboards = [];

describe('GET \'/leaderboard/home\'', () => {
  it('on success', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/home')
      .set('content-type', 'application/json');

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(200);
    expect(response).to.be.eql(leaderboards);
  });
});
