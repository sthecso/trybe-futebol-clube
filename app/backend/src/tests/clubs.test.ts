import * as sinon from 'sinon'
import * as chai from 'chai'
import { app } from '../app'
import ModelClubs from '../database/models/clubs'
import { Response } from 'superagent'
import chaiHttp = require('chai-http')
import {allClubs, oneClub, IClubDTO } from './mock' //mocks aqui heheh xD
chai.use(chaiHttp)
const { expect } = chai


describe("Clubs mudar nome", () => {
  let chaiHttpResponse: Response

  describe("Buscando todos os clubs", () => {
    before(async () => {
      sinon.stub(ModelClubs, "findAll").resolves(allClubs as unknown as ModelClubs[])
    })
    after(() => {
      (ModelClubs.findAll as sinon.SinonStub).restore()

    })
    it("get na rota /clubs", async () => {
      chaiHttpResponse = await chai.request(app).get('/clubs')
      expect(chaiHttpResponse.body).to.be.an("array")
      const clubs = chaiHttpResponse.body as unknown as IClubDTO[]
      clubs.forEach((club) => {
        expect(club).to.be.all.keys('id', 'clubName')
      })
    })
  })
  describe("Buscando clubs por id", () => {
    before(async () => {
      sinon.stub(ModelClubs, "findByPk").resolves(oneClub as unknown as ModelClubs)
    })

    after(() => {
      (ModelClubs.findByPk as sinon.SinonStub).restore()
    })

    it("get na rota /clubs/id", async () => {
      chaiHttpResponse = await chai.request(app).get('/clubs/1')
      expect(chaiHttpResponse.body).to.be.an('object')
      expect(chaiHttpResponse.body).to.be.all.keys('id', 'clubName')

    })
  })
})