import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Users from '../database/models/Users';

chai.use(chaiHttp);

const { expect } = chai;

describe('Quando o login é bem sucedido', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves({} as Users);
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('Retorna status 200', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ email: 'email@test.com', password: 'senha' });

    expect(chaiHttpResponse.status).to.be.equal(200);
  });
});

describe('Quando o login é mal sucedido', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(undefined);
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('Retorna status 401', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ email: 'email@test.com', password: 'senha' });

    expect(chaiHttpResponse.status).to.be.equal(401);
  });
});

