import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import User from '../database/modelsSequelize/user';
import LoginUserModel from '../models/userLogin';
import { before } from 'mocha';
import bcrypt = require('bcryptjs');
import MatchModel from '../models/match';
import Match from '../database/modelsSequelize/match';


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

/* describe('Testa a classe LoginUserController', () => {
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

}) */