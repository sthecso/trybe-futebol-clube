// verificar se a rota de /login é do tipo POST ✅ 

// verificar se é possível fazer o login com dados corretos ✅ 
// verificar que após o acesso será redirecionado para a tela de jogos
// verificar se o resultado retornado é o esperado
// verificar se o status http é 200 ✅ 

// verificar se não é possível fazer login sem o campo `email` -> status 400
// verificar se não é possível fazer login com o campo `email` em branco -> status 400


// verificar se não é possível fazer login sem o campo `password` -> status 400
// verificar se não é possível fazer login com o campo `password` em branco' -> status 400
// verificar se password tem o mínimo de 6 caracteres

// verificar se o token existe
// verificar se o token é válido

import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login', () => {
  describe('POST /login', () => {
    let chaiHttpResponse: Response;
  
    it('tests if /login is POST with status 200 when we provide correct information', async () => {
      const login = {
        email: 'admin@admin.com',
        password: '123456'
      }
      
      chaiHttpResponse = await chai
         .request(app)
         .post('/login')
         .send(login)

        const { user, token } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(token).not.to.be.undefined;
      expect(user.username).to.be.equal('Admin');
    });
  })
});
