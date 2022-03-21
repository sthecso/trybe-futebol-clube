import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import matchs from './dbMock/matchs';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Request Get Match',() => {
  let matchResponse: Response;

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

  it('On /matchs?inProgress=false returns all matchs', async () => {
    matchResponse = await chai.request(app)
    .get('/matchs?inProgress=true');

    const { status, body } = matchResponse;
    const filteredMatchs = matchs.filter((match) => match.inProgress);
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(filteredMatchs);
  })

});