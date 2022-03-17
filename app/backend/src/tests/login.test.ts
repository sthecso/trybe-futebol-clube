import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import generateToken from '../Utils/GenerateToken';

chai.use(chaiHttp);

const { expect } = chai;

const validToken = generateToken({ email:'admin@admin.com' });

describe('Rota /Login', () => {
  it('Deve retornar erro caso não seja fornecido email', () => {
    return chai
      .request(app)
      .post('/login')
      .send({ password: '123' })
      .then((res: Response) => {
        expect(res.status).to.be.equal(401);
      });
  });
  it('Deve retornar erro caso não seja fornecido senha', () => {
    return chai
      .request(app)
      .post('/login')
      .send({ email: 'test@test.com' })
      .then((res: Response) => {
        expect(res.status).to.be.equal(401);
      });
  });
  it('Deve rentornar erro caso o usuario nao exista', () => {
    return chai
      .request(app)
      .post('/login')
      .send({ email: 'test@test.com', password: '1234567' })
      .then((res: Response) => {
        expect(res.status).to.be.equal(401);
      });
  });
  it('Deve retornar erro caso o usuario existe e a senha esteja incorreta', () => {
    return chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'senha_errada' })
      .then((res: Response) => {
        expect(res.status).to.be.equal(401);
      });
  });
  it('Deve retornar o token caso o usuario exista e a senhas esteja correta', () => {
    return chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' })
      .then((res: Response) => {
        expect(res.status).to.be.equal(200);
      });
  });
});

describe('Rota /login/validate', () => {
  it('Deve retornar erro caso não encontre o token nos headers', () => {
    return chai
      .request(app)
      .get('/login/validate')
      .then((res: Response) => {
        expect(res.status).to.be.equal(401);
      });
  })
  it('Deve retornar erro caso o token não seja valido', () => {
    return chai
      .request(app)
      .get('/login/validate')
      .set('authorization', 'token')
      .then((res: Response) => {
        expect(res.status).to.be.equal(401);
      });
  })
  it('Deve retornar a role caso o token seja valido', () => {
    return chai
      .request(app)
      .get('/login/validate')
      .set('authorization', validToken)
      .then((res: Response) => {
        expect(res.status).to.be.equal(200);
        expect(res.text).to.be.equal('admin');
      });
  })
})