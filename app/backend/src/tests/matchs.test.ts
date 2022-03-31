import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matchs from '../database/models/Matchs';
import { MatchsMock } from './mocks/matchsMock';

import { Response } from 'superagent';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testing /matchs', () => {

  let chaiHttpResponse: Response;


  
  describe('1.Successfully list all matchs', async () => {

    beforeEach(async () => {
      sinon.stub(Matchs, 'findAll').callsFake(MatchsMock.findAll)
    })
  
    afterEach(async () => {
      (Matchs.findAll as sinon.SinonStub).restore();
    })
    
    it('You get 200 status', async () => {
      chaiHttpResponse = await chai.request(app)
          .get('/matchs')
          
        
      expect(chaiHttpResponse).to.have.status(200);
    })

    it('You get all matchs', async () => {
      chaiHttpResponse = await chai.request(app)
          .get('/matchs')
          
        
      expect(chaiHttpResponse.body).to.have.length(48);
    })
  });

  describe('2.Search for matches by filtering pela chave in progress', async () => {

    
    describe('Filtering for matches with false in progress', async () => {

      beforeEach(async () => {
        sinon.stub(Matchs, 'findAll').callsFake(MatchsMock.findByProgressFalse)
      })
    
      afterEach(async () => {
        (Matchs.findAll as sinon.SinonStub).restore();
      })

      it('You get status 200 and all matchs', async () => {
        chaiHttpResponse = await chai.request(app)
            .get('/matchs?inProgress=false')
            
        expect(chaiHttpResponse).to.have.status(200);
      })

      it('You get receive all matchs with false in Progress', async () => {
        chaiHttpResponse = await chai.request(app)
            .get('/matchs?inProgress=false')
            
        expect(chaiHttpResponse.body.length).to.eq(40);
      })

    })

    describe('Filtering for matches with true in progress', async () => {

      beforeEach(async () => {
        sinon.stub(Matchs, 'findAll').callsFake(MatchsMock.findByProgressTrue)
      })
    
      afterEach(async () => {
        (Matchs.findAll as sinon.SinonStub).restore();
      })

      it('You get status 200 and all matchs', async () => {
        chaiHttpResponse = await chai.request(app)
            .get('/matchs?inProgress=true')
        
        
        expect(chaiHttpResponse).to.have.status(200);
      })

      it('You get receive all matchs with true in Progress', async () => {
        chaiHttpResponse = await chai.request(app)
            .get('/matchs?inProgress=true')
            
        expect(chaiHttpResponse.body.length).to.eq(8);
      })
    })
  });

  describe('4.When creating a match', async () => {
    let loginResponse: Response;

    loginResponse = await chai.request(app)
    .post('/login')
    .send({
      email: 'admin@admin.com',
      password: 'secret_admin'
    }) 

    const { token } = loginResponse.body;
    
    describe('You successfully create the match', async () => {
      const stubMatch = {
        "id": 49,
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 8,
        "awayTeamGoals": 2,
        "inProgress": true,
      } as Matchs
  
        beforeEach(async () => {
          sinon.stub(Matchs, 'findOne').resolves(stubMatch)
        })
    
        afterEach(async () => {
          (Matchs.findOne as sinon.SinonStub).restore();
        })

      it('You get a 200 status with the match created', async () => {
        chaiHttpResponse = await chai.request(app)
            .post('/matchs')
            .set('authorization', token)
            .send({
              "homeTeam": 16, 
              "awayTeam": 8,
              "homeTeamGoals": 2,
              "awayTeamGoals": 2,
              "inProgress": true 
            }) 
          
        const { body, status } = chaiHttpResponse;
        expect(status).to.equal(200);
        expect(body.id).to.equal(stubMatch.id);
        expect(body.homeTeam).to.equal(stubMatch.homeTeam);
        expect(body.homeTeamGoals).to.equal(stubMatch.homeTeamGoals);
        expect(body.awayTeam).to.equal(stubMatch.awayTeam);
        expect(body.awayTeamGoals).to.equal(stubMatch.awayTeamGoals);
        expect(body.inProgress).to.equal(stubMatch.inProgress);
      })
    });
  })
});
