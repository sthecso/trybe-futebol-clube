import * as chai from 'chai';

import chaiHttp = require('chai-http');

import { app } from '../app';

import {
  allMatchesMock,
  matchesInProgress,
  matchesNotInProgress,
} from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

let chaiHttpResponse;

describe('/matchs', () => {
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
