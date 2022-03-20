import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const EMAIL_NOT_MATCHED = 'Insert a validate email';
const PASSWORD_LESS_THAN_6 = 'Your password must be great than than 6'
describe('Testing /login', () => {
  let chaiHttpResponse: Response;
  
  describe('Test if\'s not possible to enter with a not validate email', async () => {
      /**
     * Exemplo do uso de stubs com tipos
     */


           
      //  after(()=>{
      //    (Users.findOne as sinon.SinonStub).restore();
      //  })

      // before(async () => {
      //   chaiHttpResponse = await chai.request(app).post('/login').send({
      //     email: 'cachorro',
      //     password: 'senhaDificil'
      //   } as Users)
      // }) 

    // it('...', async () => {
    //   chaiHttpResponse = await chai
    //      .request(app)
    //      ...

    //   expect(...)
    // });
    chaiHttpResponse = await chai.request(app).post('/login').send({
          email: 'cachorro',
          password: 'senhaDificil'
        } as Users)

    it('Test if it\'s not possible to enter with a not validate email', () => {
      expect(chaiHttpResponse).to.be.equal(EMAIL_NOT_MATCHED);
    });
    it('Test if status is 400', () => {
      expect(chaiHttpResponse).to.be.status(400);
    });
  })
  describe('Test when password is not validate', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'cachorro',
      password: '12345'
    })

    it('Receive a message when password has length less than 6', () => {
      expect(chaiHttpResponse).to.be.equal(PASSWORD_LESS_THAN_6);
    })
  })
});
