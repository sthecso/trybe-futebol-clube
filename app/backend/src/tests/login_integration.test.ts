import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })
  
  it('Testa a rota /login post existe', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: "",
      password: ""
    })

    expect(chaiHttpResponse).have.status(401)
  });

  it('Testa se passando um email e password valido é retorna um json com a chave user', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: "admin@admin.com",
      password: "secret_admin"
    })

    expect(chaiHttpResponse).have.status(200)
    expect(chaiHttpResponse.body).to.have.property('user')
  });



});
