import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import superagent from 'superagent';
const PORT = process.env.PORT || 3001;
import { app } from '../app';

const url = `http://localhost:${PORT}`
chai.use(chaiHttp);
// let chaiHttpResponse = Response
const { expect } = chai
// const rota = new App().start(3001)

describe("testa o funcionamento da rota Login" ,() =>{
    describe("testa o caso do login invalido" ,() =>{
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
           password: "12345",
          })
        expect(result).to.be.status(400)
        expect(result.body).to.be.deep.equal({message: "Expected string, received array"})
      })
    })
})