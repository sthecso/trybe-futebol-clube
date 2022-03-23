import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import ModelMatchs from '../database/models/matchs'
import ModelClubs from '../database/models/clubs'
import ModelUser from '../database/models/users'
import { Response } from 'superagent';
import { app } from '../app';
import { IMatchsDT0, MockSequlizeTrueMatchs, MockSequlizeAllMatchs,MockSequlizeClubs,MockSequlizeCreatMatchs } from './mock'
chai.use(chaiHttp)


const User = {
  id:1,
  username: "User",
  role: "user",
  email: "user@user.com",
  password: "$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO"
}
const { expect } = chai
let token:string

describe('match', () => {
  let chaiHttpResponse: Response
  describe('buscando todos os matchs', () => {
    before( async() => {
      sinon.stub(ModelMatchs, 'findAll').resolves(MockSequlizeAllMatchs as unknown as ModelMatchs[])
    })
    after(() => {
      (ModelMatchs.findAll as sinon.SinonStub).restore()
    })
    it('testando a rota get', async () => {
      chaiHttpResponse = await chai.request(app).get('/matchs')
      expect(chaiHttpResponse.body).to.be.an('array')
      const result = chaiHttpResponse.body as IMatchsDT0[]
      result.forEach((matchGame) => {
        expect(matchGame).to.be.all.keys(
          'id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress', 'homeClub', 'awayClub')
        expect(matchGame.awayClub).to.be.an('object')
        expect(matchGame.homeClub).to.be.an('object')
        expect(matchGame.awayClub).to.be.a.key('clubName')
        expect(matchGame.homeClub).to.be.a.key('clubName')
      })
    })
  })
  describe('buscando matchs inProgress', () => {
    before( async() => {
      sinon.stub(ModelMatchs, 'findAll').resolves(MockSequlizeTrueMatchs as unknown as ModelMatchs[])
    })
    after(() => {
      (ModelMatchs.findAll as sinon.SinonStub).restore()
    })
    it('testando a rota get search', async () => {
      chaiHttpResponse = await chai.request(app).get('/matchs?inProgress=true')
      expect(chaiHttpResponse.body).to.be.an('array')
      const result = chaiHttpResponse.body as IMatchsDT0[]
      result.forEach((matchGame) => {
        expect(matchGame).to.be.all.keys(
          'id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress', 'homeClub', 'awayClub')
        expect(matchGame.awayClub).to.be.an('object')
        expect(matchGame.homeClub).to.be.an('object')
        expect(matchGame.inProgress).to.be.equal(true)
        expect(matchGame.awayClub).to.be.a.key('clubName')
        expect(matchGame.homeClub).to.be.a.key('clubName')
      })
    })
  })
  describe('Inserido um match valido', () => {
    const id = {id:1}
    before( async() => {
      sinon.stub(ModelClubs, 'findAll').resolves(MockSequlizeClubs as unknown as ModelClubs[]);
      sinon.stub(ModelMatchs, 'create').resolves(MockSequlizeCreatMatchs as unknown as ModelMatchs);
      sinon.stub(ModelUser, "findOne").resolves(User as unknown as ModelUser)
    })
    after(() => {
      (ModelClubs.findAll as sinon.SinonStub).restore();
      (ModelMatchs.create as sinon.SinonStub).restore();
      (ModelUser.findOne as sinon.SinonStub).restore()
    })

    it('testando a rota get search', async () => {
      chaiHttpResponse =  await chai.request(app)
      .post("/login").send({
       email:"user@user.com",
       password:"secret_user",
      })
      token = chaiHttpResponse.body.token
      chaiHttpResponse = await chai.request(app).post('/matchs')
      .set({
        "Authorization":token
      })
      .send({
        homeTeam: 1, // O valor deve ser o id do time
        awayTeam: 2, // O valor deve ser o id do time
        homeTeamGoals: 2,
        awayTeamGoals: 2,
        inProgress: true // 
      })
     expect(chaiHttpResponse.body).to.be.an('object')
     expect(chaiHttpResponse.body).to.be.all.keys('id','homeTeam','homeTeamGoals','awayTeam','awayTeamGoals','inProgress')
    })
  })
  describe('Inserido um match valido', () => {
    const id = {id:1}
    before( async() => {
      sinon.stub(ModelMatchs, 'update').resolves();
    })
    after(() => {
      (ModelMatchs.update as sinon.SinonStub).restore();
    })
    it('qualquer coisa', async () => {

      chaiHttpResponse = await chai.request(app).patch('/matchs/49/finish')
     expect(chaiHttpResponse).to.be.status(200)
    })
      
  })
})