import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

// import { Response } from 'superagent';
import { app } from '../app';
// import Example from '../database/models/ExampleModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('/POST Login', () => {
  it('o status é 200', async function () {

    let login = {
      email: "user@user.com",
      password: "secret_user"
    }
    const result = await chai.request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send(login)
    expect(result.status).to.be.equals(200);
  });

  it('a resposta deve conter um jwt token ', async () => {
    let login = {
      email: "user@user.com",
      password: "secret_user"
    }
    const result = await chai.request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send(login)
    expect(result.status).to.be.equals(200);
    expect(result.body).to.haveOwnProperty('token');
    expect(result.body.token).not.null;
  });

  it('deve retornar 400 quando faltar email', async function () {
    let login = {
      password: "secret_user"
    }
    const result = await chai.request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send(login)
    expect(result.status).to.be.equals(400);
    expect(result.body).to.haveOwnProperty('message');
    expect(result.body.message).not.null;
  });

  it('deve retornar 400 quando faltar password', async function () {
    let login = {
      email: "user@user.com"
    }
    const result = await chai.request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send(login)
    expect(result.status).to.be.equals(400);
    expect(result.body).to.haveOwnProperty('message');
    expect(result.body.message).not.null;
  });
});
