import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

const ROUTE_MATCHS = '/matchs';
const ROUTE_MATCHS_PROGRESS_TRUE = '/matchs?inProgress=true';
const ROUTE_MATCHS_PROGRESS_FALSE = '/matchs?inProgress=false';
const ROUTE_MATCHS_FINISH = '/matchs/1/finish';

/* eslint-disable */
describe('GET Route', () => {
  let chaiHttpResponse: Response;
  it('when return status code 200', async () => {
    chaiHttpResponse = await chai.request(app).get(ROUTE_MATCHS)
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('When request is ok, in get route with inProgress true', async () => {
    chaiHttpResponse = await chai.request(app).get(ROUTE_MATCHS_PROGRESS_TRUE)
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('When request is ok, in get route with inProgress false', async () => {
    chaiHttpResponse = await chai.request(app).get(ROUTE_MATCHS_PROGRESS_FALSE)
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('When request is ok, in route match/:id/finish with id 1', async () => {
    chaiHttpResponse = await chai.request(app).patch(ROUTE_MATCHS_FINISH)
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Return status code 201', async () => {
    chaiHttpResponse = await chai.request(app).post(ROUTE_MATCHS)
      .send({ "homeTeam": 16, "awayTeam": 8, "homeTeamGoals": 2, "awayTeamGoals": 2, "inProgress": true })
    expect(chaiHttpResponse.status).to.be.equal(201);
  });

  it('Return status code 401', async () => {
    chaiHttpResponse = await chai.request(app).post(ROUTE_MATCHS)
      .send({ "homeTeam": 16, "awayTeam": 8, "homeTeamGoals": 2, "awayTeamGoals": 2, "inProgress": false })
    expect(chaiHttpResponse.status).to.be.equal(401);
  });

  it('When request is incorrect, in route post, with homeTeam undefined', async () => {
    chaiHttpResponse = await chai.request(app).post(ROUTE_MATCHS)
      .send({"awayTeam": 8, "homeTeamGoals": 2, "awayTeamGoals": 2,"inProgress": true})
    expect(chaiHttpResponse.status).to.be.equal(401);
  });

  it('When request is incorrect, in route post, with awayTeam undefined', async () => {
    chaiHttpResponse = await chai.request(app).post(ROUTE_MATCHS)
      .send({"homeTeam": 8, "homeTeamGoals": 2, "awayTeamGoals": 2, "inProgress": true})
    expect(chaiHttpResponse.status).to.be.equal(401);
  });

  it('When request is incorrect, in route post, with homeTeamGoals undefined', async () => {
    chaiHttpResponse = await chai.request(app).post(ROUTE_MATCHS)
      .send({"homeTeam": 16, "awayTeam": 8, "awayTeamGoals": 2, "inProgress": true})
    expect(chaiHttpResponse.status).to.be.equal(401);
  });

  it('When request is incorrect, in route post, with awayTeamGoals undefined', async () => {
    chaiHttpResponse = await chai.request(app).post(ROUTE_MATCHS)
      .send({"homeTeam": 16, "awayTeam": 8, "homeTeamGoals": 2, "inProgress": true})
    expect(chaiHttpResponse.status).to.be.equal(401);
  });

  it('When request is incorrect, in route post, with inProgress undefined', async () => {
    chaiHttpResponse = await chai.request(app).post(ROUTE_MATCHS)
      .send({"homeTeam": 16, "awayTeam": 8, "homeTeamGoals": 5, "awayTeamGoals": 2})
    expect(chaiHttpResponse.status).to.be.equal(401);
  });

  it('When request is incorrect, in route post, because teams are equals', async () => {
    chaiHttpResponse = await chai.request(app).post(ROUTE_MATCHS)
      .send({"homeTeam": 8, "awayTeam": 8, "homeTeamGoals": 5, "awayTeamGoals": 2, "inProgress": false})
    expect(chaiHttpResponse.status).to.be.equal(401);
  });

  it('When request is incorrect, in route post, becase not exist teams', async () => {
    chaiHttpResponse = await chai.request(app).post(ROUTE_MATCHS)
      .send({"homeTeam": 69, "awayTeam": 8, "homeTeamGoals": 5, "awayTeamGoals": 2, "inProgress": false})
    expect(chaiHttpResponse.status).to.be.equal(401);
  });
});
