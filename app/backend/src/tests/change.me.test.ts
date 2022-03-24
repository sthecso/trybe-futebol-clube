import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';
import generateToken from '../utils/generateToken';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const EMAIL_NOT_MATCHED = 'Insert a validate email';
const PASSWORD_LESS_THAN_6 = 'Your password must be great than than 6';
describe('Testing /login', () => {
  let chaiHttpResponse: Response;
  
  describe('Test if\'s not possible to enter with a not validate email', async () => {

    chaiHttpResponse = await chai.request(app).post('/login').send({
          email: 'cachorro',
          password: 'senhaDificil'
        } as Users)

    it('Test if it\'s not possible to enter with a not validate email', () => {
      expect(chaiHttpResponse).to.be.equal(EMAIL_NOT_MATCHED);
    });
    it('Test if status is 400', () => {
      expect(chaiHttpResponse).to.be.status(400);
    });
  })
  describe('Test when password is not validate', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'cachorro',
      password: '12345'
    })

    it('Receive a message when password has length less than 6', () => {
      expect(chaiHttpResponse).to.be.equal(PASSWORD_LESS_THAN_6);
    })
  })
});

describe('Testing /login/validate', () => {
  let chaiHttpResponse: Response;

  describe('Test if token is not validate', async () => {
    const user = {
      id: 2,
      username: 'User',
      role: 'user',
      email: 'user@user.com',
      password: 'senhaDificilima',
    };
    const wrongToken = 'token aleatório';

    const mockToken = generateToken(user);
    chaiHttpResponse = await chai.request(app).get('/login/validatez')
    .set('content-type', 'application/json')
    .set('authorization', wrongToken)
    .send({ email: user.email,
    password: user.password });

    it('Test if it\'s not possible to validate with a wrong token', () => {
      expect(mockToken).not.to.be.equal(wrongToken);
    });
    it('Test if status is 401', () => {
      expect(chaiHttpResponse).to.be.status(401);
    });
  });

  describe('Test if token is validate', async () => {
    const user = {
      id: 2,
      username: 'User',
      role: 'user',
      email: 'user@user.com',
      password: 'senhaDificilima',
    };
  
    const mockToken = await generateToken(user);
    chaiHttpResponse = await chai.request(app).get('/login/validatez')
    .set('content-type', 'application/json')
    .set('authorization', mockToken)
    .send({ email: user.email,
    password: user.password });

    it('Test if it\'s not possible to validate with a wrong token', () => {
      expect(chaiHttpResponse).to.be.equal('user');
    });
    it('Test if status is 401', () => {
      expect(chaiHttpResponse).to.be.status(200);
    });
  })
})
