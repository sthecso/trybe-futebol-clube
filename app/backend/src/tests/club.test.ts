import * as chai from 'chai';

import chaiHttp = require('chai-http');

import { app } from '../app';

import { allClubsMock } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

let chaiHttpResponse;

describe('/clubs', () => {
  it('has an correct body request', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/clubs')
      .set('content-type', 'application/json');

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(200);
    expect(response).to.be.eql(allClubsMock);
  });
});
