import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import { app } from '../app';
import clubs  from './match/clubs';

chai.use(chaiHttp);

const { expect } = chai;
describe('Endpoint /clubs', () => {
  it('return all clubs', async () => {

    await chai
      .request(app)
      .get('/clubs')
      .then((res: Response) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.eql(clubs);
      });
  })

  it('return one club', async () => {
    const flamengo = {
      "id":7,
      "clubName":"Flamengo"
    }

    await chai
      .request(app)
      .get(`/clubs/7`)
      .then((res: Response) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.eql(flamengo);
      });
  })
})

