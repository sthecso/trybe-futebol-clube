import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Response } from 'superagent';

import { app } from '../app';
chai.use(chaiHttp);
const { expect } = chai;

describe('Testing Login Route', () => {
  let chaiHttpResponse: Response;

  describe('Login by email and password', () => {
    it('If login is wrong', async () => {
      const payload = {
        email: 'johndoe@mail.com',
        password: 'johndoe123',
      };
      const jsonResponse = {
        message: 'Incorrect email or password',
      };

      chaiHttpResponse = await chai.request(app).post('/login').send(payload);

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.text).to.be.equal(JSON.stringify(jsonResponse));
    });

    it('If password is wrong', async () => {
      const payload = {
        email: 'admin@admin.com',
        password: 'test123',
      };
      const jsonResponse = {
        message: 'Incorrect email or password',
      };

      chaiHttpResponse = await chai.request(app).post('/login').send(payload);

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.text).to.be.equal(JSON.stringify(jsonResponse));
    });

    it('If the user is correct', async () => {
      const payload = {
        email: 'admin@admin.com',
        password: 'secret_admin',
      };

      chaiHttpResponse = await chai.request(app).post('/login').send(payload);

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(JSON.parse(chaiHttpResponse.text)).to.have.all.keys(
        'user',
        'token',
      );
    });

    it('If the login info is without email', async () => {
      const payload = {
        password: 'secret_admin',
      };
      const jsonResponse = {
        message: 'All fields must be filled',
      };

      chaiHttpResponse = await chai.request(app).post('/login').send(payload);

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.text).to.be.equal(JSON.stringify(jsonResponse));
    });

    it('If the login info is without password', async () => {
      const payload = {
        email: 'admin@admin.com',
      };
      const jsonResponse = {
        message: 'All fields must be filled',
      };

      chaiHttpResponse = await chai.request(app).post('/login').send(payload);

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.text).to.be.equal(JSON.stringify(jsonResponse));
    });
  });

  describe('Get role with token', () => {
    it('If token is incorrect', async () => {
      const token = 'asdasdad';
      const jsonResponse = {
        error: 'Invalid token',
      };

      // get role
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', token);

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.text).to.be.equal(JSON.stringify(jsonResponse));
    });

    it('If token does not exist', async () => {
      const jsonResponse = {
        error: 'Token not found',
      };

      // get role
      chaiHttpResponse = await chai.request(app).get('/login/validate');

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.text).to.be.equal(JSON.stringify(jsonResponse));
    });

    it('If token is correct', async () => {
      const payload = {
        email: 'admin@admin.com',
        password: 'secret_admin',
      };
      const roleResponse = 'admin';

      // get token
      chaiHttpResponse = await chai.request(app).post('/login').send(payload);
      const token = JSON.parse(chaiHttpResponse.text).token;

      // get role
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', token);

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(JSON.parse(chaiHttpResponse.text)).to.be.equal(roleResponse);
    });
  });
});

describe('Testing Clubs Route', () => {
  let chaiHttpResponse: Response;

  describe('Return all clubs', () => {
    it('Code status 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/clubs').send();

      expect(chaiHttpResponse.status).to.be.equal(200);
    });
    it('Returned an array', async () => {
      chaiHttpResponse = await chai.request(app).get('/clubs').send();

      const clubs = JSON.parse(chaiHttpResponse.text);
      expect(clubs).to.be.an('array');
    });
  });

  describe('Return a club by id', () => {
    it('Was found a club', async () => {
      chaiHttpResponse = await chai.request(app).get('/clubs/1').send();

      const club = JSON.parse(chaiHttpResponse.text);
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(club).to.be.an('object');
      expect(club).to.have.all.keys('id', 'clubName');
    });

    it('Was not found a club', async () => {
      const jsonResponse = {
        message: 'Club does not exist',
      };
      chaiHttpResponse = await chai.request(app).get('/clubs/123').send();

      const response = JSON.parse(chaiHttpResponse.text);
      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(response).to.be.an('object');
      expect(response).to.deep.equal(jsonResponse);
    });
  });
});
