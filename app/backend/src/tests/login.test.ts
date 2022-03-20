import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import User from '../database/models/User'

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('testes da rota login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        "id": 1,
		    "username": "Admin",
        "role": "admin",
        "email": "admin@admin.com"
      } as User);
  });

  after(()=>{
     (User.findOne as sinon.SinonStub).restore();
   })

  it('testa se retorna status e body esperados', async () => {
  const chaiHttpResponse: Response = await chai
  .request(app)
  .post('/login')
  .send({
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  });

  const { token, user } = chaiHttpResponse.body;

  expect(chaiHttpResponse.status).to.be.equal(200);
  expect(token).to.be.a('string');

  expect(user.username).to.be.equal('Admin');
  expect(user.email).to.be.equal('admin@admin.com');
  expect(user.id).to.be.equal(1);
  });
  /* it('testa o retorno não esperado', () => {
    expect(false).to.be.eq(true);
  }); */
});
