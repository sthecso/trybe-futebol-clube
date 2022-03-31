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


  
  describe('1. Successfully list all matchs', async () => {

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
})
