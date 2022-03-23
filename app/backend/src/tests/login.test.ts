import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';


import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes relacionados ao login', () =>{
  describe('A requisição POST/login ',() => {
    it('Testa retorna status 200 e um token ',async () => {
      let loginTest = await chai.request(app).post('/login').send({ 
        email: 'admin@admin.com',
        password:'password',
      });
      // espera status 200
      expect(loginTest.status).to.be.equal(200);
     // espera uma afirmacao que o destino tem uma propriedade com a chave fornecida token
      expect(loginTest.body).to.have.property("token")
    });

    it('Testa se é o status 401 quando passo um email inválido', async() =>{
      let statusTest = await chai.request(app).post('/login').send({
        email:'admim',
        password:'password',
      });
      // espera status 401
      expect(statusTest.status).to.be.equal(401);
    });
  });
  
  describe('Testes relacionados GET:login/validate', () =>{
    it('retorna o status 200 quando tem um token válido', async() =>{
      let loginTest = await chai.request(app).post('/login').send({ 
        email: 'user@user.com',
        password:'secret_user',
      });

      const { token } = loginTest.body;

      let loginValidateTest = await chai.request(app)
      // testa consultas 
      .get('/login/validate')
      // testa o token
      // https://www.chaijs.com/guide/helpers/
      .set('authorization',token)
      expect(loginValidateTest.status).to.be.equal(200);
    })

  })
})
