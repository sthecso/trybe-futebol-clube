import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import User from '../database/modelsSequelize/user';
import LoginUserModel from '../database/models/userLogin';
import LoginUserService from '../database/services/userLogin';
import { after, before, afterEach, beforeEach } from 'mocha';
import bcrypt = require('bcryptjs');
import LoginUserController from '../database/controllers/user';
import { Request } from 'express';

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
/*===========================Service==========================*/
describe('Testa os Erros da classe LoginUserService', async () => {

    const userService = new LoginUserService();

    it('testa o retorno com usuario invalido', async () => {
    

        expect(await userService.findUser(login)).to.be.null;
    
      });

    
})
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