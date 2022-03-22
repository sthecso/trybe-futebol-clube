import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response, Request } from 'superagent';
import User from '../database/modelsSequelize/user';
import LoginUserModel from '../models/userLogin';
import { before } from 'mocha';
import bcrypt = require('bcryptjs');
import MatchModel from '../models/match';
import Match from '../database/modelsSequelize/match';
import ClubsModels from '../models/club';
import IMatchReq from '../interfaces/match/IMatchReq';


chai.use(chaiHttp);

const { expect } = chai;

const login = {email: "samuel@samuel.com", password: "password"}
/*===========================Models==========================*/
describe('Testa a class LoginUserModel', async () => {
  const user = new LoginUserModel();
  
  const encountered = {
    password: "password",
    data: {
      id: 1,
      username: 'samuel',
      role: 'admin',
      email: 'samuel@samuel.com',
      
    },
  };
     before(async () => {

      sinon
       .stub(User, "findOne")
       .resolves(encountered as any);

       sinon.stub(bcrypt, "compare").resolves("password")
    })
       
    it('testa a instancia da classe', async () => {
      expect(user).to.be.instanceOf(LoginUserModel)
    });

   it('O retorno deve ser um objeto', async () => {
    expect(await user.findUser(login)).to.be.an('Object');
  });

  it('O objeto deve ter a chave data', async () => {
    expect(await user.findUser(login)).to.have.key('data');
  });
})

describe('Testa a classe MatchModel', async () => {

  const mocksAllmatch = [
    {
      id: 1,
      homeTeam: 16,
      homeTeamGoals: 1,
      awayTeam: 8,
      awayTeamGoals: 1,
      inProgress: false,
    }
  ] as any

  before(async () => {
    sinon.stub(Match, "findAll").resolves(mocksAllmatch)
  })

  const matchModel = new MatchModel();

      
    it('testa o retorno da classe com um dado valido', async () => {
    
    expect(matchModel).to.be.instanceOf(MatchModel);
    expect(await matchModel.getMatchsByProgress(true)).to.be.an("array");
    expect(await matchModel.getMatchsByProgress(true)).to.have.length(1);
  });


});

describe('Testa a classe clubModel', async () => {

  const mockId = 1;

 

  const clubModel = new ClubsModels();

      
    it('testa o retorno do methodo getAllClubs ', async () => {
    
    expect(clubModel).to.be.instanceOf(ClubsModels);
    expect(await clubModel.getAllClubs()).to.be.an("array");
  });

  it('testa o retorno do methodo findOne ', async () => {
    
    expect(await clubModel.findOneClub(mockId)).to.be.an("object");
  });


});

describe('Testa a classe matchModel', async () => {

  const mockData = {
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 8,
    awayTeamGoals: 2,
    inProgress: true
  } as unknown as IMatchReq;

 

  const matchModel = new MatchModel();

      
    it('testa o retorno do methodo getMatchByProgress ', async () => {
    
    expect(matchModel).to.be.instanceOf(MatchModel);
    expect(await matchModel.getMatchsByProgress(false)).to.be.an("array");
  });

  it('testa o retorno do methodo saveMatchInProgress ', async () => {
    
    expect(await matchModel.saveMatchInProgress(mockData)).to.be.an("object");
  });

  it('testa o retorno do methodo updateResultsMatch ', async () => {
    
    expect(await matchModel.updateResultsMatch(1, {homeTeamGoals: 1, awayTeamGoals: 2})).to.be.an("object");
  });


});

/*===========================Controller==========================*/
describe('Testa a classe LoginUserController', () => {
  it('testa o retorno com um request valido', async () => {
    const chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .set('content-type', 'application/json')
    .send({
        email: 'samuel@samuel.com',
        password: 'password'
    });


    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse).to.be.an('Object');

  });

})

describe('Testa a classe ClubController', () => {
    
  it('testa o resultado quando usuario busca por todos os times', async () => {
      const chaiHttpResponse = await chai
      .request(app)
      .get('/clubs')
      .set('content-type', 'application/json');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse).to.be.an('object');
  
    });

    it('testa o resultado quando usuario busca por um time', async () => {
      const chaiHttpResponse = await chai
      .request(app)
      .get('/clubs/1').set('content-type', 'application/json');
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse).to.be.an('object');
      expect(chaiHttpResponse.body).to.have.keys('id', 'clubName');
  
    });
})


describe('Testa a classe matchController', () => {
    
  const mockData = {
    homeTeam: 1,
    homeTeamGoals: 2,
    awayTeam: 8,
    awayTeamGoals: 2,
    inProgress: true
  } as unknown as IMatchReq;

  const mockDataeq = {
    homeTeam: 1,
    homeTeamGoals: 2,
    awayTeam: 1,
    awayTeamGoals: 2,
    inProgress: true
  } as unknown as IMatchReq;

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjQ3ODk1NzY4LCJleHAiOjE2NDg1MDA1Njh9.op-ZUbbRwCzO_-Oy1lS3HJ1AfYtxrZyT5MLx9ikXLKU"


  it('testa o resultado quando usuario tenta salvar uma partida', async () => {
    const chaiHttpResponse = await chai
    .request(app)
    .post('/matchs').auth(token, { type: 'bearer' })
    .send(mockData);
    expect(chaiHttpResponse.status).to.be.equal(200);


  });
})