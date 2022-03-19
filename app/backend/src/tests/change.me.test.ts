import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';

import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';
import LoginController from '../controllers';

import { Response } from 'superagent';
import User from '../database/models/User';
chai.use(chaiHttp);

const { expect } = chai;

// describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

//   it('Seu sub-teste', () => {
//     expect(false).to.be.eq(true);
//   });
// });

describe('Testa auth/validateJWT.ts,', () => {
  let chaiHttpResponse: Response;
  before(async () => {
    sinon
      .stub(jwt, "verify")
      .resolves(() => {
        throw new Error('Token not found')
      })
  });

  after(()=>{
    (jwt.verify as sinon.SinonStub).restore();
  });

  it('E verificado se o token não existir a reposta de status e 401', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/login')
       .set('authorization', 'algumTokenJwtAleatório')
       .send({})
       .then((res) => {
         expect(res.status).to.be.equal(401);
       }).catch((err) => {
         throw err
       }) as unknown as Response;
  });
})


describe('Testa endpoint /login', () => {
  let chaiHttpResponse: Response;
  const expectedResult = {
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
  }

  // const notExpectedResultEmail = {
  //   email: 'admin@admin',
  //   password: '123456'
  // }

  // const notExpectedResultPassword = {
  //   email: 'admin@admin',
  //   password: '123456'
  // }

  before(async () => {
   sinon
     .stub(User, "findOne")
     .resolves(expectedResult as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })
  // Testar mais tarde
  // it('É retornado status 401 se o email estiver incorreto', async () => {
  //   chaiHttpResponse = await chai
  //   .request(app)
  //   .post('/login')
  //   .send(notExpectedResultEmail)
  //   .then((res) => {
  //     expect(res.status).to.be.equal(401);
  //   }).catch((err) => {
  //     throw err
  //   }) as unknown as Response;
  // })

  // it('É retornado status 401 se o password estiver incorreto', async () => {
  //   chaiHttpResponse = await chai
  //   .request(app)
  //   .post('/login')
  //   .send(notExpectedResultEmail)
  //   .then((res) => {
  //     expect(res.status).to.be.equal(401);
  //   }).catch((err) => {
  //     throw err
  //   }) as unknown as Response;
  // })

  it('É retornado status 200 se o login do usuario e feito com sucesso', async () => {
   chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(expectedResult)
      .then((res) => {
        expect(res.status).to.be.equal(200);
      }).catch((err) => {
        throw err
      }) as unknown as Response;
  });
})

