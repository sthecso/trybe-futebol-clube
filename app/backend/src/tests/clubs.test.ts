import * as sinon from 'sinon';
import { exec } from 'shelljs';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import clubs from './dbMock/clubs'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Request GET Clubs',() => {
  let clubResponse: Response;
  
  before(() => {
    exec('npm run db:reset');
  });
  it('On /clubs Response is all clubs', async () => {
    let clubResponse = await chai.request(app)
     .get('/clubs');
     
     const { status, body } = clubResponse;

     expect(status).to.be.equal(200);
     expect(body).to.be.deep.equal(clubs);
  });

  it('On /clubs/:id Response is club with corresponded id', async () => {
    const id = 1;
    const club = clubs[id - 1];
    let clubResponse = await chai.request(app)
    .get(`/clubs/${id}`);

    const { status, body } = clubResponse;

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(club);
  })

  it('On /clubs/:id Response is not found with invalid id', async () => {
    const id = -1;
    let clubResponse = await chai.request(app)
    .get(`/clubs/${id}`);

    const { status, body: { message } } = clubResponse;

    expect(status).to.be.equal(400);
    expect(message).to.be.equal('Club Not Found');
  })
});
