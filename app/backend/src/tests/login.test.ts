import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando rotas do login', () => {

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

  it('A rota deve receber um status 200 com um token em caso de sucesso', async () => {
    let responseLogin = await chai.request(app)
    .post('/login')
    .send({ email: 'user@user.com', password: 'secret_user'});
    expect(responseLogin).to.have.status(200);
    expect(responseLogin.body).to.have.property('token');
    // expect(false).to.be.eq(true);
  });

  it('A rota deve receber um status 401 com email inválido', async () => {
    let responseLogin = await chai.request(app)
    .post('/login')
    .send({ email: 'name', password: '12345678'});
    expect(responseLogin).to.have.status(401);

  });
});
