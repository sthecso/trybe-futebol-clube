import * as sinon from 'sinon';
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
    const loginUser = {
      email: 'user@user.com',
      password:'secret_user',
    };
  
    const userResponse = {
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
    };

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(loginUser);

    const { user, token } = chaiHttpResponse.body;

    expect(chaiHttpResponse).to.have.status(StatusCodes.OK);
    expect(user).to.be.eql(userResponse);
    expect(token).to.be.a('string');
  });

  it('login has the "email" invalid', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({ email: 'email', password: '123456' })

    const { message } = chaiHttpResponse.body;

    expect(chaiHttpResponse).to.have.status(StatusCodes.UNPROCESSABLE_ENTITY)
    expect(message).to.be.eql("Invalid email")
  })

  it('login has the "email" empty', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({ password: '123456' })

    const { message } = chaiHttpResponse.body;

    expect(chaiHttpResponse).to.have.status(StatusCodes.BAD_REQUEST)
    expect(message).to.be.eql('Email is required')
  })

  it('login has the "email" id not string', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({ email: 123456, password: '123456' })

    const { message } = chaiHttpResponse.body;

    expect(chaiHttpResponse).to.have.status(StatusCodes.UNPROCESSABLE_ENTITY)
    expect(message).to.be.eql('Expected string, received number')
  })

  it('login has the "Password" empty', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({ email: 'admin@admin.com' })

    const { message } = chaiHttpResponse.body;

    expect(chaiHttpResponse).to.have.status(StatusCodes.BAD_REQUEST)
    expect(message).to.be.eql('Password is required')
  })

  it('login has the "password" is not string', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({ email: 123456, password: '123456' })

    const { message } = chaiHttpResponse.body;

    expect(chaiHttpResponse).to.have.status(StatusCodes.UNPROCESSABLE_ENTITY)
    expect(message).to.be.eql('Expected string, received number')
  })

});
