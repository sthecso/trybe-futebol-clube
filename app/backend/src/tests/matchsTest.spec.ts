import { LoginReturn } from './../utils/Interfaces';
import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Users from '../database/models/Users';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da /matchs', () => {
  describe('Quando o request é feito corretamente, na rota get', () => {
    let chaiHttpResponse: Response;
  
    it('Retorna status 200', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/matchs')
  
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });

  describe('Quando o request é feito corretamente, na rota get passando valor inProgress true', () => {
    let chaiHttpResponse: Response;
  
    it('Retorna status 200', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/matchs?inProgress=true')
  
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });

  describe('Quando o request é feito corretamente, na rota get passando valor inProgress false', () => {
    let chaiHttpResponse: Response;
  
    it('Retorna status 200', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/matchs?inProgress=false')
  
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });

  describe('Quando o request é feito corretamente, na rota patch match/:id/finish passando id 1', () => {
    let chaiHttpResponse: Response;
  
    it('Retorna status 200', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .patch('/matchs/1/finish')
  
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });

  describe('Quando o request é feito corretamente, na rota post', () => {
    let chaiHttpResponse: Response;
  
    it('Retorna status 201', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/matchs')
         .send(
          {
            "homeTeam": 16,
            "awayTeam": 8,
            "homeTeamGoals": 2,
            "awayTeamGoals": 2,
            "inProgress": true
          }
         )
  
      expect(chaiHttpResponse.status).to.be.equal(201);
    });
  });

  describe('Quando o request é feito incorretamente, na rota post, pois o homeTeam estava undefined', () => {
    let chaiHttpResponse: Response;
  
    it('Retorna status 401', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/matchs')
         .send(
          {
            "awayTeam": 8,
            "homeTeamGoals": 2,
            "awayTeamGoals": 2,
            "inProgress": true
          }
         )
  
      expect(chaiHttpResponse.status).to.be.equal(401);
    });
  });

  describe('Quando o request é feito incorretamente, na rota post, pois o awayTeam estava undefined', () => {
    let chaiHttpResponse: Response;
  
    it('Retorna status 401', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/matchs')
         .send(
          {
            "homeTeam": 8,
            "homeTeamGoals": 2,
            "awayTeamGoals": 2,
            "inProgress": true
          }
         )
  
      expect(chaiHttpResponse.status).to.be.equal(401);
    });
  });

  describe('Quando o request é feito incorretamente, na rota post, pois o homeTeamGoals estava undefined', () => {
    let chaiHttpResponse: Response;
  
    it('Retorna status 401', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/matchs')
         .send(
          {
            "homeTeam": 16,
            "awayTeam": 8,
            "awayTeamGoals": 2,
            "inProgress": true
          }
         )
  
      expect(chaiHttpResponse.status).to.be.equal(401);
    });
  });

  describe('Quando o request é feito incorretamente, na rota post, pois o awayTeamGoals estava undefined', () => {
    let chaiHttpResponse: Response;
  
    it('Retorna status 401', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/matchs')
         .send(
          {
            "homeTeam": 16,
            "awayTeam": 8,
            "homeTeamGoals": 2,
            "inProgress": true
          }
         )
  
      expect(chaiHttpResponse.status).to.be.equal(401);
    });
  });

  describe('Quando o request é feito incorretamente, na rota post, pois o inProgress estava undefined', () => {
    let chaiHttpResponse: Response;
  
    it('Retorna status 401', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/matchs')
         .send(
          {
            "homeTeam": 16,
            "awayTeam": 8,
            "homeTeamGoals": 5,
            "awayTeamGoals": 2,
          }
         )
  
      expect(chaiHttpResponse.status).to.be.equal(401);
    });
  });

  describe('Quando o request é feito incorretamente, na rota post, pois os times eram iguais', () => {
    let chaiHttpResponse: Response;
  
    it('Retorna status 401', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/matchs')
         .send(
          {
            "homeTeam": 8,
            "awayTeam": 8,
            "homeTeamGoals": 5,
            "awayTeamGoals": 2,
            "inProgress": false,
          }
         )
  
      expect(chaiHttpResponse.status).to.be.equal(401);
    });
  });

  describe('Quando o request é feito incorretamente, na rota post, pois o time não existia', () => {
    let chaiHttpResponse: Response;
  
    it('Retorna status 401', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/matchs')
         .send(
          {
            "homeTeam": 69,
            "awayTeam": 8,
            "homeTeamGoals": 5,
            "awayTeamGoals": 2,
            "inProgress": false,
          }
         )
  
      expect(chaiHttpResponse.status).to.be.equal(401);
    });
  });
});

