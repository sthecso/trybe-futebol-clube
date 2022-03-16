import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /Login', () => {
  it('Deve retornar erro caso não seja fornecido email', () => {
    return chai
      .request(app)
      .post('/login')
      .send({ password: '123' })
      .then((res: Response) => {
        expect(res.status).to.be.equal(400);
      });
  });
  it('Deve retornar erro caso não seja fornecido senha', () => {
    return chai
      .request(app)
      .post('/login')
      .send({ email: 'test@test.com' })
      .then((res: Response) => {
        expect(res.status).to.be.equal(400);
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
});
