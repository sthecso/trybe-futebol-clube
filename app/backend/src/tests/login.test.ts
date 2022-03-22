import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Na rota "/login"', () => {
  describe('Quando a requisição é feita...', () => {
    it('com sucesso: deve retornar status 200 e o token gerado', async () => {
      let response = await chai.request(app)
        .post('/login')
        .send({
          email: 'user@user.com',
          password: 'secret_user'
        });
      expect(response).to.have.status(200);
      expect(response.body).to.have.property('token');
    });
    it('com o email errado: deve retornar status 401', async () => {
      let response = await chai.request(app)
        .post('/login')
        .send({
          email: 'qualquercoisa@qualquercoisa.com',
          password: "secret_user"
        });
      expect(response).to.have.status(401);
      expect(response.body).to.have.property('message');
    });
    it('com a senha errada: deve retornar status 401', async () => {
      let response = await chai.request(app)
        .post('/login')
        .send({
          email: 'user@user.com',
          password: "qualquer_coisa"
        });
      expect(response).to.have.status(401);
      expect(response.body).to.have.property('message');
    });
    it('sem o email: deve retornar status 401', async () => {
      let response = await chai.request(app)
        .post('/login')
        .send({
          password: 'secret_user'
        });
        expect(response).to.have.status(401);
        expect(response.body.message).to.be.equal('All fields must be filled');
    });
    it('sem a senha: deve retornar status 401', async () => {
      let response = await chai.request(app)
        .post('/login')
        .send({
          email: 'user@user.com',
        });
        expect(response).to.have.status(401);
        expect(response.body.message).to.be.equal('All fields must be filled');
    });
  });
});
