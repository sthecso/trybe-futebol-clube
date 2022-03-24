import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { mockMatchs } from './mocks/mockMatchs';
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('testa o endpoint /matchs', () => {
  describe('caso o endpoint /matchs com o metodo getMatchs', async () => {
    describe('retornar com sucesso', async () => {

      let chaiHttpResponse: Response;

      it('e uma resposta 200', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .get('/matchs')
        .send(mockMatchs)
        .then((res) => {
          expect(res.status).to.be.equal(200);
        }) as Response;
      });

      it('e um array de objetos', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .get('/matchs')
        .send(mockMatchs)
        .then((res) => {
          expect(res.body).to.be.a('array') && expect(res.body[0]).to.be.a('object');
        }) as Response;
      });
    })
  })
})
