import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Na rota "/matchs"', () => {
  describe('Quando a requisição é feita...', () => {
    it('na rota "/matchs": deve retornar status 200 e um array de objetos', async () => {
      let response = await chai.request(app)
        .get('/matchs');
      expect(response).to.have.status(200);
      expect(response.body).to.be.an('array').with.length(48);
    });
    // it('na rota" /clubs/:id": deve retornar status 200 e um objeto', async () => {
    //   let response = await chai.request(app)
    //     .get('/clubs/1');
    //     expect(response).to.have.status(200);
    //     expect(response.body).to.have.property('clubName');
    //     expect(response.body.clubName).to.be.equal('Avaí/Kindermann');
    // })
  });
});
