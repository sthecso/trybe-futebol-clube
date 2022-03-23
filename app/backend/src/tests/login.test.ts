import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import User from '../database/models/User'

import { app } from '../app';
// import Example from '../database/models/ExampleModel';
/* 
  ** para andamento dos testes, foi necessário utilizar a flag "--file" para rodar o ts-node aceitando as modificações dos types
  ** além da adição de "TS_NODE_FILES=true" no script de tests
  ** referência: https://stackoverflow.com/questions/53765895/how-to-extend-express-request-type-in-a-ts-node-project
*/
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('testes da rota login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  describe('quando são passado os dados esperados', () => {
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
    let chaiHttpResponse: Response = await chai
    .request(app)
    .post('/login')
    .send({
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
    });
  
    let { token, user } = chaiHttpResponse.body;
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(token).to.be.a('string');
  
    expect(user.username).to.be.equal('Admin');
    expect(user.email).to.be.equal('admin@admin.com');
    expect(user.id).to.be.equal(1);
    });

    it('testa retorno da rota /validate', async () => {
    let chaiHttpResponse: Response = await chai
    .request(app)
    .post('/login')
    .send({
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
    });
    
    const { token } = chaiHttpResponse.body;
    
    chaiHttpResponse = await chai
    .request(app)
    .get('/login/validate')
    .set(
      'Authorization', token
    );

    expect(chaiHttpResponse.body).to.be.equal('admin');
    });
  })
  
  describe('testa quando o login deve falhar', () => {
    before(async () => {
      return sinon
        .stub(User, "findOne")
        .resolves(undefined);
    });
  
    after(()=>{
       (User.findOne as sinon.SinonStub).restore();
     });

    it('testa quando passamos credenciais inexistentes', async () => {
      let chaiHttpResponse: Response = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'abuble@abuble',
        password: 'abubleabuble'
      });

      const { message } = chaiHttpResponse.body;

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(message).to.be.equal('Incorrect email or password');
    });
  });
});
