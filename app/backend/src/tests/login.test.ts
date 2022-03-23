import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const makeSut = async (login: object): Promise<Response> => {
  const httpResponse: Response = await chai
  .request(app)
  .post('/login')
  .send(login);
  return  httpResponse
}

describe('Login Endpoint', () => {
  const validAdmLogin = { email: 'admin@admin.com', password: 'secret_admin' };

  const missinEmailAdmLogin = { password: 'secret_admin' };
  const missinPassAdmLogin = { email: 'admin@admin.com' };

  const invalidEmailAdmLogin = { email: 'invalid_email', password: 'secret_admin' };
  const invalidPassAdmLogin = { email: 'admin@admin.com', password: 'invalid_password' };

  it('should return status 200 on success', async () => {
    const httpResponse = await makeSut(validAdmLogin)
    const { status } = httpResponse;
    expect(status).to.be.eq(200);
  });

  it('should return a valid accessToken on success', async () => {
    const httpResponse= await makeSut(validAdmLogin)
    const { body } = httpResponse
    expect(body).to.contains.keys('token')
    expect(body.token).to.be.not.empty
  });

  it('should return an user account on success', async () => {
    const httpResponse = await makeSut(validAdmLogin)
    const { body } = httpResponse
    expect(body).to.contains.keys('user')
    expect(body.user).to.contains.keys(['id', 'username', 'role', 'email'])
    expect(body.user.id).to.be.eq(1)
    expect(body.user.username).to.be.eq('Admin')
    expect(body.user.role).to.be.eq('admin')
    expect(body.user.email).to.be.eq('admin@admin.com')
  });

  it('should return the correct message if email is missing', async () => {
    const httpResponse = await makeSut(missinEmailAdmLogin)
    const { body } = httpResponse
    expect(body).to.contains.keys('message')
    expect(body.message).to.be.eq('All fields must be filled')
  });

  it('should return the correct message if password is missing', async () => {
    const httpResponse = await makeSut(missinPassAdmLogin)
    const { body } = httpResponse
    expect(body).to.contains.keys('message')
    expect(body.message).to.be.eq('All fields must be filled')
  });

  it('should return the correct message on invalid email submit', async () => {
    const httpResponse = await makeSut(invalidEmailAdmLogin)
    const { body } = httpResponse
    expect(body).to.contains.keys('message')
    expect(body.message).to.be.eq('Incorrect email or password')
  });

  it('should return the correct message on invalid password submit', async () => {
    const httpResponse = await makeSut(invalidPassAdmLogin)
    const { body } = httpResponse
    expect(body).to.contains.keys('message')
    expect(body.message).to.be.eq('Incorrect email or password')
  });

});
