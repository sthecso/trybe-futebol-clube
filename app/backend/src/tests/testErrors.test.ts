import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import User from '../database/modelsSequelize/user';
import LoginUserModel from '../models/userLogin';
import { after, before, afterEach, beforeEach } from 'mocha';
import bcrypt = require('bcryptjs');
import LoginUserController from '../controllers/user';
import { Request } from 'express';
import MatchModel from '../models/match';
import Match from '../database/modelsSequelize/match';

chai.use(chaiHttp);

const { expect } = chai;

const login = {email: "s", password: "s"}


/*===========================Models==========================*/
describe('Testa os Erros da classe LoginUserModel', async () => {
  
  const userModel = new LoginUserModel();

      
    it('testa o retorno da classe com um usuario que nao existe', async () => {
    

    expect(await userModel.findUser(login)).to.be.null;

  });


}); 
/*===========================Controller==========================*/

describe('Testa os erros da classe LoginUserController', () => {
    
    it('testa o retorno com um request invalido', async () => {
        const chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send({
            email: 'samuel@samuel.com',
            password: '6789456454'
        });


        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse).to.be.an('Object');
    
      });
})

describe('Testa a classe ClubController', () => {
    
    it('testa o resultado quando usuario busca por um time que nao existe', async () => {
      const chaiHttpResponse = await chai
      .request(app)
      .get('/clubs/0').set('content-type', 'application/json');
      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(await chaiHttpResponse.body).to.be.eqls({ message: 'club nao encontrado' });
  
    });
})