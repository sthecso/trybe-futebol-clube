/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable func-names */
/* eslint-disable mocha/no-mocha-arrows */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable max-lines-per-function */
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { validateToken } from '../jwt';

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('/POST Login', () => {
  const userEmail = 'user@user.com';
  const userPassword = 'secret_user';

  it('o status é 200', async function () {
    const login = {
      email: userEmail,
      password: userPassword,
    };
    const result = await chai.request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send(login);
    expect(result.status).to.be.equals(200);
  });

  it('a resposta deve conter um jwt token ', async () => {
    const login = {
      email: userEmail,
      password: userPassword,
    };
    const result = await chai.request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send(login);
    expect(result.status).to.be.equals(200);
    expect(result.body).to.haveOwnProperty('token');
  });

  it('deve retornar 401 quando faltar email', async function () {
    const login = {
      password: userPassword,
    };
    const result = await chai.request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send(login);
    expect(result.status).to.be.equals(401);
    expect(result.body).to.haveOwnProperty('message');
  });

  it('deve retornar 401 quando faltar password', async function () {
    const login = {
      email: userEmail,
    };
    const result = await chai.request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send(login);
    expect(result.status).to.be.equals(401);
    expect(result.body).to.haveOwnProperty('message');
  });

  it('deve retornar 401 quando email invalido', async function () {
    const login = {
      password: userPassword,
      email: 'emailinvalido@email.com',
    };
    const result = await chai.request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send(login);
    expect(result.status).to.be.equals(401);
    expect(result.body).to.haveOwnProperty('message');
    expect(result.body.message).to.equal('Incorrect email or password');
  });

  it('deve retornar 401 quando password invalido', async function () {
    const login = {
      password: '12345', // menor do que 6
      email: userEmail,
    };
    const result = await chai.request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send(login);
    expect(result.status).to.be.equals(401);
    expect(result.body).to.haveOwnProperty('message');
    expect(result.body.message).to.equal('Incorrect email or password');
  });

  it('o retorno deve ser o seguinte', async function () {
    const login = {
      email: userEmail,
      password: userPassword,
    };
    const result = await chai.request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send(login);
    expect(result.body).to.haveOwnProperty('user');
    expect(result.body).to.haveOwnProperty('token');
  });

  it('o retorno deve vir com um token valido', async function () {
    const login = {
      email: userEmail,
      password: userPassword,
    };
    const result = await chai.request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send(login);
    expect(result.body).to.haveOwnProperty('token');
    const id = validateToken(result.body.token);
    expect(id).not.to.be.equal(false);
  });
});
