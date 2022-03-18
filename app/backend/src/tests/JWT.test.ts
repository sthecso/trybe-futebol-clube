import * as sinon from 'sinon';
import * as chai from 'chai';

const { expect } = chai;

import auth from '../utils/auth';
import { app } from '../app';
import { request } from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('JWT Util', () => {
  it('Deve retornar um token', async () => {
    const token = await auth.sign({
      id: 1,
      email: 'admin@admin.com',
    });
    expect(token).to.be.a('string');
  });
  it('Verifica se o token é valido', async () => {
    const token = await auth.sign({
      id: 1,
      email: 'admin@admin.com',
    });
    const decoded = await auth.verify(token);
    expect(decoded).to.be.an('object');
  });
  // it('Verifica se o middleware verifyRoute() retorna status 200 com um token funcional', async () => {
  //   const token = await auth.sign({
  //     id: 1,
  //     email: 'admin@admin.com',
  //   });
  //   const response = await request(app)
  //     .get('/login')
  //     .set('Authorization', token);
  //   expect(response.status).to.be.equal(200);
  // });
  // it('Verifica se o middleware verifyRoute() retorna status 401 sem um token', async () => {
  //   const response = await request(app).get('/login');
  //   expect(response.status).to.be.equal(401);
  // });
});
