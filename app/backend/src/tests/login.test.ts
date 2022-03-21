import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login', () => {
  describe('POST /login', () => {
    let chaiHttpResponse: Response;
  
    it('tests if /login is POST with status 200 when we provide correct information', async () => {
      const login = {
        email: 'admin@admin.com',
        password: 'secret_admin'
      }
      
      chaiHttpResponse = await chai
         .request(app)
         .post('/login')
         .send(login)

        const { user, token } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(token).not.to.be.undefined;
      expect(user.email).to.be.equal('admin@admin.com');
    });
    it('tests when "email" is invalid - status 401', async () => {
      const login = {
        email: 'iamnotadmin@admin.com',
        password: 'secret_admin'
      }
      
      chaiHttpResponse = await chai
         .request(app)
         .post('/login')
         .send(login)

        const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(message).to.be.equal('Incorrect email or password');
      
    });
    it('tests when "password" is invalid - status 401', async () => {
      const login = {
        email: 'admin@admin.com',
        password: 'wrongpassword'
      }
      
      chaiHttpResponse = await chai
         .request(app)
         .post('/login')
         .send(login)

        const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(message).to.be.equal('Incorrect email or password');
      
    });
    it('tests when "email" is not provided - status 401', async () => {
      const login = {
        email: '',
        password: 'secret_admin'
      }
      
      chaiHttpResponse = await chai
         .request(app)
         .post('/login')
         .send(login)

        const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(message).to.be.equal('All fields must be filled');
      
    });
    it('tests when "password" is not provided - status 401', async () => {
      const login = {
        email: '',
        password: 'secret_admin'
      }
      
      chaiHttpResponse = await chai
         .request(app)
         .post('/login')
         .send(login)

        const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(message).to.be.equal('All fields must be filled');
      
    });
  });
});
