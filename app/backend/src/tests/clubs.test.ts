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
import Club from '../database/models/Club';
import clubsMock from './mocks/clubs.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('testes da rota clubs', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  describe('quando são passado os dados esperados', () => {
    before(async () => {
      return sinon
        .stub(Club, "findAll")
        .resolves(clubsMock as unknown as []);
    });
  
    after(()=>{
       (Club.findAll as sinon.SinonStub).restore();
     })
  
    it('testa se retorna status e body esperados', async () => {
    let chaiHttpResponse: Response = await chai
    .request(app)
    .get('/clubs');
  
    let body = chaiHttpResponse.body;
  
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(body).to.be.a('array');
  
    expect(body[0]).to.have.property('id', 1);
    expect(body[1]).to.have.property('id', 2);
    });
  })
  
  describe('quando chamamos por um club inexistente', () => {
    before(async () => {
      return sinon
        .stub(Club, "findOne")
        .resolves(null);
    });
  
    after(()=>{
       (Club.findOne as sinon.SinonStub).restore();
     })

     it('passando um ID inválido', async () => {
      let chaiHttpResponse: Response = await chai
      .request(app)
      .get('/clubs/5');
    
      let { status, body } = chaiHttpResponse;      

      expect(status).to.be.equal(404);
      expect(body).to.be.equal('Club not found');
     });
  });
});
