import * as chai from 'chai';

import chaiHttp = require('chai-http');

import { app } from '../app';
import { createToken } from '../utils';

chai.use(chaiHttp);

const { expect } = chai;

let chaiHttpResponse;

describe('POST \'/login\'', () => {
  const mockUserPost = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
  };

  const INCORRECT_EMAIL_OR_PASSWORD_MESSAGE = 'Incorrect email or password';

  const HAS_NO_FIELD = 'All fields must be filled';

  it('has an incorrect email in body request', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send({
        email: 'banana@banana.com',
        password: 'secret_admin',
      });

    const { message } = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(401);
    expect(message).to.be.eql(INCORRECT_EMAIL_OR_PASSWORD_MESSAGE);
  });

  it('has an incorrect password in body request', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send({
        email: 'admin@admin.com',
        password: 'secret_banana',
      });

    const { message } = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(401);
    expect(message).to.be.eql(INCORRECT_EMAIL_OR_PASSWORD_MESSAGE);
  });

  it('has no email in body request', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send({
        password: 'secret_admin',
      });

    const { message } = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(401);
    expect(message).to.be.eql(HAS_NO_FIELD);
  });

  it('has no password in body request', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send({
        email: 'admin@admin.com'
      });

    const { message } = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(401);
    expect(message).to.be.eql(HAS_NO_FIELD);
  });

  it('has a correct body request', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });

    const { user, token } = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(200);
    expect(user).to.be.eql(mockUserPost);
    expect(token).to.be.a('string');
  });
});

describe('GET \'/login/validate\'', () => {
  const mockUserPost = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
  };

  const mockTokenValid = createToken(mockUserPost);

  it('has a valid token in the header request', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('content-type', 'application/json')
      .set('authorization', mockTokenValid);

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(200);
    expect(response).to.be.eql(mockUserPost.role);
  });

  it('has an invalid token in the header request', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('content-type', 'application/json')
      .set('authorization', '123falseToken');

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(401);
    expect(response).to.have.own.property('message');
  });
});
