import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { exec } from 'shelljs';

import { app } from '../app';

import leaderboardAll from './dbMock/leaderboardAll';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Request Get Leaderboard', () => {
  let leaderboardResponse: Response;
  
  before(() => {
    exec('npm run db:reset');
  });

  it('On get /leaderboard returns default', async () => {
    leaderboardResponse = await chai.request(app)
    .get('/leaderboard');

    const { status, body } = leaderboardResponse;

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(leaderboardAll);
  })
})
