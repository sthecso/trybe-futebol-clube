/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable func-names */
/* eslint-disable mocha/no-mocha-arrows */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable max-lines-per-function */
import * as chai from 'chai';
import chaiHttp = require('chai-http');

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
});
