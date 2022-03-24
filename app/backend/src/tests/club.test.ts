import * as chai from 'chai';
import chaiHttp = require('chai-http');
import mockClubs from './mocks/mockClubs';
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('testa o endpoint /clubs', () => {
  describe('caso o endpoint /clubs com o metodo getClubs', async () => {
    describe('retorna com sucesso', async () => {

      let chaiHttpResponse: Response;

      it('e uma resposta 200', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .get('/clubs')
        .send(mockClubs)
        .then((res) => {
          expect(res.status).to.be.equal(200);
        }) as Response;
      });

      it('e um array de objetos', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .get('/clubs')
        .send(mockClubs)
        .then((res) => {
          expect(res.body).to.be.a('array') && expect(res.body[0]).to.be.a('object');
        }) as Response;
      });

      it('e um array de objetos onde tem "id e clubName"', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .get('/clubs')
        .send(mockClubs)
        .then((res) => {
          expect(res.body).to.be.a('array')
          expect(res.body[0]).to.be.a('object');
          expect(res.body[0]).to.have.property('id')
          expect(res.body[0]).to.have.property('clubName')
        }) as Response;
      });

      it('e um array de objetos onde "a chave id é um number e clubName uma string"', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .get('/clubs')
        .send(mockClubs)
        .then((res) => {
          expect(res.body).to.be.a('array')
          expect(res.body[0]).to.be.a('object');
          expect(res.body[0]).to.have.property('id')
          expect(res.body[0]).to.have.property('clubName')
          expect(res.body[0].id).to.be.a('number')
          expect(res.body[0].clubName).to.be.a('string')
        }) as Response;
      });
    })
  })
})

describe('testa o endpoint /clubs/:id', () => {
  describe('caso o endpoint /clubs/:id com o metodo getByIdClub', async () => {
    describe('retornar com sucesso', async () => {

      let chaiHttpResponse: Response;

      it('e uma resposta 200', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .get('/clubs/1')
        .send(mockClubs[0])
        .then((res) => {
          expect(res.status).to.be.equal(200);
        }) as Response;
      });

      it('e um objeto', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .get('/clubs/1')
        .send(mockClubs[0])
        .then((res) => {
         expect(res.body).to.be.a('object');
        }) as Response;
      });

      it('e um objeto onde tem "id e clubName"', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .get('/clubs/1')
        .send(mockClubs[0])
        .then((res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('id')
          expect(res.body).to.have.property('clubName')
        }) as Response;
      });

      it('e um objeto onde "a chave id é um number e clubName uma string"', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .get('/clubs/1')
        .send(mockClubs[0])
        .then((res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('id')
          expect(res.body).to.have.property('clubName')
          expect(res.body.id).to.be.a('number')
          expect(res.body.clubName).to.be.a('string')
        }) as Response;
      });
    })
  })
})

