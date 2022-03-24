import * as sinon from 'sinon';
import * as chai from 'chai';
import * as request from 'superagent';
import { Model } from 'sequelize';
import { Request, Response } from 'superagent';
import chaiHttp = require('chai-http');

import { app } from '../app';
import { User } from '../database/models';

chai.use(chaiHttp);

const { expect } = chai;
const tokenExpression = /^ey[\w-]+\.ey[\w-]+\.[\w-]+$/

describe('Verifica se o usuário fez login', () => {
  /*
  {
    id: 2,
    username: 'User',
    role: 'user',
    email: 'user@user.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
  }
  */
  // password: secret_user
  it('Tenta fazer login de usuário', async () => {
    const loginData = { email: 'user@user.com', password: 'secret_user' };
    // const loginData = { email: 'user@user.com' };
    // const userRequest = await chai.request(app).post('/login').send(loginData);
    // console.log(userRequest);
    chai.request(app).post('/login').send(loginData).then((res) => console.log(res));

    chai.request(app).post('/login').send(loginData).end(function (err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
    });
  });
});
