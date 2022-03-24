import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import Token from '../auth/createTokenJWT';
import * as sinon from 'sinon';
import * as jwt from 'jsonwebtoken';

chai.use(chaiHttp);

const { expect } = chai;

enum TestDescription {
  unauthorizedError = 401,
  success = 200,
  incorrectCredentials = 'Incorrect email or password',
  emptyFields = 'All fields must be filled',
}

describe('Testa endpoint /login', () => {
  describe('caso o endpoint /login com o metodo getLogin', async () => {

    let chaiHttpResponse: Response;

    const loginCorrect = {
      email: "admin@admin.com",
      password: "secret_admin"
    }

    const loginIncorrect = {
      email: "erro@admin.com",
      password: "err_admin"
    }

    const loginPasswordEmpty = {
      email: "admin@admin.com"
    }

    const loginEmailEmpty = {
      password: "secret_admin"
    }

    it('estiver com credenciais erradas, retorna uma messagem de "Incorrect email or password" e status 401', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(loginIncorrect)
      .then((res) => {
        expect(res.status).to.be.equal(TestDescription.unauthorizedError);
        expect(res.body.message).to.be.equal(TestDescription.incorrectCredentials);
      }) as Response;
    });

    it('estiver com "email" vazio, retorna uma messagem de "All fields must be filled" e status 401', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(loginPasswordEmpty)
      .then((res) => {
        expect(res.status).to.be.equal(TestDescription.unauthorizedError);
        expect(res.body.message).to.be.equal(TestDescription.emptyFields);
      }) as Response;
    });

    it('estiver com "password" vazio, retorna uma messagem de "All fields must be filled" e status 401', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(loginEmailEmpty)
      .then((res) => {
        expect(res.status).to.be.equal(TestDescription.unauthorizedError);
        expect(res.body.message).to.be.equal(TestDescription.emptyFields);
      }) as Response;
    });

  describe('caso o metodo getLogin retornar com sucesso', async () => {
    it('a resposta e 200', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        // .type('form') // quando e o metodo post de criação, deve ter o tipo form. como e a filtragem de login não e necessário
        // .set('content-type', 'application/json') Para fins de estudos deixar aqui
        .send(loginCorrect)
        .then((res) => {
          expect(res.status).to.be.equal(TestDescription.success);
          expect(res.body).not.to.be.empty;
          expect(res.body).to.be.an('object');
      }) as Response;
    });

    it('e um objeto não vazio', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(loginCorrect)
        .then((res) => {
          expect(res.body).not.to.be.empty;
          expect(res.body).to.be.an('object');
      }) as Response;
    });

    it('e um objeto', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(loginCorrect)
        .then((res) => {
          expect(res.body).to.be.an('object');
      }) as Response;
    });

    it('e um objeto user onde tem "id, username, role e email"', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(loginCorrect)
        .then((res) => {
          expect(res.body.user).to.have.property('id') && expect(res.body.user).to.have.property('username') && expect(res.body.user).to.have.property('role') && expect(res.body.user).to.have.property('email');
      }) as Response;
    });

    it('e um objeto user onde "id e um numero, username, role e email são strings"', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(loginCorrect)
        .then((res) => {
          expect(res.body.user.id).to.have.a('number') && expect(res.body.user.username).to.have.a('string') && expect(res.body.user.role).to.have.a('string') && expect(res.body.user.email).to.have.a('string');
      }) as Response;
    });

      it('existe as propriedade "user e token"', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send(loginCorrect)
          .then((res) => {
            expect(res.body).to.have.property('user') && expect(res.body).to.have.property('token');
        }) as Response;
      });

        it('o user e um objeto', async () => {
          chaiHttpResponse = await chai
            .request(app)
            .post('/login')
            .send(loginCorrect)
            .then((res) => {
              expect(res.body.user).to.be.a('object');
          }) as Response;
        });

        it('o token e uma string', async () => {
          chaiHttpResponse = await chai
            .request(app)
            .post('/login')
            .send(loginCorrect)
            .then((res) => {
              expect(res.body.token).to.be.a('string');
          }) as Response;
        });
    });
  })
})

describe('testa o endpoint /login/validate', () => {
  describe('caso o metodo getUser retornar com sucesso', async () => {
    let chaiHttpResponse: Response;

    const loginCorrect = {
      email: "admin@admin.com",
      password: "secret_admin"
    }

    it('retorna resposta 200 e a role "admin"', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(loginCorrect)
      const token = chaiHttpResponse.body.token;
      const role = chaiHttpResponse.body.user.role;

      chaiHttpResponse = await chai.request(app)
        .get('/login/validate')
        .set('authorization', token)
        .then((res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.be.equal(role);
      }) as Response;
    });
  })
})