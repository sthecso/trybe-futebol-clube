import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { IMatch } from '../utils/interfaces';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests GET /matchs route', () => {
  it('Return status 200 with an array containing all matches', async () => {
    return chai
      .request(app)
      .get('/matchs')
      .then((res: Response) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        res.body.forEach((club: IMatch) => {
          expect(club).to.have.property('id');
          expect(club).to.have.property('homeTeam');
          expect(club).to.have.property('homeTeamGoals');
          expect(club).to.have.property('awayTeam');
          expect(club).to.have.property('awayTeamGoals');
          expect(club).to.have.property('inProgress');
          expect(club).to.have.property('homeClub');
          expect(club.homeClub).to.have.property('clubName');
          expect(club).to.have.property('awayClub');
          expect(club.awayClub).to.have.property('clubName');
        })
      });
  })
});
describe('Tests GET /matchs?inProgress route', () => {
  describe('When inProgress is true', () => {
    it('Return status 200 with an array containing all matches in progress', async () => {
      return chai
        .request(app)
        .get('/matchs')
        .query({ inProgress: true })
        .then((res: Response) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.be.an('array');
          res.body.forEach((club: IMatch) => {
            expect(club).to.have.property('id');
            expect(club).to.have.property('homeTeam');
            expect(club).to.have.property('homeTeamGoals');
            expect(club).to.have.property('awayTeam');
            expect(club).to.have.property('awayTeamGoals');
            expect(club).to.have.property('inProgress');
            expect(club.inProgress).to.be.true;
            expect(club).to.have.property('homeClub');
            expect(club.homeClub).to.have.property('clubName');
            expect(club).to.have.property('awayClub');
            expect(club.awayClub).to.have.property('clubName');
          })
        });
    })
  })
  describe('When inProgress is false', () => {
    it('Return status 200 with an array containing all matches finalized', async () => {
      return chai
        .request(app)
        .get('/matchs')
        .query({ inProgress: false })
        .then((res: Response) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.be.an('array');
          res.body.forEach((club: IMatch) => {
            expect(club).to.have.property('id');
            expect(club).to.have.property('homeTeam');
            expect(club).to.have.property('homeTeamGoals');
            expect(club).to.have.property('awayTeam');
            expect(club).to.have.property('awayTeamGoals');
            expect(club).to.have.property('inProgress');
            expect(club.inProgress).to.be.false;
            expect(club).to.have.property('homeClub');
            expect(club.homeClub).to.have.property('clubName');
            expect(club).to.have.property('awayClub');
            expect(club.awayClub).to.have.property('clubName');
          })
        });
    })
  })
});

