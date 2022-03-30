import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Clubs from '../database/models/Clubs';
import { ClubsMock } from './mocks/clubsMock';

import { Response } from 'superagent';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testing /clubs', () => {

  let chaiHttpResponse: Response;


    beforeEach(async () => {
      sinon.stub(Clubs, 'findAll').callsFake(ClubsMock.findAll)
    })

    afterEach(async () => {
      (Clubs.findAll as sinon.SinonStub).restore();
    })

  describe('1. List all clubs', async () => {
    
    it('You get 200 status', async () => {
      chaiHttpResponse = await chai.request(app)
          .get('/clubs')
          
        
      expect(chaiHttpResponse).to.have.status(200);
    })

    it('You get all clubs', async () => {
      chaiHttpResponse = await chai.request(app)
          .get('/clubs')
          
        
      expect(chaiHttpResponse.body).to.have.length(16);
    })

  });
})
