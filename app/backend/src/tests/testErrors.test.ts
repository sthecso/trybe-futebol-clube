import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import User from '../database/modelsSequelize/user';
import LoginUserModel from '../models/userLogin';
import { after, before, afterEach, beforeEach } from 'mocha';
import bcrypt = require('bcryptjs');
import LoginUserController from '../controllers/user';
import { NextFunction } from 'express';
import MatchModel from '../models/match';
import Match from '../database/modelsSequelize/match';
import IMatchReq from '../interfaces/match/IMatchReq';
import ValidateAuth from '../middlewares/validateAuth';
import express = require('express');

chai.use(chaiHttp);

const { expect } = chai;

const login = {email: "s", password: "s"}


/*===========================Models==========================*/
describe('Testa os Erros da classe LoginUserModel', async () => {
  
  const userModel = new LoginUserModel();

      
    it('testa o retorno da classe com um usuario que nao existe', async () => {
    

    expect(await userModel.findUser(login)).to.be.null;

  });

}); 

describe('Testa os Erros da classe MatchModel', async () => {

  const mockData = {
    homeTeam: 0,
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
  const matchModel = new MatchModel();

      
    it('testa o retorno da classe com um time inexistente', async () => {
    
      expect(await matchModel.saveMatchInProgress(mockData)).to.be.null;


  });

  it('testa o retorno da classe com dois times iguais', async () => {
    
    expect(await matchModel.saveMatchInProgress(mockDataeq)).to.be.equal('equals');

})


});
/*===========================Controller==========================*/

describe('Testa os erros da classe LoginUserController', () => {
    
    it('testa o retorno com um request invalido', async () => {
        const chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send({
            email: 'samuel@samuel.com',
            password: '6789456454'
        });


        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse).to.be.an('Object');
    
      });
})

describe('Testa a classe ClubController', () => {
    
    it('testa o resultado quando usuario busca por um time que nao existe', async () => {
      const chaiHttpResponse = await chai
      .request(app)
      .get('/clubs/0').set('content-type', 'application/json');
      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(await chaiHttpResponse.body).to.be.eqls({ message: 'club nao encontrado' });
  
    });
})

describe('Testa a classe matchController', () => {
    
  const mockData = {
    homeTeam: 0,
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

  it('testa o resultado quando usuario tenta salvar uma partida com time que nao existe', async () => {
    const chaiHttpResponse = await chai
    .request(app)
    .post('/matchs').auth(token, { type: 'bearer' })
    .send(mockData);
    expect(chaiHttpResponse.status).to.be.equal(401);


  });

  it('testa o resultado quando usuario tenta salvar uma partida com times iguais', async () => {
    const chaiHttpResponse = await chai
    .request(app)
    .post('/matchs').auth(token, { type: 'bearer' })
    .send(mockDataeq);
    expect(chaiHttpResponse.status).to.be.equal(401);


  });
})


