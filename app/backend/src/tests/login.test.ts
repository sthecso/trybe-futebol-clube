import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import Model2User from '../database/models/users'
import { Response } from 'superagent';
import helpjwt from '../utils/helpjwt';
import { app } from '../app';

const User = {
  id:1,
  username: "User",
  role: "user",
  email: "user@user.com",
  password: "$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO"
}
// const notUser = {null}
// const app = `http://localhost:${PORT}`

chai.use(chaiHttp);

const { expect } = chai

// const rota = app.listen(PORT)

describe("testa o funcionamento da rota Login" ,() =>{
  let chaiHttpResponse: Response

    describe("testa os tipos de dados recebidos no login" ,() =>{

      it("formato do email invalido espera um erro" ,async()=>{
        chaiHttpResponse = await chai.request(app)
          .post("/login").send({
           email: "batman",
           password: "1234567",
          })
        expect(chaiHttpResponse).to.be.status(401)
        expect(chaiHttpResponse.body).to.be.deep.equal({message: "Incorrect email or password"})
      })
      it("tamanho da senha inferior ao requerido espera um erro" ,async()=>{
        chaiHttpResponse =  await chai.request(app)
          .post("/login").send({
           email: "batman@hotmail.com",
           password: "12345",
          })
        expect(chaiHttpResponse).to.be.status(401)
        expect(chaiHttpResponse.body).to.be.deep.equal({message: "All fields must be filled"})
      })
      it("email passado o tipo errado espera o erro 400 " ,async()=>{
        chaiHttpResponse =  await chai.request(app)
          .post("/login").send({
           email: [1],
           password: "1234567",
          })
        expect(chaiHttpResponse).to.be.status(401)
        expect(chaiHttpResponse.body).to.be.deep.equal({message: "Email must be a string"})
      })
      it("Password passado o tipo errado" ,async()=>{
        chaiHttpResponse =  await chai.request(app)
          .post("/login").send({
           email: "batman@hotmail.com",
           password: ["123456"],
          })
        expect(chaiHttpResponse).to.be.status(401)
        expect(chaiHttpResponse.body).to.be.deep.equal({message: "Password must be a string"})
      })
      it("Password campo vazio" ,async()=>{
        chaiHttpResponse =  await chai.request(app)
          .post("/login").send({
           email: "batman@hotmail.com",
           password:""
          })
        expect(chaiHttpResponse).to.be.status(401)
        expect(chaiHttpResponse.body).to.be.deep.equal({message: "All fields must be filled"})
      })
    })
    describe("Testa se há correspondêcia nos dados" ,()=>{
      let chaiHttpResponse: Response
      before(async () => {
        return sinon.stub(Model2User, "findOne").resolves({
            ...User
          } as unknown as Model2User) // linter meu amigo apenas 
      })
      after(() => {
        (Model2User.findOne as sinon.SinonStub).restore()
      })
      it("senha errada esperando erro 401", async() => {
       
        chaiHttpResponse =  await chai.request(app)
          .post("/login").send({
           email:"user@user.com",
           password:"secret_",
          })
        expect(chaiHttpResponse).to.be.status(401)
        expect(chaiHttpResponse.body.message).to.be.equal("Incorrect email or password")
      })
    })
    describe("Testa se há o usuario" ,()=>{
      let chaiHttpResponse: Response
      before(async () => {
        sinon.stub(Model2User, "findOne").resolves(null as unknown as Model2User) // linter meu amigo apenas 
      })
      after(() => {
        (Model2User.findOne as sinon.SinonStub).restore()
      })
      it("usuario não encontrado esperando", async() => {
       
        chaiHttpResponse =  await chai.request(app)
          .post("/login").send({
           email:"batman@gmail.com",
           password:"secret_",
          })
        expect(chaiHttpResponse).to.be.status(401)
        expect(chaiHttpResponse.body.message).to.be.equal("Incorrect email or password")
      })
    })
    describe("Caso de sucesso usuario" ,()=>{
      let chaiHttpResponse: Response
      before(async () => {
        return sinon.stub(Model2User, "findOne").resolves(User as unknown as Model2User) // linter meu amigo apenas 
      })
      after(() => {
        (Model2User.findOne as sinon.SinonStub).restore()
      })
      it("usuario encontrado", async() => {
       
        chaiHttpResponse =  await chai.request(app)
          .post("/login").send({
           email:"user@user.com",
           password:"secret_user",
          })
        expect(chaiHttpResponse).to.be.status(200)
        expect(chaiHttpResponse.body.user).to.be.all.keys( "id","username","role","email")
        expect(chaiHttpResponse.body.token).to.be.a.string
      })
      it("Token correto", async() => {
       
        chaiHttpResponse =  await chai.request(app)
          .post("/login").send({
           email:"user@user.com",
           password:"secret_user",
          })
        const token = helpjwt.verify(chaiHttpResponse.body.token)
        expect(token).to.be.all.keys("id","username","role","email","exp","iat")

      })
    })
})