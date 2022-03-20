import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';

import chaiHttp = require('chai-http');

import { app } from '../app';
import LoginController from '../controllers';

import { Response } from 'superagent';
import User from '../database/models/User';
chai.use(chaiHttp);

const { expect } = chai;


describe('Testa endpoint /login', () => {
  let chaiHttpResponse: Response;
  let expectedResult = {
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
  }

  before(async () => {
   sinon
     .stub(User, "findOne")
     .resolves(expectedResult as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })
  // com a validação do joi, o teste quebra.
  it('Deve permitir um POST para /login com a resposta 200', async () => {
   chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      // .type('form') // quando e o metodo post de criação, deve ter o tipo form. como e a filtragem de login não e necessário
      // .set('content-type', 'application/json') Para fins de estudos deixar aqui
      .send(expectedResult)
      .then((res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        // expect(res.body.id).to.be.a('string'); /* Dá um erro de undefined no body.id, verificar */
        // expectedResult = res.body.id;
      }).catch((err) => {
        throw err
      }) as unknown as Response;
  });
})


describe('Testa auth/validateJWT.ts,', () => {
  let chaiHttpResponse: Response;
  before(async () => {
    sinon
      .stub(jwt, "verify")
      .resolves(() => {
        throw new Error('Token not found')
      })
  });

  after(()=>{
    (jwt.verify as sinon.SinonStub).restore();
  });

  it('E verificado se o token não existir a reposta de status e 401', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/login/validate')
       .set('authorization', 'algumTokenJwtAleatório')
       .send({})
       .then((res) => {
         expect(res.status).to.be.equal(401);
       }).catch((err) => {
         throw err
       }) as unknown as Response;
  });
})