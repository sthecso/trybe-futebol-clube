import * as chai from 'chai';
import { exec } from 'shelljs';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login tests', () => {
  let chaiHttpResponse: Response;
  let loginToken: string;

  before(() => {
    exec('npm run db:reset');
  });

  it('When login is successful, responds with status 200, user data and token', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });

    const { user, token } = chaiHttpResponse.body;

    loginToken = token;

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(token).not.to.be.undefined;
    expect(user.username).to.be.equal('Admin');
  });

  it('When email is incorrect, responds with status 401 and error message', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'batata@frita.com', password: 'secret_admin' });

    const { message } = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).equal(401);
    expect(message).to.be.equal("Incorrect email or password");
  });

  it('When email is not a string, responds with status 422 and error message', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 123456, password: 'secret_admin' });

    const { message } = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).equal(422);
    expect(message).to.be.equal("Email must be a string");
  });

  it('When email is an empty string, responds with status 400 and error message', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: '', password: 'secret_admin' });

    const { message } = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).equal(401);
    expect(message).to.be.equal("All fields must be filled");
  });

  it('Without an email, responds with status 401 and error message', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ password: 'secret_admin' });

    const { message } = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).equal(401);
    expect(message).to.be.equal("All fields must be filled");
  });

  it('When password is incorrect, responds with status 401 and error message', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'not_so_secret_admin' });

    const { message } = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).equal(401);
    expect(message).to.be.equal("Incorrect email or password");
  });

  it('When password is not a string, responds with status 422 and error message', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 123456 });

    const { message } = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).equal(422);
    expect(message).to.be.equal("Password must be a string");
  });

  it('When password is an empty string, responds with status 400 and error message', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: '' });

    const { message } = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).equal(401);
    expect(message).to.be.equal("All fields must be filled");
  });

  it('Without a password, responds with status 401 and error message', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ password: 'secret_admin' });

    const { message } = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).equal(401);
    expect(message).to.be.equal("All fields must be filled");
  });

  it('When validating login with valid token, responds with status 200 and the user role as a text', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', loginToken);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.text).to.be.equal('admin');
  });

  it('When validating login with invalid token, responds with status 401 and error message', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', 'big mac');

      const { message } = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(message).to.be.equal('Invalid token');
  });

  it('When validating login without token, responds with status 401 and error message', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate');

      const { message } = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(message).to.be.equal('Token not found');
  });
});
