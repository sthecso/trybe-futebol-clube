import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import ModelMatchs from '../database/models/matchs'
import { Response } from 'superagent';
import { app } from '../app';
import { allMatchs, IMatchsDT0, matchsTrue, MockSequlize } from './mock'
chai.use(chaiHttp)

const { expect } = chai

describe('match', () => {
  let chaiHttpResponse: Response
  describe('buscando todos os matchs', () => {
    before( async() => {
      sinon.stub(ModelMatchs, 'findAll').resolves(MockSequlize as unknown as ModelMatchs[])
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
    // describe('buscando matchs inProgress', () => {
    //   before( async() => {
    //     sinon.stub(ModelMatchs, 'findAll').resolves(matchsTrue as unknown as ModelMatchs[])
    //   })
    //   // before(async () => {
    //   //   sinon.stub(Model2User, "findOne").resolves(null as unknown as Model2User) // types do ts meu amigo apenas  
    //   // })
    //   after(() => {
    //     (ModelMatchs.findAll as sinon.SinonStub).restore()
    //   })
    //   it('testando a rota get search', async () => {
    //     chaiHttpResponse = await chai.request(app).get('/matchs?inProgress=true')
    //     expect(chaiHttpResponse.body).to.be.an('array')
    //     const result = chaiHttpResponse.body as IMatchsDT0[]
    //     result.forEach((matchGame) => {
    //       expect(matchGame).to.be.all.keys(
    //         'id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress', 'homeClub', 'awayClub')
    //       expect(matchGame.awayClub).to.be.an('object')
    //       expect(matchGame.homeClub).to.be.an('object')
    //       expect(matchGame.awayClub).to.be.a.key('clubName')
    //       expect(matchGame.homeClub).to.be.a.key('clubName')
    //     })
    //   })
    // })
  })
})