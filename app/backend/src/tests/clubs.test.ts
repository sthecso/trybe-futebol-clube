import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import { app } from '../app';
import IClub from '../interfaces/Club';

chai.use(chaiHttp);

const { expect } = chai;

describe('/clubs', () => {
  it('Retorna status 200 com array contento os clubes', async () => {      
    await chai.request(app)
      .get('/clubs')
      .then((res: Response) => {
        const body = res.body;

        expect(res).to.have.status(200);
        expect(body).to.be.a('array');
        body.forEach((club: IClub) => {
          expect(club).to.have.property('id');
          expect(club).to.have.property('clubName');
        });
      });
  });
});

describe('/clubs/:id', () => {
  it('Retorna status 200 com um clube', async () => {
    await chai.request(app)
      .post('/clubs/1')
      .then((res: Response) => {
        const body = res.body;

        expect(res.status).to.equal(200);
        expect(body).to.be.a('object');
        expect(body).to.have.property('id');
        expect(body).to.have.property('clubName');
      });
    });
});
