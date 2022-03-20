import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Request POST Login',() => {
  let loginResponse: Response;

  it('On correct email and password from admin', async () => {
    loginResponse = await chai.request(app)
    .post('/login')
    .send({
      email: 'admin@admin.com',
      password: 'secret_admin'
    });

    const { user, token } = loginResponse.body;

    expect(loginResponse).to.have.status(200);
    expect(token).not.to.be.undefined;
    expect(user.username).to.be.equal('Admin');
  })
  it('On Incorrect email or password results in Response 401 with message',async () => {
    loginResponse = await chai.request(app)
     .post('/login')
     .send({
       email: 'wrongTest@user.com',
       password:'123213213',
     });
     const { message, token } = loginResponse.body;
     expect(loginResponse).to.have.status(401);
     expect(token).to.be.undefined;
     expect(message).to.be.equal('Incorrect email or password');
  });
});
