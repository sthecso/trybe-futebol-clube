import * as chai from 'chai';

import chaiHttp = require('chai-http');

import { app } from '../app';

import { allMatchesMock } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

let chaiHttpResponse;

describe('/matchs', () => {
  it('on success', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matchs')
      .set('content-type', 'application/json');

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(200);
    expect(response).to.be.eql(allMatchesMock);
  });
});
