import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import { app } from '../app';
import IMatch from '../interfaces/Match';

chai.use(chaiHttp);

const { expect } = chai;

describe('/matchs', () => {
  it('POST: quando match é adicionado com sucesso', async () => {
    const user = {
      email: "admin@admin.com",
      password: "secret_admin"
    };
      
    const match = {
      homeTeam: 16,
      awayTeam: 8,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
      inProgress: true,
    };

    const { body: { token } } = await chai.request(app)
      .post('/login')
      .send(user);

    await chai.request(app)
      .post('/matchs')
      .send(match)
      .set('Authorization', token)
      .then((res: Response) => {
        const match = res.body;

        expect(res).to.have.status(200);
        expect(match).to.be.a('object');
        expect(match).to.have.property('id');
        expect(match).to.have.property('homeTeam');
        expect(match).to.have.property('awayTeam');
        expect(match).to.have.property('homeTeamGoals');
        expect(match).to.have.property('awayTeamGoals');
        expect(match).to.have.property('inProgress');
      });
  });

  it('GET: quando matchs são retornados com sucesso', async () => {
    await chai.request(app)
      .get('/matchs')
      .then((res: Response) => {
        const body = res.body;

        expect(res).to.have.status(200);
        expect(body).to.be.a('array');
        body.forEach((match: IMatch) => {
          expect(match).to.have.property('id');
          expect(match).to.have.property('homeTeam');
          expect(match).to.have.property('homeTeamGoals');
          expect(match).to.have.property('awayTeam');
          expect(match).to.have.property('awayTeamGoals');
          expect(match).to.have.property('inProgress');
          expect(match).to.have.property('homeClub');
          expect(match).to.have.property('awayClub');
          expect(match.homeClub).to.have.property('clubName');
          expect(match.awayClub).to.have.property('clubName');
        });
      });
  });

  it('GET: quando a query string é passada', async () => {
    await chai.request(app)
      .get('/matchs')
      .query({ inProgress: 'false' })
      .then((res: Response) => {
        const body = res.body;

        expect(res).to.have.status(200);
        expect(body).to.be.a('array');
        body.forEach((match: IMatch) => {
          expect(match).to.have.property('inProgress');
          expect(match.inProgress).to.be.equal(true);
        });
      });
  });
});

describe('/matchs/:id', () => {
  it('GET /matchs/1/finish: quando é finalizado a partida com sucesso', async () => {
    await chai.request(app)
      .patch('/matchs/1/finish')
      .then((res: Response) => {
        expect(res).to.have.status(204);
        expect(res.body.message).to.be.equal('Match finished');
      });
  });

  it('PATCH /match/1: quando match é atualizado com sucesso', async () => {
    const newResults = {
      "homeTeamGoals": 3,
      "awayTeamGoals": 1
    };

    await chai.request(app)
      .patch('/matchs/1')
      .send(newResults)
      .then((res: Response) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.equal('Match updated');
      });
  });
});