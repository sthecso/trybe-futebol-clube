import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { verifyToken } from '../utils/tokenHelper';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests POST /login route', () => {
  describe('When no body is passed', () => {
    it('Return status 401 with error message', async () => {
      return chai
        .request(app)
        .post('/login')
        .send({})
        .then((res: Response) => {
          expect(res.status).to.be.equal(401);
          expect(res.body.message).to.equal('All fields must be filled');
        });
    })
  })
  describe('When no email is passed', () => {
    it('Return status 401 with error message', async () => {
      return chai
        .request(app)
        .post('/login')
        .send({ password: '123' })
        .then((res: Response) => {
          expect(res.status).to.be.equal(401);
          expect(res.body.message).to.equal('All fields must be filled');
        });
    })
  })
  describe('When no password is passed', () => {
    it('Return status 401 with error message', async () => {
      return chai
        .request(app)
        .post('/login')
        .send({ email: 'user@email.com' })
        .then((res: Response) => {
          expect(res.status).to.be.equal(401);
          expect(res.body.message).to.equal('All fields must be filled');
        });
    })
  });
  describe('When no user is found', async () => {
    let chaiHttpResponse: Response;
    it('Return status 401 with error message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: 'wrong_password' })


      const { message } = chaiHttpResponse.body;

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(message).to.equal('Incorrect email or password');
    });
  });
  describe('When valid parameters are passed and user is found', async () => {
    let chaiHttpResponse: Response;
    it('Return status 200 with user and token', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: 'secret_admin' })


      const { user, token } = chaiHttpResponse.body;
      const tokenRole = verifyToken(token).role;

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(user.username).to.be.equal('Admin');
      expect(user.role).to.be.equal('admin');
      expect(user.id).to.be.equal(1);
      expect(user.email).to.be.equal('admin@admin.com');
      expect(tokenRole).to.be.equal(user.role);
    });
  });
});

describe('Tests GET /login/validate route', () => {
  describe('When authorization header is passed', () => {
    it('Return status 200 with user role', async () => {
      let chaiHttpResponse: Response;
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: 'secret_admin' })

      const { user: { role }, token } = chaiHttpResponse.body;

      return chai
        .request(app)
        .get('/login/validate')
        .set('authorization', token)
        .then((res: Response) => {
          expect(res.status).to.be.equal(200);
          expect(res.text).to.be.equal(role);
        });
    });
  });
  describe('When no authorization header is passed', () => {
    it('Return status 401 with error message', async () => {
      return chai
        .request(app)
        .get('/login/validate')
        .then((res: Response) => {
          expect(res.status).to.be.equal(401);
          expect(res.text).to.be.equal('Unauthorized');
        });
    });
  })
});
