import { LoginReturn } from './../utils/Interfaces';
import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Users from '../database/models/Users';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da /matchs', () => {
  describe('Quando o request é feito corretamente, na rota get', () => {
    let chaiHttpResponse: Response;
  
    it('Retorna status 200', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/matchs')
  
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });
});

