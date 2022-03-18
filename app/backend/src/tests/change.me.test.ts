import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';


import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rotas login', () =>{
  describe('A requisição POST/login ',() => {
    it('espero que tenha os status 200 e que tenha um token ',async () => {
      let loginResponse = await chai.request(app)
      .post('/login')
      .send({ 
        email: 'user@user.com',
        password:'secret_user',
      });
      expect(loginResponse).to.have.status(200);
       expect(loginResponse.body).to.have.property("token")
    });
    it('espero que tenha o status 401 quando passo um email inválido', async() =>{
      let response = await chai.request(app)
      .post('/login')
      .send({
        email:'dwqwqw',
        password:'secret_user',
      });
      expect(response).to.have.status(401);
    });
  });
  
  describe('A requisição GET:login/validate', () =>{
    it('retorna o status 200 quando tem um token válido', async() =>{
      let loginResponse = await chai.request(app)
      .post('/login')
      .send({ 
        email: 'user@user.com',
        password:'secret_user',
      });
      const { token } = loginResponse.body;
      let loginResponse2 = await chai.request(app)
      .get('/login/validate')
      .set('authorization',token)
      expect(loginResponse2).to.have.status(200);
      expect(loginResponse2.body).to.contain("user");
    })
  })
})

describe('Rotas club', () => {
  describe('a requisiçã GET',() =>{
    it('retorna o status 200 e um json com todos os clubes',async() =>{
      let getClub = await chai.request(app)
      .get('/clubs')
      expect(getClub).to.have.status(200);
      console.log(getClub)
      expect(getClub.body).length(16);
    } )
  })
})