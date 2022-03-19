import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import ModelUser from '../database/fé/user'
// import superagent from 'superagent';
const PORT = process.env.PORT || 3001;
import { app } from '../app';
const User = {
  id:1,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
}

const url = `http://localhost:${PORT}`
chai.use(chaiHttp);
// let chaiHttpResponse = Response
const { expect } = chai
// const rota = new App().start(3001)

describe("testa o funcionamento da rota Login" ,() =>{
    describe("testa os tipos de dados recebidos no login" ,() =>{
      it("email espera o erro 400" ,async()=>{
        const result =  await chai.request(url)
          .post('/login').send({
           email: "batman",
           password: "1234567",
          })
        expect(result).to.be.status(400)
        expect(result.body).to.be.deep.equal({message: 'type email required'})
      })
      it("senha espera o erro 400" ,async()=>{
        const result =  await chai.request(url)
          .post('/login').send({
           email: "batman@hotmail.com",
           password: "12345",
          })
        expect(result).to.be.status(400)
        expect(result.body).to.be.deep.equal({message: 'password must be longer than 6 characters'})
      })
      it("email passado o tipo errado espera o erro 400 " ,async()=>{
        const result =  await chai.request(url)
          .post('/login').send({
           email: [1],
           password: "1234567",
          })
        expect(result).to.be.status(400)
        expect(result.body).to.be.deep.equal({message: "Email must be a string"})
      })
      it("Password passado o tipo errado espera o erro 400 " ,async()=>{
        const result =  await chai.request(url)
          .post('/login').send({
           email: "batman@hotmail.com",
           password: ["123456"],
          })
        expect(result).to.be.status(400)
        expect(result.body).to.be.deep.equal({message: "Password must be a string"})
      })
    })
    describe("Testa se há correspondêcia nos dados" ,()=>{
      const model = new ModelUser()

      before(() => {
        sinon.stub(model,"getByEmail").resolves(User)
      })
      after(() => {
        (model.getByEmail as sinon.SinonStub).restore()
      })
      it("senha errada esperando erro 401", async() => {
        const result =  await chai.request(url)
          .post('/login').send({
           email:"user@user.com",
           password:'secret_',
          })
        expect(result).to.be.status(401)
        expect(result.body.message).to.be.equal("Incorrect email or password")
      })
    })
})