import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { exec } from 'shelljs';
import * as messages from '../utils/messages';
import StatusCodes from '../utils/StatusCodes';

chai.use(chaiHttp);

const { expect } = chai;

describe.skip('Login', () => {
  let httpResponse: Response;
  let token: string;

  const validRequestBody = {
    email: 'user@user.com', // seeders/20211205212238-user.js
    password: 'secret_user', // seeders/20211205212238-user.js
  };

  before(() => {
    exec('npm run db:reset');
  });

  describe('POST /login', () => {
    describe('When login is successful', () => {
      it('The API responds with status 200', async () => {
        httpResponse = await chai
          .request(app)
          .post('/login')
          .send(validRequestBody); // json

        expect(httpResponse.status).to.be.equal(StatusCodes.OK);
      });

      it('The response body contains the user and token', async () => {
        const { user, token: loginToken } = httpResponse.body;

        token = loginToken;

        expect(user.username).to.be.equal('User');
        expect(loginToken).to.be.a.string;
      });
    });

    describe('When email is not a string', () => {
      it('The API responds with status 422', async () => {
        httpResponse = await chai
          .request(app)
          .post('/login')
          .send({ email: 1, password: 'secret_user' });
  
        expect(httpResponse.status).to.be
          .equal(StatusCodes.UNPROCESSABLE_ENTITY);
      });

      it('The API responds with the correct message', () => {
        const { message } = httpResponse.body;

        expect(message).to.be.equal(messages.user.email.base);
      });
    });

    describe('When the email field is empty', () => {
      it('The API responds with status 401', async () => {
        httpResponse = await chai
          .request(app)
          .post('/login')
          .send({ email: '', password: 'secret_user' });

        expect(httpResponse.status).to.be
          .equal(StatusCodes.UNAUTHORIZED);
      });

      it('The API responds with the correct message', () => {
        const { message } = httpResponse.body;
  
        expect(message).to.be.equal(messages.user.required);
      });
    });

    describe('When the email is incorrect', () => {
      it('The API responds with status 401', async () => {
        httpResponse = await chai
          .request(app)
          .post('/login')
          .send({ email: '@#$!%*&', password: 'secret_user' });

        expect(httpResponse.status).to.be
          .equal(StatusCodes.UNAUTHORIZED);
      });

      it('The API responds with the correct message', () => {
        const { message } = httpResponse.body;

        expect(message).to.be.equal(messages.user.incorrect);
      });
    });

    describe('When password is not a string', () => {
      it('The API responds with status 422', async () => {
        httpResponse = await chai
          .request(app)
          .post('/login')
          .send({ email: 'user@user.com', password: 1 });

        expect(httpResponse.status).to.be
          .equal(StatusCodes.UNPROCESSABLE_ENTITY);
      });

      it('The API responds with the correct message', () => {
        const { message } = httpResponse.body;
  
        expect(message).to.be.equal(messages.user.password.base);
      });
    });

    describe('When the password field is empty', () => {
      it('The API responds with status 401', async () => {
        httpResponse = await chai
          .request(app)
          .post('/login')
          .send({ email: 'user@user.com', password: '' });

        expect(httpResponse.status).to.be
          .equal(StatusCodes.UNAUTHORIZED);
      });

      it('The API responds with the correct message', () => {
        const { message } = httpResponse.body;

        expect(message).to.be
          .equal(messages.user.required);
      });
    });

    describe('When the password is incorrect', () => {
      it('The API responds with status 401', async () => {
        httpResponse = await chai
          .request(app)
          .post('/login')
          .send({ email: 'user@user.com', password: '@#$!%*&' });

        expect(httpResponse.status).to.be
          .equal(StatusCodes.UNAUTHORIZED);
      });

      it('The API responds with the correct message', () => {
        const { message } = httpResponse.body;

        expect(message).to.be
          .equal(messages.user.incorrect);
      });
    });
  });

  describe('GET /login/validate', () => {
    describe('When the provided token is valid', () => {
      it('The API responds with status 200', async () => {
        httpResponse = await chai
          .request(app)
          .get('/login/validate')
          .set('authorization', token); // header

        expect(httpResponse.status).to.be.equal(StatusCodes.OK);
      });
    });

    describe('When token is invalid', () => {
      it('The API responds with status 401', async () => {
        httpResponse = await chai
          .request(app)
          .get('/login/validate')
          .set('authorization', 'abc');

        expect(httpResponse.status).to.be
          .equal(StatusCodes.UNAUTHORIZED);
      });

      it('The API responds with the correct message', async () => {
        const { message } = httpResponse.body;

        expect(message).to.be
          .equal(messages.request.token.invalid);
      });
    });

    describe('When token is not found', () => {
      it('The API responds with status 401', async () => {
        httpResponse = await chai
          .request(app)
          .get('/login/validate')

        expect(httpResponse.status).to.be
          .equal(StatusCodes.UNAUTHORIZED);
      });

      it('The API responds with the correct message', async () => {
        const { message } = httpResponse.body;

        expect(message).to.be
          .equal(messages.request.token.notFound);
      });
    });
  });
});
