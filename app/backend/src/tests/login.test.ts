import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import configJwt from '../utils'
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Token from '../auth/createTokenJWT';

chai.use(chaiHttp);

const { expect } = chai;

enum TestDescription {
  unauthorizedError = 401,
  success = 200,
  incorrectCredentials = 'Incorrect email or password',
  emptyFields = 'All fields must be filled',
}

// const token =  {
//   access: 'auth',
//   token: jwt.sign({}, secret, { subject: dataEmail, expiresIn: '7d', algorithm: 'HS256' })
// }

describe('Testa endpoint /login', () => {
  describe('caso o /login com o metodo getLogin', async () => {

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
    it('retorna a resposta 200', async () => {
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

    it('retorna um objeto não vazio', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(loginCorrect)
        .then((res) => {
          expect(res.body).not.to.be.empty;
          expect(res.body).to.be.an('object');
      }) as Response;
    });

    it('retorna um objeto', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(loginCorrect)
        .then((res) => {
          expect(res.body).to.be.an('object');
      }) as Response;
    });

    it('retorna um objeto usuario onde tem "id, username, role e email"', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(loginCorrect)
        .then((res) => {
          expect(res.body.user).to.have.property('id') && expect(res.body.user).to.have.property('username') && expect(res.body.user).to.have.property('role') && expect(res.body.user).to.have.property('email');
      }) as Response;
    });

      it('verifica fora do objeto se existe "user e token"', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send(loginCorrect)
          .then((res) => {
            expect(res.body).to.have.property('user') && expect(res.body).to.have.property('token');
        }) as Response;
      });

        it('verifica fora do objeto se o user e um objeto', async () => {
          chaiHttpResponse = await chai
            .request(app)
            .post('/login')
            .send(loginCorrect)
            .then((res) => {
              expect(res.body.user).to.be.a('object');
          }) as Response;
        });

        it('verifica fora do objeto se o token e uma string', async () => {
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

// describe('testa o endpoint /login/validate', () => {
//   describe('caso o metodo getUser retornar com sucesso', async () => {
//     let chaiHttpResponse: Response;

//     const role = {
//       email: 'admin@admin.com',
//       role: 'admin',
//     };

//     it('retorna resposta 200', async () => {
//       chaiHttpResponse = await chai.request(app)
//         .get('/login/validate')
//         .set('auth', Token.createToken(role.email))
//         .send(role.role)
//         .then((res) => {
//           console.log(res)
//           expect(res.status).to.be.equal(TestDescription.success);
//       }) as Response;
//     });
//   })
// })