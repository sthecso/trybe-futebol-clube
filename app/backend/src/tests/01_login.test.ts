import chai from 'chai';
import { exec } from 'shelljs';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login endpoints', () => {
  let chaiHttpResponse: Response;
  let loginToken: string;

  before(() => {
    exec('npm run db:reset');
  });

  describe('When login is successful', () => {
    it('API responds with status 200, user data and token', async () => {
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
  });

  describe('When login fails because email is', () => {
    it('incorrect: API responds with status 401 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'batata@frita.com', password: 'secret_admin' });
  
      const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).equal(401);
      expect(message).to.be.equal("Incorrect email or password");
    });
  
    it('not a string: API responds with status 422 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 123456, password: 'secret_admin' });
  
      const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).equal(422);
      expect(message).to.be.equal("Email must be a string");
    });
  
    it('an empty string: API responds with status 400 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: '', password: 'secret_admin' });
  
      const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).equal(401);
      expect(message).to.be.equal("All fields must be filled");
    });
  
    it('not provided: API responds with status 401 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ password: 'secret_admin' });
  
      const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).equal(401);
      expect(message).to.be.equal("All fields must be filled");
    });
  });

  describe('When login fails because password is', () => {
    it('incorrect: API responds with status 401 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: 'not_so_secret_admin' });
  
      const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).equal(401);
      expect(message).to.be.equal("Incorrect email or password");
    });
  
    it('not a string: API responds with status 422 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: 123456 });
  
      const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).equal(422);
      expect(message).to.be.equal("Password must be a string");
    });
  
    it('an empty string: API responds with status 400 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: '' });
  
      const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).equal(401);
      expect(message).to.be.equal("All fields must be filled");
    });
  
    it('not provided: API responds with status 401 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ password: 'secret_admin' });
  
      const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).equal(401);
      expect(message).to.be.equal("All fields must be filled");
    });
  });

  describe('When validating login with a token that is', () => {
    it('valid: API responds with status 200 and the user role as a text', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', loginToken);
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.text).to.be.equal('admin');
    });
  
    it('invalid: API responds with status 401 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', 'big mac');
  
        const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(message).to.be.equal('Invalid token');
    });
  
    it('not provided: API responds with status 401 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate');
  
        const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(message).to.be.equal('Token not found');
    });
  })
});
