import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import User from '../database/modelsSequelize/user';
import LoginUserModel from '../database/models/userLogin';
import { afterEach, beforeEach } from 'mocha';

chai.use(chaiHttp);

const { expect } = chai;

const login = {email: "s", password: "s"}

describe('Testa a class LoginUserModel', () => {

   let chaiHttpResponse: Response;

   beforeEach(async () => {
      sinon
       .stub(User, "findOne")
       .resolves("" as any);
   });

   /* afterEach(()=>{
     (User.findOne as sinon.SinonStub).restore();
   }) */

   it('testa o retorno da classe com um usuario que nao existe', async () => {
     const user = new LoginUserModel();

     expect(await user.findUser(login)).to.be.null;
   });

   /* it('testa se usuario consegue logar', async (done) => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW", email: 'admin@admin.com'})
         expect(chaiHttpResponse).to.have.status(201);
         (done)
       
       

    
  }); */
});
