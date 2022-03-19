import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota de validação do login', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    chaiHttpResponse = await chai.request(app).post('/login')
      .send({ 
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
       })
  });

  it('Testando se o login é validado com sucesso', async () => {
    expect(chaiHttpResponse.body.token).to.exist;
  })

  it('Testando se o login é impedido caso não validado pelo token', async () => {    
    const auth = await chai.request(app).get('/login/validate');
    
     expect(auth.body.message).to.equal('Token not found');
  });
})