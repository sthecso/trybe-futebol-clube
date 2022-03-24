// import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import { StatusCodes } from 'http-status-codes';

chai.use(chaiHttp);

const { expect } = chai;

describe('testing "/login" route', () => {
  let chaiHttpResponse: Response;

  it('if login was successful', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com' , password: 'secret_admin' });

    const { token } = chaiHttpResponse.body;
      
    expect(chaiHttpResponse).to.have.status(StatusCodes.OK);
    expect(token).to.be.a('string');
  });

  it('login has the "password" wrong', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({ email: "admin@admin.com", password: '123456' });

    const { message } = chaiHttpResponse.body;

    expect(chaiHttpResponse).to.have.status(StatusCodes.UNAUTHORIZED);
    expect(message).to.be.equal("Incorrect email or password");
  })

  it('login has the "email" wrong', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({ email: 'admin@a.com', password: 'secret_admin' })

    const { message } = chaiHttpResponse.body;

    expect(chaiHttpResponse).to.have.status(StatusCodes.UNAUTHORIZED)
    expect(message).to.be.equal('Incorrect email or password')
  })

  it('login has the "password" empty', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({ email: 'admin@admin.com', password: "" })

    const { message } = chaiHttpResponse.body;

    expect(chaiHttpResponse).to.have.status(StatusCodes.UNAUTHORIZED)
    expect(message).to.be.eql("All fields must be filled")
  })

  it('login has the "email" empty', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({ email: "", password: 'secret_admin' })

    const { message } = chaiHttpResponse.body;

    expect(chaiHttpResponse).to.have.status(StatusCodes.UNAUTHORIZED)
    expect(message).to.be.eql('All fields must be filled')
  })
});
