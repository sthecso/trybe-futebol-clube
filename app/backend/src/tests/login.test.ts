// import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Na rota "/login"', () => {
  describe('Quando a requisição é feita:', () => {
    it('com sucesso, deve retornar status 200 e o token gerado', async () => {
      let response = await chai.request(app)
        .post('/login')
        .send({
          email: 'qualquercoisa@qualquercoisa.com',
          password: "ola123456"
        });
      expect(response).to.have.status(200);
      expect(response.body).to.have.property('token');
    });
    it('com o email errado, deve retornar status 401', async () => {
      let response = await chai.request(app)
        .post('/login')
        .send({
          email: 'qualquercoisa@qualquercoisa.com',
          password: "ola123456"
        });
      expect(response).to.have.status(401);
      expect(response.body).to.have.property('message');
    });
  });
});
