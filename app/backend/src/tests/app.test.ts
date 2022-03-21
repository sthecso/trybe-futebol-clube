import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Response } from 'superagent';

import { app } from '../app';
chai.use(chaiHttp);
const { expect } = chai;

describe('Testing Login Route', () => {
  let chaiHttpResponse: Response;

  describe('Login by email and password', () => {
    it('If login is wrong', async () => {
      const payload = {
        email: 'johndoe@mail.com',
        password: 'johndoe123',
      };
      const jsonResponse = {
        message: 'Incorrect email or password',
      };

      chaiHttpResponse = await chai.request(app).post('/login').send(payload);

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.text).to.be.equal(JSON.stringify(jsonResponse));
    });

    it('If password is wrong', async () => {
      const payload = {
        email: 'admin@admin.com',
        password: 'test123',
      };
      const jsonResponse = {
        message: 'Incorrect email or password',
      };

      chaiHttpResponse = await chai.request(app).post('/login').send(payload);

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.text).to.be.equal(JSON.stringify(jsonResponse));
    });

    it('If the user is correct', async () => {
      const payload = {
        email: 'admin@admin.com',
        password: 'secret_admin',
      };
      const jsonResponse = {
        message: 'Incorrect email or password',
      };

      chaiHttpResponse = await chai.request(app).post('/login').send(payload);

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(JSON.parse(chaiHttpResponse.text)).to.have.all.keys(
        'user',
        'token',
      );
    });
  });
});
