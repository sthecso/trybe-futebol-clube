import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;
describe('All tests', () => {
  describe('Test endpoint /login', () => {
    let chaiHttpResponse: Response;
  
    it('status = 200 and returns an object', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send({ email: "admin@admin.com",
        password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW" })
      
      expect(chaiHttpResponse).have.status(200);
      expect(chaiHttpResponse.body).to.be.an('object');
    });
  
    it('can not login without email', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send({ password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW" })
      
      expect(chaiHttpResponse).have.status(401);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
    });
  
    it('can not login without password', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send({ email: "admin@admin.com" })
      
      expect(chaiHttpResponse).have.status(401);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
    });
  });

  describe('Test endpoint /login/validate', async () => {
    let chaiHttpResponse1: Response;
    let chaiHttpResponse2: Response;

    it('try get with no token', async () => {
      chaiHttpResponse2 = await chai.request(app)
        .get('/login/validate')
        .set('Authorization', '')
      
      expect(chaiHttpResponse2).have.status(401);
    });

    it('try get with wrong token', async () => {
      chaiHttpResponse1 = await chai.request(app)
          .post('/login')
          .send({ email: "admin@admin.com",
          password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW" })
      chaiHttpResponse2 = await chai.request(app)
        .get('/login/validate')
        .set('Authorization', 'anyToken')
      
      expect(chaiHttpResponse2).have.status(401);
    });

    it('try get with right token', async () => {
      chaiHttpResponse1 = await chai.request(app)
        .post('/login')
        .send({ email: "admin@admin.com",
        password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW" })

      chaiHttpResponse2 = await chai.request(app)
        .get('/login/validate')
        .set('Authorization', chaiHttpResponse1.body.token)
      
      expect(chaiHttpResponse2).have.status(200);
    });
  })

  describe('Test endpoint /clubs', async () => {
    let chaiHttpResponse: Response;

    it('status = 200 and returns an array', async () => {
      chaiHttpResponse = await chai.request(app)
        .get('/clubs')
      
      expect(chaiHttpResponse).have.status(200);
      expect(chaiHttpResponse.body).to.be.an('array');
    });
  });

  describe('Test endpoint /clubs/:id', async () => {
    let chaiHttpResponse: Response;

    it('check if it returns what was expected', async () => {
      chaiHttpResponse = await chai.request(app)
        .get('/clubs/1')
      
      expect(chaiHttpResponse).have.status(200);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body.id).to.be.equal(1);
    });
  });

  describe.only('Test endpoint /matchs', async () => {
    let chaiHttpResponse: Response;

    it('status = 200 and returns an array', async () => {
      chaiHttpResponse = await chai.request(app)
        .get('/matchs')
      
      expect(chaiHttpResponse).have.status(200);
      expect(chaiHttpResponse.body).to.be.an('array');
    });

    it('checks if objects have the correct keys', async () => {
      chaiHttpResponse = await chai.request(app)
        .get('/matchs')

      expect(chaiHttpResponse.body[0]).to.haveOwnProperty('id');
      expect(chaiHttpResponse.body[0]).to.haveOwnProperty('homeTeam');
      expect(chaiHttpResponse.body[0]).to.haveOwnProperty('homeTeamGoals');
      expect(chaiHttpResponse.body[0]).to.haveOwnProperty('awayTeam');
      expect(chaiHttpResponse.body[0]).to.haveOwnProperty('awayTeamGoals');
      expect(chaiHttpResponse.body[0]).to.haveOwnProperty('inProgress');
      expect(chaiHttpResponse.body[0]).to.haveOwnProperty('homeClub');
      expect(chaiHttpResponse.body[0]).to.haveOwnProperty('awayClub');
    });

    it('check if returns just inProgress = true', async () => {
      chaiHttpResponse = await chai.request(app)
        .get('/matchs')
        .query({ inProgress: 'true' })

      let arr = chaiHttpResponse.body;

      expect(arr[0].inProgress).to.be.equal(true);
      expect(arr[arr.length-1].inProgress).to.be.equal(true);
    });

    it('check if returns just inProgress = false', async () => {
      chaiHttpResponse = await chai.request(app)
        .get('/matchs')
        .query({ inProgress: 'false' })

      let arr = chaiHttpResponse.body;

      expect(arr[0].inProgress).to.be.equal(false);
      expect(arr[arr.length-1].inProgress).to.be.equal(false);
    });
  });
});
