import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('checking the post method of the /login route', () => {
  describe('cheking a login route on success', () => {
    let chaiHttpResponse: Response;
    let login = {
      email: 'admin@admin.com',
      password: 'secret_admin'
    }

    // before(async () => {
    //   sinon
    //     .stub(User, "findOne")
    //     .resolves(login as unknown as User);
    // });

    // after(() => {
    //   (User.findOne as sinon.SinonStub).restore();
    // })

    it('Verify status', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(login)
        .then((response) => {
          expect(response.status).to.be.equal(200);
        }) as Response
    })

    it('Verify if return an object', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(login)
        .then((response) => {
          expect(response.body).to.be.an('object');
        }) as Response
    })
  })
  describe('checking a login route on error', () => {
    let chaiHttpResponse: Response;
    let login = {
      email: 'error@error.com',
      password: 'secret_error'
    }

    let loginErrorEmail = {
      email: '',
    }

    let loginErrorPassword = {
      password: ''
    }

    it('Verify if status code is 401', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(login)
        .then((response) => {
          expect(response.status).to.be.equal(401);
        }) as Response
    })

    it('check if it returns an error message', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(login)
        .then((response) => {
          expect(response.body.message).to.be.equal('Incorrect email or password')
        }) as Response
    })

    it('check if it returns an error message if the email field is empty', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(loginErrorEmail)
        .then((response) => {
          expect(response.body.message).to.be.equal('All fields must be filled')
        }) as Response
    })

    it('check if it returns an error message if the password field is empty', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(loginErrorPassword)
        .then((response) => {
          expect(response.body.message).to.be.equal('All fields must be filled')
        }) as Response
    })

    it('Verify if return an object', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(login)
        .then((response) => {
          expect(response.body).to.be.an('object');
        }) as Response
    })
  })
  describe('Checking the return of the login route', () => {
    let chaiHttpResponse: Response;
    let login = {
      email: 'admin@admin.com',
      password: 'secret_admin'
    }

    it('Verify if EMAIL is a string', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(login)
        .then((response) => {
          expect(response.body.user.email).to.be.an('string');
        }) as Response
    })
    it('Verify if ID is a number', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(login)
        .then((response) => {
          expect(response.body.user.id).to.be.an('number');
        }) as Response
    })
    it('Verify if role is a string', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(login)
        .then((response) => {
          expect(response.body.user.role).to.be.an('string');
        }) as Response
    })
    it('Verify if username is a string', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(login)
        .then((response) => {
          expect(response.body.user.username).to.be.an('string');
        }) as Response
    })
  })
});