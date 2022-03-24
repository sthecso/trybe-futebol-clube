import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('/login', () => {
  describe('Login com sucesso: ', () => {
    it('retorna um token', async () => {
      const user = {
        email: "admin@admin.com",
        password: "secret_admin"
      };

      await chai.request(app)
        .post('/login')
        .send(user)
        .then((res: Response) => {
          const { user, token } = res.body;

          expect(res).to.have.status(200);
          expect(token).to.be.a('string');
          expect(user).to.be.a('object');
          expect(token).not.to.be.undefined;
          expect(user.email).to.be.equal("admin@admin.com");
        });
    });
  });

  describe('Email: ', () => {
    it('quando está vazio', async () => {
      const user = {
        email: '',
        password: ''
      };

      await chai.request(app)
        .post('/login')
        .send(user)
        .then((res: Response) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('All fields must be filled');
        });
    });

    it('quando o email está incorreto', async () => {
      const user = {
        email: 'email',
        password: ''
      };

      await chai.request(app)
        .post('/login')
        .send(user)
        .then((res: Response) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Incorrect email or password');
        });
    });

    it('quando não existe o campo email', async () => {
      const user = {
        password: ''
      };

      await chai.request(app)
        .post('/login')
        .send(user)
        .then((res: Response) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('All fields must be filled');
        });
    });

    it('quando email é um número', async () => {
      const user = {
        email: 1,
        password: ''
        };

      await chai.request(app)
        .post('/login')
        .send(user)
        .then((res: Response) => {
          expect(res.status).to.equal(422);
          expect(res.body.message).to.equal('email must be a string');
        });
    });
  });

  describe('Password: ', () => {
    it('quando está vazio', async () => {
      const user = {
        email: 'admin@admin.com',
        password: ''
      };

      await chai.request(app)
        .post('/login')
        .send(user)
        .then((res: Response) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('All fields must be filled');
        });
    });

    it('quando password é incorreta', async () => {
      const user = {
        email: 'admin@admin.com',
        password: '123456'
      };

      await chai.request(app)
        .post('/login')
        .send(user)
        .then((res: Response) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Incorrect email or password');
        });
    });

    it('quando não existe o campo password', async () => {
      const user = {
        email: 'admin@admin.com',
      };

      await chai.request(app)
        .post('/login')
        .send(user)
        .then((res: Response) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('All fields must be filled');
        });
    });

    it('quando é menor que 6 caracteres', async () => {
      const user = {
        "email": "admin@admin.com",
        "password": "senha"
      };

      await chai.request(app)
        .post('/login')
        .send(user)
        .then((res: Response) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Incorrect email or password');
        });
    });
  });
});

describe('/login/validate', () => {
  it('validado com sucesso', async () => {
    const user = {
      email: "admin@admin.com",
      password: "secret_admin"
    };

    const { body: { token } } = await chai.request(app)
      .post('/login')
      .send(user);

    await chai.request(app)
      .get('/login/validate')
      .set('Authorization', token)
      .then((res: Response) => {
        expect(res).to.have.status(200);
      });
  });
});