import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('checking the post method of the /login route', () => {
  let chaiHttpResponse: Response;
  let data = {
    user: {
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
    }
  }
  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(data as unknown as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Verify status', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(data)
    .then((response) => {
      expect(response.status).to.be.equal(200)
    }) as Response
  })
});