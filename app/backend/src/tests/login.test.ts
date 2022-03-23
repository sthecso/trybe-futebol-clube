/* eslint-disable mocha/no-identical-title */
/* eslint-disable max-lines-per-function */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable max-len */
/* eslint-disable mocha/no-mocha-arrows */
/* eslint-disable import/extensions */
// import * as sinon from 'sinon';
import { verify } from 'jsonwebtoken';
import { readFileSync } from 'fs';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Response } from 'superagent';

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

// eslint-disable-next-line max-lines-per-function
describe('POST /login', () => {
  // eslint-disable-next-line max-len
  it('returns http code 401 when passed a incorrect email and a message "All fields must be filled" ', async () => {
    const loginData = {
      email: 'admin.com',
      password: 'secret_admin',
    };
    const response: Response = await chai
      .request(app)
      .post('/login')
      // eslint-disable-next-line sonarjs/no-duplicate-string
      .set('content-type', 'application/json')
      .send(loginData);
    expect((response.body.message)).to.equals('Incorrect email or password');
    expect(response.status).to.equals(401);
  });
  it('returns http code 401 when not passed a  email and a message "All fields must be filled" ', async () => {
    const loginData = {
      password: 'secret_admin',
    };
    const response: Response = await chai
      .request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send(loginData);
    expect((response.body.message)).to.equals('All fields must be filled');
    expect(response.status).to.equals(401);
  });
  it('returns http code 401 when not passed a password and a message "All fields must be filled" ', async () => {
    const loginData = {
      email: 'admin@example.com',
    };
    const response: Response = await chai
      .request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send(loginData);
    expect(response.status).to.equals(401);
    expect((response.body.message)).to.equals('All fields must be filled');
  });
  it('returns http code 401 when passed a incorrect password and a message "Incorrect email or password" ', async () => {
    const loginData = {
      email: 'admin@example.com',
      password: 1234,
    };
    const response: Response = await chai
      .request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send(loginData);
    expect(response.status).to.equals(401);
    expect((response.body.message)).to.equals('Incorrect email or password');
  });
  it('returns http code 200 when passed a correct body and a token in the body with correct encrypted data', async () => {
    const jwtKey = readFileSync('jwt.evaluation.key', { encoding: 'utf-8' })
      .trim();
    const loginData = {
      email: 'admin@admin.com',
      password: 'secret_admin',
    };
    const response: Response = await chai
      .request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send(loginData);
    const { body: { token } } = response;
    expect(response.status).to.equals(200);
    expect(!!verify(token, jwtKey)).to.equal(true);
  });
  it('returns a user with properties id, username, role, email when passed correct and valid email anda password ', async () => {
    const loginData = {
      email: 'admin@admin.com',
      password: 'secret_admin',
    };
    const response: Response = await chai
      .request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send(loginData);
    const { body: { user } } = response;
    expect(user).to.haveOwnProperty('id');
    expect(user).to.haveOwnProperty('username');
    expect(user).to.haveOwnProperty('role');
    expect(user).to.haveOwnProperty('email');
  });
  it('returns status 404 and a message "user not found" when passed wrong email', async () => {
    const loginData = {
      email: 'admin@test.com',
      password: 'secret_admin',
    };
    const response: Response = await chai
      .request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send(loginData);
    const { body: { message } } = response;
    expect(message).to.equals('user not found');
    expect(response.status).to.equals(404);
  });
});

// eslint-disable-next-line mocha/max-top-level-suites
describe('GET /validate', () => {
  // eslint-disable-next-line max-len
  it('returns http code 200 when passed a correct token to the rout" ', async () => {
    const loginData = {
      email: 'admin@admin.com',
      password: 'secret_admin',
    };
    const firstResponse: Response = await chai
      .request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send(loginData);
    const { body: { token } } = firstResponse;

    const secondResponse: Response = await chai
      .request(app)
      .get('/login/validate')
      .set('Authorization', token);
    const { body } = secondResponse;
    expect((body)).to.equals('admin');
  });
  it('returns http code 401 when not passed a token to the route" ', async () => {
    const response: Response = await chai
      .request(app)
      .get('/login/validate');
    const { body } = response;
    expect((body.message)).to.equals('token not found');
  });
  it('returns http code 401 when not passed a token to the route" ', async () => {
    const response: Response = await chai
      .request(app)
      .get('/login/validate')
      .set('Authorization', 'invalid');
    const { body } = response;
    expect((body.message)).to.equals('Unauthorized');
  });
});
