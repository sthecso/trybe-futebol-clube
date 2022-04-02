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


  
  describe('1.Successfully list all clubs', async () => {

    beforeEach(async () => {
      sinon.stub(Clubs, 'findAll').callsFake(ClubsMock.findAll)
    })
  
    afterEach(async () => {
      (Clubs.findAll as sinon.SinonStub).restore();
    })
    
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

  describe('2.Successfully list club by id', async () => {

    beforeEach(async () => {
      sinon.stub(Clubs, 'findByPk').callsFake(ClubsMock.findByPk)
    })
  
    afterEach(async () => {
      (Clubs.findByPk as sinon.SinonStub).restore();
    })
    
    it('You get 200 status', async () => {
      chaiHttpResponse = await chai.request(app)
          .get('/clubs/1')
          
        
      expect(chaiHttpResponse).to.have.status(200);
    })

    it('You get the club', async () => {
      chaiHttpResponse = await chai.request(app)
          .get('/clubs/1')
          
        
      expect(chaiHttpResponse.body.id).to.be.equal(1);
      expect(chaiHttpResponse.body.club_name).to.be.equal('Avaí/Kindermann');
    })
  });

  describe('3.Failed to list club', async () => {

    beforeEach(async () => {
      sinon.stub(Clubs, 'findByPk').callsFake(ClubsMock.findByPk)
    })
  
    afterEach(async () => {
      (Clubs.findByPk as sinon.SinonStub).restore();
    })

    it('You get 401 status', async () => {
      chaiHttpResponse = await chai.request(app)
          .get('/clubs/732876')
          
        
      expect(chaiHttpResponse).to.have.status(401);
    })

    it('you get an error message', async () => {
      chaiHttpResponse = await chai.request(app)
          .get('/clubs/732876')
          
        
      expect(chaiHttpResponse.body.message).to.be.equal('There is no team with such id!');
    })
  });
})