describe('Tests POST /matchs route', () => {
  describe('Validate authorization header', () => {
    describe('When no token is passed', () => {
      it('Return status 401 with error message', async () => {
        return chai
          .request(app)
          .post('/matchs')
          .then((res: Response) => {
            expect(res.status).to.be.equal(401);
            expect(res.body.message).to.equal('No token provided');
          });
      })
    })
    describe('When a invalid token is passed', () => {
      it('Return status 401 with error message', async () => {
        return chai
          .request(app)
          .post('/matchs')
          .set('authorization', 'invalid token')
          .then((res: Response) => {
            expect(res.status).to.be.equal(401);
            expect(res.body.message).to.equal('Invalid token');
          });
      })
    })
  })
  describe('When authorization header is passed', () => {
    describe('When teams are the same', () => {
      it('Returns status 401 with error message', async () => {
        let chaiHttpResponse: Response;
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({ email: 'admin@admin.com', password: 'secret_admin' })

        const { token } = chaiHttpResponse.body;

        return chai
          .request(app)
          .post('/matchs')
          .set('authorization', token)
          .send({
            "homeTeam": 8,
            "awayTeam": 8,
            "homeTeamGoals": 2,
            "awayTeamGoals": 2,
            "inProgress": true
          })
          .then((res: Response) => {
            expect(res.status).to.be.equal(401);
            expect(res.body.message).to.equal('It is not possible to create a match with two equal teams');
          });
      })
    })
    describe('When a team is not found', () => {
      it('Returns status 401 with error message', async () => {
        let chaiHttpResponse: Response;
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({ email: 'admin@admin.com', password: 'secret_admin' })

        const { token } = chaiHttpResponse.body;

        return chai
          .request(app)
          .post('/matchs')
          .set('authorization', token)
          .send({
            "homeTeam": 99,
            "awayTeam": 8,
            "homeTeamGoals": 2,
            "awayTeamGoals": 2,
            "inProgress": true
          })
          .then((res: Response) => {
            expect(res.status).to.be.equal(401);
            expect(res.body.message).to.equal('There is no team with such id!');
          });
      })
    })
    describe('When a match is created with success', () => {
      it('Returns status 201 with created match', async () => {
        let chaiHttpResponse: Response;
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({ email: 'admin@admin.com', password: 'secret_admin' })

        const { token } = chaiHttpResponse.body;
        return chai
          .request(app)
          .post('/matchs')
          .set('authorization', token)
          .send({
            "homeTeam": 16,
            "awayTeam": 8,
            "homeTeamGoals": 2,
            "awayTeamGoals": 2,
            "inProgress": true
          })
          .then((res: Response) => {
            expect(res.status).to.be.equal(201);
            expect(res.body).to.have.property('id');
            expect(res.body.homeTeam).to.equal(16)
            expect(res.body.awayTeam).to.equal(8)
            expect(res.body.homeTeamGoals).to.equal(2)
            expect(res.body.awayTeamGoals).to.equal(2)
            expect(res.body.inProgress).to.be.true
          });
      })
    })
  })
})

describe('Tests PATCH /matchs/:id/finish route', () => {
  describe('Validate authorization header', () => {
    describe('When no token is passed', () => {
      it('Return status 401 with error message', async () => {
        return chai
          .request(app)
          .patch('/matchs/1/finish')
          .then((res: Response) => {
            expect(res.status).to.be.equal(401);
            expect(res.body.message).to.equal('No token provided');
          });
      })
    })
    describe('When a invalid token is passed', () => {
      it('Return status 401 with error message', async () => {
        return chai
          .request(app)
          .patch('/matchs/1/finish')
          .set('authorization', 'invalid token')
          .then((res: Response) => {
            expect(res.status).to.be.equal(401);
            expect(res.body.message).to.equal('Invalid token');
          });
      })
    })
  })
  describe('When authorization header is passed', () => {
    it('Returns status 200 with ok message', async () => {
      let chaiHttpResponse: Response;
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: 'secret_admin' })

      const { token } = chaiHttpResponse.body;

      return chai
        .request(app)
        .patch('/matchs/1/finish')
        .set('authorization', token)
        .then((res: Response) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.message).to.equal('Finished match');
        });
    });
  })
});

describe('Tests PATCH /matchs/:id route', () => {
  describe('Validate authorization header', () => {
    describe('When no token is passed', () => {
      it('Return status 401 with error message', async () => {
        return chai
          .request(app)
          .patch('/matchs/1')
          .then((res: Response) => {
            expect(res.status).to.be.equal(401);
            expect(res.body.message).to.equal('No token provided');
          });
      })
    })
    describe('When a invalid token is passed', () => {
      it('Return status 401 with error message', async () => {
        return chai
          .request(app)
          .patch('/matchs/1')
          .set('authorization', 'invalid token')
          .then((res: Response) => {
            expect(res.status).to.be.equal(401);
            expect(res.body.message).to.equal('Invalid token');
          });
      })
    })
  })
  describe('When authorization header is passed', () => {
    it('Returns status 200 with ok message', async () => {
      let chaiHttpResponse: Response;
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: 'secret_admin' })

      const { token } = chaiHttpResponse.body;

      return chai
        .request(app)
        .patch('/matchs/1')
        .set('authorization', token)
        .send({
          "homeTeamGoals": 3,
          "awayTeamGoals": 1
        })
        .then((res: Response) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.message).to.equal('Match updated');
        });
    });
  })
});