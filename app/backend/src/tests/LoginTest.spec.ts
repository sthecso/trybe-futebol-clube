import { LoginReturn } from './../utils/Interfaces';
import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Users from '../database/models/Users';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da /login', () => {
  describe('Quando o login é bem sucedido', () => {
    let chaiHttpResponse: Response;
  
    beforeEach(async () => sinon
      .stub(Users, "findOne")
      .resolves({ id: 1, password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW', email: 'email@test.com', role: 'admin' } as Users));
  
    afterEach(()=>{
      (Users.findOne as sinon.SinonStub).restore();
    })
  
    it('Retorna status 200', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/login')
         .send({ email: 'email@test.com', password: 'secret_admin' });
  
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });
  
  describe('Quando o login é mal sucedido, pois o email não está registrado', () => {
    let chaiHttpResponse: Response;
  
    beforeEach(async () => {
      sinon
        .stub(Users, "findOne")
        .resolves(null);
    });
  
    afterEach(()=>{
      (Users.findOne as sinon.SinonStub).restore();
    })
  
    it('Retorna status 401', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/login')
         .send({ email: 'email@test.com', password: 'senha' });
  
      expect(chaiHttpResponse.status).to.be.equal(401);
    });
  });
  
  describe('Quando o login é mal sucedido, pois a senha está incorreta', () => {
    let chaiHttpResponse: Response;
  
    beforeEach(async () => {
      sinon
        .stub(Users, "findOne")
        .resolves({ id: 1, password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW', email: 'email@test.com', role: 'admin' } as Users);
    });
  
    afterEach(()=>{
      (Users.findOne as sinon.SinonStub).restore();
    })
  
    it('Retorna status 401', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/login')
         .send({ email: 'email@test.com', password: 'batata' });
  
      expect(chaiHttpResponse.status).to.be.equal(401);
    });
  });
  
  describe('Quando o login é mal sucedido, pois o email não foi passado.', () => {
    let chaiHttpResponse: Response;
  
    it('Retorna status 401', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/login')
         .send({ email: '', password: 'password' });
  
      expect(chaiHttpResponse.status).to.be.equal(401);
    });
  });
});

describe('Testes da /login/validate', async () => {
  let chaiHttpResponse: Response;

  chaiHttpResponse = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: 'secret_admin' });
  const token = chaiHttpResponse.body.token

  describe('Quando o token é passado corretamente', async () => {
    it('Retorna status 200', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/login/validate')
         .set({ authorization: token })
  
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });

  describe('Quando o token é passado incorretamente', async () => {

    beforeEach(async () => {
      sinon
        .stub(Users, "findOne")
        .resolves(null);
    });
  
    afterEach(()=>{
      (Users.findOne as sinon.SinonStub).restore();
    })
    
    it('Retorna status 401', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/login/validate')
         .set({ authorization: 'notatoken' })
      const aaa = await chaiHttpResponse
  
      expect(chaiHttpResponse.status).to.be.equal(401);
    });
  });

  describe('Quando o token é não é passado', async () => {
    it('Retorna status 401', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/login/validate')
  
      expect(chaiHttpResponse.status).to.be.equal(401);
    });
  });
});
