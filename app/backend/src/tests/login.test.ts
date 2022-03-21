import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('testing "/login" route', () => {
  let chaiHttpResponse: Response;

  const loginMockAdmin = {
    email: 'user@user.com',
    password:'secret_user',
  }

  const userMockAdmin = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
  };

  it('if login was successful', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(loginMockAdmin);

    const { user, token } = chaiHttpResponse.body;

    expect(chaiHttpResponse).to.have.status(200);
    // expect(user).to.be.eql(userMockAdmin);
    expect(token).to.be.a('string');
  });
});
