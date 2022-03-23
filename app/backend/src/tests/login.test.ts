import * as sinon from 'sinon';
import * as chai from 'chai';

import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import User from '../database/models/User';
chai.use(chaiHttp);

const { expect } = chai;

describe('Testa endpoint /login', () => {
  let chaiHttpResponse: Response;

  const expectedResult = {
    email: "admin@admin.com",
    password: "secret_admin"
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
        console.log(res.body)
        expect(res.status).to.be.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
      }).catch((err) => {
        throw err
      }) as unknown as Response;
  });
})
