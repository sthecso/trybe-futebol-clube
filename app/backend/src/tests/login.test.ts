import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';

import { Response } from 'superagent';

// references: https://blog.logrocket.com/unit-testing-node-js-applications-using-mocha-chai-and-sinon/

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing /login', () => {

  let chaiHttpResponse: Response;

  const stubUser = {
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
    } as Users;

    before(async () => {
      sinon.stub(Users, 'findOne').resolves(stubUser)
    })

    after(async () => {
      (Users.findOne as sinon.SinonStub).restore();
    })

  describe('1. If entering the correct login', async () => {
    
    it('You must login successfully', async () => {
      chaiHttpResponse = await chai.request(app)
          .post('/login')
          .send({
            email: 'admin@admin.com',
            password: 'secret_admin'
          }) 
        
      const { body, status } = chaiHttpResponse;
        
      expect(status).to.equal(200);
      expect(body.user.id).to.equal(stubUser.id);
      expect(body.user.username).to.equal(stubUser.username);
      expect(body.user.role).to.equal(stubUser.role);
      expect(body.user.email).to.equal(stubUser.email);
    })
  });

  describe('2. If entering the incorrect login', async () => {

    describe('You receive a error:', async () => {
      it("If don't type an email ", async () => {
        chaiHttpResponse = await chai.request(app)
            .post('/login')
            .send({
              password: 'secret_admin'
            }) 
          
        const { body, status } = chaiHttpResponse;
          
        expect(status).to.equal(401);
        expect(body.message).to.equal('All fields must be filled');
      })

      it("If don't type an password ", async () => {
        chaiHttpResponse = await chai.request(app)
            .post('/login')
            .send({
              email: 'admin@admin.com'
            }) 
          
        const { body, status } = chaiHttpResponse;
          
        expect(status).to.equal(401);
        expect(body.message).to.equal('All fields must be filled');
      })

      it("If you enter with an empty email", async () => {
        chaiHttpResponse = await chai.request(app)
            .post('/login')
            .send({
              email: '',
              password: 'secret_admin'
            }) 
          
        const { body, status } = chaiHttpResponse;
        expect(status).to.equal(401);
        expect(body.message).to.equal('All fields must be filled');
      })

      it("If you enter a wrong password", async () => {
        chaiHttpResponse = await chai.request(app)
            .post('/login')
            .send({
              email: 'admin@admin.com',
              password: 'fakepass'
            }) 
          
        const { body, status } = chaiHttpResponse;
        expect(status).to.equal(401);
        expect(body.message).to.equal('Incorrect email or password');
      })
    });
  });
  
});
