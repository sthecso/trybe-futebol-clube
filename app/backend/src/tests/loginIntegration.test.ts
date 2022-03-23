import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /login ', () => {

  let chaiHttpResponse: Response;

  it('Testa a rota /login post existe', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: "admin@admin.com",
      password: "secret_admin"
    })

    expect(chaiHttpResponse).have.status(200)
  });


  it('Testa se passando o email invalido é retorna um status 401.', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: "euaoea@gmeuaoe.com",
      password: "secret_admin"
    })

    expect(chaiHttpResponse).have.status(401)
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Incorrect email or password' })
  });

  it('Testa se passando o password invalido é retorna um status 401', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: "admin@admin.com",
      password: "secret"
    })

    expect(chaiHttpResponse).have.status(401)
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Incorrect email or password' })
  });


  it('Testa ne o campo email está vazio é retorna um status 401', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      password: "secret_admn"
    })

    expect(chaiHttpResponse).have.status(401)
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' })
  });


  it('Testa ne o campo password está vazio é retorna um status 401', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: "admin@admin.com"
    })

    expect(chaiHttpResponse).have.status(401)
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' })
  });

});

describe('Testa a rota /login/validate ', () => {

  let ResponsePostLogin: Response;
  let ResponseGetValidate: Response;
  let token: string

  it('Testa a rota /login/validate com token', async () => {
    ResponsePostLogin = await chai.request(app).post('/login').send({
      email: "admin@admin.com",
      password: "secret_admin"
    })

    token = ResponsePostLogin.body.token

    ResponseGetValidate = await chai.request(app)
    .get('/login/validate')
    .set("Authorization", token)

    expect(ResponseGetValidate).have.status(200)
    expect(ResponseGetValidate.text).to.equal('admin')
  });
  
  it('Testa a rota /login/validate token invalido', async () => {
    ResponseGetValidate = await chai.request(app)
  .get('/login/validate').set("Authorization", 'token')
    
    expect(ResponseGetValidate).have.status(401)
    expect(ResponseGetValidate.body).to.deep.equal({"message":"token inválido"})
  });
});
