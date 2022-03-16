import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';


import { Response } from 'superagent';
import User from '../database/models/user';
import { ErrorRequestHandler } from 'express';

chai.use(chaiHttp);

const { expect } = chai;

interface DBUser {
  username: string,
  role: string,
  email: string,
  password: string,
}

const dataMock = {
  username: 'samuel',
  role: "atacante",
  email: "samuel@hotmail.com",
  password: '1234567'
}

describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

   let chaiHttpResponse: Response;

   before(async () => {
     await sinon
       .stub(User, "findOne")
       .resolves({
         dataMock
       } as any);
   });

   after(()=>{
     (User.findOne as sinon.SinonStub).restore();
   })

   it('testa se usuario consegue logar', async (done) => {
     chaiHttpResponse = await chai
        .request(app).post('/login').send({password: "12345678", email: "samuel@hotmail.com"})
        .end((err: ErrorRequestHandler, res: Response) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          (done)
        })
        

     
   });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
