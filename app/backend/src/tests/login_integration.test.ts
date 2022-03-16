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

  it('Testa se o servidor está funcionado', async () => {
    chaiHttpResponse = await chai.request(app).get('/')

    expect(chaiHttpResponse).have.status(200)
  });

  it('Testa a rota /login', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: "string",
      password: "string"
    })

    expect(chaiHttpResponse).have.status(200)
    expect(chaiHttpResponse.body).to.be.a('object')
  });


});
