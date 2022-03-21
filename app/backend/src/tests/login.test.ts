import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { validateToken } from '../jwt';
import { app } from '../app';

chai.use(chaiHttp)

const { expect } = chai;

describe('/POST Login', () => {
    const userEmail = 'user@user.com';
    const userPassword = 'secret_user';
    
      it('Status é 200', async function () {
        const login = {
          email: userEmail,
          password: userPassword,
        };
        const result = await chai.request(app)
          .post('/login')
          .set('content-type', 'application/json')
          .send(login);
        expect(result.status).to.be.equals(200);
      });

  it('A resposta deve conter um token', async () => {
    const login = {
        email: userEmail,
        password: userPassword,
    };
    const result = await chai.request(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send(login);
        expect(result.status).to.be.equals(200);
        expect(result.body).to.haveOwnProperty('token');
  });
  it ('Retorna Status 401 quando não constar e-mail', async () => {
    const login = {
      password: userPassword,
    };
    const result = await chai.request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send(login);
      
      expect(result.status).to.be.equal(401);
      expect(result.body).to.have.a.property('message');
  });
  it ('Retorna Status 401 quando não consta senha', async () => {
      const login = {
        email: userEmail,
      };
      const result = await chai.request(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send(login);
        expect(result.status).to.be.equal(401);
        expect(result.body).to.have.a.property('message');
  });
  it ('Retorna Status 401 quando o e-mail for inválido', async () => {
      const login = {
        email: 'invalidemail@email.com',
        password: userPassword,
      };
      const result = await chai.request(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send(login);
        expect(result.status).to.be.equal(401);
        expect(result.body).to.have.a.property('message');
        expect(result.body.message).to.equal('Incorrect email or password');
  });
  it ('Retorna Status 401 quando a senha for inválida', async () => {
    const login = {
      email: userEmail,
      password: '123',
    };
    const result = await chai.request(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send(login);
        expect(result.status).to.be.equal(401);
        expect(result.body).to.have.a.property('message');
        expect(result.body.message).to.be.equal('Incorrect email or password')
  });
//   it ('Deve retornar um token quando todas as informações estiverem corretas', async () => {
//     const login = {
//       email: userEmail,
//       password: userPassword,
//     };
//     const result = await chai.request(app)
//       .post('/login')
//       .set('content-type', 'application/json')
//       .send(login);
//       expect(result.body).to.haveOwnProperty('user');
//       expect(result.status).to.haveOwnProperty('token');
//   });
//   it ('Deve retornar um token válido', async () => {
//     const login = {
//       email: userEmail,
//       password: userPassword,
//     };
//     const result = await chai.request(app)
//       .post('/login')
//       .set('content-type', 'application/json')
//       .send(login);
//       expect(result.status).to.haveOwnProperty('token');
//     const id = validateToken(result.body.token);
//     expect(id).not.to.be.equal(false);
//   });
//   describe('/GET Login/Validate', () => {
//     it('Deve constar user role', async () => {
//       const login = {
//           email: userEmail,
//           password: userPassword,
//         };
//         const role = 'user';
//         const result = await chai.request(app)
//           .post('/login')
//           .set('content-type', 'application/json')
//           .send(login);
//           expect(result.body).to.haveOwnProperty('token');

//           const { token } = result.body;
//           const validate = await chai.request(app)
//             .get('/login/validate')
//             .set('Authorization', token);
//             expect(validate.body).to.be.equal(role);
//     });
//   });
it('Deve retornar um token quando todas as informações estiverem corretas', async () => {
    const login = {
      email: userEmail,
      password: userPassword,
    };
    const result = await chai.request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send(login);
    expect(result.body).to.haveOwnProperty('user');
    expect(result.body).to.haveOwnProperty('token');
  });

  it('o retorno deve vir com um token valido', async function () {
    const login = {
      email: userEmail,
      password: userPassword,
    };
    const result = await chai.request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send(login);
    expect(result.body).to.haveOwnProperty('token');
    const id = validateToken(result.body.token);
    expect(id).not.to.be.equal(false);
  });
});