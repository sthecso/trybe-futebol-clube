import * as chai from 'chai';

import chaiHttp = require('chai-http');

import { app } from '../app';

import { allClubsMock } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

let chaiHttpResponse;

describe('GET \'/clubs\'', () => {
  it('on success', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/clubs')
      .set('content-type', 'application/json');

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(200);
    expect(response).to.be.eql(allClubsMock);
  });
});

describe('GET \'/clubs/:id\'', () => {
  it('has a invalid id', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/clubs/asdoaksdok')
      .set('content-type', 'application/json');

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(400);
    expect(response).to.have.own.property('message');
    expect(response.message).to.be.eql('Id must be a number');
  });

  it('not found a club with a valid id', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/clubs/999')
      .set('content-type', 'application/json');

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(404);
    expect(response).to.have.own.property('message');
    expect(response.message).to.be.eql('Has no club with this id');
  });

  it('found a club with a valid id', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/clubs/2')
      .set('content-type', 'application/json');

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(200);
    expect(response).to.be.eql(allClubsMock[1]);
  });
});
