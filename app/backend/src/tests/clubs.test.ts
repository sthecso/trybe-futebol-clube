import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe.only('Testando a rota de clubs', () => {

  let chaiHttpResponse: Response;

  // before(async () => {
  //   chaiHttpResponse = await chai.request(app).post('/login')
  //     .send({ 
  //       email: 'admin@admin.com',
  //       password: 'secret_admin'
  //      });
  // });

  it('Testando se é possível receber todos os clubes', async () => {
    chaiHttpResponse = await chai.request(app).get('/clubs');

    expect(chaiHttpResponse).to.status(200);
  });

  it('Testando se é possivel receber apenas um clube', async () => {
    chaiHttpResponse = await chai.request(app).get('/clubs/6');

    expect(chaiHttpResponse).to.status(200);
  })
})