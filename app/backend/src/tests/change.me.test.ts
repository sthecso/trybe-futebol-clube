import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import LoginController from '../controllers';

import { Response } from 'superagent';
import User from '../database/models/User';
chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

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

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});

describe('Testa endpoint /login', () => {
  let chaiHttpResponse: Response;
  const expectedResult = {
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '123456'
  }

   before(async () => {
    sinon
      .stub(User, "create")
      .resolves(expectedResult as User);
  });

  after(()=>{
    (User.create as sinon.SinonStub).restore();
  })
   it('É retornado status 200 se o cadastro de usuario e feito com sucesso', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(expectedResult)
       .then((res) => {
         expect(res.status).to.be.equal(200);
       }).catch((err) => {
         throw err
       }) as unknown as Response;
  });
})
