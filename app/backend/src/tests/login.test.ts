import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';

import { Response } from 'superagent';
import myJwt from '../utils/jwt';

// references: https://blog.logrocket.com/unit-testing-node-js-applications-using-mocha-chai-and-sinon/

chai.use(chaiHttp);

const { expect } = chai;

const stubUser = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  } as Users;

describe('Testing /login', () => {

  let chaiHttpResponse: Response;


    beforeEach(async () => {
      sinon.stub(Users, 'findOne').resolves(stubUser)
    })

    afterEach(async () => {
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

describe('Testing /login/validate', async () => {
  let chaiHttpResponse: Response;

    describe('1. When passing a valid token', async () => {

      it('Receives status 200 and user role', async () => {
        const getToken = await myJwt.generateToken(stubUser)
        
        chaiHttpResponse = await chai
          .request(app)
          .get("/login/validate")
          .set('authorization', getToken )

        const { body, status } = chaiHttpResponse;
        
            expect(status).to.equal(200);
            expect(body).to.be.equal("admin");
    })
  })

  describe('2. When passing a invalid token', async () => {

    beforeEach(async () => {
      sinon.stub(Users, 'findOne').resolves(stubUser)
    })

    afterEach(async () => {
      (Users.findOne as sinon.SinonStub).restore();
    })


    it('Receives status 500 and error message', async () => {

      chaiHttpResponse = await chai
        .request(app)
        .get("/login/validate")
        .set('authorization', 'invalidToken' )

      const { body, status } = chaiHttpResponse;
      
          expect(status).to.equal(500);
          expect(body.message).to.be.equal('Internal server error');
    })
  })

  describe("3. When a token isn't passed", async () => {

    it('Receives status 401 and error message', async () => {
      
      chaiHttpResponse = await chai
        .request(app)
        .get("/login/validate")
        .set('authorization', '' )

      const { body, status } = chaiHttpResponse;
      
          expect(status).to.equal(401);
          expect(body.error).to.be.equal("Token not found");
    })
  })

})
