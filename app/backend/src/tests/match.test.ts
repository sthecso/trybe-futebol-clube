import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('/GET Matchs', () => {
    it('Deve retornar status 200', async () => {
      const result = await chai.request(app)
        .get('/matchs');
      expect(result.status).to.be.equal(200);
    });
    it('Deve retornar uma lista de partidas', async () => {
        const result = await chai.request(app)
          .get('/matchs');
        expect(result.status).to.be.equal(200);
        expect(Array.isArray(result.body)).to.be.equal(true);
    });
});

describe('/POST Matchs', () => {
    it('Não deve adicionar partida com dois times iguais', async () => {
      const homeTeam = 1;
      const awayTeam = 1;
      const error = 'It is not possible to create a match with two equal teams';

      const result = await chai.request(app)
        .post('/match')
        .set('content-type', 'application/json')
        .send({ homeTeam, awayTeam });
      expect(result.status).to.be.equal(401);
      expect(result.body).to.haveOwnProperty('message');
      expect(result.body.message).to.be.equal(error);
    });
    it('Não deve adicionar partidas com times que não estão cadastrados', async () => {
      const homeTeam = 9999;
      const awayTeam = 8888;
      const error = 'There is no team with such id!';

      const result = await chai.request(app)
        .post('/matchs')
        .set('content-type', 'application/json')
        .send({ homeTeam, awayTeam });
      expect(result.status).to.be.equal(401);
      expect(result.body).to.haveOwnProperty('message');
      expect(result.body.message).to.be.equal(error);
    });
    it('Deve adicionar nova partida com status inProgress', async () => {
      const newMatch = {
          homeTeam: 1,
          awayTeam: 2,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
          inProgress: true,
      };
      const result = await chai.request(app)
        .post('/match')
        .set('content-type', 'application/json')
        .send(newMatch);
      expect(result.status).to.be.equal(201);
      expect(result.body).to.haveOwnProperty('id');
    });
});

describe('/PATCH Matchs/:id/finish', () => {
  it('Deve permitir alterar o status inProgress da partida para false', async () => {
    const newMatch = {
        homeTeam: 1,
        awayTeam: 2,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
        inProgress: true,
    };
    const finished = 'Finished match';

    const result = await chai.request(app)
      .post('/matchs')
      .set('content-type', 'application/json')
      .send(newMatch);
    expect(result.status).to.be.equal(201);
    expect(result.body).to.haveOwnProperty('id');

    const matchId = result.body.id;
    const finishedMatch = await chai.request(app)
      .patch(`/matchs/${matchId}/finish`);
    expect(finishedMatch.status).to.be.equal(200);
    expect(finishedMatch.body).to.haveOwnProperty('message');
    expect(finishedMatch.body.message).to.be.equal(finished);
  });
});

