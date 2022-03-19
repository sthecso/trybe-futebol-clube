// import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando rota de login', () => {
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

  it('Testando se é possível fazer login com sucesso', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login')
       .send({ 
         email: 'admin@admin.com',
         password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
        });

    expect(chaiHttpResponse).to.status(200)
  });

  it('Testando se é possivel fazer login sem campo "email"', async () => {
    chaiHttpResponse = await chai.request(app).post('/login')
      .send({ 
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
      });

    expect(chaiHttpResponse).to.status(400);
  });

  it('Testando se é possivel fazer login sem o campo "password"', async () => {
    chaiHttpResponse = await chai.request(app).post('/login')
    .send({
      email: 'admin@admin.com'
    });

  expect(chaiHttpResponse).to.status(400);
  });

  it('Testando se é possível fazer login com o campo "email" em branco', async () => {
    chaiHttpResponse = await chai
    .request(app).post('/login')
    .send({ 
      email: '',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
     });

 expect(chaiHttpResponse).to.status(400)
  });

  it('Testando se é possível fazer login com o campo "password" em branco', async () => {
    chaiHttpResponse = await chai
    .request(app).post('/login')
    .send({ 
      email: 'admin@admin.com',
      password: ''
     });

 expect(chaiHttpResponse).to.status(400)
  });

  it('Testando se é possível fazer login com um usuario que não existe', async () => {
    chaiHttpResponse = await chai
    .request(app).post('/login')
    .send({ 
      email: 'email@email.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
     });

    expect(chaiHttpResponse).to.status(400);
  });

  // it('Seu sub-teste', () => {
  //   expect(false).to.be.eq(true);
  // });
});
